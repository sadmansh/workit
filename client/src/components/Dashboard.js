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

	const { user } = useSelector(state => state)
	const dispatch = useDispatch()

	const { entries, tasks } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchEntries())
		if (entry && entry.length) dispatch(actions.fetchTasks(entry))
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
								<SignOut entries={entries} setSignedOut={setSignedOut} />
								{!signedOut ? <p className="sign-out-note">Please make sure there is no incomplete task before you sign out, otherwise there's a bug that I haven't fixed yet.</p>: ''}
						</div>
						: ''
					}
				</div>
				<div className="flex-small">
					{entry.length && entries.length ? 
							<TasksList tasks={tasks} />
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