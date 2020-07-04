import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const Report = props => {
	const [hours, setHours] = useState({
		break: '',
		work: '',
		total: ''
	})
	const { entry, tasks } = props

	useEffect(() => {
		if (tasks && tasks.length) {
			let breakMins = 0
			let workMins = 0
			tasks.forEach(task => {
				let duration = getHours(task, true)
				let mins = parseInt(duration.asMinutes())
				if (task.details.includes('BREAK')) breakMins += mins
				else workMins += mins
			})
			setHours({
				break: `${Math.floor(breakMins / 60)}h ${breakMins % 60}m`,
				work: `${Math.floor(workMins / 60)}h ${workMins % 60}m`,
				total: `${Math.floor((workMins + breakMins) / 60)}h ${(workMins + breakMins) % 60}m`
			})
		}
	}, [entry, tasks])

	const getHours = ({ start, end }, getDuration = false) => {
		start = moment(start)
		end = moment(end)
		const duration = moment.duration(end.diff(start))
		const hours = parseInt(duration.asHours())
		const mins = parseInt(duration.asMinutes()) % 60
		if (getDuration) return duration
		return `${hours}h ${mins}m`
	}

	const getTime = (time) => {
		return moment(time).format('h:mma')
	}

	const renderTasks = () => {
		if (tasks && tasks.length) {
			return (
				<ul className="report-tasks">
					{tasks.reverse().map(task => (
						<li key={task._id}>{getTime(task.start)} - {getTime(task.end)} &mdash; {task.details} [{getHours(task)}]</li>
					))}
				</ul>
			)
		}
	}

	return (
		<div>
			<h2>Report</h2>
			<hr />
			<div className="report-box">
				<h3 style={{ textTransform: 'uppercase' }}>
					{moment(Date.now()).format('dddd')}'s ({moment(Date.now()).format('D.M.YYYY')}) work updates
				</h3>
				<p className="sign-in-time">
					{getTime(entry.signIn)} &mdash; SIGNED IN
				</p>
				{renderTasks()}
				{entry.signOut ? 
					<div className="report-footer">
						<p className="sign-out-time">{getTime(entry.signOut)} &mdash; SIGNED OUT</p>
						<p className="total-hours">Total hours worked = {hours.total}</p>
						<p className="break-hours">Break = {hours.break}</p>
						<p className="work-hours">Total hours worked without break = {hours.work}</p>
					</div>
					: ''
				}
				
			</div>
		</div>
	)
}

export default Report