export class Usuario{

	constructor() {
		this.uid;
		this.photoURL;
		this.displayName;
	}

	get uid(){
		return this.uid;
	}

	set uid(uid){
		this.uid = uid;
	}

	get photoURL(){
		return this.photoURL;
	}

	set photoURL(photoURL){
		this.photoURL = photoURL;
	}

	get displayName(){
		return this.displayName;
	}

	set displayName(displayName){
		this.displayName = displayName;
	}
}