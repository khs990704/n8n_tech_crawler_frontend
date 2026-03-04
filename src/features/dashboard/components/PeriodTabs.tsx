import { useAppDispatch } from 'src/app/store/redux/reduxHooks'
import { PeriodTabsProps } from 'src/features/dashboard/dashboardType'
import { dashboardAction } from '../dashboardReducer'

const PeriodTabs = ({ selectedPeriod, onSelectPeriod }: PeriodTabsProps) => {
    const dispatch = useAppDispatch()

    const handleClick = (period: '3day' | '7day' | '1month') => {
        onSelectPeriod(period)
        dispatch(dashboardAction.getKeywordInfo({ period }))
    }

    const PERIOD_OPTIONS: { value: '3day' | '7day' | '1month'; label: string }[] = [
        { value: '3day', label: '3일' },
        { value: '7day', label: '1주' },
        { value: '1month', label: '1달' },
    ]

    return (
        <div className="mb-[14px] flex gap-[4px] rounded-[12px] bg-slate-700/50 p-[4px]">
            {PERIOD_OPTIONS.map(({ value, label }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => handleClick(value)}
                    className={`flex-1 rounded-[9px] px-[16px] py-[9px] text-[14px] font-semibold leading-none transition-all duration-200 ${
                        selectedPeriod === value
                            ? 'bg-slate-900 text-blue-400 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}

export default PeriodTabs
