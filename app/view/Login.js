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

export class Login extends Component {

  constructor(props) {
    super(props);
    this.login = new LoginDAO();
    this.nav = props.navigation;
    this.unsubscribe = null;
    this.mounted = false;

    this.state = {
        isLogado : 'loading',
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

  render() {
      if(this.state.isLogado === "false"){
        
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

      }else if(this.state.isLogado === "loading"){
        return(
            <Grid>
                <Col style={{justifyContent: "center",alignItems:"center"}}>
                    <Spinner color="#44B7B2" />
                </Col>
            </Grid>
        );
      }else{
        return null;
      }
  }

  _autenticar(){
    this.login.autenticar(this.nav);
  }

  componentWillMount(){
    console.log('will mount');
    this.mounted = true;
    this.unsubscribe = firebase.auth().onAuthStateChanged((userFirebase) => {
      
        console.log('authchange');

        if (userFirebase) {
            console.log('authchange true');
            this.setState({isLogado : "true"});
        }else{
            console.log('authchange false');
            this.setState({isLogado : "false"});
        }
  
    }); 
  }

  componentWillUnmount() {
    console.log('will unmount');
    this.mounted = false;
    this.unsubscribe();
    Dimensions.removeEventListener("change");
  }

  componentDidUpdate(){
    
    console.log('did update');

    if(this.state.isLogado === "true"){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName : 'Main'})]
      });
      this.nav.dispatch(resetAction);
    }
  }
}