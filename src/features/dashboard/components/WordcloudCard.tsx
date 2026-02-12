import { useEffect, useMemo, useState } from 'react'
import { WordcloudCardProps } from 'src/features/dashboard/dashboardType'

const WordcloudCard = ({ imageUrl }: WordcloudCardProps) => {
    const [isLoadFailed, setIsLoadFailed] = useState(false)
    const FASTAPI_MEDIA_HOST =
        import.meta.env.VITE_FASTAPI_MEDIA_HOST ?? 'http://127.0.0.1:8100'

    const resolvedImageUrl = useMemo(() => {
        if (!imageUrl) return ''
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl
        }
        if (imageUrl.startsWith('/')) {
            return `${FASTAPI_MEDIA_HOST}${imageUrl}`
        }
        return `${FASTAPI_MEDIA_HOST}/${imageUrl}`
    }, [FASTAPI_MEDIA_HOST, imageUrl])

    useEffect(() => {
        setIsLoadFailed(false)
    }, [resolvedImageUrl])

    return (
        <div className="rounded-[8px] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            {isLoadFailed ? (
                <div className="flex aspect-[1000/700] w-full items-center justify-center rounded-[6px] border border-dashed border-zinc-300 bg-zinc-50 text-[14px] text-zinc-500">
                    Failed to load image: {resolvedImageUrl}
                </div>
            ) : (
                <img
                    src={resolvedImageUrl}
                    alt="Keyword dashboard"
                    onError={() => setIsLoadFailed(true)}
                    className="block aspect-[1000/700] w-full rounded-[6px] object-contain"
                />
            )}
        </div>
    )
}

export default WordcloudCard
