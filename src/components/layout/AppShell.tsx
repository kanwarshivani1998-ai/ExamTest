import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <main className="mx-auto max-w-5xl px-4 pb-20 pt-4 sm:pb-8">{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}
