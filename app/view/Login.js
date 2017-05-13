'use-strict'

import React, { Component } from 'react';
import FaceButton from '../components/FaceButton';
import LoginDAO from '../dao/LoginDAO';
import Chat from './Chat';

import { NavigationActions } from 'react-navigation'
import * as firebase from "firebase";

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

    this.state = {
      isLogado : 'loading'
    };
  }

  render() {
      if(this.state.isLogado == "loading"){
        
        return (
          <View style={styles.container}>
            <StatusBar backgroundColor={'#2E4678'}/>
            <Text style={styles.txt}>Loading...</Text>
          </View>
        );

      }else if(this.state.isLogado == "false"){
        
        return (
            <View style={styles.container}>
              <StatusBar backgroundColor={'#2E4678'}/>
              <FaceButton onPress={this.autenticar.bind(this)}/>
              <Text style={styles.txt}>Entrar com Facebook</Text>
            </View>
        );

      }else{
        return null;
      }
  }

  autenticar(){
    this.login.autenticar(this.nav);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((userFirebase) => {
      
      if (userFirebase) {
        this.setState({isLogado : "true"});
      }else{
        this.setState({isLogado : "false"});
      }
  
    }).bind(this);
  }

  componentDidUpdate(){
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