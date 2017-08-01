import React,{Component} from 'react'
import {connect} from 'react-redux'

import SignIn from '../components/signIn/signIn.js'

class SignInContainer extends Component{
	constructor(){
		super()
	}

	render(){
		return (
			<SignIn />
		)
	}
}
export default connect()(SignInContainer)