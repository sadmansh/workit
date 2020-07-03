import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

const Register = props => {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	})

	const dispatch = useDispatch()

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(actions.registerUser(user, props.history))
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="firstName" placeholder="First name" onChange={handleChange} />
				<input type="text" name="lastName" placeholder="Last name" onChange={handleChange} />
				<input type="email" name="email" placeholder="Email address" onChange={handleChange} />
				<input type="password" name="password" placeholder="Password" onChange={handleChange} />
				<button type="submit">Register</button>
			</form>
		</div>
	)
}

export default withRouter(Register)