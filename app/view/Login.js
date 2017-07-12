'use-strict';

import React, { Component } from 'react';
import { LoginDAO } from '../dao/LoginDAO';

import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    StatusBar,
    Text
} from 'react-native';

import {
    Button
} from "native-base";

import {Grid, Row, Col} from "react-native-easy-grid";

import {
    IndicatorViewPager,
    PagerDotIndicator
} from 'rn-viewpager';

import Icon from "react-native-vector-icons/FontAwesome";
import IconLine from "react-native-vector-icons/SimpleLineIcons";

import * as color from '../assets/colors';

import styleBase from '../assets/styles';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.loginDAO = new LoginDAO();
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
    componentWillMount(){
        //console.log('will mount');
        this.mounted = true;
    }

    componentWillUnmount() {
        //console.log('will unmount');
        this.mounted = false;
        Dimensions.removeEventListener("change");
    }

    render() {

        const _autenticar = () => {
            this.loginDAO.autenticar(this);
        };

        return (
            <IndicatorViewPager
                style={{height: this.state.altura}}
                indicator={<PagerDotIndicator pageCount={3} />}>

                <View>

                    <StatusBar backgroundColor={'transparent'} translucent={true}/>
                    
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
                                    <Text style={styleBase.txtInvertBigMedium}>
                                        FILMES
                                    </Text>
                                </Text>
                                <Text style={styles.txtView}>
                                    <Text style={styleBase.txtInvertNormal}>
                                        Veja filmes em cartaz, conheça pessoas que curtam seus filmes e compartilhe suas preferências
                                    </Text>
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
                                <IconLine name="people" size={70} color={'white'}/>
                            </Row>
                            <Col size={40} >
                                <Text style={styles.txtTitleView}>
                                    <Text style={styleBase.txtInvertBigMedium}>
                                        AMIZADES
                                    </Text>
                                </Text>
                                    <Text style={styles.txtView}>
                                        <Text style={styleBase.txtInvertNormal}>
                                        Faça novas amizades, compartilhe sua pipoca e assista a bons filmes com pessoas diversas
                                    </Text>
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

                        <Grid>
                            <Row size={60} style={{justifyContent: "center", alignItems: "flex-end", marginBottom: 40, marginTop: 16}}>
                                <Image
                                    style={{width:200, height:150}}
                                    source={require("../assets/img/logo.png")}/>
                            </Row>
                            <Row size={25} style={{justifyContent: "center"}}>
                                <Button
                                    title={""}
                                    style={{backgroundColor: color.primaryColor}}
                                    onPress={_autenticar}>
                                    <Icon name='facebook-square' size={22} color="white" />
                                    <Text style={{marginLeft: 16}}>
                                        <Text style={styleBase.txtInvertNormal}>
                                            Entrar com Facebook
                                        </Text>
                                    </Text>
                                </Button>
                            </Row>
                            <Row size={15} style={{justifyContent: "center"}}>
                                <Text style={{fontSize:12, color: "white", textAlign:"center", marginLeft:16, marginRight:16}}>
                                    <Text style={styleBase.txtInvertExtraSmall}>
                                        Ao logar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                                    </Text>
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