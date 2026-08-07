interface BackgroundGradientSnippetProps {
  color?: string
  baseColor?: string
  className?: string
}

export default function BackgroundGradientSnippet({
  color = '#38bdf8',
  baseColor = '#171717',
  className,
}: BackgroundGradientSnippetProps) {
  return (
    <div
      className={`fixed inset-0 -z-10 ${className ?? ''}`}
      style={{ backgroundColor: baseColor }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle 560px at 50% 200px, ${color}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${color}20 1px, transparent 1px), linear-gradient(to bottom, ${color}20 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />
    </div>
  )
}
