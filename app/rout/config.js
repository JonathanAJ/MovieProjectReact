'use-strict'

import React from 'react';

import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';

import {
	View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

//Views Navigation
import { Login } from '../view/Login';
import { Chat } from '../view/Chat';
import { Perfil } from '../view/Perfil';
import { Contatos } from '../view/Contatos';

const TabPricipal = TabNavigator({
	Chat: {
		screen: Chat,
		navigationOptions : ({navigation}) => ({
			title: 'Chat',
			tabBarIcon: ({ tintColor }) => (
			    <Icon name={'commenting-o'} size={20} color={tintColor} />
		    )
		})
	},
	Contatos: {
		screen: Contatos,
		navigationOptions : ({navigation}) => ({
			title: 'Contatos',
			tabBarIcon: ({ tintColor }) => (
			    <Icon name={'address-card-o'} size={20} color={tintColor} />
		    )
		})
	},
	Perfil: {
		screen: Perfil,
		navigationOptions : ({navigation}) => ({
			title: 'Perfil',
			tabBarIcon: ({ tintColor }) => (
			    <Icon name={'user-o'} size={15} color={tintColor} />
		    )
		})
	}
},
{
	tabBarPosition: 'bottom',
	lazy: true,
	animationEnabled: false,
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
			backgroundColor: '#3b5998',
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
			title: 'Bate Papo',
		}),
	}
},
{
	navigationOptions : ({navigation}) => ({
	    headerTintColor: '#fff',
	    headerStyle: {backgroundColor: '#3b5998'}
	})
});