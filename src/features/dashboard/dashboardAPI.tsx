import { keywordInfoClient } from 'src/app/api/client'
import {
    KeywordSummaryRequestItem,
    PeriodKey,
} from 'src/features/dashboard/dashboardType'

export const getKeywordInfo = (props: { period: PeriodKey }) => {
    return keywordInfoClient.get(`keyword-info/${props.period}`)
}

export const getKeywordChange = (props: { period: PeriodKey }) => {
    return keywordInfoClient.get(`keyword-change/${props.period}`)
}

export const postKeywordSummary = (body: {
    data: KeywordSummaryRequestItem[]
}) => {
    return keywordInfoClient.post('keyword-summary', body)
}
