export class Usuario{

	constructor() {
		this._uid = '';
		this._photoURL = '';
		this._displayName = '';
		this._email = '';
        this._photoLargeURL = '';
	}

    get uid() {
        return this._uid;
    }

    set uid(value) {
        this._uid = value;
    }

    get photoURL() {
        return this._photoURL;
    }

    set photoURL(value) {
        this._photoURL = value;
    }

    get displayName() {
        return this._displayName;
    }

    set displayName(value) {
        this._displayName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get photoLargeURL() {
        return this._photoLargeURL;
    }

    set photoLargeURL(value){
        this._photoLargeURL = value;
    }
}