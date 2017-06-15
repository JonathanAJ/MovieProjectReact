'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import {
    Text,
    Button,
    List,
    Switch
} from 'native-base';

import {Row, Col, Grid } from "react-native-easy-grid/";

import * as color from '../../assets/colors';
import styles from '../../assets/styles';

import {FilmeDAO} from "../../dao/FilmeDAO";

const arraySessoes = [];

export class TabFilmeSessoes extends React.Component{

    constructor(props){
        super(props);

        this.filme = this.props.navigation.state.params.filme;
        this.filmeDao = new FilmeDAO(this);
        this.state = {
            dataSessoes : []
        };
    }

    componentWillMount(){
        this.filmeDao.getSessoesValue(this.filme.id);
    }

    _clickInteresse = () =>{
        console.log(arraySessoes)
    };

    render() {
        return (
            <Grid>
                <Row>
                    <List
                        dataArray={this.state.dataSessoes}
                        renderRow={(sessao, sectionID, rowID) => <SessaoList sessao={sessao} index={rowID} />} />
                </Row>
                <Row style={{height: 50}}>
                    <Button
                        onPress={this._clickInteresse}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            height: 50,
                            backgroundColor: color.darkPrimaryColor
                        }} full dark>
                        <Text>Tenho Interesse</Text>
                    </Button>
                </Row>
            </Grid>
        );
    }
}

class SessaoList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            valueSwitch : true
        };
        arraySessoes[this.props.index] = this.props.sessao.id;
    }

    _valueSwitchChange = (event) => {

        if(event === true){
            arraySessoes[this.props.index] = this.props.sessao.id;
        }else{
            arraySessoes[this.props.index] = undefined;
        }

        this.setState({
            valueSwitch: event
        });
    };

    render() {

        const sessao = this.props.sessao;

        return (
            <View>
                <Grid>
                    <Row
                        style={{
                            borderColor: '#bbb',
                            borderTopWidth:0.5,
                            borderBottomWidth: 0.5,
                            padding: 8,
                            paddingLeft:8,
                        }}>
                        <Switch value={this.state.valueSwitch}
                         onValueChange={this._valueSwitchChange}/>
                        <Text style={{color: color.darkPrimaryColor, fontWeight: 'bold', paddingLeft: 8}}>
                            {sessao.cinema.nome}
                        </Text>
                    </Row>
                    <Row style={{alignItems: 'flex-start', padding: 16, paddingTop: 8}}>
                        <Col size={30}>
                            <Text style={styles.txtLabelTiny}>
                                horário
                            </Text>
                            <Text style={styles.txtLabelNormal} numberOfLines={1}>
                                {sessao.horario}
                            </Text>
                        </Col>
                        <Col size={20}>
                            <Text style={styles.txtLabelTiny}>
                                sala
                            </Text>
                            <Text style={styles.txtLabelNormal} numberOfLines={1}>
                                {sessao.sala}
                            </Text>
                        </Col>
                        <Col size={20}>
                            <Text style={styles.txtLabelTiny}>
                                modo
                            </Text>
                            <Text style={styles.txtLabelNormal} numberOfLines={1}>
                                {sessao.modo}
                            </Text>
                        </Col>
                        <Col size={30}>
                            <Text style={styles.txtLabelTiny}>
                                tipo
                            </Text>
                            <Text style={styles.txtLabelNormal} numberOfLines={1}>
                                {sessao.tipo}
                            </Text>
                        </Col>
                    </Row>
                </Grid>
            </View>

        );
    }
}