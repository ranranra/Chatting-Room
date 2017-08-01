import React,{Component} from 'react'
import * as messageTypes from '../../constants/messageTypes.js'

export default class MessageItem extends Component{
	constructor(){
		super()
	}
	
	render(){
		const {message}=this.props
		switch(message.type){
			case messageTypes.USER_MESSAGE:
				return (
					<li className="user-message">
						<span className="user-name">{message.userName}</span>
						<span className="message-body">{message.text}</span>
					</li>
				)
			case messageTypes.SYSTEM_MESSAGE:
				return (
					<li className="system-message">
						{message.text}
					</li>
				)
		}
	}
}