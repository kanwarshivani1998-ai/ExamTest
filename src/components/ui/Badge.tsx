import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info'

const toneClasses: Record<Tone, string> = {
  default: 'bg-white/10 text-gray-200',
  success: 'bg-emerald-900/40 text-emerald-300',
  warning: 'bg-amber-900/40 text-amber-300',
  danger: 'bg-red-900/40 text-red-300',
  info: 'bg-brand-500/20 text-brand-300'
}

export function Badge({ className, tone = 'default', ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return <span className={cn('inline-block rounded-full px-2 py-0.5 text-xs font-medium', toneClasses[tone], className)} {...props} />
}
