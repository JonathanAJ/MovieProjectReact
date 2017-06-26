'use strict';

import firebase from './Banco';
import {Usuario} from "../model/Usuario";

export class InterestDAO{

    constructor(context){
        this.db = firebase.database();
        this.context = context;
        this.refInterest;
    }

    saveInterest(user: Usuario, {movieName, createdAt, descriptionSession, arraySessionsID}){

        const keyInterest = this.db.ref('interest').push().key;

        this.db.ref(`interest/${keyInterest}`).set({
            user : {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email
            },
            movieName,
            createdAt,
            descriptionSession,
            arraySessionsID,
            type : 'interest'
        });
        this.db.ref(`users/${user.uid}/my_interest`).update({
            [keyInterest] : true
        });
    }

    listInterest(){
        this.refInterest = this.db.ref(`interest/`);
        this.refInterest.on("value", snap => {

            this.clearState();
            const arrayInterest = [];

            snap.forEach(interest => {

                const obj = interest.val();
                obj.id = interest.key;

                console.log(obj);

                arrayInterest.push(obj);
            });

            if(this.context.mounted) {
                this.context.setState({
                    dataFeed: this.sortByDate(arrayInterest),
                });
            }
        });
    }

    removeListerners(){
        this.refInterest.off();
    }

    sortByDate(array){
        array.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return array;
    }

    clearState(){
        if(this.context.mounted) {
            this.context.setState({
                dataFeed: []
            });
        }
    }

    initState(array){
        this.context.setState({
            dataFeed: array,
        });
    }
}