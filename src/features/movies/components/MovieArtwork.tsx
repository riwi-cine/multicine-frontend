import { memo, useId, useState } from 'react'

import { cn } from '@/utils/cn'
import type { MoviePalette } from '@/features/movies/types/movies.types'

interface MovieArtworkProps {
  palette: MoviePalette
  image?: string
  variant?: 'poster' | 'backdrop'
  className?: string
}

function MovieArtwork({
  palette,
  image,
  variant = 'poster',
  className,
}: MovieArtworkProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const gradientId = `mc-grad-${rawId}`
  const glowId = `mc-glow-${rawId}`
  const ringId = `mc-ring-${rawId}`
  const vignetteId = `mc-vignette-${rawId}`
  const grainId = `mc-grain-${rawId}`

  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(image) && !imageFailed
  const { from, to, glow } = palette
  const isBackdrop = variant === 'backdrop'

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-black',
        className,
      )}
    >
      {showImage ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : null}

      <svg
        viewBox={isBackdrop ? '0 0 960 540' : '0 0 320 480'}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        role="img"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="58%" stopColor={to} />
            <stop offset="100%" stopColor="#050a16" />
          </linearGradient>

          <radialGradient id={glowId} cx="0.78" cy="0.18" r="0.95">
            <stop offset="0%" stopColor={glow} stopOpacity="0.85" />
            <stop offset="55%" stopColor={glow} stopOpacity="0.25" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>

          <radialGradient id={ringId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={glow} stopOpacity="0.5" />
            <stop offset="70%" stopColor={glow} stopOpacity="0.08" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>

          <radialGradient id={vignetteId} cx="0.5" cy="0.4" r="0.75">
            <stop offset="55%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
          </radialGradient>

          <filter id={grainId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.07" />
            </feComponentTransfer>
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </defs>

        {!showImage && (
          <>
            <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
            <rect width="100%" height="100%" fill={`url(#${glowId})`} />

            {isBackdrop ? (
              <g>
                <circle cx="760" cy="150" r="230" fill={`url(#${ringId})`} />
                <circle
                  cx="600"
                  cy="300"
                  r="340"
                  fill="none"
                  stroke={glow}
                  strokeOpacity="0.16"
                  strokeWidth="2"
                />
                <circle
                  cx="880"
                  cy="420"
                  r="120"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.14"
                  strokeWidth="1.5"
                />
                <circle
                  cx="900"
                  cy="180"
                  r="10"
                  fill="#ffffff"
                  fillOpacity="0.3"
                />
                <circle
                  cx="820"
                  cy="260"
                  r="6"
                  fill="#ffffff"
                  fillOpacity="0.22"
                />
                <circle
                  cx="60"
                  cy="120"
                  r="14"
                  fill="#ffffff"
                  fillOpacity="0.12"
                />
                <path
                  d="M0 400 Q140 360 280 400 T560 395 T840 405 T960 390 L960 540 L0 540 Z"
                  fill={glow}
                  fillOpacity="0.18"
                />
                <path
                  d="M0 455 Q160 420 320 460 T640 450 T960 460 L960 540 L0 540 Z"
                  fill="#ffffff"
                  fillOpacity="0.08"
                />
                <path
                  d="M0 500 Q200 470 400 505 T800 495 T960 505 L960 540 L0 540 Z"
                  fill="#050a16"
                  fillOpacity="0.55"
                />
              </g>
            ) : (
              <g>
                <circle cx="255" cy="120" r="95" fill={`url(#${ringId})`} />
                <circle
                  cx="255"
                  cy="120"
                  r="130"
                  fill="none"
                  stroke={glow}
                  strokeOpacity="0.22"
                  strokeWidth="1.5"
                />
                <circle cx="80" cy="300" r="150" fill={to} fillOpacity="0.2" />
                <circle
                  cx="120"
                  cy="250"
                  r="64"
                  fill="none"
                  stroke={glow}
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                />
                <circle
                  cx="255"
                  cy="330"
                  r="46"
                  fill={glow}
                  fillOpacity="0.14"
                />
                <circle
                  cx="255"
                  cy="330"
                  r="72"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.12"
                  strokeWidth="1.5"
                />
                <circle
                  cx="60"
                  cy="120"
                  r="10"
                  fill="#ffffff"
                  fillOpacity="0.3"
                />
                <circle
                  cx="285"
                  cy="70"
                  r="5"
                  fill="#ffffff"
                  fillOpacity="0.25"
                />
                <circle
                  cx="175"
                  cy="95"
                  r="4"
                  fill="#ffffff"
                  fillOpacity="0.18"
                />
                <path
                  d="M0 410 Q80 370 160 400 T320 388 L320 480 L0 480 Z"
                  fill={glow}
                  fillOpacity="0.16"
                />
                <path
                  d="M0 442 Q90 408 180 436 T320 428 L320 480 L0 480 Z"
                  fill="#ffffff"
                  fillOpacity="0.08"
                />
                <path
                  d="M0 468 Q110 444 220 466 T320 460 L320 480 L0 480 Z"
                  fill="#050a16"
                  fillOpacity="0.5"
                />
              </g>
            )}
          </>
        )}

        <rect width="100%" height="100%" fill={`url(#${vignetteId})`} />
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </div>
  )
}

export default memo(MovieArtwork)