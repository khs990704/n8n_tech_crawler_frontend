import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from 'src/app/store/redux/reduxHooks'
import { RootState } from 'src/app/store/redux/reduxStore'
import {
    ArticleTableProps,
    KeywordInfoArticle,
    KeywordInfoResponse,
} from 'src/features/dashboard/dashboardType'

const ArticleTable = ({ keyword, articles }: ArticleTableProps) => {
    const PER_PAGE = 10
    const { keywordInfoData } = useAppSelector((state: RootState) => ({
        keywordInfoData: state.dashboardReducer.keywordInfo?.data as
            | KeywordInfoResponse
            | Record<string, unknown>
            | null,
    }))
    const [currentPage, setCurrentPage] = useState(1)

    const mappedArticles = useMemo(() => {
        const normalizedData: KeywordInfoArticle[] = Array.isArray(
            keywordInfoData,
        )
            ? keywordInfoData
            : []

        if (normalizedData.length === 0) {
            return articles
        }

        return normalizedData
            .filter((item) => item.keyword === keyword)
            .map((item, index) => ({
                number: index + 1,
                title: item.title,
                link: item.link,
            }))
    }, [articles, keyword, keywordInfoData])

    const totalPages = Math.ceil(mappedArticles.length / PER_PAGE)

    useEffect(() => {
        setCurrentPage(1)
    }, [keyword])

    useEffect(() => {
        if (totalPages === 0) return
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    const pagedArticles = useMemo(() => {
        const start = (currentPage - 1) * PER_PAGE
        const end = start + PER_PAGE
        return mappedArticles.slice(start, end)
    }, [currentPage, mappedArticles])

    const pageNumbers = useMemo(() => {
        const maxVisible = 5
        const pages: (number | string)[] = []

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
            return pages
        }

        const left = Math.max(2, currentPage - 1)
        const right = Math.min(totalPages - 1, currentPage + 1)

        pages.push(1)
        if (left > 2) pages.push('...')
        for (let i = left; i <= right; i++) pages.push(i)
        if (right < totalPages - 1) pages.push('...')
        pages.push(totalPages)
        return pages
    }, [currentPage, totalPages])

    return (
        <section className="rounded-[14px] border border-slate-700/50 bg-slate-800 p-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <div className="mb-[16px]">
                <h2 className="mb-[4px] flex items-center gap-[10px] text-[18px] font-bold text-white">
                    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-gradient-to-br from-blue-500 to-indigo-600 text-[16px]">
                        📰
                    </span>
                    관련 기사
                </h2>
                <p className="pl-[42px] text-[12px] text-slate-500">
                    집계 키워드 수와 매핑 기사 수는 전처리(정규식) 방식에 따라
                    달라질 수 있습니다.
                </p>
            </div>

            <div className="mb-[16px] inline-flex items-center gap-[8px] rounded-full bg-blue-500/15 px-[14px] py-[6px]">
                <span className="text-[13px] text-slate-400">선택된 키워드</span>
                <strong className="text-[13px] font-semibold text-blue-400">
                    {keyword || '-'}
                </strong>
            </div>

            {mappedArticles.length === 0 ? (
                <div className="rounded-[10px] border border-dashed border-slate-600/50 px-[16px] py-[48px] text-center">
                    <div className="mb-[8px] text-[32px] leading-none">🔍</div>
                    <p className="text-[14px] text-slate-500">
                        해당 키워드의 기사가 없습니다.
                    </p>
                </div>
            ) : (
                <div>
                    <div className="overflow-x-auto rounded-[10px] border border-slate-700/50">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700/50 bg-slate-900/50">
                                    <th className="w-[60px] px-[16px] py-[12px] text-left text-[12px] font-semibold uppercase tracking-[0.8px] text-slate-500">
                                        NO
                                    </th>
                                    <th className="px-[16px] py-[12px] text-left text-[12px] font-semibold uppercase tracking-[0.8px] text-slate-500">
                                        기사 제목
                                    </th>
                                    <th className="w-[80px] px-[16px] py-[12px] text-left text-[12px] font-semibold uppercase tracking-[0.8px] text-slate-500">
                                        원문
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/40">
                                {pagedArticles.map((article) => (
                                    <tr
                                        key={`${article.number}-${article.link}`}
                                        className="transition-colors hover:bg-slate-700/30"
                                    >
                                        <td className="px-[16px] py-[14px] text-[13px] font-medium text-slate-500">
                                            {article.number}
                                        </td>
                                        <td className="px-[16px] py-[14px] text-[14px] font-medium text-slate-200">
                                            {article.title}
                                        </td>
                                        <td className="px-[16px] py-[14px]">
                                            <a
                                                href={article.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-[4px] rounded-[6px] bg-blue-500/15 px-[10px] py-[4px] text-[12px] font-medium text-blue-400 transition-colors hover:bg-blue-500/25 hover:text-blue-300"
                                            >
                                                열기 ↗
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-[20px] flex items-center justify-center gap-[6px]">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="rounded-[8px] border border-slate-600/50 bg-slate-700/50 px-[14px] py-[7px] text-[13px] font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                ← 이전
                            </button>

                            {pageNumbers.map((page, idx) =>
                                page === '...' ? (
                                    <span
                                        key={`ellipsis-${idx}`}
                                        className="px-[8px] py-[7px] text-[13px] text-slate-600"
                                    >
                                        ···
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage(page as number)
                                        }
                                        className={`min-w-[36px] rounded-[8px] border px-[10px] py-[7px] text-[13px] font-medium transition ${
                                            page === currentPage
                                                ? 'border-blue-500 bg-blue-600 text-white'
                                                : 'border-slate-600/50 bg-slate-700/50 text-slate-300 hover:border-blue-500/50 hover:text-blue-400'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ),
                            )}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="rounded-[8px] border border-slate-600/50 bg-slate-700/50 px-[14px] py-[7px] text-[13px] font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                다음 →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default ArticleTable
