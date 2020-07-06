import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../../actions'
import { Link, withRouter } from 'react-router-dom'

const Login = props => {
	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	const dispatch = useDispatch()

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (user.email && user.password) dispatch(actions.loginUser(user.email, user.password, props.history))
	}

	return (
		<div className="login">
			<h1 className="site-title">workit</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" onChange={handleChange} placeholder="email@example.com" />
				<input type="password" name="password" onChange={handleChange} placeholder="**********" />
				<button type="submit">Login</button>
				<Link to="/register" className="auth-alt-link">or sign up instead</Link>
			</form>
		</div>
	)
}

export default withRouter(Login)