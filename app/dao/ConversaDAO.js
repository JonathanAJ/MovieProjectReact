'use strict';

import firebase from './Banco';
import { UsuarioDAO } from './UsuarioDAO';
import {Usuario} from "../model/Usuario";

export class ConversaDAO{
	
	constructor(context){
		this.db = firebase.database();
		this.context = context;
		this.usuarioDAO = new UsuarioDAO(context);
		this.me = firebase.auth().currentUser;

		this.refChatsChildChange = []
	}

	initConversas(){
		this.initListenerChatsValue();
		this.initListenerChatsChange();
	}

	queryChatValue = snap => {

		this.clearState();

		snap.forEach(childSnapshot => {

			const key = childSnapshot.key;

			this.db.ref('chats/' + key).once('value', obj => {
				
				if(obj.val()){
					
					const newObj = obj.val();
					newObj.keyChat = key;
					this.addArray(newObj);

					// console.log(newObj);
				}
			});
		});
	}

	initListenerChatsValue(){
		const me = this.me;

		this.refChatsValue = this.db.ref(`users/${me.uid}/my_chats`);
		this.refChatsValue.on('value', this.queryChatValue);
	}

	queryChatChange = snap => {
		const key = snap.key;
		
		this.refChatsChildChange.push(this.db.ref(`chats/${key}`));
		const ref = this.refChatsChildChange[this.refChatsChildChange.length - 1]
		ref.on('child_changed', snapshot => {
			
			if(snapshot.val()){

				const index = this.findIndexInList(key);

				let arrayOld = this.context.state.dataConversas.slice(0);

				const obj = arrayOld[index];

				if(snapshot.key === 'lastMessage')
					obj.lastMessage = snapshot.val();
				else if(snapshot.key === 'createdAt')
					obj.createdAt = snapshot.val();

				arrayOld[index] = obj;
				arrayOld = this.sortByDate(arrayOld);
				
				this.initState(arrayOld);
			}
		});
	}

	initListenerChatsChange(){
		const me = this.me;

		this.refChatsChange = this.db.ref(`users/${me.uid}/my_chats`);
        this.refChatsChange.on('child_added', this.queryChatChange);
	}

    removeListeners(){
		if(this.refChatsValue)
	        this.refChatsValue.off('value', this.queryChatValue);
		
		if(this.refChatsChange)
			this.refChatsChange.off('child_added', this.queryChatChange);
		
		if(this.refChatsChildChange !== []){
			this.refChatsChildChange.forEach(ref => {
				ref.off('child_changed');
			});
		}
    }

	findIndexInList(idKey){

		const arrayOld = this.context.state.dataConversas.slice(0);
		let index = -1;

		arrayOld.forEach((obj, i) => {

			if(obj.keyChat === idKey){
				index = i;
				return index;
			}
		});
		return index;
	}

	addArray(obj){
		const usuario = obj;

		for (let keyMember in obj.members) {

			if(keyMember !== this.me.uid){
				usuario.uid = keyMember;
				usuario.photoURL = obj.members[keyMember].photoURL;
				usuario.displayName = obj.members[keyMember].displayName;
			}
		}

		let arrayOld = this.context.state.dataConversas.slice(0);

		arrayOld.push(usuario);
		arrayOld = this.sortByDate(arrayOld);

		// console.log(arrayOld);
		this.initState(arrayOld);
	}

	sortByDate(array){
		array.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});
		return array;
	}

	initState(array){
		this.clearState();
		this.context.setState({
			dataConversas: array
		});
	}

	clearState(){
		this.context.setState({
			dataConversas: []
		});
	}
}