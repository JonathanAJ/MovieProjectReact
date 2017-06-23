'use strict';

import firebase from './Banco';

export class FilmeDAO{

    constructor(context){
        this.db = firebase.database();
        this.context = context;
    }

    initFilmes(){
        this.initListenerFilmesValue();
    }

    initListenerFilmesValue(){

        this.db.ref('rede_filmes/filmes').once('value', snap => {

            let array = [];

            snap.forEach(childSnapshot => {

                const key = childSnapshot.key;

                let newObj = childSnapshot.val();
                newObj.id = key;
                array.push(newObj);
            });
            //console.log(array);

            this.context.setState({
                dataFilmes: array
            });
        });
    }

    getSessoesValue(idFilme){

        this.db.ref('rede_filmes/filmes/' + idFilme + '/sessoes/').once('value', snap => {

            const arraySessoes = [];

            snap.forEach(sessoes => {

                const key = sessoes.key;
                //console.log(key);

                this.db.ref('rede_filmes/sessao/' + key).once('value', snap => {

                    const sessao = snap.val();
                    sessao.id = key;

                    this.db.ref('rede_filmes/cinema/' + sessao.cinema).once('value', snap =>{

                        const objCinema = snap.val();
                        objCinema.id = snap.key;
                        sessao.cinema = objCinema;

                        arraySessoes.push(sessao);

                        this.context.setState({
                            dataSessoes: arraySessoes
                        });
                    });
                });
            });
        });
    }
}