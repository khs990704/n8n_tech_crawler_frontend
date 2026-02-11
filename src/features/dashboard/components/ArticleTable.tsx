import { ArticleItem } from 'src/features/dashboard/types'

interface ArticleTableProps {
    keyword: string
    articles: ArticleItem[]
}

const ArticleTable = ({ keyword, articles }: ArticleTableProps) => {
    return (
        <section className="rounded-[8px] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <h2 className="mb-[20px] text-[18px] font-bold text-[#1a1a1a]">
                📰 관련 기사
            </h2>
            <p className="mb-[15px] text-[14px] text-[#666]">
                선택된 키워드:{' '}
                <strong className="font-bold">{keyword || '-'}</strong>
            </p>

            {articles.length === 0 ? (
                <div className="rounded-[6px] border border-dashed border-[#e5e5e5] px-[16px] py-[40px] text-center text-[15px] text-[#999]">
                    No articles found for this keyword.
                </div>
            ) : (
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
                            {articles.map((article) => (
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
            )}
        </section>
    )
}

export default ArticleTable
