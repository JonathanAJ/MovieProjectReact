'use-strict'

import React, { Component } from 'react';
import Mensagem from './components/Mensagem'
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Banco from './dao/Banco';
import UsuarioDAO from './dao/UsuarioDAO';

import {
  StyleSheet,
  TextInput,
  View,
  ListView,
  Text
} from 'react-native';

export default class BatePapoReact extends Component {

  constructor(props) {
    super(props);
  
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      mensagem      : "",
      dataSource    : ds.cloneWithRows([]),
    };

    const bd = new Banco();
    bd.init();
  }

  render() {
    return (
      <View style={style.container}>

        <ListView
          enableEmptySections={true}
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          style={{flex: 1, paddingBottom: 20, marginBottom: 2}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Mensagem texto={rowData[0]} isMy={rowData[1]} />}
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

    let usuario = new UsuarioDAO(mensagem);
    usuario.save();
    
    let novoArray = this.state.dataSource._dataBlob.s1.slice(0);
    novoArray.unshift([mensagem, false]);
    this.setState({
      mensagem:"",
      dataSource: this.state.dataSource.cloneWithRows(novoArray)
    });
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
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