import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info'

const toneClasses: Record<Tone, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-brand-100 text-brand-800'
}

export function Badge({ className, tone = 'default', ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return <span className={cn('inline-block rounded-full px-2 py-0.5 text-xs font-medium', toneClasses[tone], className)} {...props} />
}
