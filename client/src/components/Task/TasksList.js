import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const TasksList = props => {

	const [editing, setEditing] = useState('')
	const [currentTask, setCurrentTask] = useState({})
	
	const dispatch = useDispatch()
	const { tasks } = props

	const deleteTask = id => {
		dispatch(actions.deleteTask(id))
	}

	const editRow = task => {
		if (editing !== task._id) {
			setEditing(task._id)
			setCurrentTask(task)
		}
		else {
			dispatch(actions.updateTask(task._id, currentTask)).then(res => setEditing(''))
		}
		
	}

	const editChangeHandler = e => {
		if (e.target.name == 'start' || e.target.name == 'end') setCurrentTask({ ...currentTask, [e.target.name]: new Date(parseInt(moment(e.target.value, 'HH:mm').format('x'))).toISOString()})
		else setCurrentTask({ ...currentTask, [e.target.name]: e.target.value })
	}
	
	return (
		<div className="all-tasks">
			<h2>Today's tasks</h2>
			<table className="tasks-list">
				<thead>
					<tr>
						<th>Start</th>
						<th>End</th>
						<th>Details</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks && tasks.length ? 
						tasks.map(task => 
							<tr key={task._id}>
								<td>
									{editing === task._id ? 
										<input type="time" name="start" value={moment(currentTask.start).format('HH:mm')} onChange={editChangeHandler} />
										:
										moment(task.start).format('hh:mm A')
									}
								</td>
								<td>
									{editing === task._id ? 
										<input type="time" name="end" value={moment(currentTask.end).format('HH:mm')} onChange={editChangeHandler} />
										:
										task.end ? moment(task.end).format('hh:mm A') : 'Incomplete'
									}
								</td>
								<td>
									{editing === task._id ? 
										<textarea name="details" value={task.details} onChange={editChangeHandler}></textarea>
										:
										task.details ? task.details : ''
									}
								</td>
								<td>
									<button className="button muted-button" onClick={() => editRow(task)}>{editing === task._id ? 'Save' : 'Edit'}</button>
									<button className="button muted-button" onClick={() => deleteTask(task._id)}>Delete</button>
								</td>
							</tr>
						)
						:
						<tr>
							<td colSpan={4}>No tasks</td>
						</tr>
					}
				</tbody>
			</table>
		</div>
	)
}

export default TasksList