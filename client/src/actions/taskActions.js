import axios from 'axios'
import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './types'
import AuthHeaders from '../utils/AuthHeaders'

export const fetchTasks = () => async dispatch => {
	const res = await axios.get('http://localhost:5000/api/tasks', AuthHeaders)
	dispatch({ type: FETCH_TASKS, payload: res.data })
}

export const createTask = signIn => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/api/tasks/add', { signIn }, AuthHeaders)
		dispatch({ type: CREATE_TASK, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}

export const updateTask = (id, payload) => async dispatch => {
	try {
		const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, payload, AuthHeaders)
		dispatch({ type: UPDATE_TASK, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}

export const deleteTask = id => async dispatch => {
	try {
		const res = await axios.delete(`http://localhost:5000/api/tasks/${id}`, AuthHeaders)
		dispatch({ type: DELETE_TASK, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}