import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'

const AddTask = props => {

	const [task, setTask] = useState({
		start: '',
		end: '',
		details: '',
		_entry: props.entry
	})

	const dispatch = useDispatch()

	const inputHandler = e => {
		setTask({...task, [e.target.name]: e.target.value})
	}
	const formHandler = e => {
		e.preventDefault()
		console.log(task)
		dispatch(actions.createTask(task))
		e.target.reset()
	}

	return (
		<form onSubmit={formHandler} className="task-form">
			<div className="task-meta">
				<input type="time" name="start" onChange={inputHandler} />
				<input type="time" name="end" onChange={inputHandler} />
			</div>
			<div>
				<textarea name="details" onChange={inputHandler} />
			</div>
			<button type="submit">Add task</button>
		</form>
	)
}

export default AddTask