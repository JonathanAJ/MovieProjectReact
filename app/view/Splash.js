'use-strict';

import React, { Component } from 'react';

import { NavigationActions } from 'react-navigation';
import firebase from '../dao/Banco';

import {
    Dimensions,
    Image,
    StatusBar
} from 'react-native';

import {
    Container
} from "native-base";

export class Splash extends Component {

    constructor(props) {
        super(props);

        this.nav = props.navigation;
        this.mounted = false;

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
        console.log('will mount splash');
        this.mounted = true;
    }

    componentDidMount(){
        setTimeout(() =>{
            this.goScreen();
        }, 2000);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    authListenerLogin = (userFirebase) => {
        let routString;

        if (userFirebase) {
            console.log('authchange true');
            routString = 'Main';
        }else{
            console.log('authchange false');
            routString = 'Login';
        }
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName : routString})
            ]
        });
        this.nav.dispatch(resetAction);
    }

    goScreen(){
        console.log(firebase.auth().currentUser);
        this.authListenerLogin(firebase.auth().currentUser);
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