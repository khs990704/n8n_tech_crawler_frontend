import { useEffect, useMemo, useState } from 'react'
import PeriodTabs from 'src/features/dashboard/components/PeriodTabs'
import WordcloudCard from 'src/features/dashboard/components/WordcloudCard'
import KeywordRanking from 'src/features/dashboard/components/KeywordRanking'
import ArticleTable from 'src/features/dashboard/components/ArticleTable'
import { PeriodKey } from 'src/features/dashboard/dashboardType'
import { useAppDispatch } from 'src/app/store/redux/reduxHooks'
import { dashboardAction } from 'src/features/dashboard/dashboardReducer'

const Dashboard = () => {
    const dispatch = useAppDispatch()

    const [period, setPeriod] = useState<PeriodKey>('3day')
    const [selectedKeyword, setSelectedKeyword] = useState('')

    const wordcloudImageUrl = useMemo(() => {
        return `/media/wordcloud_${period}.png`
    }, [period])

    const handlePeriodChange = (nextPeriod: PeriodKey) => {
        setPeriod(nextPeriod)
        setSelectedKeyword('')
    }

    useEffect(() => {
        dispatch(dashboardAction.getKeywordInfo({ period }))
    }, [dispatch, period])

    return (
        <div className="min-h-screen bg-[#f5f5f5] p-[20px] text-[17px] text-[#333]">
            <div className="mx-auto max-w-[1400px]">
                <header className="mb-[30px]">
                    <h1 className="mb-[10px] text-[30px] leading-[1.2] font-bold text-[#1a1a1a]">
                        📊 AI 키워드 대시보드
                    </h1>
                    <p className="text-[15px] text-[#666]">
                        실시간 AI 관련 키워드 분석 및 기사 조회
                    </p>
                </header>

                <section className="mb-[30px] grid grid-cols-1 gap-[20px] lg:grid-cols-[1.5fr_1fr]">
                    <div className="h-full">
                        <PeriodTabs
                            selectedPeriod={period}
                            onSelectPeriod={handlePeriodChange}
                        />
                        <WordcloudCard imageUrl={wordcloudImageUrl} />
                    </div>
                    <div className="h-full">
                        <KeywordRanking
                            keywords={[]}
                            selectedKeyword={selectedKeyword}
                            onSelect={setSelectedKeyword}
                        />
                    </div>
                </section>

                <ArticleTable keyword={selectedKeyword} articles={[]} />
            </div>
        </div>
    )
}

export default Dashboard
