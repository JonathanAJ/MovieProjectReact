'use strict';

import React, { Component } from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class Conversas extends Component {
  render() {
    return (
		<View>
	    	<StatusBar backgroundColor={'#11A3A0'}/>
	      	<Text>Conversas</Text>	
		</View>
    );
  }
}

const styles = StyleSheet.create({

});