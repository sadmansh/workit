import React from 'react'
import moment from 'moment'

const TasksList = props => {
	const { tasks } = props

	return (
		<div className="tasks-list">
			{tasks && tasks.length ? 
				<ul className="tasks">
					{tasks.map(task => 
						<li key={task._id}>
							<p className="task-time">{moment(task.start).format('hh:mm A')} - {moment(task.end).format('hh:mm A')}</p>
							<h4 className="task-details">{task.details}</h4>
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