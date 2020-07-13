import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { PencilIcon, TrashIcon } from '@primer/octicons-react'

import * as actions from '../../actions'

const TasksList = props => {
	const [editing, setEditing] = useState('')
	const [currentTask, setCurrentTask] = useState({})
	const { tasks, entry } = props

	const dispatch = useDispatch()

	const setEditTask = task => {
		if (editing !== task._id) {
			setEditing(task._id)
			setCurrentTask(task)
		} else {
			setEditing('')
			setCurrentTask({})
		}
	}

	const editTask = () => {
		dispatch(actions.updateTask(editing, currentTask)).then(res => setEditing(''))
	}

	const editChangeHandler = e => {
		const entryDate = moment(entry.signIn)
		if (e.target.name == 'start' || e.target.name == 'end') setCurrentTask({ ...currentTask, [e.target.name]: new Date(parseInt(moment(e.target.value, 'HH:mm').date(entryDate.date()).month(entryDate.month()).year(entryDate.year()).format('x'))).toISOString()})
		else setCurrentTask({ ...currentTask, [e.target.name]: e.target.value })
	}

	return (
		<div className="tasks-list">
			{tasks && tasks.length ? 
				<ul className="tasks">
					{tasks.map(task => 
						<li key={task._id}>
							{editing === task._id ?
								<div className="task-time">
									<input type="time" name="start" value={moment(currentTask.start || task.start).format('HH:mm')} onChange={editChangeHandler} />
									<input type="time" name="end" value={moment(currentTask.end || task.end).format('HH:mm')} onChange={editChangeHandler} />
								</div>
								:
								<p className="task-time">{moment(task.start).format('hh:mm A')} - {moment(task.end).format('hh:mm A')}</p>
							}
							<div className="task-details">
								{editing === task._id ? 
									<textarea name="details" value={currentTask.details} onChange={editChangeHandler}></textarea>
									:
									task.details ? <h4>{task.details}</h4> : ''
								}
							</div>
							{editing === task._id ? <button onClick={editTask}>Save</button> : ''}
							<div className="task-actions">
								<div className="edit-icon" onClick={() => setEditTask(task)}>
									<PencilIcon size={16} />
								</div>
								<div className="trash-icon" onClick={() => {if (window.confirm('Are you sure you want to delete this task?')) dispatch(actions.deleteTask(task._id))}}>
									<TrashIcon size={16} />
								</div>
							</div>
						</li>
					)}
				</ul>
				:
				<div>0 tasks today</div>
			}
		</div>
	)
}

export default TasksList