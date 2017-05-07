'use-strict'

import React, { Component } from 'react';
import FaceButton from '../components/FaceButton';
import LoginDAO from '../dao/LoginDAO';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class Login extends Component {
  
  static navigationOptions = {
    title: 'Login',
    headerTintColor: '#fff',
    headerStyle: {backgroundColor: '#3b5998'}
  };

  constructor(props) {
    super(props);
    this.login = new LoginDAO();
    this.navigate = props.navigation;
  }

  render() {
    return (
      <View style={styles.container}>
        <FaceButton onPress={this.autenticar().bind(this)}/>
        <Text style={styles.txt}>Entrar com Facebook</Text>
      </View>
    );
  }

  autenticar(){
    this.login.autenticar(this.navigate);
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