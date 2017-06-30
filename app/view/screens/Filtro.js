'use-strict';

import React, { Component } from 'react';
import firebase from '../../dao/Banco';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import * as color from '../../assets/colors';
import styleBase from '../../assets/styles';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Icon from "react-native-vector-icons/Ionicons";
import {Button} from "native-base";

export class Filtro extends Component {

	constructor(props) {
		super(props);

	}

	render() {

		const voltar = () => this.props.navigation.goBack();

		return (
			<Grid style={{backgroundColor: color.primaryColor, paddingLeft:32, paddingRight:32}}>
				<TouchableOpacity onPress={voltar}>
					<Icon style={{marginTop: 8}} name="ios-close" size={40} color='white'/>
				</TouchableOpacity>
				<View style={{marginTop: 8}}>
					<Text style={styleBase.txtInvertBigMedium}>
						FILTROS
					</Text>
				</View>
				<Col style={{marginTop: 32}}>
					<Row>
						<Text style={styleBase.txtInvertNormal}>
							Filmes
						</Text>
					</Row>
					<Row>
						<Button light bordered small>
							<Text style={styleBase.txtInvertExtraSmall}>Nome</Text>
						</Button>
					</Row>
				</Col>
				<Row style={{marginTop: 32}}>
					<Text style={styleBase.txtInvertNormal}>
						Cinemas
					</Text>
				</Row>
			</Grid>
		);
	}
}