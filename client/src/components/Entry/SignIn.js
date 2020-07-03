import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

window.moment = moment

const SignIn = props => {
	const [start, setStart] = useState('')
	const { entries } = props
	const dispatch = useDispatch()

	useEffect(() =>{
		if (entries) {
			entries.forEach(entry => {
				let date = moment(entry.signIn)
				if (date.isSame(moment(Date.now()), 'day')) setStart(entry.signIn)
			})
		}
	}, [props])

	const startEntry = () => {
		dispatch(actions.createEntry(Date.now()))
		props.setSignedIn(true)
	}
	return (
		<div>
			{!start ? 
				<button className="sign-in" onClick={startEntry}>Sign In</button>
				:
				<div>Signed in at {moment(start).format('hh:mm A')}</div>
			}
		</div>
	)
}

export default SignIn