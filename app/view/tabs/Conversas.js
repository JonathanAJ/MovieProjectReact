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

  componentDidUpdate(){
    if(this.state.dataConversas.length === 0)
      this.animation.play();
  }

  componentWillUnmount(){
      this.mounted = false;
      this.conversaDAO.removeListeners();
  }

  render() {
    if(this.state.dataConversas.length === 0){
      const voltar = () => this.props.navigation.goBack();
      return(
        <Grid style={{
            backgroundColor: color.primaryColor,
            alignItems: 'center'
            }}>
          <Row size={70}>
            <Animation
              ref={animation => {this.animation = animation;}}
              style={{flex: 1, flexDirection: 'row', backgroundColor: color.primaryColor}}
              loop={true}
              source={require("../../assets/anim/mailsent.json")}
            />
          </Row>
          <Row size={30}>
            <Text style={{textAlign: 'center', margin: 16, marginTop: 0}}>
              <Text style={styleBase.txtInvertNormal}>
                Você não tem conversas. Comece agora procurando filmes do seu interesse.
              </Text>
            </Text>
          </Row>
          <Row style={{height: 70}}>
            <Button
              style={{marginLeft: 16, marginTop: 8, marginBottom: 8}}
              onPress={voltar}
              light bordered >
              <Text style={styleBase.txtInvertExtraSmall}>
                Ir para Timeline
              </Text>
            </Button>
          </Row>
        </Grid>
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