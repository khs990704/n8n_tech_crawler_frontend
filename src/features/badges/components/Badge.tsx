import React from 'react'

const badgeColorMap = {
    border: {
        gray: 'bg-gray-50 dark:bg-gray-400/10',
        red: 'bg-red-50 dark:bg-red-400/10',
        yellow: 'bg-yellow-50 dark:bg-yellow-400/10',
        green: 'bg-green-50 dark:bg-green-400/10',
        blue: 'bg-blue-50 dark:bg-blue-400/10',
        indigo: 'bg-indigo-50 dark:bg-indigo-400/10',
        purple: 'bg-purple-50 dark:bg-purple-400/10',
        pink: 'bg-pink-50 dark:bg-pink-400/10',
    },
    flat: {
        gray: 'bg-gray-100 dark:bg-gray-400/10',
        red: 'bg-red-100 dark:bg-red-400/10',
        yellow: 'bg-yellow-100 dark:bg-yellow-400/10',
        green: 'bg-green-100 dark:bg-green-400/10',
        blue: 'bg-blue-100 dark:bg-blue-400/10',
        indigo: 'bg-indigo-100 dark:bg-indigo-400/10',
        purple: 'bg-purple-100 dark:bg-purple-400/10',
        pink: 'bg-pink-100 dark:bg-pink-400/10',
    },
} as const
const borderColorMap = {
    gray: 'inset-ring inset-ring-gray-500/10 dark:inset-ring-gray-400/20',
    red: 'inset-ring inset-ring-red-600/10 dark:inset-ring-red-400/20',
    yellow: 'inset-ring inset-ring-yellow-600/20 dark:inset-ring-yellow-400/20',
    green: 'inset-ring inset-ring-green-600/20 dark:inset-ring-green-500/20',
    blue: 'inset-ring inset-ring-blue-700/10 dark:inset-ring-blue-400/30',
    indigo: 'inset-ring inset-ring-indigo-700/10 dark:inset-ring-indigo-400/30',
    purple: 'inset-ring inset-ring-purple-700/10 dark:inset-ring-purple-400/30',
    pink: 'inset-ring inset-ring-pink-700/10 dark:inset-ring-pink-400/20',
} as const
type BadgeType = keyof typeof badgeColorMap
type BadgeColor = keyof (typeof badgeColorMap)['border']

const textColorMap = {
    gray: 'text-gray-600 dark:text-gray-400',
    red: 'text-red-700 dark:text-red-400',
    yellow: 'text-yellow-800 dark:text-yellow-500',
    green: 'text-green-700 dark:text-green-400',
    blue: 'text-blue-700 dark:text-blue-400',
    indigo: 'text-indigo-700 dark:text-indigo-400',
    purple: 'text-purple-700 dark:text-purple-400',
    pink: 'text-pink-700 dark:text-pink-400',
} as const
type TextColor = keyof typeof textColorMap

const addedColorMap = {
    dot: {
        gray: 'fill-gray-400',
        red: 'fill-red-500 dark:fill-red-400',
        yellow: 'fill-yellow-500 dark:fill-yellow-400',
        green: 'fill-green-500 dark:fill-grean-400',
        blue: 'fill-blue-500 dark:fill-blue-400',
        indigo: 'fill-indigo-500 dark:fill-indigo-400',
        purple: 'fill-purple-500 dark:fill-purple-400',
        pink: 'fill-pink-500 dark:fill-pink-400',
    },
    button: {
        button: {
            gray: 'hover:bg-gray-500/20 dark:hover:bg-gray-500/30',
            red: 'hover:bg-red-600/20 dark:hover:bg-red-500/30',
            yellow: 'hover:bg-yollow-600/20 dark:hover:bg-yellow-500/30',
            green: 'hover:bg-green-600/20 dark:hover:bg-green-500/30',
            blue: 'hover:bg-blue-600/20 dark:hover:bg-blue-500/30',
            indigo: 'hover:bg-indigo-600/20 dark:hover:bg-indigo-500/30',
            purple: 'hover:bg-purple-600/20 dark:hover:bg-purple-500/30',
            pink: 'hover:bg-pink-600/20 dark:hover:bg-pink-500/30',
        },
        svg: {
            gray: 'stroke-gray-600/50 group-hover:stroke-gray-600/75 dark:stroke-gray-400 dark:group-hover:stroke-gray-300',
            red: 'stroke-red-600/50 group-hover:stroke-red-600/75 dark:stroke-red-400 dark:group-hover:stroke-red-300',
            yellow: 'stroke-yellow-700/50 group-hover:stroke-yellow-700//75 dark:stroke-yellow-300 dark:group-hover:stroke-yellow-200',
            green: 'stroke-green-700/50 group-hover:stroke-green-700/75 dark:stroke-green-400 dark:group-hover:stroke-green-300',
            blue: 'stroke-blue-700/50 group-hover:stroke-blue-700/75 dark:stroke-blue-400 dark:group-hover:stroke-blue-300',
            indigo: 'stroke-indigo-600/50 group-hover:stroke-indigo-600/75 dark:stroke-indigo-400 dark:group-hover:stroke-indigo-300',
            purple: 'stroke-violet-600/50 group-hover:stroke-violet-600/75 dark:stroke-violet-400 dark:group-hover:stroke-violet-300',
            pink: 'stroke-pink-700/50 group-hover:stroke-pink-700/75 dark:stroke-pink-400 dark:group-hover:stroke-pink-300',
        },
    },
} as const
type AddedColorDot = keyof (typeof addedColorMap)['dot']
type AddedColorButton = keyof (typeof addedColorMap)['button']['button']
type AddedColorSvg = keyof (typeof addedColorMap)['button']['svg']

