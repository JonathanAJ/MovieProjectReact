'use-strict'

import FBSDK, {
  LoginManager,
  AccessToken
} from 'react-native-fbsdk';
  
import { NavigationActions } from 'react-navigation'

import * as firebase from 'firebase';

export default class LoginDAO{

  autenticar(nav){
    LoginManager.logInWithReadPermissions(['public_profile', "email", "user_friends"]).then(
        function(result) {
          if (result.isCancelled) {
            alert('Login cancelado!');
          } else {
            
              // Firebase Token
              AccessToken.getCurrentAccessToken().then(
                async (data) => {

                  const token = data.accessToken;
                  const response = await fetch("https://graph.facebook.com/me?access_token="+token);
                  const json = await response.json();
                  console.log(json)

                  let provider = firebase.auth.FacebookAuthProvider;
                  let cred = provider.credential(token);
                  await firebase.auth().signInWithCredential(cred);

                  
                  const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName : 'Chat'})]
                  });
                  nav.dispatch(resetAction)
                }
              );

              alert("Você foi logado com sucesso!");
          }
        },
        function(error) {
          alert('Login fail with error: ' + error);
        }
      );
  }

}