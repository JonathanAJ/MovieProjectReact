'use-strict'

import firebase from './Banco';

export class UsuarioDAO{

	constructor(context) {
		this.context = context;
		this.me = firebase.auth().currentUser;
		this.database = firebase.database();
		this.refUsers = this.database.ref('users');
	}

	saveUser(user){
		this.database.ref("users/"+user.uid).set({
			displayName  : user.displayName,
			email : user.email,
			photoURL : user.photoURL
		});
	}

	listUsers(){

		this.refUsers.orderByChild('name').on('child_added', snapshot => {

			const key = snapshot.key;
			const value = snapshot.val();
			value.uid = key;

			if(value.uid != this.me.uid){

				const oldArray = this.context.state.dataContatos.slice(0);
			 	oldArray.push(value)

				this.context.setState({
			      	dataContatos: oldArray
			    });
			}
		});
	}


	listUserById(id, callback){

		this.refUsers.child(id).once('value', snapshot => {

			const key = snapshot.key;
			const value = snapshot.val();
			value.uid = key;

			callback(value);
		});
	}
}