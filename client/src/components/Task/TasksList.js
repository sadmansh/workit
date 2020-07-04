import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const TasksList = props => {
	const dispatch = useDispatch()
	const { tasks } = props
	
	return (
		<div className="all-tasks">
			<h2>Today's tasks</h2>
			<ul className="tasks-list">
				{tasks && tasks.length ? 
					tasks.map(task => 
						<li key={task._id}>
							<div className="task-meta">
								<span className="task-from">From {moment(task.start).format('hh:mm A')}</span>
								{task.end ? 
									<span className="task-from"> to {moment(task.end).format('hh:mm A')}</span> : ''
								}
							</div>
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