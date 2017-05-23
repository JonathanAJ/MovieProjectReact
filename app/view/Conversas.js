'use strict';

import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';

import { ConversaDAO } from '../dao/ConversaDAO';
import { SimpleList } from '../components/SimpleList';

import firebase from '../dao/Banco';

export class Conversas extends PureComponent {
  
  constructor(props) {
    super(props);

    this.nav = this.props.navigation;

    this.state = {
      dataConversas : [],
      isLoading : true,
    };

    this.conversaDAO = new ConversaDAO(this);
  }

  render() {
    return (
      <View style={styles.container}>
        
        <StatusBar backgroundColor={'#11A3A0'}/>

        <FlatList
          style={{flex: 1, paddingBottom: 20, marginBottom: 2}}
          data={this.state.dataConversas}
          renderItem={item => <SimpleList user={item.item} description={item.item.lastMessage} nav={this.nav}/>}
          keyExtractor={(item, index) => index}
          extraData={this.state}
          />
      </View>
    );
  }

  componentWillMount(){
    console.log('Conversas Will Mount')
    this.conversaDAO.init();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});