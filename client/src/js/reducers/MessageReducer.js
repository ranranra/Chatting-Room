import React from 'react'
import * as actionTypes from '../constants/actionTypes.js'
import * as messageTypes from '../constants/messageTypes.js'

const initialState={
	messages:[
		{
			type:messageTypes.SYSTEM_MESSAGE,
			text:'Welcome To My ChattingRoom！'
		}
	]
}

export default function messageReducer(state=initialState,action){
	switch(action.type){
		case actionTypes.SEND_MESSAGE:
			return state;
		case actionTypes.RECEIVE_MESSAGE:
			const message=action.message;
			return {
				...state,
				messages:[
					...state.messages,
					{
						type:messageTypes.USER_MESSAGE,
						text:message.text,
						userName:message.userName
					}
				]
			}
		case actionTypes.USER_JOINED:
			return {
				...state,
				messages:[
					...state.messages,
					{
						type:messageTypes.SYSTEM_MESSAGE,
						text:`${action.data.userName} joined! Now ${action.data.userNumber} participants.`
					}
				]
			}
		case actionTypes.USER_LEFT:
			return {
				...state,
				messages:[
					...state.messages,
					{
						type:messageTypes.SYSTEM_MESSAGE,
						text:`${action.data.userName} joined! Now ${action.data.userNumber} participants.`
					}
				]
			}
		default:
			return state;
	}
}