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

			if(this.chat.isExist)
				listarMensagens();
			else{
				criarChat();
				listarMensagens();
			}

		});
	}

	/*
	 Aqui cria o chat caso ele não exista
	 */
	criarChat(){
		const me = this.me;
		const to = this.to;

		this.chat.keyValue = this.refChats.push().key;
		
		this.refChats.child(chat.keyValue + '/members/' + me.uid).set(true);
		this.refChats.child(chat.keyValue + '/members/' + to.uid).set(true);

		this.refUsers.child(me.uid + '/my_chats/' + chat.keyValue).set(true);
		this.refUsers.child(to.uid + '/my_chats/' + chat.keyValue).set(true);
	}

	listarMensagens(){
		const me = this.me;
		const to = this.to;

		this.refMsgs.child(this.chat.keyValue).orderByChild('createAt').on('value', snapshot => {
			// clear array
			let newArray = [];

			snapshot.forEach(childSnapshot => {
			      var key = childSnapshot.key;
			      var childData = childSnapshot.val();
			      childData.uid = key;

			      newArray.unshift(childData);
			});

		    console.log(newArray)
		    console.log(this.context)
		    this.context.setState({
		      	dataSource: context.state.dataSource.cloneWithRows(newArray)
		    });
		});
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

	cancelRef(){
		this.refMsgs.child(this.chat.keyValue).orderByChild('createAt').off();
	}

}