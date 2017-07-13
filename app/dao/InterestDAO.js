'use strict';

import firebase from './Banco';

export class InterestDAO{

    constructor(context){
        this.db = firebase.database();
        this.context = context;
		this.me = firebase.auth().currentUser;
        this.refInterest = this.db.ref(`interest/`);
    }

    saveInterest(user, {movieId, movieName, createdAt, descriptionSession, arraySessionsID}){

        const keyInterest = this.db.ref('interest').push().key;

        this.db.ref(`interest/${keyInterest}`).set({
            user : {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email
            },
            movieId,
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

    queryInterest = (snap) => {
        console.log("value");

        const arrayInterest = [];

        this.context.setState({
            dataFeed: arrayInterest,
        });

        snap.forEach(interest => {
            const obj = interest.val();
            if(obj){
                obj.id = interest.key;
                arrayInterest.push(obj);
            }
        });

        this.context.setState({
            dataFeed: this.sortByDate(arrayInterest),
        });
    };

    listInterest(filtro){
        console.log("filtro value", filtro);

        if(filtro === undefined){
            this.removeListernerInterest();
            this.refInterest
                    .on("value", this.queryInterest);
        
        }else{
            this.removeListernerInterest();
            this.refInterest
                    .orderByChild('movieId')
                    .equalTo(filtro.id)
                    .once("value", this.queryInterest);
        }
    }

    removeListernerInterest(){
        if(this.refInterest)
            this.refInterest.off("value", this.queryInterest);
    }

    listMyInterestByMovie(filmeId){
        this.refMyInterest = this.db.ref(`users/${this.me.uid}/my_interest/`);
        this.refMyInterest.on("value", snap => {
    
            const arrayInterest = [];

            snap.forEach(interest => {

                this.db.ref(`interest/${interest.key}/`).once("value", snap => {
                    
                    const interest = snap.val();
                    if(interest){
                        if(interest.movieId === filmeId){
                            interest.id = snap.key;
                            arrayInterest.push(interest);
                            
                            this.context.setState({
                                dataInterest: arrayInterest
                            });
                        }
                    }
                });
            });
                        
            this.context.setState({
                dataInterest: arrayInterest
            });
        });
    }

    removeListenerMyInterestByMovie(){
        this.refMyInterest.off();
    }

    sortByDate(array){
        array.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return array;
    }

    removeInterest(id){
        console.log("removeu", id);

        this.db.ref(`interest/${id}`).remove();
        this.db.ref(`users/${this.me.uid}/my_interest/${id}`).remove();
    }
}