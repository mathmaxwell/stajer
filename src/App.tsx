import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './layouts/ProtectedRoute'
import SignIn from './components/signIn'
import RegisterLayOut from './layouts/registerLayOut'
import Register from './components/register'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<ProtectedRoute>props</ProtectedRoute>} />
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
