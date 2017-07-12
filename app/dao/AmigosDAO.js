'use strict';

import {Usuario} from '../model/Usuario'
import firebase from './Banco';

export class AmigosDAO{

    constructor(context){
        this.db = firebase.database();
        this.context = context;
		this.me = firebase.auth().currentUser;
        this.refFriends = this.db.ref(`friends/`);
    }

    queryFriends = (snap) => {

        let arrayInterest = [];

        this.context.setState({
            dataAmigos: arrayInterest,
        });

        snap.forEach(result => {

            if(result.val()){
                const friends : [Usuario] = result.val().friends.data;
                
                friends.forEach(friend => {
                    friend.photoURL = friend.picture.data.url;
                    friend.displayName = friend.name;
                });

                console.log(friends);

                arrayInterest = friends;
            }
        });

        this.context.setState({
            dataAmigos: arrayInterest,
        });
    };

    listFriends(){
        this.refFriends
                .child(this.me.uid)
                .orderByChild('name')
                .once("value", this.queryFriends);
    }
}