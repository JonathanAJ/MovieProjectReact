'use strict';

import * as firebase from 'firebase';

export class MensagemDAO{
	
	constructor(){
		this.database = firebase.database();
		this.refUsers = this.database.ref('users');
		this.refChats = this.database.ref('chats');
		this.refMsgs = this.database.ref('messages');
	}

	listarMensagens(context, ds, me, to){

		const chat = this.isVerifyChat(me, to);

		if(chat.isExist){
			this.refMsgs.child(chat.keyValue).orderByChild('createAt').on('value', function(snapshot) {
				// clear array
				let newArray = [];

				snapshot.forEach(function(childSnapshot) {
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

	criarMensagem(me, to, message){

		const chat = this.isVerifyChat(me, to);

		if(	!chat.isExist ){

			chat.keyValue = this.refChats.push().key;
			
			this.refChats.child(chat.keyValue + '/members/' + me.uid).set(true);
			this.refChats.child(chat.keyValue + '/members/' + to.uid).set(true);

			this.refUsers.child(me.uid + '/my_chats/' + chat.keyValue).set(true);
			this.refUsers.child(to.uid + '/my_chats/' + chat.keyValue).set(true);
		}

		this.refMsgs.child(chat.keyValue).push().set({
			fromUID : me.uid,
			fromName : me.displayName,
			content : message,
			createAt : firebase.database.ServerValue.TIMESTAMP
		});
	}

	isVerifyChat(me, to){
		const refUsers = this.refUsers;

		let chat = {
			isExist : false,
			keyValue : null,
		}

		refUsers.child(me.uid + '/my_chats').once('value', function (snap) {

			snap.forEach(function(childSnapshot) {
				
				const key = childSnapshot.key;
				const childData = childSnapshot.val();

				refUsers.child(to.uid + '/my_chats/' + key).once('value', function (snap) {
					
					if(snap.val() == true){
						
						console.log("Já tem um chat")
						chat.isExist =  true;
						chat.keyValue = key;

						return 0;
					}
				});
			});
		});

		return chat;
	}

}