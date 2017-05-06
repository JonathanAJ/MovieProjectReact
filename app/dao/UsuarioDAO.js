'use-strict'

import * as firebase from "firebase";

export default class UsuarioDAO{

	constructor(nome) {  
		this.nome = nome;
		this.database = firebase.database();
	}

	save(){
		this.database.ref('users').push().set({
			nome : this.nome,
			idade : 21,
			sexo : "Masculino"
		});
	}
}