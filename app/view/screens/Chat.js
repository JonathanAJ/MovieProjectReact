'use-strict'

import React, { Component } from 'react';
import { Mensagem } from '../../components/Mensagem'
import { UsuarioDAO } from '../../dao/UsuarioDAO';
import { MensagemDAO } from '../../dao/MensagemDAO';
import { GiftedChat, Bubble, Composer, Send, InputToolbar } from 'react-native-gifted-chat';
import firebase from '../../dao/Banco';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

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

		this.mounted = false;

		this.mensagemDAO = new MensagemDAO(this, this.userCurrent, this.userChat);
	}

	static navigationOptions = ({navigation}) => ({
		title : navigation.state.params.user.displayName,
	});

	renderBubble(props) {
	    return (
	      <Bubble
	      	{...props}
	        wrapperStyle={{right: {backgroundColor: color.lightPrimaryColor},
	        			   left: {backgroundColor: color.secondaryColor, marginLeft: 0}}}
	        textStyle={{right: {color: '#444'}, left: {color: '#444'}}}/>
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
        this.mensagemDAO.iniciaChat();
        this.mounted = true;
    }

    componentWillUnmount(){
        console.log('willUnmount Chat')
        this.mensagemDAO.offListarMensagens();
        this.mounted = false;
    }

	render() {
		return (
		  <View style={style.container}>
		    <StatusBar backgroundColor={color.darkPrimaryColor}/>
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