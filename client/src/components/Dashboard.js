import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'
import moment from 'moment'

import SignIn from './Entry/SignIn'
import SignOut from './Entry/SignOut'
import AddTask from './Task/AddTask'
import TasksList from './Task/TasksList'
import Report from './Report/Report'

const Dashboard = () => {
	const [entry, setEntry] = useState('')

	// True when sign out button clicked
	const [signedOut, setSignedOut] = useState(false)

	// False when there's at least one task without end time
	const [tasksCompleteFlag, setTasksCompleteFlag] = useState(true)

	// State objects for task editing
	const [editing, setEditing] = useState(false)
	const [currentTask, setCurrentTask] = useState({
		id: '',
		start: '',
		end: '',
		details: ''
	})

	const { user } = useSelector(state => state)
	const dispatch = useDispatch()

	const { entries, tasks } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchEntries())
		if (entry && entry.length) dispatch(actions.fetchTasks(entry))
		if (tasks && tasks.length) {
			tasks.forEach(task => {
				if (!moment(task.end)._isValid) return setTasksCompleteFlag(false)
			})
		}
	}, [dispatch, signedOut, entry])

	return (
		<div className="container">
			<div>Hello, {user.firstName}!</div>
			<div className="flex-row">
				<div className="flex-small one-fourth">
					<SignIn entries={entries} setEntry={setEntry} />
					{entry.length && entries.length ? 
						<div className="add-task-container">
								{!signedOut ? <AddTask entry={entry} /> : ''}
								{tasksCompleteFlag ? <SignOut entries={entries} setSignedOut={setSignedOut} /> : ''}
						</div>
						: ''
					}
				</div>
				<div className="flex-small">
					{entry.length && entries.length ? 
							<TasksList tasks={tasks} entry={entry} setEditing={setEditing} setCurrentTask={setCurrentTask} />
						: ''
					}
				</div>
			</div>
			<div className="flex-row">
				<div className="flex-large">
					{entry.length && entries.length ? 
						<Report signedOut={signedOut} tasks={tasks} entry={entries.find(ent => ent._id === entry)} />
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Dashboard