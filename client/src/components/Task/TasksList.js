import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const TasksList = props => {
	const dispatch = useDispatch()
	const { tasks } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchTasks(props.entry))
	}, [dispatch])

	return (
		<div className="all-tasks">
			<h2>Today's tasks</h2>
			<ul className="tasks-list">
				{tasks && tasks.length ? 
					tasks.map(task => 
						<li key={task._id}>
							<span className="task-times">From {moment(task.start).format('hh:mm A')} to {moment(task.end).format('hh:mm A')}</span>
							<div className="task-details">{task.details}</div>
						</li>
					)
					: 'Add a task!'
				}
			</ul>
		</div>
	)
}

export default TasksList