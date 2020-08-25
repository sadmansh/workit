import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../actions'
import AuthHeaders from '../../utils/AuthHeaders'
import axios from 'axios'
import moment from 'moment'

const EntryPicker = props => {
	const { entries, history } = props
	const [entry, setEntry] = useState({})
	const [newEntry, setNewEntry] = useState(null)
	const [error, setError] = useState(false)
	const [noEntryDate, setNoEntryDate] = useState(null)
	const dispatch = useDispatch()

	const goToEntry = e => {
		e.preventDefault()
		setError(false)
		if (entry) {
			history.push(`/dashboard/entries/${entry._id}`)
		} else {
			setError(true)
			
		}
	}

	const changeHandler = e => {
		let date = new Date(parseInt(moment(e.target.value, 'YYYY:MM:DD').format('x'))).toISOString()
		setNewEntry(new Date(parseInt(moment(e.target.value, 'YYYY:MM:DD').format('x'))).toISOString())
		setNoEntryDate(date)
		setEntry(entries.find(e => {
			let entryDate = moment(e.signIn)
			if (entryDate.isSame(moment(date), 'day')) return e._id
		}))
	}

	const createEntry = () => {
		axios.post(`https://ms-workit.herokuapp.com/api/entries/add`, { signIn: newEntry }, AuthHeaders).then(res => {
			setEntry(res.data)
			history.push(`/dashboard/entries/${res.data._id}`)
		})
	}

	return (
		<div className="entry-picker">
			<form onSubmit={goToEntry}>
				{props.match.params.id ? <Link to="/dashboard" className="button">Go to today's entry</Link> : ''}
				<input type="date" onChange={changeHandler} />
				<button type="submit">Go to entry</button>
			</form>
			{error &&
				<div className="error-create-entry">
					<p style={{ color: 'red' }}>Entry doesn't exist for {moment(noEntryDate).format('dddd, MMM D, YYYY')}</p>
					{entry && <p onClick={() => window.location.reload()} style={{ color: '#0063fe', cursor: 'pointer' }}>
						Click here to reload the page if it doesn't change.
					</p>}
					{!entry && <button onClick={() => createEntry()}>Create entry for {moment(noEntryDate).format('dddd, MMM D, YYYY')}</button>}
				</div>
			}
		</div>
	)
}

export default withRouter(EntryPicker)