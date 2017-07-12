'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	Image,
    TouchableNativeFeedback,
	View,
} from 'react-native';

import {formatDate} from '../rout/Util';

import {
	Grid,
	Col,
	Row,
    Text,
} from 'native-base';

import * as color from "../assets/colors";
import {Usuario} from "../model/Usuario";

import styleBase from "../assets/styles";

export class SimpleList extends Component {

	constructor(props) {
		super(props);

		this.user = new Usuario();
		this.user = this.props.user;
		this.description = this.props.description;

		this.state = {

		};
	}

	_onPress(){
		if(!this.props.onPress){
			this.props.nav.navigate('Chat', {user : this.user});
		}else{
			this.props.onPress;
		}
	}

	render() {
		console.log(this.user);
		return (
		<TouchableNativeFeedback
			useForeground={true}
			background={TouchableNativeFeedback.Ripple(color.primaryColor, false)}
			delayPressIn={0}
			onPress={this._onPress.bind(this)}>
			<Grid pointerEvents='box-only' style={styles.container}>
				<Row>
					<Col style={{ width: 70 }}>
						<Image
							style={styles.imagemList}
							source={{uri: this.user.photoURL}} />
					</Col>
					<Col size={70} style={styles.containerText}>
						<Text style={styleBase.txtLabelNormal} numberOfLines ={1}>{this.user.displayName}</Text>
						<Text style={styleBase.txtLabelSmall} numberOfLines ={1}>{this.description}</Text>
					</Col>
					<Col size={30} style={styles.containerData}>
						<Text style={styleBase.txtLabelSmall}>
							{formatDate(this.props.date)}
						</Text>
					</Col>
				</Row>
			</Grid>
		</TouchableNativeFeedback>
		);
	}

}

const styles = StyleSheet.create({
	container : {
		paddingLeft: 16,
		paddingTop: 16,
		paddingRight: 16,
		backgroundColor: color.backgroundColor
	},
    containerText : {
        borderBottomColor: '#bbb',
        borderBottomWidth: 0.5
    },
    containerData : {
        borderBottomColor: '#bbb',
        borderBottomWidth: 0.5,
		alignItems: "flex-end"
    },
	titulo : {
		color: 'black',
		fontSize : 18,
	},
	subTitulo : {
		paddingTop: 4,
		paddingBottom: 16,
		fontSize : 12,
	},
	imagemList : {
		width: 55,
		height: 55,
		borderRadius: 100,
	}
});