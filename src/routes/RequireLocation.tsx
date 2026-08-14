"use client"

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function RequireLocation({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // only run client-side
        try {
            const selected = localStorage.getItem('selectedLocation')
            const onSelectPage = location.pathname === '/location'
            if (!selected && !onSelectPage) {
                navigate('/location', { replace: true })
            }
        } catch {
            // fallback: do nothing
        }
    }, [location.pathname, navigate])

    return <>{children}</>
}
