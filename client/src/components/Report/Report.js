import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

const Report = props => {
	const [hours, setHours] = useState({
		break: '',
		work: '',
		total: ''
	})
	const { entry } = props
	const { tasks } = useSelector(state => state)
	
	useEffect(() => {
		if (tasks && tasks.length && entry.signOut) {
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
	}, [entry])

	const getTime = time => {
		return moment(time).format('h:mma')
	}

	const getHours = ({ start, end }, getDuration = false) => {
		start = moment(start)
		end = moment(end)
		if (start._isValid && end._isValid) {
			const duration = moment.duration(end.diff(start))
			const hours = parseInt(duration.asHours())
			const mins = parseInt(duration.asMinutes()) % 60
			if (getDuration) return duration
			return `${hours}h ${mins}m`
		}
		return 'Task not complete'
	}

	const renderTasks = () => {
		if (tasks && tasks.length) {
			return (
				<ul className="report-tasks">
					{tasks.map(task => (
						<li key={task._id}>{getTime(task.start)}{task.end ? ' - ' + getTime(task.end) : ''} &mdash; {task.details} [{getHours(task)}]</li>
					))}
				</ul>
			)
		}
	}

	return (
		<div className="report" style={{ textAlign: 'left' }}>
			<h2>{moment(entry.signIn).format('dddd')}'s ({moment(entry.signIn).format('D.M.YYYY')}) work updates</h2>
			<h3 className="sign-in-time">{getTime(entry.signIn)} &mdash; SIGNED IN</h3>
			{renderTasks()}
			{entry.signOut ? 
				<div className="report-footer">
					<h3 className="sign-out-time">{getTime(entry.signOut)} &mdash; SIGNED OUT</h3>
					<h4 className="total-hours">Total hours worked = {hours.total}</h4>
					<h4 className="break-hours">Break = {hours.break}</h4>
					<h4 className="work-hours">Total hours worked without break = {hours.work}</h4>
				</div>
				: ''
			}
		</div>
	)
}

export default Report