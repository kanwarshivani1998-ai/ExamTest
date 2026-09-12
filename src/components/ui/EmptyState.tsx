import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref
}: {
  icon: LucideIcon
  title: ReactNode
  description?: ReactNode
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gray-300">
        <Icon size={22} />
      </div>
      <p className="text-sm font-semibold text-white">{title}</p>
      {description && <p className="max-w-xs text-xs text-gray-400">{description}</p>}
      {actionLabel && actionHref && !onAction && (
        <Link to={actionHref}>
          <Button size="sm" className="mt-2">{actionLabel}</Button>
        </Link>
      )}
      {actionLabel && onAction && (
        <Button size="sm" className="mt-2" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}
