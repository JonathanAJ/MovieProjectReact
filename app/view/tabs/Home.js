'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    StatusBar,
    Text, TouchableOpacity, TouchableNativeFeedback
} from 'react-native';

import {
    Container,
    List
} from 'native-base';

import * as color from '../../assets/colors';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {formatDate} from "../../rout/Util";
import {InterestDAO} from "../../dao/InterestDAO";
import {Usuario} from "../../model/Usuario";
import firebase from '../../dao/Banco';

import styleBase from "../../assets/styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export class Home extends Component {

    constructor(props){
        super(props);
        this.nav = this.props.navigation;

        this.state = {
            dataFeed: [],
            mounted: false
        };

        this.interestDAO = new InterestDAO(this);
    }

    static navigationOptions = ({navigation}) => ({
        headerRight:
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('black', true)}
                delayPressIn={0}
                onPress={() => navigation.navigate('Filtro')}>
                <View style={{
                    height: 60,
                    width: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon name='settings' size={20} color={'white'} />
                </View>
            </TouchableNativeFeedback>
    });

    componentWillMount(){
        this.mounted = true;
        this.interestDAO.listInterest();
    }

    componentWillUnmount(){
        this.mounted = false;
        this.interestDAO.removeListerners();
    }

    render() {
        return (
            <Container style={{backgroundColor: color.backgroundColor}}>
                <StatusBar backgroundColor={color.darkPrimaryColor}/>
                <List
                    dataArray={this.state.dataFeed}
                    renderRow={
                        (dataFeed, sectionID, rowID) => <FeedList dataFeed={dataFeed}
                                                                  index={rowID}
                                                                  nav={this.nav}/>
                    } />
            </Container>
        );
    }
}

class FeedList extends Component{

    constructor(props){
        super(props);
        this.userFeed = new Usuario();
        this.userFeed = this.props.dataFeed.user;
        this.nav = this.props.nav;
    }

    _openChat = () => {
        if(this.userFeed.uid !== firebase.auth().currentUser.uid)
            this.nav.navigate('PerfilFriend', {user : this.userFeed});
        else
            this.nav.navigate('Perfil');
    };

    render(){

        const dataFeed = this.props.dataFeed;
        let userFeed = this.userFeed;
/*
        if(dataFeed.type === "interest"){*/

            return(
                <Grid style={styles.container}>
                    <Row>
                        <Col style={{ width: 70 }}>
                            <TouchableOpacity onPress={this._openChat}>
                                <Image
                                    style={styles.imagemList}
                                    source={{uri: userFeed.photoURL}} />
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.containerText}>
                            <Row>
                                <Text style={styleBase.txtLabelSmall}>
                                    <Text numberOfLines={2} style={styles.titulo}>
                                        {userFeed.displayName}
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
                    </Row>
                </Grid>
            );
/*
        }

        return null;*/
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