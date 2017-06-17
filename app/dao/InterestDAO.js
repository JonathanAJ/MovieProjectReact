'use strict';

import firebase from './Banco';

export class InterestDAO{

    constructor(context){
        this.db = firebase.database();
        this.context = context;
    }

    saveInterest({userUID, userName, userPhoto, movieName, movieImage, arraySessionsID}){

        const keyInterest = this.db.ref('interest').push().key;

        this.db.ref(`interest/${keyInterest}`).set({
            userUID,
            userName,
            userPhoto,
            movieName,
            movieImage,
            arraySessionsID
        });
        this.db.ref(`users/${userUID}/my_interest`).update({
            [keyInterest] : true
        });
    }
}