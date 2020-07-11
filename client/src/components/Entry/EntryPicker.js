import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'

const EntryPicker = props => {
	const { entries, history } = props
	const [entry, setEntry] = useState({})

	const goToEntry = e => {
		e.preventDefault()
		history.push(`/dashboard/entries/${entry._id}`)
	}

	const changeHandler = e => {
		let date = new Date(parseInt(moment(e.target.value, 'YYYY:MM:DD').format('x'))).toISOString()
		setEntry(entries.find(e => {
			let entryDate = moment(e.signIn)
			if (entryDate.isSame(moment(date), 'day')) return e._id
		}))
	}

	return (
		<div className="entry-picker">
			<form onSubmit={goToEntry}>
				{props.match.params.id ? <Link to="/dashboard" className="button">Go to today's entry</Link> : ''}
				<input type="date" onChange={changeHandler} />
				<button type="submit">Go to entry</button>
			</form>
		</div>
	)
}

export default withRouter(EntryPicker)