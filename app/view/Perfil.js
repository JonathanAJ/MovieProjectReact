'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text
} from 'react-native';
import * as firebase from 'firebase';
import {LoginDAO} from '../dao/LoginDAO';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export class Perfil extends Component {

  constructor(props) {
    super(props);
  
    this.user = firebase.auth().currentUser;

    this.nav = props.navigation;

    this.state = {
      'user' : this.user
    };
  }

  render() {
    return (
      <View style={styles.content}>
        <Image
          style={styles.imagemPerfil}
          source={{uri: this.state.user.photoURL}}/>
        <Text style={styles.nome}>{this.state.user.displayName}</Text>
        <Text style={styles.email}>{this.state.user.email}</Text>
        <Icon.Button 
              style={styles.btSair}
              name="logout"
              size={15}
              backgroundColor="#3b5998"
              onPress={this._sair.bind(this)}>
          Sair
        </Icon.Button>
      </View>
    );
  }

  _sair(){
    new LoginDAO().sair(this.nav);
  }
}

const styles = StyleSheet.create({
  content :{
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  nome : {
    fontSize: 28,
    color: 'black'
  },
  email : {
    fontStyle: 'italic',
    marginBottom: 20
  },
  imagemPerfil : {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  btSair : {
    marginRight : 5,
  }
});