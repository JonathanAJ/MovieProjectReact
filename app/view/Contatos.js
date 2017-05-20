'use strict';

import React, { PureComponent } from 'react';
import {
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
  }

  render() {
    return (
      <View style={styles.container}>
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
    new UsuarioDAO().listUsers(this);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});