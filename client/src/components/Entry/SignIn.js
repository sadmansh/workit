import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'
import { PencilIcon } from '@primer/octicons-react'

const SignIn = props => {
	const [manualSignInFlag, setManualSignInFlag] = useState(false)
	const [manualSignInTime, setManualSignInTime] = useState('')
	const [editing, setEditing] = useState(false)
	const dispatch = useDispatch()
	const { entry } = props
	
	const signIn = time => {
		dispatch(actions.createEntry(time))
	}

	const editChangeHandler = e => {
		setManualSignInTime(new Date(parseInt(moment(e.target.value, 'HH:mm').format('x'))).toISOString())
	}

	const updateSignIn = e => {
		e.preventDefault()
		dispatch(actions.updateEntry(entry._id, { signIn: manualSignInTime }))
		setEditing(!editing)
	}

	return (
		<div className={editing ? 'editing sign-in' : 'sign-in'} style={{ textAlign: 'center' }}>
			{entry ? 
				entry.signIn ? 
					<div>
						{editing ? 
							<form className="editing-form" onSubmit={updateSignIn}>
								<input type="time" name="start" value={moment(manualSignInTime || entry.signIn).format('HH:mm')} onChange={editChangeHandler} />
								<button type="submit">Save</button>
							</form>
							:
							<div>
								<span className="signed-in">You signed in at {moment(entry.signIn).format('hh:mm A')}</span>
							</div>
						}
						<div className="edit-icon" onClick={() => setEditing(!editing)}>
							<PencilIcon size={16} />
						</div>
					</div>
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