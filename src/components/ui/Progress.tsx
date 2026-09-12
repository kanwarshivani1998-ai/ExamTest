export function Progress({ value, className = '' }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={`h-2 w-full rounded-full bg-gray-100 ${className}`}>
      <div className="h-2 rounded-full bg-brand-600 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
