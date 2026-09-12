import { Home, BookOpen, ClipboardList, TrendingUp, Menu, type LucideIcon } from 'lucide-react'
import type { LangMode } from '@/types'

export interface NavItem {
  to: string
  icon: LucideIcon
  /** Always-compact label, shown in the bottom nav regardless of language mode. */
  labelEn: string
  labelHi: string
}

// Single source of truth for primary navigation. Both BottomNav (mobile) and
// DesktopSidebar read from this list so routes never drift apart.
export const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: Home, labelEn: 'Home', labelHi: 'होम' },
  { to: '/syllabus', icon: BookOpen, labelEn: 'Syllabus', labelHi: 'पाठ्यक्रम' },
  { to: '/mock-tests', icon: ClipboardList, labelEn: 'Mocks', labelHi: 'मॉक' },
  { to: '/progress', icon: TrendingUp, labelEn: 'Progress', labelHi: 'प्रगति' },
  { to: '/more', icon: Menu, labelEn: 'More', labelHi: 'अधिक' }
]

/**
 * Bottom-navigation labels must always stay compact and single-line, even in
 * bilingual mode — long "English / Hindi" combos are never used here. Hindi
 * mode shows the short Hindi label; English and bilingual modes show English.
 */
export function navLabel(item: NavItem, lang: LangMode): string {
  return lang === 'hi' ? item.labelHi : item.labelEn
}
