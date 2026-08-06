import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/valores', label: 'Valores' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/fale-conosco', label: 'Fale Conosco' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <nav
        id="navbar"
        className={cn(scrolled && 'scrolled', open && 'nav-open')}
      >
        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          TOTAL SOFTWARE
        </Link>

        <button
          className="nav-toggle-fx"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-99 flex items-center justify-center overflow-y-auto bg-black/95 backdrop-blur-sm"
          >
            <ul className="flex w-full flex-col items-center justify-center gap-1 px-7 py-24">
              {NAV_LINKS.map((item, index) => (
                <li
                  className="relative flex cursor-none flex-col items-center overflow-visible"
                  key={item.to}
                >
                  <Link to={item.to} className="relative flex items-start">
                    <TextRoll
                      center
                      className="text-2xl font-extrabold uppercase leading-[0.85] tracking-[-0.03em] text-white transition-colors sm:text-3xl lg:text-4xl"
                    >
                      {item.label}
                    </TextRoll>
                  </Link>
                  <span className="mt-1 font-mono text-[0.65rem] tracking-[0.2em] text-white/30">
                    [{index}]
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const STAGGER = 0.035

const TextRoll: React.FC<{
  children: string
  className?: string
  center?: boolean
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn('relative block overflow-hidden', className)}
      style={{
        lineHeight: 0.75,
        fontFamily: 'var(--font-display)',
      }}
    >
      <div>
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: '-100%',
                },
              }}
              transition={{
                ease: 'easeInOut',
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === ' ' ? ' ' : l}
            </motion.span>
          )
        })}
      </div>
      <div className="absolute inset-0">
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: {
                  y: '100%',
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: 'easeInOut',
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === ' ' ? ' ' : l}
            </motion.span>
          )
        })}
      </div>
    </motion.span>
  )
}
