import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './layouts/ProtectedRoute'
import SignIn from './components/signIn'
import RegisterLayOut from './layouts/registerLayOut'
import Register from './components/register'
import useStore from './elements/setHomePage'
import Monitoring from './components/monitoring'
import Base from './components/base'

function App() {
	const { page } = useStore()
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							{page === 'monitoring' ? <Monitoring /> : <Base />}
						</ProtectedRoute>
					}
				/>
				<Route
					path='/sign-in'
					element={
						<RegisterLayOut>
							<SignIn />
						</RegisterLayOut>
					}
				/>
				<Route
					path='/register'
					element={
						<RegisterLayOut>
							<Register />
						</RegisterLayOut>
					}
				/>
			</Routes>
		</>
	)
}

export default App
