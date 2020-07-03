import axios from 'axios'
import { FETCH_USER } from './types'

export const loginUser = (email, password, history) => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
		dispatch({ type: FETCH_USER, payload: res.data.user })
		localStorage.setItem('token', res.data.token)
		return history.push('/dashboard')
	} catch (error) {
		console.error(error)
	}
}

export const registerUser = (user, history) => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/api/auth/register', user)
		dispatch({ type: FETCH_USER, payload: res.data.user })
		localStorage.setItem('token', res.data.token)
		return history.push('/dashboard')
	} catch (error) {
		console.error(error)
	}
}