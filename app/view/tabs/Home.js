'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';

import {
    Container
} from 'native-base';

import * as color from '../../assets/colors';

export class Home extends Component {
  render() {
    return (
        <Container style={{backgroundColor: color.backgroundColor}}>
            <StatusBar backgroundColor={color.darkPrimaryColor}/>
        </Container>
    );
  }
}

const styles = StyleSheet.create({

});