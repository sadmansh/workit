import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const TasksList = props => {
	const dispatch = useDispatch()
	const { tasks } = props

	const deleteTask = id => {
		dispatch(actions.deleteTask(id))
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
								<td>{moment(task.start).format('hh:mm A')}</td>
								<td>{task.end ? moment(task.end).format('hh:mm A'): 'Not ended yet'}</td>
								<td>{task.details}</td>
								<td>
									<button className="button muted-button">Edit</button>
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