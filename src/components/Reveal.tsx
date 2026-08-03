import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/cn'

interface RevealProps extends React.ComponentProps<'div'> {
  delay?: number
}

function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const supportsObserver =
    typeof window !== 'undefined' && 'IntersectionObserver' in window
  const [visible, setVisible] = useState(!supportsObserver)

  useEffect(() => {
    const node = ref.current
    if (!node || !supportsObserver) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [supportsObserver])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  )
}

export default Reveal
