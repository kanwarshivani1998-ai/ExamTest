import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800',
  secondary: 'bg-brand-50 text-brand-800 hover:bg-brand-100',
  ghost: 'bg-transparent text-brand-800 hover:bg-brand-50',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-brand-300 text-brand-800 bg-white hover:bg-brand-50'
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2 rounded-lg',
  lg: 'text-base px-5 py-3 rounded-lg',
  icon: 'p-2 rounded-full'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'
