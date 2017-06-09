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
            console.log(array);

            this.context.setState({
                dataFilmes: array
            });
        });
    }
}