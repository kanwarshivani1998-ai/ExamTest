import type { ReactNode } from 'react'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { DesktopSidebar } from './DesktopSidebar'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:pl-60">
      <DesktopSidebar />
      <Header />
      <main className="page-safe-bottom mx-auto max-w-5xl px-4 pt-4 md:pb-8">{children}</main>
      <BottomNav />
    </div>
  )
}
