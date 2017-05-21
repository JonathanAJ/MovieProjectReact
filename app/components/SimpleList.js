'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

export class SimpleList extends Component {

	constructor(props) {
		super(props);
	
		this.user = this.props.user

		this.state = {

		};
    
    console.log(this.user)
	}

	render() {
		return (
		  <TouchableOpacity style={styles.container} onPress={this._onPress.bind(this)}>
        <Image
          style={styles.imagemList}
          source={{uri: this.user.photo}} />
        <View>
        	 <Text style={styles.titulo}>{this.user.name}</Text>
      	   <Text style={styles.subTitulo}>{this.user.email}</Text>
        </View>
		  </TouchableOpacity>
		);
	}

	_onPress(){
	    this.props.nav.navigate('Chat', {user : this.user});
	}

}

const styles = StyleSheet.create({
  container : {
    borderColor: '#999',
    borderBottomWidth: 1,
  	flex: 1,
  	flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  titulo : {
  	margin: 4,
  	color: 'black',
  	fontSize : 18,
  },
  subTitulo : {
  	marginLeft: 10,
  	fontStyle: 'italic',
  	fontSize : 12,
  },
  imagemList : {
  	margin: 4,
    width: 50,
    height: 50,
    borderRadius: 100,
  }
});