'use strict';

import React, { Component } from 'react';

import {
    Content
} from 'native-base';

import {
    StyleSheet,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';

import {Row, Col, Grid } from "react-native-easy-grid/";

import firebase from "../../dao/Banco";
import {formatDate} from "../../rout/Util";

import * as color from '../../assets/colors';
import styleBase from '../../assets/styles';

import {InterestDAO} from '../../dao/InterestDAO';

import Icon from "react-native-vector-icons/Ionicons";

import AnimationScreenMessage from '../../components/AnimationScreenMessage';

export class TabFilmeInteresses extends Component {

    constructor(props){
        super(props);

        this.filme = this.props.navigation.state.params.filme;
        this.interestDAO = new InterestDAO(this);

        this.state = {
            dataInterest : []
        };
    }

    componentWillMount(){
        this.interestDAO.listMyInterestByMovie(this.filme.id);
    }

    componentWillUnmount(){
        this.interestDAO.removeListenerMyInterestByMovie();
    }

    render() {

        if(this.state.dataInterest.length === 0){
            const voltar = () => this.props.navigation.goBack();
            return(
                <AnimationScreenMessage
                    animation={require("../../assets/anim/filmes.json")}
                    message={"Você não tem interesses nesse filme. Não fique por fora, compartilhe agora mesmo!"}
                    messageButton={"Ver outros Filmes"}
                    buttonPress={voltar}
                />
            );
        }else{
            return (
                <Content>
                    <FlatList
                        style={{flex: 1, backgroundColor: color.backgroundColor}}
                        data={this.state.dataInterest}
                        keyExtractor={(item) => item.id}
                        extraData={this.state}
                        renderItem={item => <MyInterestList interest={item.item} interestDAO={this.interestDAO} />}
                        />
                </Content>
            );
        }
    }
}

class MyInterestList extends Component{

    constructor(props){
        super(props);
        this.interest = this.props.interest;
    }

    render(){

        const dataFeed = this.interest;
        let userFeed = firebase.auth().currentUser;

        return(
            <Grid style={styles.container}>
                <Row>
                    <Col style={{ width: 70 }}>
                        <Image
                            style={styles.imagemList}
                            source={{uri: userFeed.photoURL}} />
                    </Col>
                    <Col style={styles.containerText}>
                        <Row>
                            <Text style={styleBase.txtLabelSmall}>
                                <Text numberOfLines={2} style={styles.titulo}>
                                    Você
                                </Text>
                                <Text numberOfLines={2}>
                                    {" tem interesse em assistir "}
                                </Text>
                                <Text numberOfLines={2} style={styles.titulo}>
                                    {dataFeed.movieName}
                                </Text>
                            </Text>
                        </Row>
                        <Row>
                            <Row size={75}>
                                <Text style={styleBase.txtLabelSmall}>
                                    <Text style={styles.subTitulo}>
                                        {dataFeed.descriptionSession}
                                    </Text>
                                </Text>
                            </Row>
                            <Row size={25} style={styles.containerData}>
                                <Text style={styleBase.txtLabelSmall}>
                                    <Text style={styles.subTitulo}>
                                        {formatDate(dataFeed.createdAt)}
                                    </Text>
                                </Text>
                            </Row>
                        </Row>
                    </Col>
                    <Col style={{width: 20, marginLeft: 8}}>
                        
                        <TouchableOpacity
                            onPress={
                                () => Alert.alert(
                                    'Deseja realmente excluir?',
                                    'Fazendo isto o interesse será excluído permanentemente',
                                    [
                                        {text: 'Cancel'},
                                        {
                                        text: 'OK',
                                        onPress: () => this.props.interestDAO.removeInterest(dataFeed.id)
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            }>

                            <Icon style={{marginTop: 8}} name="ios-close" size={40} color='red'/>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        paddingLeft: 16,
        paddingTop: 16,
        paddingRight: 16
    },
    containerText : {
        borderBottomColor: '#bbb',
        borderBottomWidth: 0.5
    },
    containerData : {
        paddingTop: 4,
        marginBottom: 16,
        justifyContent: "flex-end"
    },
    titulo : {
        color: color.accentColor,
        fontWeight: 'bold'
    },
    subTitulo : {
        fontSize : 12,
    },
    imagemList : {
        width: 55,
        height: 55,
        borderRadius: 100,
    }
});