'use strict';

import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import Animation from 'lottie-react-native';

import { ConversaDAO } from '../../dao/ConversaDAO';
import { SimpleList } from '../../components/SimpleList';

import * as color from '../../assets/colors';

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
    console.log('data', this.state.dataConversas);
    if(this.state.dataConversas.length === 0){
      return(
        <View style={styles.container}>
          <Animation
            ref={animation => {this.animation = animation;}}
            style={{flex: 1, flexDirection: 'row', backgroundColor: color.primaryColor}}
            loop={true}
            source={require("../../assets/anim/mailsent.json")}
          />
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
          <FlatList
            style={{flex: 1, paddingBottom: 20, marginBottom: 2}}
            data={this.state.dataConversas}
            keyExtractor={(item) => item.keyChat}
            extraData={this.state}
            renderItem={item => <SimpleList user={item.item}
                                          nav={this.nav}
                                          date={item.item.createdAt}
                                          description={item.item.lastMessage} />}
            />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor
  },
});