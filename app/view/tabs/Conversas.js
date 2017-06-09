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

export class Conversas extends PureComponent {
  
  constructor(props) {
    super(props);

    this.nav = this.props.navigation;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataConversas : ds.cloneWithRows([]),
      isLoading : true,
    };

    this.conversaDAO = new ConversaDAO(this);
  }

  render() {
    return (
      <View style={styles.container}>
        
        <StatusBar backgroundColor={'#11A3A0'}/>

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

  componentWillMount(){
    console.log('Conversas Will Mount');
    this.conversaDAO.initConversas();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});