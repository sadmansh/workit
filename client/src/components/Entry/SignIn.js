import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const SignIn = props => {
	const [manualSignInFlag, setManualSignInFlag] = useState(false)
	const [manualSignInTime, setManualSignInTime] = useState('')
	const dispatch = useDispatch()
	const { entry } = props
	
	const signIn = time => {
		dispatch(actions.createEntry(time))
	}

	return (
		<div className="sign-in" style={{ textAlign: 'center' }}>
			{entry ? 
				entry.signIn ? 
					<span className="signed-in">You signed in at {moment(entry.signIn).format('hh:mm A')}</span>
					:
					<div style={{ textAlign: 'center' }}>
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
				: ''
			}
		</div>
	)
}

export default SignIn