import { useEffect, useRef } from 'react'

export default function AmbientSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      // Actualizamos variables CSS sin forzar re-renders de React
      containerRef.current.style.setProperty('--x', `${clientX}px`)
      containerRef.current.style.setProperty('--y', `${clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
      style={{
        background: `radial-gradient(
          600px circle at var(--x, 50%) var(--y, 50%),
          rgba(194, 67, 102, 0.10),
          rgba(128, 0, 33, 0.045) 40%,
          transparent 80%
        )`,
      }}
      aria-hidden="true"
    />
  )
}