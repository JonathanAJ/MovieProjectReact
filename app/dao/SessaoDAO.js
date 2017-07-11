'use strict';

import firebase from './Banco';

export class SessaoDAO{

    constructor(context){
        this.db = firebase.database();
        this.context = context;
		this.me = firebase.auth().currentUser;
        this.refSessao = this.db.ref(`rede_filmes/sessao/`);
        this.refCinema = this.db.ref(`rede_filmes/cinema/`);
    }

    listSessions(arraySessionsID){
        let arrayObj = [];
        arraySessionsID.forEach(sessionId => {
            if(sessionId){
                this.refSessao.child(sessionId).once("value", snap => {
                    if(snap.val()){
                        const sessao = snap.val();
                        sessao.id = sessionId;
                        this.refCinema.child(sessao.cinema).once("value", snap => {
                            if(snap.val()){
                                sessao.cinema = snap.val();
                                console.log(sessao);

                                arrayObj.push(sessao);

                                this.context.setState({
                                    dataSessions : arrayObj
                                });
                            }
                        });
                    }
                });
            }
        });

    }
}