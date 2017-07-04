'use strict';

import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';

import {
  Button
} from 'native-base';

import {
  Grid,
  Row,
  Col
} from 'react-native-easy-grid';

import Animation from 'lottie-react-native';

import AnimationScreenMessage from "../../components/AnimationScreenMessage";

import { ConversaDAO } from '../../dao/ConversaDAO';
import { SimpleList } from '../../components/SimpleList';

import * as color from '../../assets/colors';
import styleBase from '../../assets/styles';

export class Conversas extends PureComponent {
  
  constructor(props) {
    super(props);

    this.nav = this.props.navigation;
    this.state = {
      dataConversas : [],
      isLoading : true,
    };
    this.mounted = false;

    this.conversaDAO = new ConversaDAO(this);
  }

  componentWillMount(){
      this.mounted = true;
      this.conversaDAO.initConversas();
  }

  componentWillUnmount(){
      this.mounted = false;
      this.conversaDAO.removeListeners();
  }

  render() {
    if(this.state.dataConversas.length === 0){
      const voltar = () => this.props.navigation.goBack();
      return(
        <AnimationScreenMessage
          animation={require("../../assets/anim/mailsent.json")}
          message={"Você não tem conversas. Comece agora procurando filmes do seu interesse."}
          messageButton={"Ir para Timeline"}
          buttonPress={voltar}
          />
      );
    }else{
      return(
          <FlatList
            style={{flex: 1, backgroundColor: color.backgroundColor}}
            data={this.state.dataConversas}
            keyExtractor={(item) => item.keyChat}
            extraData={this.state}
            renderItem={item => <SimpleList user={item.item}
                                          nav={this.nav}
                                          date={item.item.createdAt}
                                          description={item.item.lastMessage} />}
            />
      );
    }
  }
}