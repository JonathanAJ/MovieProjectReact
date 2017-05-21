'use strict';

import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';

import { UsuarioDAO } from '../dao/UsuarioDAO';
import { SimpleList } from '../components/SimpleList';

export class Contatos extends PureComponent {
  
  constructor(props) {
    super(props);

    this.nav = this.props.navigation;

    this.state = {
      dataContatos : [],
      isLoading : true,
    };

    this.usuarioDAO = new UsuarioDAO(this);
  }

  render() {
    return (
      <View style={styles.container}>
        
        <StatusBar backgroundColor={'#11A3A0'}/>

        <FlatList
          style={{flex: 1, paddingBottom: 20, marginBottom: 2}}
          data={this.state.dataContatos}
          renderItem={item => <SimpleList user={item.item} nav={this.nav}/>}
          keyExtractor={(item, index) => item.uid}
          extraData={this.state}
          />
      </View>
    );
  }

  componentDidMount(){
    console.log('Contatos DidMount')
    this.usuarioDAO.listUsers();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});