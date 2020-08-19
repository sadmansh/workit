import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import * as actions from '../../actions'
import TodayTasks from '../Task/TodayTasks'
import SignIn from './SignIn'
import SignOut from './SignOut'
import EntryPicker from './EntryPicker'
import Report from '../Report/Report'

const Today = props => {
	const [showReport, setShowReport] = useState(false)
	const [todayEntry, setTodayEntry] = useState({})
	const { entries } = props

	const dispatch = useDispatch()

	useEffect(() => {
		if (entries) {
			setTodayEntry(entries.find(entry => {
				if (props.date) {
					if (entry._id === props.date) return entry
				} else {
					let date = moment(entry.signIn)
					if (date.isSame(moment(Date.now()), 'day')) return entry
				}
			}))
		}	
	}, [props, todayEntry])

	return (
		<div className="today" style={{ textAlign: 'center' }}>
			<EntryPicker entries={entries} />
			{todayEntry && todayEntry.signIn ?
				<h1 className="today-date">Showing tasks for {moment(todayEntry.signIn).format('dddd, MMM D, YYYY')}</h1>
			: <h1 className="today-date">Showing tasks for {moment(Date.now()).format('dddd, MMM D, YYYY')}</h1>}
			<SignIn entry={todayEntry} />
			{todayEntry && todayEntry.signIn ? 
				<div>
					<TodayTasks entry={todayEntry} />
					<SignOut entry={todayEntry} />
					<button onClick={() => setShowReport(!showReport)} style={{ marginTop: '1rem' }}>{showReport ? 'Hide report' : 'Show report'}</button>
					{showReport ? <Report entry={todayEntry} /> : ''}
				</div>
				:
				''
			}
		</div>
	)
}

export default Today