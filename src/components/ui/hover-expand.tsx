import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface HoverExpandImage {
  src: string
  alt: string
  caption?: string
}

export const HoverExpandGallery = ({
  images,
  className,
}: {
  images: HoverExpandImage[]
  className?: string
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const collapsed = isMobile ? '3rem' : '5rem'
  const expanded = isMobile ? '14rem' : '24rem'
  const restHeight = isMobile ? '14rem' : '24rem'

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cn('relative mx-auto w-full max-w-6xl px-5', className)}
    >
      <div className="flex w-full items-center justify-center gap-1">
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            className="hover-gallery-item relative overflow-hidden rounded-3xl"
            initial={{ width: collapsed, height: restHeight }}
            animate={{
              width: activeImage === index ? expanded : collapsed,
              height: restHeight,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeImage === index && image.caption && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute flex h-full w-full flex-col items-end justify-end p-4"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-white/80">{image.caption}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <img src={image.src} className="size-full object-cover" alt={image.alt} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
