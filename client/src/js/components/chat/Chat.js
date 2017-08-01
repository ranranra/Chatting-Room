import React,{Component} from 'react'
import $ from 'jquery'

import MessageInput from './MessageInput.js'
import MessageItem from './MessageItem.js'

import '../../../sass/chat.scss'

const socket=require("socket.io-client").connect("http://localhost:8080")
export default class Chat extends Component{
	constructor(){
		super()
		this.state={
			userName:''
		}
	}

	componentDidMount(){
		const {receiveMessage,userJoined,userLeft}=this.props

		socket.on("newMessage",function(message){
			receiveMessage(message)
		})
		socket.on('userJoined',function(data){
			userJoined(data)
		})
		socket.on('userLeft',function(data){
			userLeft(data)
		})
	}

	sendMessage(message){
		const userName=$("#main .message li").eq(1).text().split(" ")[0]
		this.setState({
			userName:userName
		},function(){
			const {sendMessage}=this.props
			if(message.length!==0){
				sendMessage(message)
				socket.emit("newMessage",{
					message:message,
					userName:this.state.userName
				})
			}
		})
	}

	render(){
		const {messages}=this.props
		return (
			<div className="chat">
				<div className="chat-area">
					<ul className="message">
						{
							messages.map((message,index)=>(
								<MessageItem userName={this.state.userName} message={message} key={index} />
							))
						}
					</ul>
				</div>
				<MessageInput sendMessage={this.sendMessage.bind(this)}/>
			</div>
		)
	}
}