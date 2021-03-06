'use strict';

import React, { Component } from 'react';

import {
    Image
} from 'react-native';

import {
    Content,
    Badge,
    Text,
} from 'native-base';

import {Row, Col, Grid } from "react-native-easy-grid/";

import firebase from "../../dao/Banco";

import styleBase from '../../assets/styles';

export class TabFilmeInfo extends Component {

    constructor(props){
        super(props);

        this.genero = "";
        this.filme = this.props.navigation.state.params.filme;
        this.state = {
            genero : this.genero
        };
    }

    componentWillMount(){

        firebase.database().ref('rede_filmes/genero/'+this.filme.genero).once('value', snap => {
            this.setState({
                genero : snap.val().tipo
            });
        });
    }

    render() {

        let filme = this.filme;

        const getClassificacao = () => {
            const idade = String(filme.idade);

            if(idade === "10")
                return "#0095D9";
            else if(idade === "12")
                return "#FFCC03";
            else if(idade === "14")
                return "#F6821F";
            else if(idade === "16")
                return "#EB1922";
            else if(idade === "18")
                return "black";
            else if(idade === "21")
                return "black";
            else
                return "#01A54F";
        };

        return (
            <Content>
                <Grid>
                    <Row>
                        <Image
                            style={{flex:1, height: 200}}
                            resizeMode="cover"
                            source={{uri: filme.imagem}}/>
                    </Row>
                    <Col style={{padding: 16, paddingTop: 16, paddingBottom: 0}}>
                        <Row>
                            <Badge style={{backgroundColor: getClassificacao()}}>
                                <Text style={styleBase.txtInvertNormal}>
                                    {filme.idade} anos
                                </Text>
                            </Badge>
                            <Badge primary style={{marginLeft: 16}}>
                                <Text style={styleBase.txtInvertNormal}>
                                    {this.state.genero}
                                </Text>
                            </Badge>
                        </Row>
                        <Col style={{marginTop: 16}}>
                            <Text style={styleBase.txtLabelBig}>
                                SINOPSE E DETALHES
                            </Text>
                            <Text style={{textAlign: "justify", marginTop: 16, marginBottom: 16}}>
                                <Text style={styleBase.txtLabelNormal}>
                                    {filme.sinopse}
                                </Text>
                            </Text>
                        </Col>
                    </Col>
                </Grid>
            </Content>
        );
    }
}