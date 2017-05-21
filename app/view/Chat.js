'use-strict'

import React, { Component } from 'react';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { Mensagem } from '../components/Mensagem'
import { UsuarioDAO } from '../dao/UsuarioDAO';
import { MensagemDAO } from '../dao/MensagemDAO';
import firebase from '../dao/Banco';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {
  StyleSheet,
  TextInput,
  View,
  ListView,
  Text,
  Button,
  StatusBar,
  TouchableOpacity
} from 'react-native';

export class Chat extends Component {

  constructor(props) {
    super(props);
  
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const { params } = this.props.navigation.state;

    this.userChat = params.user;
    this.userCurrent = firebase.auth().currentUser

    this.state = {
      mensagem      : "",
      dataSource    : this.ds.cloneWithRows([]),
    };

    this.mounted = false;

    this.mensagemDAO = new MensagemDAO(this, this.userCurrent, this.userChat);
  }

  static navigationOptions = ({navigation}) => ({
    title : navigation.state.params.user.name,
  });

  render() {
    const { params } = this.props.navigation.state;
    const {goBack} = this.props.navigation;
    return (
      <View style={style.container}>

        <StatusBar backgroundColor={'#11A3A0'}/>
        
        <ListView
          enableEmptySections={true}
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          style={{flex: 1, paddingBottom: 20, marginBottom: 2, padding: 8}}
          dataSource={this.state.dataSource}
          renderRow={rowData => <Mensagem data={rowData} />}
        />

        <View style={style.rootInputChat}>
          <TextInput
            style={style.textInput}
            multiline={true}
            numberOfLines={2}
            selectionColor="#444"
            underlineColorAndroid="transparent"
            placeholder="Escreva uma mensagem..."
            value={this.state.mensagem}
            onChangeText={(text) => this.setState({mensagem : text})}
            onSubmitEditing={this.updateMensagem} />

          <TouchableOpacity style={style.btnSend} onPress={this.updateMensagem}>
              <Icon name={'cursor'} size={35} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  updateMensagem = () => {
    let mensagem = this.state.mensagem;

    if(mensagem){
      console.log("mes"+mensagem)
      this.mensagemDAO.criarMensagem(mensagem);
      this.setState({
        mensagem:"",
      });
    }
  }

  componentWillMount(){
    this.mensagemDAO.iniciaChat();
  }

  componentDidMount(){
    this.mounted = true;
  }

  componentWillUnmount(){
    console.log('willUnmount Chat')
    this.mensagemDAO.offListarMensagens();
    this.mounted = false;
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootInputChat :{
    flex: 0,
    height: 54,
    elevation: 20,
    flexDirection: 'row',
    backgroundColor: '#CFEFFC'
  },
  btnSend:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 12,
    borderColor: '#bcbcbc',
    borderLeftWidth: 1,
  },
  textInput: {
    flex: 4,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    color: '#444',
    marginLeft: 16,
    marginRight: 4
  }
});