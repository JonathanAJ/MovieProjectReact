'use strict';

import firebase from './Banco';

export class MensagemDAO{
	
	constructor(context, me, to){
		this.database = firebase.database();
		this.refUsers = this.database.ref('users');
		this.refChats = this.database.ref('chats');
		this.refMsgs = this.database.ref('messages');
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

		this.refUsers.child(me.uid + '/my_chats').once('value', snap => {

			snap.forEach(childSnapshot => {
				
				const key = childSnapshot.key;

				this.refUsers.child(to.uid + '/my_chats/' + key).once('value', snap => {

					console.log("snap",snap);
                    console.log("snap",snap.val());

					if(snap.val() === true){
						console.log("chat existe")
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
		const me = this.me;
		const to = this.to;

		this.chat.keyValue = this.getKeyPattern(me, to); 

		this.refChats.child(this.chat.keyValue + '/members/' + me.uid).update({
			displayName : me.displayName,
			photoURL : me.photoURL
		});
		this.refChats.child(this.chat.keyValue + '/members/' + to.uid).update({
			displayName : to.displayName,
			photoURL : to.photoURL
		});

		this.refUsers.child(me.uid + '/my_chats/' + this.chat.keyValue).set(true);
		this.refUsers.child(to.uid + '/my_chats/' + this.chat.keyValue).set(true);

		this.chat.isExist = true;
		this.listarMensagens();
	}

	/*
	 Faz uma listagem das mensagens com child added
	 */
	listarMensagens(){
		console.log('on '+this.chat.keyValue);
		this.refMsgs.child(this.chat.keyValue).on('child_added', (snapshot) => {

			console.log("mount? "+ this.context.mounted);
			if(this.context.mounted == true){
				console.log(snapshot.val());

				const oldArray = this.context.state.chatData.slice(0);
				const obj = this.getChartObject(snapshot.val());
				oldArray.unshift(obj);

				this.context.setState({
					chatData: oldArray
				});
			}
		});
	}

	offListarMensagens(){
		console.log('off '+this.chat.keyValue);
		this.refMsgs.child(this.chat.keyValue).off();
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
		this.refChats.child(this.chat.keyValue).update({
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

			const msgKey = this.refMsgs.child(this.chat.keyValue).push().key;

			this.refMsgs.child(this.chat.keyValue +'/'+ msgKey +'/').set({
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