import { type ReactNode } from 'react'

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#12233f] p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="mt-3 text-sm text-gray-300">{children}</div>
        <div className="mt-5 flex justify-end gap-2">{footer}</div>
        <button className="sr-only" onClick={onClose}>close</button>
      </div>
    </div>
  )
}
