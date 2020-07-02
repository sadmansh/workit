import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends Component {
	
	render() {
		return (
			<div>
				<h1>Hello, {this.props.user.firstName}</h1>
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => {
	return { user }
}

export default connect(mapStateToProps, actions)(Dashboard)