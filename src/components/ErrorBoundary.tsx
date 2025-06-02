import { Component } from 'react'
import type { ReactNode } from 'react'
class ErrorBoundary extends Component<
	{ children: ReactNode },
	{ hasError: boolean }
> {
	state = { hasError: false }

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	render() {
		if (this.state.hasError) {
			return <h1>Что-то пошло не так. Пожалуйста, перезагрузите страницу.</h1>
		}
		return this.props.children
	}
}

export default ErrorBoundary
