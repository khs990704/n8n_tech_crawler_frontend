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
        keywordInfoData: state.dashboardReducer.keywordInfo
            ?.data as KeywordInfoResponse | Record<string, unknown> | null,
    }))
    const [currentPage, setCurrentPage] = useState(1)

    const mappedArticles = useMemo(() => {
        const normalizedData: KeywordInfoArticle[] = Array.isArray(keywordInfoData)
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
        <section className="rounded-[8px] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <h2 className="mb-[8px] text-[18px] font-bold text-[#1a1a1a]">
                📰 관련 기사
            </h2>
            <p className="mb-[8px] text-[12px] text-[#888]">
                집계 키워드 수와 매핑 기사 수는 전처리(정규식) 방식에 따라
                달라질 수 있습니다.
            </p>
            <p className="mb-[15px] text-[14px] text-[#666]">
                선택된 키워드:{' '}
                <strong className="font-bold">{keyword || '-'}</strong>
            </p>

            {mappedArticles.length === 0 ? (
                <div className="rounded-[6px] border border-dashed border-[#e5e5e5] px-[16px] py-[40px] text-center text-[15px] text-[#999]">
                    No articles found for this keyword.
                </div>
            ) : (
                <div>
                    <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-zinc-50">
                            <tr className="border-b-2 border-zinc-200">
                                <th className="px-[12px] py-[12px] text-left text-[14px] font-bold tracking-[0.5px] text-[#666]">
                                    NO
                                </th>
                                <th className="px-[12px] py-[12px] text-left text-[14px] font-bold tracking-[0.5px] text-[#666]">
                                    기사 제목
                                </th>
                                <th className="px-[12px] py-[12px] text-left text-[14px] font-bold tracking-[0.5px] text-[#666]">
                                    원문
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedArticles.map((article) => (
                                <tr
                                    key={`${article.number}-${article.link}`}
                                    className="border-b border-zinc-200 hover:bg-zinc-50"
                                >
                                    <td className="px-[12px] py-[12px] text-[15px] text-[#999]">
                                        {article.number}
                                    </td>
                                    <td className="px-[12px] py-[12px] text-[15px] font-medium text-[#1a1a1a]">
                                        {article.title}
                                    </td>
                                    <td className="px-[12px] py-[12px] text-[15px]">
                                        <a
                                            href={article.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            Open
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-[16px] flex items-center justify-center gap-[8px]">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="cursor-pointer rounded-[6px] border border-zinc-200 bg-white px-[12px] py-[6px] text-[13px] text-zinc-600 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                            >
                                이전
                            </button>

                            {pageNumbers.map((page, idx) =>
                                page === '...' ? (
                                    <span
                                        key={`ellipsis-${idx}`}
                                        className="px-[8px] py-[6px] text-[13px] text-zinc-400"
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setCurrentPage(page as number)}
                                        className={`cursor-pointer rounded-[6px] border px-[12px] py-[6px] text-[13px] transition ${
                                            page === currentPage
                                                ? 'border-blue-600 bg-blue-600 font-bold text-white'
                                                : 'border-zinc-200 bg-white text-zinc-600 hover:border-blue-600 hover:text-blue-600'
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
                                className="cursor-pointer rounded-[6px] border border-zinc-200 bg-white px-[12px] py-[6px] text-[13px] text-zinc-600 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                            >
                                다음
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default ArticleTable
