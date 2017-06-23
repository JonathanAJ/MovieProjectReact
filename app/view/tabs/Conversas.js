'use strict';

import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ListView,
} from 'react-native';

import { ConversaDAO } from '../../dao/ConversaDAO';
import { SimpleList } from '../../components/SimpleList';

import * as color from '../../assets/colors';

export class Conversas extends PureComponent {
  
  constructor(props) {
    super(props);

    this.nav = this.props.navigation;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataConversas : ds.cloneWithRows([]),
      isLoading : true,
    };
    this.mounted = false;

    this.conversaDAO = new ConversaDAO(this);
  }

  componentWillMount(){
      this.mounted = true;
      //console.log('Conversas Will Mount');
      this.conversaDAO.initConversas();
  }

  componentWillUnmount(){
      this.mounted = false;
      //console.log('Conversas Will Unmount');
      this.conversaDAO.removeListeners();
  }

  render() {
    return (
      <View style={styles.container}>
        
        <StatusBar backgroundColor={color.darkPrimaryColor}/>

        <ListView
          enableEmptySections={true}
          style={{flex: 1, paddingBottom: 20, marginBottom: 2}}
          dataSource={this.state.dataConversas}
          renderRow={item => <SimpleList user={item}
                                         nav={this.nav}
                                         date={item.createdAt}
                                         description={item.lastMessage} />}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor
  },
});