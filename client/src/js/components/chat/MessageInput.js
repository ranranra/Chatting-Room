import React,{Component} from 'react'

export default class MessageInput extends Component{
	constructor(){
		super()
	}

	handleSubmit(event){
		if(event.which===13){
			event.preventDefault()
			const message=event.target.value.trim()
			if(message.length>0){
				this.props.sendMessage(message)
				this.input.value=''
			}
		}
	}

	render(){
		return (
			<input type="text" className="input-message"placeholder="Write here..." autoFocus="true" ref={(input)=>this.input=input} onKeyDown={this.handleSubmit.bind(this)} />
		)
	}
}