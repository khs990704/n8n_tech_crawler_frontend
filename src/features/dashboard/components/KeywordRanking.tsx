import { useEffect, useMemo } from 'react'
import { useAppSelector } from 'src/app/store/redux/reduxHooks'
import { RootState } from 'src/app/store/redux/reduxStore'
import {
    KeywordInfoResponse,
    KeywordRankingProps,
} from 'src/features/dashboard/dashboardType'

const KeywordRanking = ({
    keywords,
    selectedKeyword,
    onSelect,
}: KeywordRankingProps) => {
    const { keywordInfoData } = useAppSelector((state: RootState) => ({
        keywordInfoData: state.dashboardReducer.keywordInfo?.data as
            | KeywordInfoResponse
            | Record<string, unknown>
            | null,
    }))

    const rankingItems = useMemo(() => {
        const normalizedData = Array.isArray(keywordInfoData)
            ? keywordInfoData
            : []

        if (normalizedData.length === 0) {
            return keywords
        }

        const rankingMap = new Map<string, number>()

        for (const item of normalizedData) {
            rankingMap.set(item.keyword, (rankingMap.get(item.keyword) ?? 0) + 1)
        }

        return Array.from(rankingMap.entries()).map(([name, count]) => ({
            name,
            count,
        }))
    }, [keywordInfoData, keywords])

    useEffect(() => {
        if (rankingItems.length === 0) return

        const hasSelectedKeyword = rankingItems.some(
            (item) => item.name === selectedKeyword,
        )

        if (!hasSelectedKeyword) {
            onSelect(rankingItems[0].name)
        }
    }, [onSelect, rankingItems, selectedKeyword])

    const getMedalGradient = (idx: number) => {
        if (idx === 0) return 'from-amber-400 to-yellow-500 shadow-amber-200'
        if (idx === 1) return 'from-slate-300 to-slate-400 shadow-slate-200'
        if (idx === 2) return 'from-orange-400 to-amber-600 shadow-orange-200'
        return 'from-blue-500 to-indigo-600 shadow-blue-200'
    }

    const maxCount = rankingItems[0]?.count ?? 1

    return (
        <div className="flex h-full flex-col rounded-[14px] border border-slate-700/50 bg-slate-800 p-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="mb-[16px] flex items-center gap-[10px] text-[18px] font-bold text-white">
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-gradient-to-br from-blue-500 to-indigo-600 text-[16px]">
                    🔝
                </span>
                상위 키워드
            </h2>
            <ul className="flex flex-1 flex-col gap-[6px]">
                {rankingItems.map((item, idx) => {
                    const pct = Math.round((item.count / maxCount) * 100)
                    return (
                        <li key={item.name} className="flex-1">
                            <button
                                type="button"
                                onClick={() => onSelect(item.name)}
                                className={`relative flex h-full w-full items-center overflow-hidden rounded-[10px] p-[12px] text-left transition-all duration-200 ${
                                    selectedKeyword === item.name
                                        ? 'bg-blue-500/15 ring-2 ring-blue-500/60'
                                        : 'bg-slate-700/40 hover:bg-slate-700/70'
                                }`}
                            >
                                <div
                                    className="absolute inset-y-0 left-0 rounded-[10px] bg-blue-500/8 transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                />
                                <span
                                    className={`relative mr-[12px] flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[14px] font-bold text-white shadow-md ${getMedalGradient(idx)}`}
                                >
                                    {idx + 1}
                                </span>
                                <span className="relative min-w-0 flex-1">
                                    <strong className="block truncate text-[14px] font-semibold text-slate-100">
                                        {item.name}
                                    </strong>
                                    <span className="text-[12px] text-slate-500">
                                        {item.count}개 기사
                                    </span>
                                </span>
                                {selectedKeyword === item.name && (
                                    <span className="relative ml-[8px] shrink-0 text-[13px] font-bold text-blue-400">
                                        ✓
                                    </span>
                                )}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default KeywordRanking
