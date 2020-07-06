import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const SignIn = () => {
	const [manualSignInFlag, setManualSignInFlag] = useState(false)
	const [manualSignInTime, setManualSignInTime] = useState('')
	const dispatch = useDispatch()
	
	const signIn = time => {
		dispatch(actions.createEntry(time))
	}

	return (
		<div className="sign-in" style={{ textAlign: 'center' }}>
			<p>Start logging tasks by signing in first</p>
			<button onClick={() => signIn(Date.now())}>Sign in</button>
			<div className="manual-sign-in">
				<span onClick={() => setManualSignInFlag(!manualSignInFlag)} className="manual-entry-toggle">or add sign in time manually</span>
				{manualSignInFlag ? 
					<div>
						<input type="time" onChange={(e) => setManualSignInTime(moment(e.target.value, 'HH:mm').format('x'))} />
						<button onClick={() => signIn(manualSignInTime)}>Sign in manually</button>
					</div>
					:
					''
				}
			</div>
		</div>
	)
}

export default SignIn