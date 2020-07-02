import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	}

	componentDidMount() {
		this.props.fetchCountries()
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const user = this.state
		if (user) this.props.registerUser(user)
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="firstName" placeholder="First name" value={this.state.firstName} onChange={this.handleChange} />
					<input type="text" name="lastName" placeholder="Last name" value={this.state.lastName} onChange={this.handleChange} />
					<input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} />
					<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}

export default connect(mapStateToProps, actions)(Register)