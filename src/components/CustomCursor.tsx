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

// Walks up to 5 ancestors looking for the first opaque background.
function isOverLightBackground(element: Element) {
  let currentElement: Element | null = element
  for (let i = 0; i < 5 && currentElement; i++) {
    const color = window.getComputedStyle(currentElement).backgroundColor
    if (color && color !== 'rgba(0, 0, 0, 0)') return isLightColor(color)
    currentElement = currentElement.parentElement
  }
  return true
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    // Touch devices have no hover cursor — skip all the work.
    if (!window.matchMedia('(pointer: fine)').matches) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let rafId = 0
    let lastTarget: Element | null = null

    const place = (el: HTMLElement, x: number, y: number) => {
      // transform is composited on the GPU; left/top would trigger layout every frame
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const tick = () => {
      place(cursor, mx, my)
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      place(ring, rx, ry)

      // Keep animating only while the ring is still catching up
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = 0
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target || target === lastTarget) return
      lastTarget = target

      // Background color only needs rechecking when the hovered element changes
      const light = !isOverLightBackground(target)
      cursor.classList.toggle('light', light)
      ring.classList.toggle('light', light)

      const expand = !!target.closest?.(HOVER_SELECTOR)
      cursor.classList.toggle('expand', expand)
      ring.classList.toggle('expand', expand)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" id="cursorRing" ref={ringRef}></div>
    </>
  )
}
