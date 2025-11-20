import React from 'react'
import { useNavigate } from 'react-router'

const Elements = () => {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10">
            <button
                onClick={() => navigate('/applicationui/elements/avatars')}
                className="rounded bg-blue-500 px-4 py-2 text-white"
            >
                Avatars Examples
            </button>
            <button
                onClick={() => navigate('/applicationui/elements/badges')}
                className="rounded bg-blue-500 px-4 py-2 text-white"
            >
                Badges Examples
            </button>
        </div>
    )
}

export default Elements
