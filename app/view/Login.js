'use-strict';

import React, { Component } from 'react';
import { LoginDAO } from '../dao/LoginDAO';

import {
    Dimensions,
    Image,
    StatusBar
} from 'react-native';

import {
    Button,
    Text,
    Container
} from "native-base";

import {Grid, Row, Col} from "react-native-easy-grid";

import Icon from "react-native-vector-icons/FontAwesome";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.login = new LoginDAO();
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

    _autenticar(){
        this.login.autenticar(this);
    }
    componentWillMount(){
        console.log('will mount');
        this.mounted = true;
    }

    componentWillUnmount() {
        console.log('will unmount');
        this.mounted = false;
        Dimensions.removeEventListener("change");
    }

    render() {
        return (
        <Container>
            <Image
                style={{flex: 1, width: this.state.largura}}
                source={require("../assets/img/pessoas_felizes.png")}
                resizeMode="cover">
                <StatusBar backgroundColor={'transparent'} translucent={true}/>
                <Grid>
                    <Row size={60} style={{justifyContent: "center", alignItems: "flex-end", marginBottom: 40, marginTop: 16}}>
                        <Image
                            style={{width:200, height:150}}
                            source={require("../assets/img/logo.png")}/>
                    </Row>
                    <Row size={30} style={{justifyContent: "center"}}>
                        <Button style={{backgroundColor: '#44B7B2'}} onPress={this._autenticar.bind(this)}>
                            <Icon name='facebook-square' size={20} color="white" />
                            <Text style={{marginLeft: 15,color:'white'}}>Entrar com Facebook</Text>
                        </Button>
                    </Row>
                    <Row size={10} style={{justifyContent: "center",alignItems:"flex-end"}}>
                        <Text style={{fontSize:12, color: "white", textAlign:"center", marginLeft:16, marginRight:16, marginBottom:16}}>
                            Ao logar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                        </Text>
                    </Row>
                </Grid>
            </Image>
        </Container>
        );
    }
}