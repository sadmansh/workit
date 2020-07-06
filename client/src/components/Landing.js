import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './App.scss'

const Landing = () => {
	const { user } = useSelector(state => state)

	return (
		<div style={{ textAlign: 'center' }} className="landing-page">
			<h1 className="site-title">workit</h1>
			{user ? 
				<Link to="/dashboard">Go to dashboard</Link>
				:
				<div>
					<Link to="/register" className="button">Sign up</Link>
					<Link to="/login" className="auth-alt-link">or sign in</Link>
				</div>
			}
		</div>
	)
}

export default Landing