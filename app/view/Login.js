'use-strict'

import React, { Component } from 'react';
import { FaceButton } from '../components/FaceButton';
import { LoginDAO } from '../dao/LoginDAO';
import { Chat } from './Chat';

import { NavigationActions } from 'react-navigation'
import firebase from '../dao/Banco';

import {
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';

export class Login extends Component {

  constructor(props) {
    super(props);
    this.login = new LoginDAO();
    this.nav = props.navigation;
    this.unsubscribe;

    this.state = {
      isLogado : 'loading'
    };
  }

  render() {
      if(this.state.isLogado == "false"){
        
        return (
            <View style={styles.container}>
              <StatusBar backgroundColor={'#44B7B2'}/>
              <FaceButton onPress={this._autenticar.bind(this)}/>
              <Text style={styles.txt}>Entrar com Facebook</Text>
            </View>
        );

      }else if(this.state.isLogado == "loading"){
        return null;
      }else{
        return null;
      }
  }

  _autenticar(){
    this.login.autenticar(this.nav);
  }

  componentDidMount(){
    console.log('did mount');
    this.unsubscribe = firebase.auth().onAuthStateChanged((userFirebase) => {
      
    console.log('authchange');

      if (userFirebase) {
    console.log('authchange true');
        this.setState({isLogado : "true"});
      }else{
    console.log('authchange false');
        this.setState({isLogado : "false"});
      }
  
    }); 
  }

  componentWillUnmount() {
    console.log('will unmount');
    this.unsubscribe();
  }

  componentDidUpdate(){
    
    console.log('did update');

    if(this.state.isLogado == "true"){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName : 'Main'})]
      });
      this.nav.dispatch(resetAction)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    txt : {
      marginTop : 16,
      fontFamily: 'Arial',
      fontSize: 18,
      color: '#3b5998'
    }
});