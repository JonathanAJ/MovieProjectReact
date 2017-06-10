'use-strict';

import React, { Component } from 'react';
import { LoginDAO } from '../dao/LoginDAO';

import { NavigationActions } from 'react-navigation';
import firebase from '../dao/Banco';

import {
    Dimensions,
    Image,
    StatusBar
} from 'react-native';
import {
    H1,
    Button,
    Text,
    Spinner,
    Container
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";

import Icon from "react-native-vector-icons/FontAwesome";

export class Splash extends Component {

  constructor(props) {
    super(props);
    this.nav = props.navigation;

    this.state = {
        largura : Dimensions.get("window").width
    };

    Dimensions.addEventListener("change", (event)=> {
        if(this.mounted){
            this.setState({
                largura: event.window.width
            });
        }
    });
  }

    componentWillMount(){
        console.log('will mount');

    }

    componentDidMount(){
        setTimeout(() =>{
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName : 'Login'})
                ]
            });
            this.nav.dispatch(resetAction);

        }, 2000);
    }

    componentWillUnmount() {
        console.log('will unmount');

    }

    render() {
      return(
        <Container>
            <Image
                style={{flex: 1, width: this.state.largura}}
                source={require("../assets/img/gif_splash.gif")}
                resizeMode="cover">
                <StatusBar hidden={true}/>
            </Image>
        </Container>
      );
    }

}