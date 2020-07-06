import axios from 'axios'
import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './types'
import AuthHeaders from '../utils/AuthHeaders'

export const fetchTasks = entry => async dispatch => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tasks`, { params: { entry }, ...AuthHeaders })
	dispatch({ type: FETCH_TASKS, payload: res.data })
}

export const createTask = task => async dispatch => {
	try {
		const payload = {}
		if (task.start) payload.start = task.start
		if (task.end) payload.end = task.end
		if (task.details) payload.details = task.details
		if (task._entry) payload._entry = task._entry
		const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tasks/add`, payload, AuthHeaders)
		dispatch({ type: CREATE_TASK, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}

export const updateTask = (id, payload) => async dispatch => {
	try {
		const res = await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tasks/${id}`, payload, AuthHeaders)
		dispatch({ type: UPDATE_TASK, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}

export const deleteTask = id => async dispatch => {
	try {
		const res = await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tasks/${id}`, AuthHeaders)
		dispatch({ type: DELETE_TASK, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}