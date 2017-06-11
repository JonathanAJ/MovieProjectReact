'use-strict';

import React, { Component } from 'react';
import { LoginDAO } from '../dao/LoginDAO';

import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    StatusBar,
    Text,
} from 'react-native';

import {
    Button,
} from "native-base";

import {Grid, Row, Col} from "react-native-easy-grid";

import {
    IndicatorViewPager,
    PagerDotIndicator
} from 'rn-viewpager';

import Icon from "react-native-vector-icons/FontAwesome";
import IconLine from "react-native-vector-icons/SimpleLineIcons";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.login = new LoginDAO();
        this.nav = props.navigation;
        this.mounted = false;

        this.state = {
            largura : Dimensions.get("window").width,
            altura : Dimensions.get("window").height
        };

        Dimensions.addEventListener("change", (event)=> {
            if(this.mounted){
                this.setState({
                    largura: event.window.width,
                    altura: event.window.height
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
            <IndicatorViewPager
                style={{height: this.state.altura}}
                indicator={<PagerDotIndicator pageCount={3} />}>

                <View>
                    <Image
                        style={{flex: 1, width: this.state.largura}}
                        source={require("../assets/img/view_pager_init_1.png")}
                        resizeMode="cover">
                        <Grid>
                            <Row size={60} style={{justifyContent: 'center',alignItems: 'flex-end'}}>
                                <IconLine name="film" size={70} color={'white'}/>
                            </Row>
                            <Col size={40} >
                                <Text style={styles.txtTitleView}>
                                    FILMES
                                </Text>
                                <Text style={styles.txtView}>
                                    Veja os filmes em cartaz, conheça pessoas compatíveis com seus filmes e compartilhe suas preferências
                                </Text>
                            </Col>
                        </Grid>
                    </Image>
                </View>

                <View>
                    <Image
                        style={{flex: 1, width: this.state.largura}}
                        source={require("../assets/img/view_pager_init_2.png")}
                        resizeMode="cover">
                        <Grid>
                            <Row size={60} style={{justifyContent: 'center',alignItems: 'flex-end'}}>
                                <IconLine name="film" size={70} color={'white'}/>
                            </Row>
                            <Col size={40} >
                                <Text style={styles.txtTitleView}>
                                    AMIZADES
                                </Text>
                                <Text style={styles.txtView}>
                                    Faça novas amizades, comunique suas emoções ao ver um filme e tenha experiências cinematográficas
                                </Text>
                            </Col>
                        </Grid>
                    </Image>
                </View>

                <View>
                    <Image
                        style={{flex: 1, width: this.state.largura}}
                        source={require("../assets/img/view_pager_init_3.png")}
                        resizeMode="cover">
                        <StatusBar backgroundColor={'transparent'} translucent={true}/>
                        <Grid>
                            <Row size={60} style={{justifyContent: "center", alignItems: "flex-end", marginBottom: 40, marginTop: 16}}>
                                <Image
                                    style={{width:200, height:150}}
                                    source={require("../assets/img/logo.png")}/>
                            </Row>
                            <Row size={25} style={{justifyContent: "center"}}>
                                <Button
                                    title={""}
                                    style={{backgroundColor: '#44B7B2'}}
                                    onPress={this._autenticar.bind(this)}>
                                    <Icon name='facebook-square' size={20} color="white" />
                                    <Text style={{marginLeft: 15,color:'white'}}>Entrar com Facebook</Text>
                                </Button>
                            </Row>
                            <Row size={15} style={{justifyContent: "center"}}>
                                <Text style={{fontSize:12, color: "white", textAlign:"center", marginLeft:16, marginRight:16}}>
                                    Ao logar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                                </Text>
                            </Row>
                        </Grid>
                    </Image>
                </View>
            </IndicatorViewPager>
        );
    }
}

const styles = StyleSheet.create({
    txtTitleView: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
        textAlign:"center",
        margin: 16
    },
    txtView: {
        color: "white",
        textAlign:"center",
        marginLeft: 16,
        marginRight: 16,
    }
});