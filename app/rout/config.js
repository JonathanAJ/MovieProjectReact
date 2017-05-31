'use-strict';

import React from 'react';

import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Views Navigation
import { Login } from '../view/Login';
import { Chat } from '../view/Chat';
import { Perfil } from '../view/Perfil';
import { Contatos } from '../view/Contatos';
import { Conversas } from '../view/Conversas';

const TabPricipal = TabNavigator({
	Conversas: {
		screen: Conversas,
		navigationOptions : ({navigation}) => ({
			title: 'Conversas',
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'bubbles'} size={20} color={tintColor} />
			)
		})
	},
	Contatos: {
		screen: Contatos,
		navigationOptions : ({navigation}) => ({
			title: 'Contatos',
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'list'} size={20} color={tintColor} />
			)
		})
	},
	Perfil: {
		screen: Perfil,
		navigationOptions : ({navigation}) => ({
			title: 'Perfil',
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'user'} size={20} color={tintColor} />
			)
		})
	}
},
{
	tabBarPosition: 'bottom',
	lazy: true,
	tabBarOptions: {
		showIcon: true,
		indicatorStyle: {
			backgroundColor: 'white'
		},
		labelStyle: {
			margin: 0,
			fontSize: 8,
		},
		style: {
			height: 50,
			backgroundColor: '#44B7B2',
		},
	}
});

export const navigatorMain = StackNavigator({
	Login: {
		screen: Login,
		navigationOptions : ({navigation}) => ({
			title: 'Login',
		}),
	},
	Main: {
		screen: TabPricipal,
		navigationOptions : ({navigation}) => ({
			title: 'Boraver',
		}),
	},
	Chat: {
		screen: Chat,
		navigationOptions : ({navigation}) => ({
			
		}),
	}
},
{
	navigationOptions : ({navigation}) => ({
		headerTintColor: '#fff',
		headerStyle: {backgroundColor: '#44B7B2'}
	})
});