import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './layouts/ProtectedRoute'
import SignIn from './components/signIn'
import RegisterLayOut from './layouts/registerLayOut'
import Register from './components/register'
import Monitoring from './components/monitoring'
import Base from './components/base'
function App() {

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Monitoring />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/base'
					element={
						<ProtectedRoute>
							<Base />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/base/:id'
					element={
						<ProtectedRoute>
							<Base />
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
