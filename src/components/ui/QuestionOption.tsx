import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D']

type State = 'default' | 'selected' | 'correct' | 'wrong'

export function QuestionOption({
  index,
  label,
  state,
  disabled,
  onClick
}: {
  index: number
  label: string
  state: State
  disabled?: boolean
  onClick: () => void
}) {
  const styles: Record<State, string> = {
    default: 'border-white/10 bg-white/[0.03] text-white active:bg-white/10',
    selected: 'border-brand-500 bg-brand-500/15 text-white',
    correct: 'border-success bg-success/15 text-white',
    wrong: 'border-danger bg-danger/15 text-white'
  }
  const letterStyles: Record<State, string> = {
    default: 'bg-white/10 text-gray-300',
    selected: 'bg-brand-500 text-white',
    correct: 'bg-success text-white',
    wrong: 'bg-danger text-white'
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full min-h-[52px] items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors disabled:cursor-default',
        styles[state]
      )}
    >
      <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold', letterStyles[state])}>
        {LETTERS[index] ?? index + 1}
      </span>
      <span className="leading-snug">{label}</span>
    </button>
  )
}
