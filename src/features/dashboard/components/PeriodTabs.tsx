import { PeriodKey } from 'src/features/dashboard/types'

interface PeriodTabsProps {
    value: PeriodKey
    onChange: (period: PeriodKey) => void
}

const PERIOD_OPTIONS: Array<{ key: PeriodKey; label: string }> = [
    { key: '3d', label: '3 일' },
    { key: '1w', label: '1 주' },
    { key: '1m', label: '1 달' },
]

const PeriodTabs = ({ value, onChange }: PeriodTabsProps) => {
    return (
        <div className="mb-[15px] flex gap-[10px]">
            {PERIOD_OPTIONS.map((item) => (
                <button
                    key={item.key}
                    type="button"
                    onClick={() => onChange(item.key)}
                    className={`rounded-[6px] border-2 px-[18px] py-[9px] text-[15px] leading-none font-bold transition ${
                        value === item.key
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-blue-600 hover:text-blue-600'
                    }`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default PeriodTabs
