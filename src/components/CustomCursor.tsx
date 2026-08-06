import { useEffect, useRef } from 'react'

const HOVER_SELECTOR =
  'a, button, .service-item, .product-row, .testimonial-card, .team-card, .portfolio-card, .contact-card, .hover-gallery-item'

function isLightColor(color: string) {
  const rgb = color.match(/\d+/g)
  if (!rgb || rgb.length < 3) return true

  const r = parseInt(rgb[0])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2])

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'

      const element = document.elementFromPoint(mx, my)
      if (element) {
        let isLight = true
        let currentElement: Element | null = element

        for (let i = 0; i < 5; i++) {
          if (currentElement) {
            const color = window.getComputedStyle(currentElement).backgroundColor
            if (color && color !== 'rgba(0, 0, 0, 0)') {
              isLight = isLightColor(color)
              break
            }
            currentElement = currentElement.parentElement
          }
        }

        if (!isLight) {
          cursor.classList.add('light')
          ring.classList.add('light')
        } else {
          cursor.classList.remove('light')
          ring.classList.remove('light')
        }
      }
    }

    let rafId: number
    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animRing)
    }
    rafId = requestAnimationFrame(animRing)

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) {
        cursor.classList.add('expand')
        ring.classList.add('expand')
      }
    }
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) {
        cursor.classList.remove('expand')
        ring.classList.remove('expand')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" id="cursorRing" ref={ringRef}></div>
    </>
  )
}
