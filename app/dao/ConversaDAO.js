'use strict';

import firebase from './Banco';
import { UsuarioDAO } from './UsuarioDAO';
import {
  ListView
} from 'react-native';

export class ConversaDAO{
	
	constructor(context){
		this.db = firebase.database();
		this.context = context;
		this.usuarioDAO = new UsuarioDAO(context);
    	this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    	this.inicialQuery = false;
		this.me = firebase.auth().currentUser;
	}

	initConversas(){
		const me = this.me;
		this.initListenerChatsValue();
		this.initListenerChatsChange();
	}

	initListenerChatsValue(){
		const me = this.me;

		this.db.ref('users/' + me.uid + '/my_chats').on('value', snap => {

			this.clearState();
			
			snap.forEach(childSnapshot => {
				
				const key = childSnapshot.key;

				this.db.ref('chats/' + key).once('value', obj => {

					let newObj = obj.val();
					newObj.keyChat = key;
					this.addArray(newObj);
				});	
			});
		});
	}

	initListenerChatsChange(snap){
		const me = this.me;

		this.db.ref('users/' + me.uid + '/my_chats').on('child_added', snap => {
			
			const key = snap.key;

			this.db.ref('chats/' + key).on('child_changed', obj => {
				console.log('ok', obj)

				// let newObj = obj.val();
				// newObj.keyChat = key;
				// this.addArray(newObj);
			});
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

		const arrayOld = this.context.state.dataConversas._dataBlob.s1.slice(0);

		arrayOld.push(obj);
		arrayOld.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt)
		});

		this.initState(arrayOld);
	}

	clearArray(){
		this.context.state.dataConversas._dataBlob.s1 = [];
	}

	initState(array){
		this.clearState();
		this.context.setState({
	    	dataConversas : this.ds.cloneWithRows(array),
		});
	}

	clearState(){
		this.context.setState({
			dataConversas :  this.ds.cloneWithRows([])
		});	
	}
}