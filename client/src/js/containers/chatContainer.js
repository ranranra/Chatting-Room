import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Chat from '../components/chat/Chat.js'
import * as actions from '../actions/index.js'

class ChatContainer extends Component{
	constructor(){
		super()
	}

	render(){
		console.log({...this.props})
		return (
			<Chat {...this.props} />
		)
	}
}

function mapStateToProps(state){
	return{
		messages:state.messages
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		sendMessage:actions.sendMessage,
		receiveMessage:actions.receiveMessage,
		userJoined:actions.userJoined,
		userLeft:actions.userLeft
	},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatContainer);