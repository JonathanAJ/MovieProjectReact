'use-strict';

import
	React from 'react';

import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Root
import { Splash } from '../view/Splash';
import { Login } from '../view/Login';

//Views Tab Navigation
import { Perfil } from '../view/tabs/Perfil';
import { Contatos } from '../view/tabs/Contatos';
import { Conversas } from '../view/tabs/Conversas';
import { Home } from '../view/tabs/Home';
import { Filmes } from '../view/tabs/Filmes';

//View Screens Navigation
import { Chat } from '../view/screens/Chat';
import { Filme } from '../view/screens/Filme';

const TabPricipal = TabNavigator({
	Home: {
		screen: Home,
		navigationOptions : ({navigation}) => ({
			title: 'Home',
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'home'} size={20} color={tintColor} />
			)
		})
	},
	Conversas: {
		screen: Conversas,
		navigationOptions : ({navigation}) => ({
			title: 'Conversas',
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'bubbles'} size={20} color={tintColor} />
			)
		})
	},
	Filmes: {
		screen: Filmes,
		navigationOptions : ({navigation}) => ({
			title: 'Filmes',
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'film'} size={20} color={tintColor} />
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
		showLabel: false,
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
	Splash: {
		screen: Splash,
		headerMode: 'none',
		navigationOptions : ({navigation}) => ({
			header: null
		}),
	},
	Login: {
		screen: Login,
        headerMode: 'none',
        navigationOptions : ({navigation}) => ({
            header: null
        }),
	},
	Main: {
		screen: TabPricipal,
		navigationOptions : ({navigation}) => ({
			title: 'boraver',
		}),
	},
	Chat: {
		screen: Chat,
		navigationOptions : ({navigation}) => ({
			
		}),
	},
	Filme: {
		screen: Filme,
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