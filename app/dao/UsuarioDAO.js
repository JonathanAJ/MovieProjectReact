'use-strict'

import * as firebase from "firebase";

export class UsuarioDAO{

	constructor() {
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

	listUsers(context, ds){

		this.refUsers.orderByChild('name').on('value', function(snapshot) {
			// clear array
			let newArray = [];

			snapshot.forEach(function(childSnapshot) {
			      var key = childSnapshot.key;
			      var childData = childSnapshot.val();
			      childData.uid = key;

			      newArray.push(childData);
			  });

		    console.log(newArray)
		    console.log(context)
		    context.setState({
		      	dataSource: ds.cloneWithRows(newArray)
		    });
		});
	}
}