'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Image,
    // Text
} from 'react-native';

import {
    Grid,
    Col,
    Row
} from "react-native-easy-grid";

import{
    Button,
    Text
} from "native-base";

import * as color from "../../assets/colors";
import stylesBase from "../../assets/styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {RoundIconButton} from "../../components/RoundIconButton";
import { NavigationActions } from 'react-navigation';

export class PerfilFriend extends Component {

    constructor(props) {
        super(props);
        this.user = this.props.navigation.state.params.user;
        this.nav = this.props.navigation;
    }

    navigateBack = () => {
        this.nav.goBack();
    };

    navigateChat = () => {
        this.nav.navigate('Chat', {user : this.user});
    };

    render() {

        const user = this.user;

        return (
            <Grid style={{backgroundColor: color.backgroundColor}}>
                <Row >
                    <Col style={{alignContent: 'center', alignItems: 'center'}}>
                        <Image
                            style={styles.imagemPerfil}
                            source={{uri: user.photoURL}}/>
                        <Text style={stylesBase.txtLabelBig}>
                            {user.displayName}
                        </Text>
                        <Text style={stylesBase.txtLabelNormal}>
                            {user.displayName}
                        </Text>
                    </Col>
                </Row>
                <Row style={{alignItems: 'flex-end'}}>
                    <Col style={{alignItems: 'flex-end'}}>
                        <RoundIconButton
                            onPress={this.navigateBack}
                            colorRipple="red"
                            icon={<Icon name="dislike" color="red" size={30} />}
                        />
                    </Col>
                    <Col style={{alignItems: 'flex-start'}}>
                        <RoundIconButton
                            onPress={this.navigateChat}
                            colorRipple="green"
                            icon={<Icon name="like" color="green" size={30} />}
                        />
                    </Col>
                </Row>

            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    imagemPerfil : {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 16
    }
});