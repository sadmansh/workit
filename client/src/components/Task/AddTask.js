import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

window.moment = moment

const AddTask = props => {
	const { entry } = props

	const [task, setTask] = useState({
		start: '',
		end: '',
		details: '',
		_entry: entry
	})
	const [showForm, setShowForm] = useState(false)

	const dispatch = useDispatch()

	const inputHandler = e => {
		setTask({...task, [e.target.name]: e.target.value})
	}
	const formHandler = e => {
		e.preventDefault()
		const entryDate = moment(entry.signIn)
		if (task.start) task.start = moment(task.start, 'HH:mm').date(entryDate.date()).month(entryDate.month()).year(entryDate.year()).format('x')
		if (task.end) task.end = moment(task.end, 'HH:mm').date(entryDate.date()).month(entryDate.month()).year(entryDate.year()).format('x')
		dispatch(actions.createTask(task))
		e.target.reset()
	}

	return (
		<div className="add-task-wrapper">
			<button onClick={() => setShowForm(!showForm)} className="toggle-add-task">+ Add task</button>

			{showForm ?
				<form onSubmit={formHandler} className="add-task">
					<div className="task-meta">
						<div className="form-control">
							<label htmlFor="start">Start time</label>
							<input type="time" name="start" id="start" onChange={inputHandler} />
						</div>
						<div className="form-control">
							<label htmlFor="end">End time</label>
							<input type="time" name="end" id="end" onChange={inputHandler} />
						</div>
					</div>
					<div>
						<label htmlFor="details">Details</label>
						<textarea name="details" id="details" onChange={inputHandler} />
					</div>
					<button type="submit">Add task</button>
				</form>
				: ''}
		</div>
	)
}

export default AddTask