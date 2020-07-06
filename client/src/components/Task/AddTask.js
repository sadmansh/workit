import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const AddTask = props => {
	const { entry } = props
	const [task, setTask] = useState({
		start: '',
		end: '',
		details: '',
		_entry: entry
	})

	const dispatch = useDispatch()

	const inputHandler = e => {
		setTask({...task, [e.target.name]: e.target.value})
	}
	const formHandler = e => {
		e.preventDefault()
		if (task.start) task.start = moment(task.start, 'HH:mm').format('x')
		if (task.end) task.end = moment(task.end, 'HH:mm').format('x')
		dispatch(actions.createTask(task))
		e.target.reset()
	}

	return (
		<form onSubmit={formHandler} className="add-task">
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