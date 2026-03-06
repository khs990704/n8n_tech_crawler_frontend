import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { reduxMaker } from 'src/app/store/redux/reduxUtils'
import {
    KeywordChangeResponse,
    KeywordInfoResponse,
    PeriodKey,
    PeriodSummary,
} from 'src/features/dashboard/dashboardType'
import {
    getKeywordChange,
    getKeywordInfo,
    postKeywordSummary,
} from './dashboardAPI'

const prefix = 'dashboard'

const asyncRequests = [
    {
        action: 'getKeywordInfo',
        state: 'keywordInfo',
        initialState: [],
        api: getKeywordInfo,
    },
    {
        action: 'getKeywordChange',
        state: 'keywordChange',
        initialState: null,
        api: getKeywordChange,
    },
] as const

const ALL_PERIODS: PeriodKey[] = ['3day', '7day', '1month']

interface LocalDashboardState {
    keywordSummaries: Partial<Record<PeriodKey, string>>
    summaryLoading: boolean
    summaryError: string | null
}

const initialState: LocalDashboardState = {
    keywordSummaries: {},
    summaryLoading: false,
    summaryError: null,
}

const localReducers = {
    getKeywordSummary: (
        _state: LocalDashboardState,
        _action: PayloadAction<void>,
    ) => {
        // saga trigger — state change handled by fetchSummaryStart
    },
    fetchSummaryStart: (state: LocalDashboardState) => {
        state.summaryLoading = true
        state.summaryError = null
    },
    fetchSummarySuccess: (
        state: LocalDashboardState,
        action: PayloadAction<PeriodSummary[]>,
    ) => {
        state.summaryLoading = false
        action.payload.forEach(({ period, summary }) => {
            state.keywordSummaries[period] = summary
        })
    },
    fetchSummaryError: (
        state: LocalDashboardState,
        action: PayloadAction<string>,
    ) => {
        state.summaryLoading = false
        state.summaryError = action.payload
    },
}

const module = reduxMaker(prefix, asyncRequests, initialState, localReducers)

function* fetchSummaryWorker() {
    yield put(module.actions.fetchSummaryStart(undefined))
    try {
        const [infoResults, changeResults]: [
            AxiosResponse<KeywordInfoResponse>[],
            AxiosResponse<KeywordChangeResponse>[],
        ] = yield all([
            all(ALL_PERIODS.map((period) => call(getKeywordInfo, { period }))),
            all(ALL_PERIODS.map((period) => call(getKeywordChange, { period }))),
        ])

        const data = ALL_PERIODS.map((period, i) => {
            const infoData: KeywordInfoResponse = infoResults[i].data ?? []
            const changeData: KeywordChangeResponse = changeResults[i].data

            const frequencies: Record<string, number> = {}
            for (const item of infoData) {
                frequencies[item.keyword] =
                    (frequencies[item.keyword] ?? 0) + 1
            }

            return {
                period,
                frequencies,
                rising: changeData?.rising ?? [],
            }
        })

        const response: AxiosResponse<PeriodSummary[]> = yield call(
            postKeywordSummary,
            { data },
        )
        yield put(module.actions.fetchSummarySuccess(response.data))
    } catch {
        yield put(
            module.actions.fetchSummaryError(
                '요약문 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
            ),
        )
    }
}

function* keywordSummarySaga() {
    yield takeLatest(`${prefix}/getKeywordSummary`, fetchSummaryWorker)
}

export const dashboardSlice = module.slice
export const dashboardAction = module.actions
export function* dashboardSaga() {
    yield all([module.saga(), keywordSummarySaga()])
}
