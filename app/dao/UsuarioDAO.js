'use-strict'

import * as firebase from "firebase";

export class UsuarioDAO{

	constructor() {
		this.database = firebase.database();
	}

	saveUser(user){
		this.database.ref("users/"+user.uid).set({
			name  : user.displayName,
			email : user.email,
			photo : user.photoURL
		});
	}

	listUsers(){

	}
}