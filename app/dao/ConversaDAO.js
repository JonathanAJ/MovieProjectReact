'use strict';

import firebase from './Banco';
import { UsuarioDAO } from './UsuarioDAO';

export class ConversaDAO{
	
	constructor(context){
		this.db = firebase.database();
		this.context = context;
		this.arrayMessageExist = [];
		this.usuarioDAO = new UsuarioDAO(context);

		this.me = firebase.auth().currentUser;

		this.isInitQuery = true;
	}

	init(){
		this.initConversas(this.initState)
	}

	initConversas(callback){
		const me = this.me;

		this.db.ref('users/' + me.uid + '/my_chats').once('value', snap => {

			snap.forEach(childSnapshot => {
				
				const key = childSnapshot.key;
				const childData = childSnapshot.val();


				this.db.ref('messages/' + key).once('value', snap => {
					
					if(snap.exists()){

						this.db.ref('chats/' + key).on('value', snap => {
							console.log('ok')

							let obj = snap.val();
							obj.keyChat = key;
							this.addArray(obj);
						});
					}
				});

			});

			this.isInitQuery = false;
			callback(this.arrayMessageExist);
		});	
	}

	addArray(obj){
		for (let keyMember in obj.members) {

			if(keyMember != this.me.uid){
				obj.uid = keyMember;
				obj.photoURL = obj.members[keyMember].photoURL;
				obj.displayName = obj.members[keyMember].displayName;
			}
		}
		console.log(obj);

		this.arrayMessageExist.push(obj);
		this.arrayMessageExist.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt)
		});

	}

	initState = array => {
		this.context.setState({
			dataConversas : array
		});
	}

	clearState(){
		this.context.setState({
			dataConversas : []
		});	
	}

	listenerConversas(){
		// const me = this.me;

		// this.refUsers.child(me.uid + '/my_chats').once('value', snap => {

		// 	snap.forEach(childSnapshot => {
				
		// 		const key = childSnapshot.key;
		// 		const childData = childSnapshot.val();

		// 		this.refChats.child(key).on('value', snap => {
		// 			this.clearState()
		// 			this.initConversas(this.initState);
		// 		});
		// 	});
		// });
	}
}