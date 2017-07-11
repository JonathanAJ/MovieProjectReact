'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    FlatList,
    View,
    Text
} from 'react-native';

import {
    Grid,
    Col,
    Row
} from "react-native-easy-grid";

import{
    Button,
    Spinner,
    Segment,
    Content
} from "native-base";

import * as color from "../../assets/colors";
import styleBase from "../../assets/styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {RoundIconButton} from "../../components/RoundIconButton";
import { NavigationActions } from 'react-navigation';

import {UsuarioDAO} from '../../dao/UsuarioDAO';
import {SessaoDAO} from '../../dao/SessaoDAO';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/customIcon/config_pop_light.json';
const IconCustom = createIconSetFromFontello(fontelloConfig);

export class PerfilFriend extends Component {

    constructor(props) {
        super(props);

        this.nav = this.props.navigation;

        this.user = this.props.navigation.state.params.user;
        this.interest = this.props.navigation.state.params.interest;

        this.state = {
            user : this.user,
            isSession : true,
            dataSessions : []
        }

        this.sessaoDAO = new SessaoDAO(this);

        console.log(this.interest);
    }

    componentWillMount(){
        UsuarioDAO.listUserById(this.user.uid, (user) => {
            console.log(user);
            this.setState({
                user : user
            });
        });

        this.sessaoDAO.listSessions(this.interest.arraySessionsID);
    }

    navigateBack = () => {
        this.nav.goBack();
    };

    navigateChat = () => {
        this.nav.navigate('Chat', {user : this.user});
    };

    render() {
        
        const _toggleSession = () => this.setState({isSession: !this.state.isSession});
        const voltar = () => this.props.navigation.goBack();
        const user = this.state.user;

        return (

            <Image
                style={{flex: 1, width: Dimensions.get("window").width}}
                source={{uri:  user.photoLargeURL ? user.photoLargeURL : user.photoURL}}
                blurRadius={3}
                resizeMode="cover">

                    <View
                        style={{
                            position: 'absolute',
                            height: Dimensions.get("window").height,
                            width: Dimensions.get("window").width,
                            backgroundColor: 'black',
                            opacity: 0.3
                        }}
                    />

                    <StatusBar backgroundColor={'transparent'} translucent={true}/>

                    <Grid>
                    
                        <TouchableOpacity
                            style={{marginLeft: 24, marginTop: 16}}
                            onPress={voltar}>
                            <Ionicons style={{marginTop: 8}} name="ios-close" size={40} color='white'/>
                        </TouchableOpacity>
                        
                        <View style={{alignContent: 'center', alignItems: 'center'}}>
                            <Image
                                style={styles.imagemPerfil}
                                source={{uri: user.photoLargeURL ? user.photoLargeURL : user.photoURL}}/>
                            
                            <Text style={styleBase.txtInvertBig}>
                                {user.displayName}
                            </Text>

                            <Text style={styleBase.txtInvertNormal}>
                                {user.status}
                            </Text>
                        </View>

                        <Segment style={{backgroundColor: 'transparent', height: 40}} >
                            <Button
                                onPress={_toggleSession}
                                first light={this.state.isSession}>
                                <Text
                                    style={{
                                        color: this.state.isSession ? '#444' : 'white'
                                    }}>
                                    <Text style={styleBase.txtFontRegular}>Sessões</Text>
                                </Text>
                            </Button>
                            <Button
                                onPress={_toggleSession}
                                last light={!this.state.isSession}>
                                <Text
                                    style={{
                                        color: !this.state.isSession ? '#444' : 'white'
                                    }}>
                                    <Text style={styleBase.txtFontRegular}>Curtidas</Text>
                                </Text>
                            </Button>
                        </Segment>

                        {
                            this.state.isSession ?
                                <FlatList
                                    data={this.state.dataSessions}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => <SessaoList sessao={item} {...this.props} />}
                                />
                                :
                                <FlatList
                                    data={user.movies ? user.movies.data : []}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => <ListButton item={item} {...this.props} />}
                                />
                            
                        }

                        <Row style={{height: 80, alignItems: 'flex-end'}}>
                            <Col style={{alignItems: 'flex-end'}}>
                                <RoundIconButton
                                    onPress={this.navigateBack}
                                    color="white"
                                    icon={<IconCustom name="flashlight" color="red" size={30} />}
                                />
                            </Col>
                            <Col style={{alignItems: 'flex-start'}}>
                                <RoundIconButton
                                    onPress={this.navigateChat}
                                    icon={<IconCustom name="popcorn" color="green" size={30} />}
                                />
                            </Col>
                        </Row>
                    </Grid>
            </Image>
        );
    }
}

export class ListButton extends Component {
    render() {

		const item = this.props.item;

        return (
            <View style={{alignSelf: 'center'}}>
                <Button
                    style={{marginLeft: 16, marginTop: 8, marginBottom: 8}}
                    light bordered >
                    <Text style={styleBase.txtInvertExtraSmall}>
                        {item.name}
                    </Text>
                </Button>
            </View>

        );
    }
}

class SessaoList extends React.Component{
    
    render() {

        const sessao = this.props.sessao;

        return (
            <View>
                <Grid>
                    <Row
                        style={{
                            alignSelf: 'center',
                            borderColor: 'white',
                            borderBottomWidth: 0.5,
                            padding: 8
                        }}>
                        <Text>
                            <Text style={styleBase.txtInvertTiny} numberOfLines={1}>
                                {sessao.cinema.nome}
                            </Text>
                        </Text>
                    </Row>
                    <Row style={{alignItems: 'flex-start', padding: 16, paddingTop: 8}}>
                        <Col size={30}>
                            <Text style={styleBase.txtInvertSmall}>
                                horário
                            </Text>
                            <Text style={styleBase.txtInvertTiny} numberOfLines={1}>
                                {sessao.horario}
                            </Text>
                        </Col>
                        <Col size={20}>
                            <Text style={styleBase.txtInvertSmall}>
                                sala
                            </Text>
                            <Text style={styleBase.txtInvertTiny} numberOfLines={1}>
                                {sessao.sala}
                            </Text>
                        </Col>
                        <Col size={20}>
                            <Text style={styleBase.txtInvertSmall}>
                                modo
                            </Text>
                            <Text style={styleBase.txtInvertTiny} numberOfLines={1}>
                                {sessao.modo}
                            </Text>
                        </Col>
                        <Col size={30}>
                            <Text style={styleBase.txtInvertSmall}>
                                tipo
                            </Text>
                            <Text style={styleBase.txtInvertTiny} numberOfLines={1}>
                                {sessao.tipo}
                            </Text>
                        </Col>
                    </Row>
                </Grid>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    imagemPerfil : {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 4,
        borderColor: 'white',
        borderWidth: 1
    }
});