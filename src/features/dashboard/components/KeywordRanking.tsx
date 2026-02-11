import { KeywordStat } from 'src/features/dashboard/types'

interface KeywordRankingProps {
    keywords: KeywordStat[]
    selectedKeyword: string
    onSelect: (keyword: string) => void
}

const KeywordRanking = ({
    keywords,
    selectedKeyword,
    onSelect,
}: KeywordRankingProps) => {
    return (
        <div className="flex h-full flex-col rounded-[8px] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <h2 className="mb-[20px] text-[18px] font-bold text-[#1a1a1a]">
                🔝 상위 키워드
            </h2>
            <ul className="flex flex-1 flex-col gap-[8px]">
                {keywords.map((item, idx) => (
                    <li key={item.name} className="flex-1">
                        <button
                            type="button"
                            onClick={() => onSelect(item.name)}
                            className={`flex h-full w-full items-center rounded-[6px] border-l-4 p-[12px] text-left transition ${
                                selectedKeyword === item.name
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-transparent bg-zinc-50 hover:bg-zinc-100'
                            }`}
                        >
                            <span className="mr-[12px] flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-[15px] font-bold text-white">
                                {idx + 1}
                            </span>
                            <span className="min-w-0 flex-1">
                                <strong className="block truncate text-[15px] font-semibold text-[#1a1a1a]">
                                    {item.name}
                                </strong>
                                <span className="text-[13px] text-[#999]">
                                    {item.count}개 기사
                                </span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default KeywordRanking
