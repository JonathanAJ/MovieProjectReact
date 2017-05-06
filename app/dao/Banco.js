'use-strict'

import * as firebase from "firebase";

export default class Banco{

	init(){
		
		const config = {
		    apiKey: "AIzaSyADzYrPyMOzDYXTudfCtqpA2tVVp3YNUfA",
		    authDomain: "batepaporeact.firebaseapp.com",
		    databaseURL: "https://batepaporeact.firebaseio.com",
		    projectId: "batepaporeact",
		    storageBucket: "batepaporeact.appspot.com",
		    messagingSenderId: "25915584080"
		};

		firebase.initializeApp(config);
	}
}