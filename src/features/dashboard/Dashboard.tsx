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
        <div className="min-h-screen bg-[#0f172a] p-[24px] text-[17px] text-slate-100">
            <div className="mx-auto max-w-[1400px]">
                <header className="mb-[36px]">
                    <div className="flex items-center gap-[14px]">
                        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-blue-500 to-indigo-600 text-[24px] leading-none shadow-lg shadow-blue-900/60">
                            📊
                        </div>
                        <div>
                            <h1 className="text-[28px] font-extrabold leading-[1.2] text-white">
                                AI 키워드 대시보드
                            </h1>
                            <p className="mt-[4px] text-[14px] text-slate-400">
                                실시간 AI 관련 키워드 분석 및 기사 조회
                            </p>
                        </div>
                    </div>
                </header>

                <section className="mb-[24px] grid grid-cols-1 gap-[20px] lg:grid-cols-[1.5fr_1fr]">
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
