'use strict';

import React, { PureComponent } from 'react';

import {
  FlatList,
} from 'react-native';

import AnimationScreenMessage from "../../components/AnimationScreenMessage";

import { AmigosDAO } from '../../dao/AmigosDAO';
import { SimpleList } from '../../components/SimpleList';

import * as color from '../../assets/colors';

export class Amigos extends PureComponent {
  
  constructor(props) {
    super(props);

    this.nav = this.props.navigation;
    this.state = {
      dataAmigos : []
    };

    this.amigosDAO = new AmigosDAO(this);
  }

  componentWillMount(){
      this.amigosDAO.listFriends();
  }

  render() {
    if(this.state.dataAmigos.length === 0){
      const voltar = () => this.props.navigation.goBack();
      return(
        <AnimationScreenMessage
          animation={require("../../assets/anim/search.json")}
          message={"Você não tem amigos que usam o app ainda. Comece convidando-os agora..."}
          messageButton={"Convidar amigos"}
          buttonPress={voltar}
          />
      );
    }else{
      return(
          <FlatList
            style={{flex: 1, backgroundColor: color.backgroundColor}}
            data={this.state.dataAmigos}
            keyExtractor={(item, index) => index}
            extraData={this.state}
            renderItem={item => <SimpleList
                                    onPress={() => null}
                                    user={item.item}
                                    nav={this.nav} />}
            />
      );
    }
  }
}