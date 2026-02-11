export type PeriodKey = '3d' | '1w' | '1m'

export interface KeywordStat {
    name: string
    count: number
}

export interface ArticleItem {
    number: number
    title: string
    link: string
}

export interface PeriodData {
    image: string
    keywords: KeywordStat[]
    articles: Record<string, ArticleItem[]>
}

export type DashboardData = Record<PeriodKey, PeriodData>
