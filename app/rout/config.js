'use-strict';

import
	React from 'react';

import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

import * as color from '../assets/colors';

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
import {PerfilFriend} from "../view/screens/PerfilFriend";
import {Filtro} from "../view/screens/Filtro";

import {
    Text,
    Header,
    Body, Right, Button
} from "native-base";

import styleBase from "../assets/styles";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStackStyleInterpolator";
import {TouchableNativeFeedback, View} from "react-native";

const TabPricipal = TabNavigator({
	Home: {
		screen: Home,
		navigationOptions : ({navigation}) => ({
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'home'} size={20} color={tintColor} />
			),
            headerTitle:
				<Text style={styleBase.txtTitleToolbarCenter}>
					Home
				</Text>
		})
	},
	Conversas: {
		screen: Conversas,
		navigationOptions : ({navigation}) => ({
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'bubbles'} size={20} color={tintColor} />
			),
            headerTitle:
				<Text style={styleBase.txtTitleToolbarCenter}>
					Conversas
				</Text>
		})
	},
	Filmes: {
		screen: Filmes,
		navigationOptions : ({navigation}) => ({
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'film'} size={20} color={tintColor} />
			),
            headerTitle:
				<Text style={styleBase.txtTitleToolbarCenter}>
					Filmes
				</Text>
		})
	},
	// Contatos: {
	// 	screen: Contatos,
	// 	navigationOptions : ({navigation}) => ({
	// 		title: 'Contatos',
	// 		tabBarIcon: ({ tintColor }) => (
	// 			<Icon name={'list'} size={20} color={tintColor} />
	// 		)
	// 	})
	// },
	Perfil: {
		screen: Perfil,
		navigationOptions : ({navigation}) => ({
			tabBarIcon: ({ tintColor }) => (
				<Icon name={'user'} size={20} color={tintColor} />
			),
            header: null
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
			backgroundColor: "white"
		},
		labelStyle: {
			margin: 0,
			fontSize: 8,
		},
		style: {
			height: 50,
			backgroundColor: color.primaryColor,
			elevation: 0
		},
	}
});

const navigator = StackNavigator({
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
		}),
	},
	Chat: {
		screen: Chat,
		navigationOptions : ({navigation}) => ({
            headerTitle:
				<Text style={styleBase.txtTitleToolbar}>
                    {navigation.state.params.user.displayName}
				</Text>
		}),
	},
	Filme: {
		screen: Filme,
		navigationOptions : ({navigation}) => ({
            headerTitle:
				<Text style={styleBase.txtTitleToolbar}>
					{navigation.state.params.filme.nome}
				</Text>
		}),
	},
	PerfilFriend: {
		screen: PerfilFriend,
		navigationOptions : ({navigation}) => ({
            headerTintColor: color.darkPrimaryColor,
            headerStyle: {backgroundColor: color.backgroundColor, elevation: 0}
		}),
	}
},
{
	transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
	}),
    headerMode: 'float',
	navigationOptions : ({navigation}) => ({
		headerTintColor: 'white',
		headerStyle: {backgroundColor: color.primaryColor, elevation: 0}
	})
});

const navigatorMain = StackNavigator({
	Navigator: {
		screen: navigator,
		headerMode: 'none',
		navigationOptions : ({navigation}) => ({
			header: null
		}),
	},
	Filtro: {
		screen: Filtro,
		navigationOptions : ({navigation}) => ({

		}),
	}
},
{
	transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forVertical,
	}),
	navigationOptions : ({navigation}) => ({
        header: null
	})
});

export default navigatorMain;