import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

window.moment = moment

const SignIn = props => {
	const [start, setStart] = useState('')
	const [manualSignIn, setManualSiginIn] = useState(0)
	const { entries, setEntry } = props
	const dispatch = useDispatch()

	useEffect(() =>{
		if (entries) {
			entries.forEach(entry => {
				let date = moment(entry.signIn)
				if (date.isSame(moment(Date.now()), 'day')) {
					setStart(entry.signIn)
					setEntry(entry._id)
				}
			})
		}
	}, [entries])

	const handleChange = e => {
		setManualSiginIn(parseInt(moment(e.target.value, 'HH:mm').format('x')))
	}

	const startEntry = time => {
		dispatch(actions.createEntry(time))
	}
	return (
		<div>
			{!start ? 
				<div className="sign-in">
					<button className="sign-in-button" onClick={() => startEntry(Date.now())}>Sign In</button>
					<span className="sign-in-manually" onClick={() => setManualSiginIn(1)}>Enter sign in time manually</span>
					{manualSignIn ? 
						<div className="manual-sign-in">
							<input type="time" onChange={handleChange} />
							<button onClick={() => startEntry(manualSignIn)}>Sign in manually</button>
						</div>
						: ''
					}
				</div>
				:
				<div>Signed in at {moment(start).format('hh:mm A')}</div>
			}
		</div>
	)
}

export default SignIn