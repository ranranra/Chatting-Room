import React from 'react'
import {Router, Route, hashHistory} from 'react-router'

import ChatContainer from '../containers/chatContainer'
import SignInContainer from '../containers/signInContainer'

const Routes=(
	<Router history={hashHistory}>
		<Route path="/" component={SignInContainer}/>
		<Route path="/chat" component={ChatContainer}/>
	</Router>
)

export default Routes