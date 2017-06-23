'use strict';

import firebase from './Banco';
import { UsuarioDAO } from './UsuarioDAO';
import {
  ListView
} from 'react-native';
import {Usuario} from "../model/Usuario";

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

	initListenerChatsChange(){
		const me = this.me;

        this.db.ref('users/' + me.uid + '/my_chats').on('child_added', snap => {
			
			const key = snap.key;

            this.db.ref('chats/' + key).on('child_changed', snapshot => {
				
				const index = this.findIndexInList(key);
				//console.log("index", index);
				//console.log("objChanged", snapshot);

				let arrayOld = this.context.state.dataConversas._dataBlob.s1.slice(0);

				let obj = arrayOld[index];

				if(snapshot.key === 'lastMessage')
					obj.lastMessage = snapshot.val();
				else if(snapshot.key === 'createdAt')
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

			if(obj.keyChat === idKey){
				index = i;
				return index;
			}
		});
		return index;
	}

	addArray(obj){
		let usuario = new Usuario();
		usuario = obj;

		for (let keyMember in obj.members) {

			if(keyMember !== this.me.uid){
				usuario.uid = keyMember;
				usuario.photoURL = obj.members[keyMember].photoURL;
				usuario.displayName = obj.members[keyMember].displayName;
			}
		}

		let arrayOld = this.context.state.dataConversas._dataBlob.s1.slice(0);

		arrayOld.push(usuario);
		arrayOld = this.sortByDate(arrayOld);

		this.initState(arrayOld);
	}

	sortByDate(array){
		array.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});
		return array;
	}

	clearArray(){
		this.context.state.dataConversas._dataBlob.s1 = [];
	}

	initState(array){
		this.clearState();
        if(this.context.mounted) {
            this.context.setState({
                dataConversas: this.ds.cloneWithRows(array),
            });
        }
	}

	clearState(){
		if(this.context.mounted) {
			this.context.setState({
				dataConversas: this.ds.cloneWithRows([])
			});
		}
	}

    removeListeners(){
        const me = this.me;
        this.db.ref('users/' + me.uid + '/my_chats').off();
    }
}