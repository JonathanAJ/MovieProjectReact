'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';

import {SimpleList} from '../components/SimpleList';

export class Contatos extends Component {
  
  constructor(props) {
    super(props);
  
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.nav = this.props.navigation;

    let arrayTeste =
      [{
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'João Ferreira Sousa',
        email: 'joao@gmail.com',
      },
      {
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'Vitor Bernando Alencar',
        email: 'vitor@gmail.com',
      },{
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'João Ferreira Sousa',
        email: 'joao@gmail.com',
      },
      {
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'Vitor Bernando Alencar',
        email: 'vitor@gmail.com',
      },{
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'João Ferreira Sousa',
        email: 'joao@gmail.com',
      },
      {
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'Vitor Bernando Alencar',
        email: 'vitor@gmail.com',
      },{
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'João Ferreira Sousa',
        email: 'joao@gmail.com',
      },
      {
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'Vitor Bernando Alencar',
        email: 'vitor@gmail.com',
      },{
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'João Ferreira Sousa',
        email: 'joao@gmail.com',
      },
      {
        image: 'http://www.imran.com/xyper_images/icon-user-default.png',
        name: 'Vitor Bernando Alencar',
        email: 'vitor@gmail.com',
      }];

    this.state = {
      mensagem      : "",
      dataSource    : ds.cloneWithRows(arrayTeste),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          style={{flex: 1, paddingBottom: 20, marginBottom: 2}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <SimpleList user={rowData} nav={this.nav}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});