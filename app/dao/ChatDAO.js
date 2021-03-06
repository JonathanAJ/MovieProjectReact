'use strict';

import firebase from './Banco';
import {Usuario} from "../model/Usuario";

export class ChatDAO{
	
	constructor(context, me, to: Usuario){
		this.db = firebase.database();
		this.context = context;
        this.chat = {
            isExist : false,
			verify	: null,
            keyValue: null
        };
		this.me = me;
		this.to = to;
	}

	/*
	 Inicia quando o usuário clicar no chat,
	 verifica se ele já tem um chat com o outro usuário.
	*/
	iniciaChat(){
		const me = this.me;
		const to = this.to;

		this.db.ref('users/' + me.uid + '/my_chats').once('value', snap => {

			snap.forEach(childSnapshot => {
				
				const key = childSnapshot.key;

                this.db.ref('users/' + to.uid + '/my_chats/' + key).once('value', snap => {

					//console.log("snap",snap);
                    //console.log("snap",snap.val());

					if(snap.val()){
						// console.log("chat já existe");

						this.chat = {
							isExist : true,
							keyValue : key
						};
						this.listarMensagens();
						return true; //break
					}
				});
			});
		});
	}

	/*
	 Aqui cria o chat caso ele não exista
	 */
	criarChat(){
		// console.log("chat não existe, criando...");

		const me = this.me;
		const to = this.to;

		this.chat.keyValue = this.getKeyPattern(me, to);

        this.db.ref('chats/' + this.chat.keyValue + '/members/' + me.uid).update({
			displayName : me.displayName,
			photoURL : me.photoURL
		});
        this.db.ref('chats/' + this.chat.keyValue + '/members/' + to.uid).update({
			displayName : to.displayName,
			photoURL : to.photoURL
		});

        this.db.ref('users/' + me.uid + '/my_chats/' + this.chat.keyValue).set(true);
        this.db.ref('users/' + to.uid + '/my_chats/' + this.chat.keyValue).set(true);

		this.chat.isExist = true;
		
		this.listarMensagens();
	}

	queryMessages = snapshot => {
		if(snapshot.val()){
			const oldArray = this.context.state.chatData.slice(0);
			const obj = this.getChartObject(snapshot.val());
			oldArray.unshift(obj);

			this.context.setState({
				chatData: oldArray
			});
		}
	}

	/*
	 Faz uma listagem das mensagens com child added
	 */
	listarMensagens(){
		this.refMessages = this.db.ref(`messages/${this.chat.keyValue}`);
        this.refMessages.on('child_added', this.queryMessages);
	}

	offListarMensagens(){
        if(this.refMessages)
        	this.refMessages.off('child_added', this.queryMessages);
	}

	getChartObject(chat){
		return {
			_id : chat.msgId,
			text : chat.text,
			createdAt : chat.data,
			user : {
				_id : chat.byId,
				name: chat.byName,
				avatar: chat.avatar,
			}

		};
	}

	criarUltimaMensagem(message){
        this.db.ref('chats/' + this.chat.keyValue).update({
			lastMessage : message,
			createdAt : new Date()
		});
	}

	criarMensagem(chat){
		const me = this.me;

		if(!this.chat.isExist){
			this.criarChat();
		}

		if(this.chat.keyValue !== null){

			const msgKey = this.db.ref('messages/' + this.chat.keyValue).push().key;

            this.db.ref('messages/' + this.chat.keyValue +'/'+ msgKey +'/').set({
				msgId : msgKey,
				byId : me.uid,
				byName : me.displayName,
				text : chat[0].text,
				data : chat[0].createdAt,
				avatar : me.photoURL,
				createdAt : firebase.database.ServerValue.TIMESTAMP
			});

			this.criarUltimaMensagem(chat[0].text);
		}
	}

	getKeyPattern(me, to){
		return "chat_"+(me.uid < to.uid ? 
							me.uid +"_"+ to.uid :
							to.uid +"_"+ me.uid);
	}
}