import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'
import { PencilIcon } from '@primer/octicons-react'

const SignOut = props => {
	const [manualSignOutFlag, setManualSignOutFlag] = useState(false)
	const [manualSignOutTime, setManualSignOutTime] = useState('')
	const [editing, setEditing] = useState(false)
	const { tasks } = useSelector(state => state)
	const { entry } = props
	const dispatch = useDispatch()

	const signOut = time => {
		const allTasksComplete = tasks.some(task => task.end && task.end.length)
		if (allTasksComplete) {
			dispatch(actions.updateEntry(entry._id, { signOut: time }))
		} else {
			alert('Please complete all tasks before signing out.')
		}
	}

	const updateSignOut = e => {
		e.preventDefault()
		dispatch(actions.updateEntry(entry._id, { signOut: manualSignOutTime }))
		setEditing(!editing)
	}

	return (
		<div className={editing ? 'editing sign-out' : 'sign-out'}>
			{entry ? 
				entry.signOut ? 
					<>
						{editing ?
							<form className="editing-form" onSubmit={updateSignOut}>
								<input type="time" name="end" value={manualSignOutTime ? moment(manualSignOutTime, 'x').format('HH:mm') : moment(entry.signOut).format('HH:mm')} onChange={(e) => setManualSignOutTime(moment(e.target.value, 'HH:mm').format('x'))} />
								<button type="submit">Save</button>
							</form>
							:
							<div>
								<span className="signed-out">Signed out at {moment(entry.signOut).format('hh:mm A')}</span>
							</div>		
						}
						<div className="edit-icon" onClick={() => setEditing(!editing)}>
							<PencilIcon size={16} />
						</div>
					</>
					:
					<div style={{ textAlign: 'center' }}>
						<p>Done for the day? Click sign out</p>
						<button onClick={() => signOut(Date.now())}>Sign out</button>
						<div className="manual-sign-out">
							<span onClick={() => setManualSignOutFlag(!manualSignOutFlag)} className="manual-entry-toggle">Or add sign out time manually</span>
							{manualSignOutFlag ? 
								<div>
									<input type="datetime-local" onChange={(e) => setManualSignOutTime(moment(e.target.value, 'YYYY-MM-DDTHH:mm').format('x'))} />
									<button onClick={() => signOut(manualSignOutTime)}>Add manual sign out</button>
								</div>
								:
								''
							}
						</div>
					</div>
				:
				''
			}
		</div>
	)
}

export default SignOut