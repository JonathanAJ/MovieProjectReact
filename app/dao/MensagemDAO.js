'use strict';

import firebase from './Banco';

export class MensagemDAO{
	
	constructor(context){
		this.database = firebase.database();
		this.refUsers = this.database.ref('users');
		this.refChats = this.database.ref('chats');
		this.refMsgs = this.database.ref('messages');
		this.context = context;
		this.chat = null;
	}

	iniciaChat(me, to){
		const refUsers = this.refUsers;

		refUsers.child(me.uid + '/my_chats').once('value', snap => {

			snap.forEach(childSnapshot => {
				
				const key = childSnapshot.key;
				const childData = childSnapshot.val();

				refUsers.child(to.uid + '/my_chats/' + key).once('value', snap => {
					
					if(snap.val() == true){
						this.chat.isExist = true;
						this.chat.keyValue = key;
						return true; //break
					}
				});
			});
		});
	}

	criarMensagem(me, to, message){

		const chat = this.isVerifyChat(me, to);

		if(	!chat.isExist ){

			chat.keyValue = this.refChats.push().key;
			
			this.refChats.child(chat.keyValue + '/members/' + me.uid).set(true);
			this.refChats.child(chat.keyValue + '/members/' + to.uid).set(true);

			this.refUsers.child(me.uid + '/my_chats/' + chat.keyValue).set(true);
			this.refUsers.child(to.uid + '/my_chats/' + chat.keyValue).set(true);
		}

		const msgKey = this.refMsgs.child(chat.keyValue).push().key;

		this.refMsgs.child(chat.keyValue +'/'+ key +'/').set({
			msgUID : msgKey,
			fromUID : me.uid,
			fromName : me.displayName,
			content : message,
			createAt : firebase.database.ServerValue.TIMESTAMP
		});
	}

	listarMensagens(me, to){
		this.refMsgs.child(chat.keyValue).orderByChild('createAt').on('value', snapshot => {
			// clear array
			let newArray = [];

			snapshot.forEach(childSnapshot => {
			      var key = childSnapshot.key;
			      var childData = childSnapshot.val();
			      childData.uid = key;

			      newArray.unshift(childData);
			});

		    console.log(newArray)
		    console.log(context)
		    context.setState({
		      	dataSource: ds.cloneWithRows(newArray)
		    });
		});
	}

}