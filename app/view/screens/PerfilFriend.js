'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';

import {
    Grid,
    Col,
    Row
} from "react-native-easy-grid";

import{
    Button,
    Text,
    Spinner
} from "native-base";

import * as color from "../../assets/colors";
import styleBase from "../../assets/styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {RoundIconButton} from "../../components/RoundIconButton";
import { NavigationActions } from 'react-navigation';

import {UsuarioDAO} from '../../dao/UsuarioDAO';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/customIcon/config_pop_light.json';
const IconCustom = createIconSetFromFontello(fontelloConfig);

export class PerfilFriend extends Component {

    constructor(props) {
        super(props);

        this.nav = this.props.navigation;

        this.user = this.props.navigation.state.params.user;

        this.state = {
            user : this.user,
        }
    }

    componentWillMount(){
        UsuarioDAO.listUserById(this.user.uid, (user) =>{
            console.log(user);
            this.setState({
                user : user
            });
        });
    }

    navigateBack = () => {
        this.nav.goBack();
    };

    navigateChat = () => {
        this.nav.navigate('Chat', {user : this.user});
    };

    render() {
        
        const voltar = () => this.props.navigation.goBack();
        const user = this.state.user;

        return (

            <Image
                style={{flex: 1, width: Dimensions.get("window").width}}
                source={{uri:  user.photoLargeURL ? user.photoLargeURL : user.photoURL}}
                blurRadius={3}
                resizeMode="cover">

                <StatusBar backgroundColor={'transparent'} translucent={true}/>
                <Grid>
                
                    <TouchableOpacity
                        style={{marginLeft: 24, marginTop: 24}}
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
                    
                        <Text style={{marginLeft: 8, marginTop: 24}}>
                            <Text style={styleBase.txtInvertExtraSmall}>
                                CURTIDAS
                            </Text>
                        </Text>
                    </View>

                    <FlatList
                        data={user.movies ? user.movies.data : []}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <ListButton item={item} {...this.props} />}
                    />

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