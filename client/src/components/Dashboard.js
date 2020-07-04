import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'

import SignIn from './Entry/SignIn'
import SignOut from './Entry/SignOut'
import AddTask from './Task/AddTask'
import TasksList from './Task/TasksList'
import Report from './Report/Report'

const Dashboard = () => {
	const [entry, setEntry] = useState('')
	const [signedOut, setSignedOut] = useState(false)

	const { user } = useSelector(state => state)
	const dispatch = useDispatch()

	const { entries, tasks } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchEntries())
		if (entry && entry.length) dispatch(actions.fetchTasks(entry))
	}, [dispatch, signedOut, entry])

	return (
		<div>
			<div>Hello, {user.firstName}!</div>
			<SignIn entries={entries} setEntry={setEntry} />

			{entry.length && entries.length ? 
				<div className="tasks">
					{!signedOut ? 
						<AddTask entry={entry} /> : ''
					}
					<SignOut entries={entries} setSignedOut={setSignedOut} />
					<TasksList tasks={tasks} entry={entry} />

					<Report tasks={tasks} entry={entries.find(ent => ent._id === entry)} />
				</div>
				: ''
			}
		</div>
	)
}

export default Dashboard