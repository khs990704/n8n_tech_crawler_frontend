import { useAppSelector } from 'src/app/store/redux/reduxHooks'
import { RootState } from 'src/app/store/redux/reduxStore'
import { PeriodKey } from 'src/features/dashboard/dashboardType'

const PERIOD_LABEL: Record<PeriodKey, string> = {
    '3day': '최근 3일',
    '7day': '최근 7일',
    '1month': '최근 1개월',
}

interface KeywordSummryProps {
    period: PeriodKey
}

const KeywordSummry = ({ period }: KeywordSummryProps) => {
    const { summary, loading, error } = useAppSelector((state: RootState) => ({
        summary: state.dashboardReducer.keywordSummaries?.[period],
        loading: state.dashboardReducer.summaryLoading ?? false,
        error: state.dashboardReducer.summaryError ?? null,
    }))

    return (
        <section className="rounded-[14px] border border-slate-700/50 bg-slate-800 p-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <div className="mb-[16px]">
                <h2 className="flex items-center gap-[10px] text-[18px] font-bold text-white">
                    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-gradient-to-br from-blue-500 to-indigo-600 text-[16px]">
                        📝
                    </span>
                    키워드 요약
                </h2>
                <p className="mt-[4px] pl-[42px] text-[12px] text-slate-500">
                    {PERIOD_LABEL[period]} 기준 AI 키워드 동향 요약
                </p>
            </div>

            {loading ? (
                <div className="space-y-[10px] border-l-[3px] border-slate-700/50 pl-[16px]">
                    {[88, 75, 92, 68, 82].map((w, i) => (
                        <div
                            key={i}
                            className="h-[13px] animate-pulse rounded-full bg-slate-700/70"
                            style={{ width: `${w}%` }}
                        />
                    ))}
                    <p className="pt-[4px] text-[12px] text-slate-600">
                        요약문 생성 중...
                    </p>
                </div>
            ) : error ? (
                <div className="flex items-start gap-[10px] rounded-[10px] border border-rose-700/40 bg-rose-900/20 px-[16px] py-[14px]">
                    <span className="mt-[1px] shrink-0 text-[16px] leading-none">
                        ⚠️
                    </span>
                    <p className="text-[13px] leading-[1.6] text-rose-400">
                        {error}
                    </p>
                </div>
            ) : summary ? (
                <div className="flex min-h-[50px] flex-col justify-center border-l-[3px] border-blue-500/40 pl-[18px]">
                    <div className="flex flex-col gap-[10px]">
                        {summary
                            .split('\n')
                            .filter((line) => line.trim())
                            .map((line, i) => (
                                <p
                                    key={i}
                                    className="text-[14px] leading-[1.85] text-slate-300"
                                >
                                    {line}
                                </p>
                            ))}
                    </div>
                    <div className="mt-[6px] flex items-center gap-[8px]">
                        <div className="h-px flex-1 bg-slate-700/50" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-[8px] py-[32px] text-center">
                    <span className="text-[28px] leading-none opacity-30">
                        📝
                    </span>
                    <p className="text-[13px] text-slate-500">
                        요약 데이터가 없습니다.
                    </p>
                </div>
            )}
        </section>
    )
}

export default KeywordSummry
