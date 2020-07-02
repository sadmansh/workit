import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { email, password } = this.state
		if (email && password) this.props.loginUser(email, password)
	}

	render() {
		return (
			<div>
				Hello world!

				<form onSubmit={this.handleSubmit}>
					<input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

export default connect(null, actions)(Login)