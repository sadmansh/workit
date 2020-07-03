import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'

import SignIn from './Entry/SignIn'
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
				<div>Add task</div>
				: ''
			}
		</div>
	)
}

export default Dashboard