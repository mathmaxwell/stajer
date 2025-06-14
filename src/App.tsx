import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './layouts/ProtectedRoute'
import SignIn from './components/signIn'
import RegisterLayOut from './layouts/registerLayOut'
import Register from './components/register'

import AddEmployees from './pages/addEmployees'
import Base from './pages/base'
import Monitoring from './pages/monitoring'
import EmployeeForm from './components/EmployeeForm'
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
					path='/user-id/:id'
					element={
						<ProtectedRoute>
							<EmployeeForm />
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
				<Route
					path='/add-employees'
					element={
						<ProtectedRoute>
							<AddEmployees />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	)
}

export default App
