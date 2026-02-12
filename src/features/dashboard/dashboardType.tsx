export interface KeywordInfoArticle {
    keyword: string
    title: string
    link: string
}

export type KeywordInfoResponse = KeywordInfoArticle[]

export type PeriodKey = '3day' | '7day' | '1month'

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

export interface PeriodTabsProps {
    selectedPeriod: PeriodKey
    onSelectPeriod: (period: PeriodKey) => void
}

export interface WordcloudCardProps {
    imageUrl: string
}

export interface KeywordRankingProps {
    keywords: KeywordStat[]
    selectedKeyword: string
    onSelect: (keyword: string) => void
}

export interface ArticleTableProps {
    keyword: string
    articles: ArticleItem[]
}
