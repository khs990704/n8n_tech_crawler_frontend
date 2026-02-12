import { useAppDispatch } from 'src/app/store/redux/reduxHooks'
import { PeriodTabsProps } from 'src/features/dashboard/dashboardType'
import { dashboardAction } from '../dashboardReducer'

const PeriodTabs = ({ selectedPeriod, onSelectPeriod }: PeriodTabsProps) => {
    const dispatch = useAppDispatch()

    const handleClick = (period: '3day' | '7day' | '1month') => {
        onSelectPeriod(period)
        dispatch(dashboardAction.getKeywordInfo({ period }))
    }

    return (
        <div className="mb-[15px] flex gap-[10px]">
            <button
                type="button"
                onClick={() => handleClick('3day')}
                className={`rounded-[6px] border-2 px-[18px] py-[9px] text-[15px] leading-none font-bold transition ${
                    selectedPeriod === '3day'
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-blue-600 hover:text-blue-600'
                }`}
            >
                3 일
            </button>
            <button
                type="button"
                onClick={() => handleClick('7day')}
                className={`rounded-[6px] border-2 px-[18px] py-[9px] text-[15px] leading-none font-bold transition ${
                    selectedPeriod === '7day'
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-blue-600 hover:text-blue-600'
                }`}
            >
                1 주
            </button>
            <button
                type="button"
                onClick={() => handleClick('1month')}
                className={`rounded-[6px] border-2 px-[18px] py-[9px] text-[15px] leading-none font-bold transition ${
                    selectedPeriod === '1month'
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-blue-600 hover:text-blue-600'
                }`}
            >
                1 달
            </button>
        </div>
    )
}

export default PeriodTabs
