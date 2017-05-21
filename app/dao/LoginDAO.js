'use-strict'

import FBSDK, {
  LoginManager,
  AccessToken
} from 'react-native-fbsdk';
  
import { NavigationActions } from 'react-navigation';
import { UsuarioDAO } from './UsuarioDAO';
import { Usuario } from '../model/Usuario';

import firebase from './Banco';

export class LoginDAO{

  autenticar(nav){
    LoginManager.logInWithReadPermissions(['public_profile', "email", "user_friends"]).then(result => {
          
      if (result.isCancelled) {
        alert('Login cancelado!');
      } else {
        /*
         * Acessa o Token do Facebook gerado para logar-se no FIREBASE
         */
        AccessToken.getCurrentAccessToken().then(async data => {

            const token = data.accessToken;
            const provider = firebase.auth.FacebookAuthProvider;
            const cred = provider.credential(token);
            await firebase.auth().signInWithCredential(cred).then(user => {
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
              nav.dispatch(resetAction)

            }, error => {
                console.log("Sign In Firebase Error", error);
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
      nav.dispatch(resetAction)
      alert("Você foi deslogado.")

    },error => {
   
      alert("Error"+error)
    
    });
  }
}