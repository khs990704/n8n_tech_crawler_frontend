import { useAppSelector } from 'src/app/store/redux/reduxHooks'
import { RootState } from 'src/app/store/redux/reduxStore'
import {
    KeywordChangeItem,
    KeywordChangeResponse,
} from 'src/features/dashboard/dashboardType'

type Category = 'rising' | 'falling' | 'new'

const CATEGORY_CONFIG: Record<
    Category,
    { label: string; emoji: string; colorClass: string; bgClass: string }
> = {
    rising: {
        label: '상승',
        emoji: '🔺',
        colorClass: 'text-emerald-400',
        bgClass: 'bg-emerald-500/15',
    },
    falling: {
        label: '하락',
        emoji: '🔻',
        colorClass: 'text-rose-400',
        bgClass: 'bg-rose-500/15',
    },
    new: {
        label: '신규',
        emoji: '✨',
        colorClass: 'text-blue-400',
        bgClass: 'bg-blue-500/15',
    },
}

const formatPct = (pct: number | null): string => {
    if (pct === null) return '신규'
    const sign = pct >= 0 ? '+' : ''
    return `${sign}${pct.toFixed(1)}%`
}

const formatDelta = (delta: number): string => {
    const sign = delta >= 0 ? '+' : ''
    return `${sign}${delta}`
}

interface CategoryColumnProps {
    category: Category
    items: KeywordChangeItem[]
}

const CategoryColumn = ({ category, items }: CategoryColumnProps) => {
    const { label, emoji, colorClass, bgClass } = CATEGORY_CONFIG[category]

    return (
        <div className="flex flex-1 flex-col">
            <div className="mb-[12px] flex items-center gap-[8px]">
                <span className="text-[16px] leading-none">{emoji}</span>
                <span className="text-[14px] font-semibold text-slate-300">
                    {label}
                </span>
                <span
                    className={`ml-auto rounded-full px-[8px] py-[2px] text-[12px] font-medium ${bgClass} ${colorClass}`}
                >
                    {items.length}
                </span>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-[10px] border border-dashed border-slate-600/50 py-[24px]">
                    <p className="text-[13px] text-slate-600">데이터 없음</p>
                </div>
            ) : (
                <ul className="flex flex-col gap-[6px]">
                    {items.map((item, idx) => (
                        <li key={item.keyword}>
                            <div className="flex items-center gap-[10px] rounded-[10px] bg-slate-700/40 px-[12px] py-[10px]">
                                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-slate-600/60 text-[12px] font-bold text-slate-400">
                                    {idx + 1}
                                </span>
                                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-200">
                                    {item.keyword}
                                </span>
                                <div className="flex shrink-0 flex-col items-end gap-[2px]">
                                    <span
                                        className={`text-[12px] font-semibold ${colorClass}`}
                                    >
                                        {formatPct(item.pct)}
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                        {formatDelta(item.delta)}개
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const KeywordChange = () => {
    const { keywordChangeData, loading } = useAppSelector(
        (state: RootState) => ({
            keywordChangeData: state.dashboardReducer.keywordChange
                ?.data as KeywordChangeResponse | null,
            loading: state.dashboardReducer.keywordChange?.loading ?? false,
        }),
    )

    return (
        <section className="rounded-[14px] border border-slate-700/50 bg-slate-800 p-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <div className="mb-[20px]">
                <h2 className="flex items-center gap-[10px] text-[18px] font-bold text-white">
                    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-gradient-to-br from-blue-500 to-indigo-600 text-[16px]">
                        📈
                    </span>
                    키워드 증감
                </h2>
                {keywordChangeData && (
                    <p className="mt-[4px] pl-[42px] text-[12px] text-slate-500">
                        현재:{' '}
                        {keywordChangeData.window.current.start} ~{' '}
                        {keywordChangeData.window.current.end}
                        &nbsp;/&nbsp;이전:{' '}
                        {keywordChangeData.window.previous.start} ~{' '}
                        {keywordChangeData.window.previous.end}
                    </p>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-[48px]">
                    <p className="text-[14px] text-slate-500">불러오는 중...</p>
                </div>
            ) : !keywordChangeData ? (
                <div className="flex items-center justify-center rounded-[10px] border border-dashed border-slate-600/50 py-[48px]">
                    <p className="text-[14px] text-slate-500">
                        데이터가 없습니다.
                    </p>
                </div>
            ) : (
                <div className="flex gap-[16px]">
                    <CategoryColumn
                        category="rising"
                        items={keywordChangeData.rising}
                    />
                    <div className="w-px shrink-0 bg-slate-700/50" />
                    <CategoryColumn
                        category="falling"
                        items={keywordChangeData.falling}
                    />
                    <div className="w-px shrink-0 bg-slate-700/50" />
                    <CategoryColumn
                        category="new"
                        items={keywordChangeData.new}
                    />
                </div>
            )}
        </section>
    )
}

export default KeywordChange
