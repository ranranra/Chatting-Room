import * as actionTypes from '../constants/actionTypes.js'

export function sendMessage(message){
	return {
		type:actionTypes.SEND_MESSAGE,
		message
	}
}

export function receiveMessage(message){
	return {
		type:actionTypes.RECEIVE_MESSAGE,
		message
	}
}

export function userJoined(data){
	return {
		type:actionTypes.USER_JOINED,
		data
	}
}

export function userLeft(data){
	return {
		type:actionTypes.USER_LEFT,
		data
	}
}