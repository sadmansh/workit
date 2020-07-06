import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

const SignOut = props => {
	const [manualSignOutFlag, setManualSignOutFlag] = useState(false)
	const [manualSignOutTime, setManualSignOutTime] = useState('')
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

	return (
		<div>
			{entry ? 
				!entry.signOut ? 
					<div>
					<button onClick={() => signOut(Date.now())}>Sign out</button>
						<div className="manual-sign-out">
							<span onClick={() => setManualSignOutFlag(true)}>Or add sign out time manually</span>
							{manualSignOutFlag ? 
								<div>
									<input type="time" onChange={(e) => setManualSignOutTime(moment(e.target.value, 'HH:mm').format('x'))} />
									<button onClick={() => signOut(manualSignOutTime)}>Add manual sign out</button>
								</div>
								:
								''
							}
						</div>
					</div>
					:
					<p>Signed out at {moment(entry.signOut).format('hh:mma')}</p>
				: ''
			}
		</div>
	)
}

export default SignOut