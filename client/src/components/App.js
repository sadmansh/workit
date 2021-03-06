import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './App.scss'

import Landing from './Landing'
import Login from './Authentication/Login'
import Register from './Authentication/Register'
import Dashboard from './Dashboard'

class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route path="/dashboard/entries/:id" component={Dashboard} />
				</div>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = state => {
	return { user: state.user }
}

export default connect(mapStateToProps, actions)(App)