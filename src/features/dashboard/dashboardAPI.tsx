import { keywordInfoClient } from 'src/app/api/client'
import { PeriodKey } from 'src/features/dashboard/dashboardType'

export const getKeywordInfo = (props: { period: PeriodKey }) => {
    return keywordInfoClient.get(`keyword-info/${props.period}`)
}
