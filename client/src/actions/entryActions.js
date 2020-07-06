import axios from 'axios'
import { FETCH_ENTRIES, CREATE_ENTRY, UPDATE_ENTRY, DELETE_ENTRY } from './types'
import AuthHeaders from '../utils/AuthHeaders'

export const fetchEntries = () => async dispatch => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/entries`, AuthHeaders)
	dispatch({ type: FETCH_ENTRIES, payload: res.data })
}

export const createEntry = signIn => async dispatch => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/entries/add`, { signIn }, AuthHeaders)
		dispatch({ type: CREATE_ENTRY, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}

export const updateEntry = (id, payload) => async dispatch => {
	try {
		const entry = {}
		if (payload.signIn) entry.signIn = payload.signIn
		if (payload.signOut) entry.signOut = payload.signOut
		const res = await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/entries/${id}`, entry, AuthHeaders)
		dispatch({ type: UPDATE_ENTRY, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}

export const deleteEntry = (id, payload) => async dispatch => {
	try {
		const res = await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/entries/${id}`, AuthHeaders)
		dispatch({ type: DELETE_ENTRY, payload: res.data })
	} catch (error) {
		console.error(error)
	}
}