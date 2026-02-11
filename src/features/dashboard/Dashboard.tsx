import { useMemo, useState } from 'react'
import PeriodTabs from 'src/features/dashboard/components/PeriodTabs'
import WordcloudCard from 'src/features/dashboard/components/WordcloudCard'
import KeywordRanking from 'src/features/dashboard/components/KeywordRanking'
import ArticleTable from 'src/features/dashboard/components/ArticleTable'
import { dashboardData } from 'src/features/dashboard/mockData'
import { PeriodKey } from 'src/features/dashboard/types'

const Dashboard = () => {
    const [period, setPeriod] = useState<PeriodKey>('3d')
    const [selectedKeyword, setSelectedKeyword] = useState(
        dashboardData['3d'].keywords[0]?.name ?? '',
    )

    const currentData = dashboardData[period]

    const articles = useMemo(
        () => currentData.articles[selectedKeyword] ?? [],
        [currentData, selectedKeyword],
    )

    const handlePeriodChange = (nextPeriod: PeriodKey) => {
        setPeriod(nextPeriod)
        const firstKeyword = dashboardData[nextPeriod].keywords[0]?.name ?? ''
        setSelectedKeyword(firstKeyword)
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] p-[20px] text-[17px] text-[#333]">
            <div className="mx-auto max-w-[1400px]">
                <header className="mb-[30px]">
                    <h1 className="mb-[10px] text-[30px] leading-[1.2] font-bold text-[#1a1a1a]">
                        📊 키워드 대시보드
                    </h1>
                    <p className="text-[15px] text-[#666]">
                        실시간 키워드 분석 및 관련 기사 조회
                    </p>
                </header>

                <section className="mb-[30px] grid grid-cols-1 gap-[20px] lg:grid-cols-[1.5fr_1fr]">
                    <div className="h-full">
                        <PeriodTabs
                            value={period}
                            onChange={handlePeriodChange}
                        />
                        <WordcloudCard imageUrl={currentData.image} />
                    </div>
                    <div className="h-full">
                        <KeywordRanking
                            keywords={currentData.keywords}
                            selectedKeyword={selectedKeyword}
                            onSelect={setSelectedKeyword}
                        />
                    </div>
                </section>

                <ArticleTable keyword={selectedKeyword} articles={articles} />
            </div>
        </div>
    )
}

export default Dashboard
