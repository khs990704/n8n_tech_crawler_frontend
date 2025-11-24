import React from 'react'

const Button = ({
    type = 'primary',
    rounded = 'sm',
    px = 2,
    py = 1,
    p = 1,
    text = '',
    textSize = '',
    icon = '',
}: {
    type?: string
    rounded?: string
    px?: number
    py?: number
    p?: number
    text?: string
    textSize?: string
    icon?: string
}) => {
    const typeClass =
        type === 'secondary'
            ? 'inline-flex items-center bg-white/10 inset-ring inset-ring-white/5 hover:bg-white/20 text-white font-semibold'
            : type === 'soft'
              ? 'inline-flex items-center bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-semibold'
              : type === 'circular'
                ? 'rounded-full bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500'
                : 'inline-flex items-center bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white font-semibold'
    const roundedClass = type === 'circular' ? '' : `rounded-${rounded}`
    const pxClass = type === 'circular' ? '' : `px-${px}`
    const pyClass = type === 'circular' ? '' : `py-${py}`
    const pClass = type === 'circular' ? `p-${p}` : ''
    const gap = Math.floor((px + py) / 3)
    const gapClass = type === 'circular' ? '' : `gap-x-${gap}.5`
    const textSizeClass = textSize === '' ? '' : `text-${textSize}`

    return (
        <>
            <button
                type="button"
                className={`${gapClass} ${pClass} ${roundedClass} ${typeClass} ${pxClass} ${pyClass} ${textSizeClass}`}
            >
                {type === 'circular' && (
                    <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        className="size-5"
                    >
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                )}
                {icon === 'left' && (
                    <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        className="-ml-0.5 size-5"
                    >
                        <path
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                        />
                    </svg>
                )}
                {text}
                {icon === 'right' && (
                    <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        className="-ml-0.5 size-5"
                    >
                        <path
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                        />
                    </svg>
                )}
            </button>
        </>
    )
}

export default Button
