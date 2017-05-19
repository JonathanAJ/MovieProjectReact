'use-strict'

import React, { Component } from 'react';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { Mensagem } from '../components/Mensagem'
import { UsuarioDAO } from '../dao/UsuarioDAO';
import { MensagemDAO } from '../dao/MensagemDAO';
import * as firebase from "firebase";

import {
  StyleSheet,
  TextInput,
  View,
  ListView,
  Text,
  Button,
  StatusBar
} from 'react-native';

export class Chat extends Component {

  constructor(props) {
    super(props);
  
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const { params } = this.props.navigation.state;

    this.userChat = params.user;
    this.userCurrent = firebase.auth().currentUser

    this.mensagemDAO = new MensagemDAO();

    this.state = {
      mensagem      : "",
      dataSource    : ds.cloneWithRows([]),
    };

    this.mensagemDAO.listarMensagens(this, ds, this.userCurrent, this.userChat)
  }

  static navigationOptions = ({navigation}) => ({
    title : navigation.state.params.user.name,
  });

  render() {
    const { params } = this.props.navigation.state;
    const {goBack} = this.props.navigation;
    return (
      <View style={style.container}>

        <StatusBar backgroundColor={'#2E4678'}/>
        
        <ListView
          enableEmptySections={true}
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          style={{flex: 1, paddingBottom: 20, marginBottom: 2}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Mensagem data={rowData} />}
        />
        
        <TextInput
          style={style.textInput}
          multiline={true}
          numberOfLines={2}
          selectionColor="#444"
          underlineColorAndroid="transparent"
          placeholder="Escreva uma mensagem..."
          value={this.state.mensagem}
          onChangeText={(text) => this.setState({mensagem : text})}
          onSubmitEditing={this._updateMensagem.bind(this)}
        />
      
      </View>
    );
  }

  _updateMensagem() {
    let mensagem = this.state.mensagem;

    this.mensagemDAO.criarMensagem(this.userCurrent, this.userChat, mensagem);
    
    // let novoArray = this.state.dataSource._dataBlob.s1.slice(0);
    // novoArray.unshift([mensagem, true]);
    // this.setState({
    //   mensagem:"",
    //   dataSource: this.state.dataSource.cloneWithRows(novoArray)
    // });
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    height: 45,
    borderColor: 'transparent',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    color: '#444',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 6
  }
});