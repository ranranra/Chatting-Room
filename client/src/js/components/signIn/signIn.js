import React,{Component} from 'react'
import {hashHistory} from 'react-router'

import '../../../sass/signIn.scss'

const socket=require("socket.io-client").connect("http://localhost:8080")
export default class SignIn extends Component{
	constructor(){
		super()
	}

	handleKeyDown(event){
		if(event.which===13){
			event.preventDefault();
			const userName=event.target.value.trim();
			socket.emit('signIn',userName);
			hashHistory.push("/chat");
		}
	}

	render(){
		return (
			<div className="sign-in">
				<div className="form">
					<h3 className="title">Who are you?</h3>
					<input className="username-input" type="text" autoFocus="true" maxLength={20} onKeyDown={this.handleKeyDown.bind(this)} />
				</div>
			</div>
		)
	}
}