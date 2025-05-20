import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './layouts/ProtectedRoute'
import SignIn from './components/signIn'
import RegisterLayOut from './layouts/registerLayOut'
import Register from './components/register'
import useStore from './elements/setHomePage'
import Monitoring from './components/monitoring'
import Base from './components/base'
import AllMood from './components/allMood'
import AllBirthday from './components/AllBirthday'
import Active from './components/active'
import Vacation from './components/vacation'
import Sick from './components/sick'
import Trip from './components/trip'
import NotAtWork from './components/notAtWork'
import All from './components/all'

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
				<Route path='/all-mood' element={<AllMood />} />
				<Route path='/all-birthday' element={<AllBirthday />} />
				<Route path='/active' element={<Active />} />
				<Route path='/vacation' element={<Vacation />} />
				<Route path='/sick' element={<Sick />} />
				<Route path='/trip' element={<Trip />} />
				<Route path='/not-at-work' element={<NotAtWork />} />
				<Route path='/all' element={<All />} />
			</Routes>
		</>
	)
}

export default App
