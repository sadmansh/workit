import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'
import moment from 'moment'

import Today from './Entry/Today'

const Dashboard = () => {
	const { user, entries, tasks } = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(actions.fetchEntries())
	}, [dispatch])

	return (
		<div className="dashboard">
			<div className="header">
				<h1>Hello {user.firstName}</h1>
			</div>
			<Today entries={entries} />
		</div>
	)

}

export default Dashboard