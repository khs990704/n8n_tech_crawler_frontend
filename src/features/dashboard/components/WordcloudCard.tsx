interface WordcloudCardProps {
    imageUrl: string
}

const WordcloudCard = ({ imageUrl }: WordcloudCardProps) => {
    return (
        <div className="rounded-[8px] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <img
                src={imageUrl}
                alt="Keyword dashboard"
                className="block aspect-[1000/700] w-full rounded-[6px] object-contain"
            />
        </div>
    )
}

export default WordcloudCard
