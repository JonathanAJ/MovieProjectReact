'use-strict';

import React, { Component } from 'react';
import firebase from '../../dao/Banco';

import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity, FlatList
} from 'react-native';

import * as color from '../../assets/colors';
import styleBase from '../../assets/styles';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Icon from "react-native-vector-icons/Ionicons";
import {Button} from "native-base";

import Animation from 'lottie-react-native';

export class Sobre extends Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        this.animation.play();
    }

    _voltar = () => this.props.navigation.goBack();

    render() {

        return (
			<Grid style={{backgroundColor: color.backgroundColor, paddingLeft:32, paddingRight:32}}>
				
                <TouchableOpacity onPress={this._voltar}>
					<Icon style={{marginTop: 8}} name="ios-close" size={40} color={color.darkPrimaryColor}/>
				</TouchableOpacity>
				
                <Row style={{height: 40}}>
					<View>
						<Text style={styleBase.txtInvertBigMedium}>
                            <Text style={{color: color.primaryColor}}>
							    SOBRE
                            </Text>
						</Text>
					</View>
				</Row>

                <Row size={25} style={{alignSelf: 'center'}}>
                    <Image
                        style={{width: 130, height: 100}}
                        source={require("../../assets/img/logo.png")}
                        />
                </Row>

                <Col size={50}>
                    <Text style={{marginTop: 16, textAlign: 'center'}}>
                        <Text style={styleBase.txtLabelNormal}>
                            O app Boraver se destina aqueles que adoram ver filmes e não perdem a oportunidade de estar ao lado de pessoas especiais. Comece agora mesmo procurando interesses de filmes.
                        </Text>
                    </Text>
                    <Text style={{marginTop: 16, textAlign: 'center'}}>
                        <Text style={styleBase.txtLabelNormal}>                         
                            Nos avalie na Play Store.
                        </Text>
                    </Text>
                </Col>

				<Row size={25}>
                    <Animation
                        ref={animation => {this.animation = animation;}}
                        style={{flex: 1, flexDirection: 'row'}}
                        loop={true}
                        source={require("../../assets/anim/stars.json")}
                        />
                </Row>
			</Grid>
        );
    }
}