import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import * as actions from '../../actions'
import TodayTasks from '../Task/TodayTasks'
import SignIn from './SignIn'
import SignOut from './SignOut'
import Report from '../Report/Report'

const Today = props => {
	const [showReport, setShowReport] = useState(false)
	const [todayEntry, setTodayEntry] = useState({})
	const { entries } = props

	const dispatch = useDispatch()

	useEffect(() => {
		if (entries) {
			setTodayEntry(entries.find(entry => {
				let date = moment(entry.signIn)
				if (date.isSame(moment(Date.now()), 'day')) return entry
			}))
		}	
	}, [props, todayEntry])

	

	return (
		<div className="today">
			{todayEntry && todayEntry.signIn ? 
				<div>
					<span className="signed-in">Signed in at {moment(todayEntry.signIn).format('hh:mma')}</span>
					<TodayTasks entry={todayEntry} />
					<SignOut entry={todayEntry} />
					<button onClick={() => setShowReport(!showReport)}>{showReport ? 'Hide report' : 'Show report'}</button>
					{showReport ? <Report entry={todayEntry} /> : ''}
				</div>
				:
				<SignIn />
			}
		</div>
	)
}

export default Today