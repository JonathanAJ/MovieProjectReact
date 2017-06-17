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
    Switch,
    Toast
} from 'native-base';
import Modal from 'react-native-modal'
import {Row, Col, Grid } from "react-native-easy-grid/";
import * as color from '../../assets/colors';
import styles from '../../assets/styles';
import {FilmeDAO} from "../../dao/FilmeDAO";
import {InterestDAO} from "../../dao/InterestDAO";
import firebase from "../../dao/Banco";

const arraySessoes = [];

export class TabFilmeSessoes extends React.Component{

    constructor(props){
        super(props);

        this.filme = this.props.navigation.state.params.filme;
        this.filmeDao = new FilmeDAO(this);
        this.state = {
            dataSessoes : [],
            isModalVisible: false
        };
    }

    componentWillMount(){
        this.filmeDao.getSessoesValue(this.filme.id);
    }

    _clickInteresse = () => {
        console.log(arraySessoes);
        this._showModal();
    };

    _saveInterest = () => {
        let msgToast;

        let count = 0;
        arraySessoes.forEach(obj =>{
            if(obj !== undefined)
                count++;
        });
        console.log('count', count);

        if(count > 0){
            const interest = {
                userUID : firebase.auth().currentUser.uid,
                userName : firebase.auth().currentUser.displayName,
                userPhoto : firebase.auth().currentUser.photoURL,
                movieName : this.filme.nome,
                movieImage : this.filme.imagem,
                arraySessionsID : arraySessoes
            };
            new InterestDAO(this).saveInterest(interest);
            msgToast = 'Compartilhado com sucesso!'

        }else{
            msgToast = 'Você deve selecionar pelo menos uma sessão.';
        }

        Toast.show({
            supportedOrientations: ['portrait','landscape'],
            text: msgToast,
            position: 'bottom',
            buttonText: 'Certo'
        });
        this._hideModal();
    };

    _modalSessao = () => {
        return(
            <View style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                padding: 16,
                borderRadius: 5
            }}>
                <Text style={{color: '#444', fontSize: 18}}>
                    Você tem certeza disto?
                </Text>
                <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                    <Button
                        onPress={this._hideModal}
                        transparent warning>
                        <Text>Cancelar</Text>
                    </Button>
                    <Button
                        onPress={this._saveInterest}
                        transparent success>
                        <Text>OK</Text>
                    </Button>
                </View>
            </View>
        );
    };

    _showModal = () => this.setState({ isModalVisible: true });

    _hideModal = () => this.setState({ isModalVisible: false });

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

                    <Modal
                        isVisible={this.state.isModalVisible}
                        animationIn={'slideInUp'}
                        animationOut={'slideOutDown'}>
                        {this._modalSessao()}
                    </Modal>
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