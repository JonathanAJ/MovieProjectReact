'use-strict'

import firebase from './Banco';

export class UsuarioDAO{

	constructor() {
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

	listUsers(context){

		this.refUsers.orderByChild('name').on('value', snapshot => {
			// clear array
			let newArray = [];

			snapshot.forEach(childSnapshot => {
				const key = childSnapshot.key;
				
				if(key != this.me.uid){
					const childData = childSnapshot.val();
					childData.uid = key;
					newArray.push(childData);
				}
			});

		    console.log(newArray)
		    console.log(context)
		    context.setState({
		      	dataContatos: newArray,
		    });
		});
	}
}