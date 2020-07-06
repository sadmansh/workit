import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import * as actions from '../../actions'
import AddTask from './AddTask'

const TodayTasks = props => {
	const { entry } = props
	const dispatch = useDispatch()
	const { tasks } = useSelector(state => state)

	useEffect(() => {
		if (entry) {
			dispatch(actions.fetchTasks(entry._id))
		}
	}, [dispatch])

	return (
		<div className="today-tasks">
			<div className="tasks-list">
				{entry && tasks && tasks.length ? 
					<ul className="tasks">
						{tasks.map(task => 
							<li key={task._id}>{task.details}</li>
						)}
					</ul>
					:
					<div>Please add a task</div>
				}
			</div>
			{!entry.signOut ? <AddTask entry={entry._id} /> : ''}
		</div>
	)
}

export default TodayTasks