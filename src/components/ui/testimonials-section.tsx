import { motion } from 'framer-motion'

export interface Testimonial {
  name: string
  initials: string
  role: string
  quote: string
  link?: { label: string; url: string }
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * index + 0.1, duration: 0.8 }}
          className="testimonial-card relative grid grid-cols-[auto_1fr] gap-x-4 overflow-hidden border border-(--gray-200) bg-(--white) p-6"
        >
          <div className="client-avatar relative">{testimonial.initials}</div>

          <div className="relative">
            <p className="text-sm font-bold md:text-base">{testimonial.name}</p>
            <span className="mt-0.5 block font-mono text-[0.65rem] uppercase tracking-widest text-(--gray-400)">
              {testimonial.role}
            </span>
            <blockquote className="mt-3 border-l-2 border-(--gray-200) pl-4 text-sm italic leading-relaxed text-(--gray-600)">
              "{testimonial.quote}"
            </blockquote>
            {testimonial.link && (
              <a
                href={testimonial.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-semibold text-(--black) hover:underline"
              >
                {testimonial.link.label}
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
