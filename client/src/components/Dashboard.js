import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'

import SignIn from './Entry/SignIn'
import AddTask from './Task/AddTask'
// import SignOut from './Entry/SignOut'

const Dashboard = () => {
	const [signedIn, setSignedIn] = useState(false)

	const { user } = useSelector(state => state)
	const dispatch = useDispatch()

	const { entries } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchEntries())
	}, [dispatch])

	return (
		<div>
			<div>Hello, {user.firstName}!</div>
			<SignIn entries={entries} setSignedIn={setSignedIn} />

			{signedIn ? 
				<AddTask />
				: ''
			}
		</div>
	)
}

export default Dashboard