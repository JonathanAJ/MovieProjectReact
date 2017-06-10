'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    StatusBar,
    Image
} from 'react-native';

import {
    Container,
    Content,
    H3,
    Badge,
    Text,
    Tab,
    Tabs,
    Header
} from 'native-base';

import {Row, Col, Grid } from "react-native-easy-grid/";

import firebase from "../../dao/Banco";

export class Filme extends Component {

    constructor(props){
        super(props);

        this.genero = "";

        this.filme = this.props.navigation.state.params.filme;

        this.state = {
            genero : this.genero
        }
    }

    static navigationOptions = ({navigation}) => ({
        title : navigation.state.params.filme.nome,
    });

    componentWillMount(){

        firebase.database().ref('rede_filmes/genero/'+this.filme.genero).once('value', snap => {
            this.setState({
                genero : snap.val().tipo
            });
        });

        // firebase.database().ref('rede_filmes/genero/'+this.filme.genero).once('value', snap => {
        //     this.setState({
        //         genero : snap.val().tipo
        //     });
        // });
    }

    render() {

        let filme = this.filme;

        return (
            <Container>
                {/*<Header hasTabs />*/}
                <Tabs tabStyle={{color: '#11A3A0'}} >
                    <Tab
                        heading="Filme"
                        tabStyle={{backgroundColor: '#11A3A0'}}
                        textStyle={{color: 'white'}}
                        activeTabStyle={{backgroundColor: '#11A3A0'}}
                        activeTextStyle={{color: 'white'}} >
                        <Content>
                            <StatusBar backgroundColor='#11A3A0' />
                            <Grid>
                                <Row>
                                    <Image
                                        style={{flex:1, height: 200}}
                                        resizeMode="cover"
                                        source={{uri: filme.imagem}}/>
                                </Row>
                                <Col style={{padding: 16, paddingTop: 16, paddingBottom: 0}}>
                                    <Row>
                                        <Badge info>
                                            <Text>{filme.idade} anos</Text>
                                        </Badge>
                                        <Badge primary style={{marginLeft: 16}}>
                                            <Text>{this.state.genero}</Text>
                                        </Badge>
                                    </Row>
                                    <Col style={{marginTop: 16}}>
                                        <H3>SINOPSE E DETALHES</H3>
                                        <Text style={{textAlign: "justify", marginTop: 16, marginBottom: 16}}>
                                            {filme.sinopse}
                                        </Text>
                                    </Col>
                                </Col>
                            </Grid>
                        </Content>
                    </Tab>
                    <Tab
                        heading="Sessão"
                        tabStyle={{backgroundColor: '#11A3A0'}}
                        textStyle={{color: 'white'}}
                        activeTabStyle={{backgroundColor: '#11A3A0'}}
                        activeTextStyle={{color: 'white'}} >

                        <Container>
                            <Content>
                                <Col style={{marginTop: 16}}>
                                    <H3>SESSÕES</H3>
                                </Col>
                            </Content>
                        </Container>

                    </Tab>
                    {/*<Tab*/}
                        {/*heading="Interesse"*/}
                        {/*tabStyle={{backgroundColor: '#11A3A0'}}*/}
                        {/*textStyle={{color: 'white'}}*/}
                        {/*activeTabStyle={{backgroundColor: '#11A3A0'}}*/}
                        {/*activeTextStyle={{color: 'white'}} >*/}


                        {/*<Container>*/}
                            {/*<Content>*/}
                                {/*<Col style={{marginTop: 16}}>*/}
                                    {/*<H3>INTERESSES</H3>*/}
                                {/*</Col>*/}
                            {/*</Content>*/}
                        {/*</Container>*/}

                    {/*</Tab>*/}
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});