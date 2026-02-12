import { reduxMaker } from 'src/app/store/redux/reduxUtils'
import { getKeywordInfo } from './dashboardAPI'

const prefix = 'dashboard'

const asyncRequests = [
    {
        action: 'getKeywordInfo',
        state: 'keywordInfo',
        initialState: [],
        api: getKeywordInfo,
    },
] as const

// interface DashboardState {
//     keywordInfo: KeywordInfoArticle[],
// }

// const initialState: DashboardState = {
//     keywordInfo: [],
// }

const initialState = {}

const localReducers = {}

const module = reduxMaker(prefix, asyncRequests, initialState, localReducers)
export const {
    slice: dashboardSlice,
    actions: dashboardAction,
    saga: dashboardSaga,
} = module
