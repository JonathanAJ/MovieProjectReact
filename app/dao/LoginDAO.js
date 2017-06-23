'use-strict';

import {
  LoginManager,
  AccessToken
} from 'react-native-fbsdk';
  
import { NavigationActions } from 'react-navigation';
import { UsuarioDAO } from './UsuarioDAO';

import firebase from './Banco';

export class LoginDAO{

  autenticar(context){
    LoginManager.logInWithReadPermissions(['public_profile', "email", "user_friends"]).then(result => {
          
      if (result.isCancelled) {
          //console.log("login foi cancelado");
      } else {
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
              /*
               * Reseta a navegação para uma nova
               */
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName : 'Main'})]
              });
              context.nav.dispatch(resetAction);

            }, error => {
                //console.log("Sign In Firebase Error", error);
            });
        });
      }
    },
    error => {
      alert('Login falhou com erro: ' + error);
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