import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'
import moment from 'moment'

import Today from './Entry/Today'

const Dashboard = props => {
	const { user, entries, tasks } = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		document.body.classList.add('dash')
		dispatch(actions.fetchEntries())
	}, [dispatch])

	return (
		<div className="dashboard">
			<div className="header">
				<div className="hamburger"></div>
				<h1 className="site-title">workit</h1>
			</div>
			<Today entries={entries} date={props.match.params.id} />
		</div>
	)

}

export default Dashboard