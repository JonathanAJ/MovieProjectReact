'use-strict';

import {
	LoginManager,
	AccessToken,
	GraphRequest,
	GraphRequestManager,
} from 'react-native-fbsdk';

import { NavigationActions } from 'react-navigation';
import { UsuarioDAO } from './UsuarioDAO';

import firebase from './Banco';

export class LoginDAO{

	_responseCoverMovies(error, result) {
		if (error) {
			console.log('Error', error);
		} else {
            // Salva dados obtidos do usuário no Real Time Database
            const userUid = firebase.auth().currentUser.uid;
            firebase.database().ref(`users/${userUid}`).update({
                cover : result.cover.source,
                movies : result.movies
            });
		}
	}

    _responseLargePicture(error, result) {
        if (error) {
            console.log('Error', error);
        } else {
             // Salva dados obtidos do usuário no Real Time Database
            const userUid = firebase.auth().currentUser.uid;
            firebase.database().ref(`users/${userUid}`).update({
                photoLargeURL : result.data.url
            });
        }
    }

    _responseFriends(error, result) {
        if (error) {
            console.log('Error', error);
        } else {
             // Salva dados obtidos do usuário no Real Time Database
            const userUid = firebase.auth().currentUser.uid;
            firebase.database().ref(`friends/${userUid}`).update({
                result
            });
        }
    }

    // Cria as queries na API Graph
    buscarPerfil(){
        //pega a foto grande
		const picture = new GraphRequest(
			'me/picture?redirect=0&type=large',
			null, this._responseLargePicture
		);
        //pega as curtidas de filmes
		const coverMovie = new GraphRequest(
            'me?fields=cover{source},movies{name}',
			null, this._responseCoverMovies
		);
        //pega os amigos que usam o app
        const friends = new GraphRequest(
            'me/?fields=friends.limit(1000){id,name,picture{url}}',
			null, this._responseFriends
		);
		// Faz as requisições
		new GraphRequestManager().addRequest(picture).start();
        new GraphRequestManager().addRequest(coverMovie).start();
        new GraphRequestManager().addRequest(friends).start();
	}

    sincronizarFirebase(){
        firebase.database().ref('/').keepSynced(true);
    }

    autenticar(context){
        LoginManager.logInWithReadPermissions(['public_profile', "email", "user_friends", "user_likes"]).then(result => {

            if (!result.isCancelled) {
                /*
                 * Acessa o Token do Facebook gerado para logar-se no FIREBASE
                 */
                AccessToken.getCurrentAccessToken().then(data => {

                    const token = data.accessToken;
                    const provider = firebase.auth.FacebookAuthProvider;
                    const cred = provider.credential(token);
                    firebase.auth().signInWithCredential(cred).then(user => {
                        /*
                        * Salva usuário no Real Time Database
                        */
                        new UsuarioDAO(this).saveUser(user);

                        this.buscarPerfil();

                        this.sincronizarFirebase();
                        /*
                        * Reseta a navegação para uma nova
                        */
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName : 'Main'})]
                        });
                        context.nav.dispatch(resetAction);

                        console.log("Login sucess!");

                    }, error => {

                    });
                });
            }
        },
        error => {
            alert('Login Falhou! Verifique sua conexão');
        });
    }

	sair(nav){
		/*
		* Reseta a navegação para uma nova
		*/
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName : 'Login'})
			]
		});

		firebase.auth().signOut().then(() => {

			LoginManager.logOut();
			nav.dispatch(resetAction);

		},error => {

			alert("Error "+error);

		});
	}
}