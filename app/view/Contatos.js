'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';

import { UsuarioDAO } from '../dao/UsuarioDAO';
import { SimpleList } from '../components/SimpleList';

export class Contatos extends Component {
  
  constructor(props) {
    super(props);
  
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.nav = this.props.navigation;

    this.state = {
      dataSource    : this.ds.cloneWithRows([]),
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

  componentDidMount(){
    new UsuarioDAO().listUsers(this, this.ds);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});