'use strict';

import React, { Component } from 'react';
import * as firebase from "firebase";

import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

export class Perfil extends Component {

  constructor(props) {
    super(props);
  
    this.user = firebase.auth().currentUser;

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
      </View>
    );
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
    fontStyle: 'italic'
  },
  imagemPerfil : {
    width: 200,
    height: 200,
    borderRadius: 100
  }
});