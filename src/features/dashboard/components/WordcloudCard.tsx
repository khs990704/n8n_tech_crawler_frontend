import { useEffect, useMemo, useState } from 'react'
import { WordcloudCardProps } from 'src/features/dashboard/dashboardType'

const WordcloudCard = ({ imageUrl }: WordcloudCardProps) => {
    const [isLoadFailed, setIsLoadFailed] = useState(false)
    const [cacheBuster, setCacheBuster] = useState<number>(Date.now())
    const FASTAPI_MEDIA_HOST =
        import.meta.env.VITE_FASTAPI_MEDIA_HOST ?? 'http://fastapi_server:8100'

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
        setCacheBuster(Date.now())
    }, [resolvedImageUrl])

    const imageSrc = useMemo(() => {
        if (!resolvedImageUrl) return ''
        const separator = resolvedImageUrl.includes('?') ? '&' : '?'
        return `${resolvedImageUrl}${separator}v=${cacheBuster}`
    }, [cacheBuster, resolvedImageUrl])

    return (
        <div className="overflow-hidden rounded-[14px] border border-slate-700/50 bg-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            {isLoadFailed ? (
                <div className="flex aspect-[1000/700] w-full flex-col items-center justify-center gap-[8px] text-center">
                    <span className="text-[40px] leading-none">🖼️</span>
                    <p className="text-[14px] font-medium text-slate-400">
                        이미지를 불러올 수 없습니다
                    </p>
                    <p className="text-[12px] text-slate-600">
                        {resolvedImageUrl}
                    </p>
                </div>
            ) : (
                <img
                    src={imageSrc}
                    alt="Keyword dashboard"
                    onError={() => setIsLoadFailed(true)}
                    className="block aspect-[1000/700] w-full object-contain"
                />
            )}
        </div>
    )
}

export default WordcloudCard
