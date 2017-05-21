'use strict';

import firebase from './Banco';

export class MensagemDAO{
	
	constructor(context, me, to){
		this.database = firebase.database();
		this.refUsers = this.database.ref('users');
		this.refChats = this.database.ref('chats');
		this.refMsgs = this.database.ref('messages');
		this.chat = {isExist : false, keyValue: null};
		this.context = context;
		this.inicialLoad = true;

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
				const childData = childSnapshot.val();

				this.refUsers.child(to.uid + '/my_chats/' + key).once('value', snap => {
					
					if(snap.val() == true){
						this.chat = {
							isExist : true,
							keyValue : key
						}
						return true; //break
					}
				});
			});

			if(!this.chat.isExist){
				this.criarChat();
			}
			
			this.listarMensagens();
    		this.listenerAdded();

		});
	}

	/*
	 Aqui cria o chat caso ele não exista
	 */
	criarChat(){
		const me = this.me;
		const to = this.to;

		this.chat.keyValue = this.getKeyPattern(me, to); 

		this.refChats.child(this.chat.keyValue + '/members/' + me.uid).set(true);
		this.refChats.child(this.chat.keyValue + '/members/' + to.uid).set(true);

		this.refUsers.child(me.uid + '/my_chats/' + this.chat.keyValue).set(true);
		this.refUsers.child(to.uid + '/my_chats/' + this.chat.keyValue).set(true);
	}

	listarMensagens(){
		console.log('once '+this.chat.keyValue);
		this.refMsgs.child(this.chat.keyValue).once('value', (snapshot) => {

			const oldArray = this.context.state.dataSource._dataBlob.s1.slice(0);
					
			snapshot.forEach(obj => {
				console.log("mount? "+this.context.mounted)
				if(this.context.mounted == true){
					// console.log(obj.val())
					oldArray.unshift(obj.val())
				}
			});
			//retira o ultimo valor para o child added adicionalo
			oldArray.shift();

			this.context.setState({
			      dataSource: this.context.state.dataSource.cloneWithRows(oldArray)
			});
			console.log("once "+this.inicialLoad)
			this.inicialLoad = false;
    	});
	}

	listenerAdded(){
		console.log('on '+this.chat.keyValue);
		this.refMsgs.child(this.chat.keyValue)
					.limitToLast(1)
					.on('child_added', this.listenerOneMsg);
	}

	listenerOneMsg = (snapshot) => {

		console.log("on "+this.inicialLoad)
		if(!this.inicialLoad){
			console.log("mount? "+this.context.mounted)
			if(this.context.mounted == true){
				// console.log(snapshot.val())
				const oldArray = this.context.state.dataSource._dataBlob.s1.slice(0);
				oldArray.unshift(snapshot.val())
				this.context.setState({
				      dataSource: this.context.state.dataSource.cloneWithRows(oldArray)
				});
			}
		}
    }

	offListarMensagens(){
		console.log('off '+this.chat.keyValue);
		this.refMsgs.child(this.chat.keyValue).off(this.listenerOneMsg);
	}

	criarMensagem(message){
		const me = this.me;
		const to = this.to;

		if(this.chat.keyValue != null){

			const msgKey = this.refMsgs.child(this.chat.keyValue).push().key;

			this.refMsgs.child(this.chat.keyValue +'/'+ msgKey +'/').set({
				msgUID : msgKey,
				fromUID : me.uid,
				fromName : me.displayName,
				content : message,
				createAt : firebase.database.ServerValue.TIMESTAMP
			});
		}
	}

	getKeyPattern(me, to){
		return "chat_"+(me.uid < to.uid ? 
							me.uid +"_"+ to.uid :
							to.uid +"_"+ me.uid);
	}
}