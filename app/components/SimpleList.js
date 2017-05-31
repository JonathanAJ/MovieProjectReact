'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	View,
} from 'react-native';

import {formatDateConversas} from '../rout/Util';

export class SimpleList extends Component {

	constructor(props) {
		super(props);
	
		this.user = this.props.user;
		this.description = this.props.description;

		this.state = {

		};
	}

	render() {
		return (
		<TouchableOpacity style={styles.container} onPress={this._onPress.bind(this)}>
				<Image
					style={styles.imagemList}
					source={{uri: this.user.photoURL}} />
				<View style={styles.containerText}>
					<Text style={styles.titulo} numberOfLines ={1}>{this.user.displayName}</Text>
					<Text style={styles.subTitulo} numberOfLines ={1}>{this.description}</Text>
				</View>
				<Text style={styles.subTitulo}>
					{formatDateConversas(this.props.date)}
				</Text>
		</TouchableOpacity>
		);
	}

	_onPress(){
			this.props.nav.navigate('Chat', {user : this.user});
	}

}

const styles = StyleSheet.create({
	container : {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 16,
		paddingTop: 8,
		paddingBottom: 8,
		paddingRight: 8,
		borderBottomColor: '#bbb',
		borderBottomWidth: 0.5
	},
	containerText : {
		flex: 1,
		marginLeft: 16,
		marginRight: 8
	},
	titulo : {
		color: 'black',
		fontSize : 18,
	},
	subTitulo : {
		marginTop: 4,
		paddingRight: 16,
		fontSize : 12,
	},
	imagemList : {
		margin: 4,
		width: 50,
		height: 50,
		borderRadius: 100,
	}
});