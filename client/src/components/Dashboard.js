import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'

import SignIn from './Entry/SignIn'
import SignOut from './Entry/SignOut'
import AddTask from './Task/AddTask'
import TasksList from './Task/TasksList'
// import SignOut from './Entry/SignOut'

const Dashboard = () => {
	const [entry, setEntry] = useState('')

	const { user } = useSelector(state => state)
	const dispatch = useDispatch()

	const { entries } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchEntries())
	}, [dispatch])

	return (
		<div>
			<div>Hello, {user.firstName}!</div>
			<SignIn entries={entries} setEntry={setEntry} />

			{entry.length && entries.length ? 
				<div className="tasks">
					<AddTask entry={entry} />
					<SignOut entries={entries} />
					<TasksList entry={entry} />
				</div>
				: ''
			}
		</div>
	)
}

export default Dashboard