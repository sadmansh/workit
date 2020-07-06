import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import * as actions from '../../actions'
import AddTask from './AddTask'
import TasksList from './TasksList'

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
			{!entry.signOut ? <AddTask entry={entry._id} /> : ''}
			<TasksList tasks={tasks} />
		</div>
	)
}

export default TodayTasks