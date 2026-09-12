import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

// Catches any uncaught render/runtime error anywhere below it in the tree and shows a
// recovery screen instead of letting the whole app go blank / appear to "close".
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('Unhandled app error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-3 bg-[#0f2140] p-6 text-center text-white">
          <p className="text-base font-semibold">Something went wrong / कुछ गलत हो गया</p>
          <p className="max-w-sm text-xs text-gray-300">
            The app hit an unexpected error and stopped this screen to avoid crashing. Your saved data is safe.
          </p>
          <p className="max-w-sm break-words text-[11px] text-gray-500">{this.state.error.message}</p>
          <button
            className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white"
            onClick={() => {
              this.setState({ error: null })
              window.location.reload()
            }}
          >
            Reload App / रीलोड करें
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
