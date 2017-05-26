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

			this.db.ref('chats/' + key).on('child_changed', snapshot => {
				
				const index = this.findIndexInList(key);
				console.log("index", index);
				console.log("objChanged", snapshot);

				let arrayOld = this.context.state.dataConversas._dataBlob.s1.slice(0);

				const obj = arrayOld[index];

				if(snapshot.key == 'lastMessage')
					obj.lastMessage = snapshot.val();
				else if(snapshot.key == 'createdAt')
					obj.createdAt = snapshot.val();

				arrayOld[index] = obj;
				arrayOld = this.sortByDate(arrayOld);
				
				this.initState(arrayOld);
			});
		});
	}

	findIndexInList(idKey){

		const arrayOld = this.context.state.dataConversas._dataBlob.s1.slice(0);
		let index = -1;

		arrayOld.forEach((obj, i) => {

			if(obj.keyChat == idKey){
				index = i;
				return;
			}
		});
		return index;
	}

	addArray(obj){
		for (let keyMember in obj.members) {

			if(keyMember != this.me.uid){
				obj.uid = keyMember;
				obj.photoURL = obj.members[keyMember].photoURL;
				obj.displayName = obj.members[keyMember].displayName;
			}
		}

		let arrayOld = this.context.state.dataConversas._dataBlob.s1.slice(0);

		arrayOld.push(obj);
		arrayOld = this.sortByDate(arrayOld);

		this.initState(arrayOld);
	}

	sortByDate(array){
		array.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt)
		});
		return array;
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