const Badge = ({
    shape = '',
    type = 'border',
    small = false,
    badgeColor = 'gray',
    add = '',
    text = '',
    textSize = '',
    textColor = 'gray',
    dotSize = 1.5,
    buttonSize = 3.5,
    addedColor = 'gray',
}: {
    shape?: string
    type?: BadgeType
    small?: boolean
    badgeColor?: BadgeColor
    add?: string
    text?: string
    textColor?: TextColor
    textSize?: string
    dotSize?: number
    buttonSize?: number
    addedColor?: string
}) => {
    const shapeClass = shape === 'pill' ? 'rounded-full' : 'rounded-md'
    const badgeColorClass =
        add === 'dot' && type === 'border'
            ? ''
            : badgeColorMap[type][badgeColor]
    const borderColorClass = type !== 'flat' ? borderColorMap[badgeColor] : ''
    const textColorClass =
        add === 'dot' && type === 'border'
            ? 'text-gray-900 dark:text-white'
            : textColorMap[textColor]
    const textSizeClass = textSize === '' ? '' : `text-${textSize}`
    const gapClass =
        add === 'dot' ? 'gap-x-1.5' : add === 'button' ? 'gap-x-0.5' : ''
    const dotSizeClass = add === 'dot' ? `size-${dotSize}` : ''
    const addedColorClass =
        add === 'dot' ? addedColorMap['dot'][addedColor as AddedColorDot] : ''
    const paddingClass = small ? 'px-1.5 py-0.5' : 'px-2 py-1'
    const buttonColorClass =
        add === 'button'
            ? addedColorMap['button']['button'][addedColor as AddedColorButton]
            : ''
    const svgColorClass =
        add === 'button'
            ? addedColorMap['button']['svg'][addedColor as AddedColorSvg]
            : ''
    const buttonSizeClass = add === 'button' ? `size-${buttonSize}` : ''

    return (
        <>
            <span
                className={`inline-flex items-center ${gapClass} ${shapeClass} ${badgeColorClass} ${borderColorClass} ${textColorClass} ${textSizeClass} ${paddingClass} font-medium`}
            >
                {add === 'dot' && (
                    <svg
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                        className={`${dotSizeClass} ${addedColorClass}`}
                    >
                        <circle r="3" cx="3" cy="3" />
                    </svg>
                )}
                {text}
                {add === 'button' && (
                    <button
                        type="button"
                        className={`group relative -mr-1 ${buttonSizeClass} rounded-xs ${buttonColorClass}`}
                    >
                        <span className="sr-only">Remove</span>
                        <svg
                            viewBox="0 0 14 14"
                            className={`${buttonSizeClass} ${svgColorClass}`}
                        >
                            <path d="M4 4l6 6m0-6l-6 6" />
                        </svg>
                        <span className="absolute -inset-1"></span>
                    </button>
                )}
            </span>
        </>
    )
}

export default Badge
