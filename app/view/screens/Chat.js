'use-strict'

import React, { Component } from 'react';
import { ChatDAO } from '../../dao/ChatDAO';
import { GiftedChat, Bubble, Composer, Send, InputToolbar } from 'react-native-gifted-chat';
import firebase from '../../dao/Banco';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import * as color from '../../assets/colors';

export class Chat extends Component {

	constructor(props) {
		super(props);

		const { params } = this.props.navigation.state;

		this.userChat = params.user;
		this.userCurrent = firebase.auth().currentUser;

		this.chatData = [];

		this.state = {
		  mensagem      : "",
		  chatData      : this.chatData,
		};

		this.mensagemDAO = new ChatDAO(this, this.userCurrent, this.userChat);
	}

	renderBubble(props) {
	    return (
	      <Bubble
	      	{...props}
	        wrapperStyle={{right: {backgroundColor: color.lightPrimaryColor},
	        			   left: {backgroundColor: color.secondaryColor, marginLeft: 0}}}
	        textStyle={{
	        	right: {color: '#444', fontFamily: 'Quicksand-Regular'},
				left: {color: '#444', fontFamily: 'Quicksand-Regular'}
	        }}/>
	    );
	}

	renderComposer(props) {
		return (
			<Composer 
				{...props}
				placeholder={'Escreva sua mensagem...'} />
		);
	}

	renderSend(props) {
		return (
			<Send
				{...props}
				label={'Enviar'}
				textStyle={{color: color.darkPrimaryColor}} />
		);
	}

	renderInputToolbar(props){
		return(
			<InputToolbar
				{...props}
				containerStyle={style.inputChat}
				/>
		);
	}

    onSend = (chatData = []) => {
        this.updateMensagem(chatData);
    };

    updateMensagem = (chatData = []) => {
        this.mensagemDAO.criarMensagem(chatData);
    };

    componentWillMount(){
		console.log("will mount")
        this.mensagemDAO.iniciaChat();
    }

    componentWillUnmount(){
		console.log("remove lis")
        this.mensagemDAO.offListarMensagens();
    }	

	render() {
		return (
		  <View style={style.container}>
		    <StatusBar backgroundColor={color.darkPrimaryColor} translucent={false}/>
		    <GiftedChat
		    	renderBubble={this.renderBubble}
		    	renderComposer={this.renderComposer}
		    	renderSend={this.renderSend}
		    	renderInputToolbar={this.renderInputToolbar}

		    	messages={this.state.chatData}
		    	onSend={this.onSend}
		    	user={{_id : this.userCurrent.uid}}
			/>
		  </View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.backgroundColor
	},
	inputChat :{
		borderTopWidth: 0,
		elevation: 20,
		backgroundColor: color.lightColor
	},
});