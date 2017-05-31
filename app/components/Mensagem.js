'use-strict';

import React, { Component } from 'react';
import firebase from '../dao/Banco';

import {
	StyleSheet,
	View,
	Text
} from 'react-native';

export class Mensagem extends Component {

	constructor(props) {
		super(props);
	
		this.state = {

		};
		this.currentUser = firebase.auth().currentUser;
	}

	render() {

		const data = this.props.data;
		let isMy = false;

		if(firebase.auth().currentUser.uid === data.fromUID){
			isMy = true;
		}

		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={isMy ? {flex: 1} : {flex:0}}/>

				<Text style={isMy ? style.me : style.you}>
					<Text>
						{data.content}
					</Text>
				</Text>

				<View style={isMy ? {flex: 0} : {flex: 1}}/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	me: {
		backgroundColor: '#89E3D3',
		color: '#444',
		marginBottom: 5,
		borderRadius: 10,
		marginRight: 8,
		padding: 8,
		elevation: 2
	},
	you: {
		backgroundColor: '#F2CFA2',
		color: '#444',
		marginBottom: 5,
		borderRadius: 10,
		marginLeft: 8,
		padding: 8,
		elevation: 2
	}
});