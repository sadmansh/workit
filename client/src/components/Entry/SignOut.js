import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

window.moment = moment

const SignOut = props => {
	const [id, setId] = useState('')
	const [stop, setStop] = useState('')
	const { entries } = props
	const dispatch = useDispatch()

	useEffect(() =>{
		if (entries) {
			entries.forEach(entry => {
				let signInDate = moment(entry.signIn)
				if (signInDate.isSame(moment(Date.now()), 'day')) {
					setId(entry._id)
					if (entry.signOut) {
						setStop(entry.signOut)
						props.setSignedOut(true)
					}
				}
			})
		}
	}, [props])

	const stopEntry = () => {
		let stopDate = Date.now()
		setStop(stopDate)
		dispatch(actions.updateEntry(id, { signOut: stopDate }))
	}
	return (
		<div>
			{!stop ? 
				<button className="sign-out" onClick={stopEntry}>Sign Out</button>
				:
				<div>Signed out at {moment(stop).format('hh:mm A')}</div>
			}
		</div>
	)
}

export default SignOut