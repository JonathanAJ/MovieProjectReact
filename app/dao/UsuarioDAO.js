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
			name  : user.displayName,
			email : user.email,
			photo : user.photoURL
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
}