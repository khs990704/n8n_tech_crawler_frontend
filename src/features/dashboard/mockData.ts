import { DashboardData } from 'src/features/dashboard/types'

export const dashboardData: DashboardData = {
    '3d': {
        image: 'https://via.placeholder.com/1000x700?text=3days+Dashboard',
        keywords: [
            { name: 'AI', count: 245 },
            { name: '머신러닝', count: 189 },
            { name: '빅데이터', count: 156 },
            { name: '클라우드', count: 142 },
            { name: '데이터분석', count: 128 },
        ],
        articles: {
            AI: [
                {
                    number: 1,
                    title: 'AI technology is reshaping modern industries',
                    link: 'https://www.aitimes.com/news/articleView.html?idxno=206714',
                },
                {
                    number: 2,
                    title: '2026 AI market forecast and key signals',
                    link: 'https://example.com/article2',
                },
            ],
            머신러닝: [
                {
                    number: 1,
                    title: 'How to improve model performance in production',
                    link: 'https://example.com/ml1',
                },
            ],
        },
    },
    '1w': {
        image: 'https://via.placeholder.com/1000x700?text=1week+Dashboard',
        keywords: [
            { name: '클라우드', count: 312 },
            { name: 'AI', count: 298 },
            { name: '데이터분석', count: 267 },
            { name: '머신러닝', count: 245 },
            { name: '빅데이터', count: 198 },
        ],
        articles: {
            클라우드: [
                {
                    number: 1,
                    title: 'Cloud security hardening checklist',
                    link: 'https://example.com/cloud1',
                },
                {
                    number: 2,
                    title: 'Hybrid cloud migration patterns',
                    link: 'https://example.com/cloud2',
                },
            ],
            AI: [
                {
                    number: 1,
                    title: 'AI chips and inference performance race',
                    link: 'https://example.com/ai1',
                },
            ],
        },
    },
    '1m': {
        image: 'https://via.placeholder.com/1000x700?text=1month+Dashboard',
        keywords: [
            { name: '데이터분석', count: 456 },
            { name: '클라우드', count: 423 },
            { name: '빅데이터', count: 389 },
            { name: 'AI', count: 367 },
            { name: '머신러닝', count: 334 },
        ],
        articles: {
            데이터분석: [
                {
                    number: 1,
                    title: 'Data analytics trends for the next quarter',
                    link: 'https://example.com/analytics1',
                },
                {
                    number: 2,
                    title: 'Data-driven decision making at scale',
                    link: 'https://example.com/analytics2',
                },
            ],
        },
    },
}
