'use-strict';

import
	React from 'react';

import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';

import Ionicon from 'react-native-vector-icons/Ionicons';

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
import {Sobre} from "../view/screens/Sobre";
import {Amigos} from "../view/screens/Amigos";

import {
    Text
} from "native-base";

import styleBase from "../assets/styles";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStackStyleInterpolator";

const TabPricipal = TabNavigator({
	Home: {
		screen: Home,
		navigationOptions : ({navigation}) => ({
			tabBarIcon: ({focused, tintColor }) => {
				if(focused){
					return (
						<Ionicon name={'ios-home'} size={30} color={tintColor} />
					);
				}else{
					return (
						<Ionicon name={'ios-home-outline'} size={30} color={tintColor} />
					);
				}
			},
            headerTitle:
				<Text style={styleBase.txtTitleToolbarCenter}>
					Home
				</Text>
		})
	},
	Conversas: {
		screen: Conversas,
		navigationOptions : ({navigation}) => ({
			tabBarIcon: ({focused, tintColor }) => {
				if(focused){
					return (
						<Ionicon name={'ios-chatbubbles'} size={30} color={tintColor} />
					);
				}else{
					return (
						<Ionicon name={'ios-chatbubbles-outline'} size={30} color={tintColor} />
					);
				}
			},
            headerTitle:
				<Text style={styleBase.txtTitleToolbarCenter}>
					Conversas
				</Text>
		})
	},
	Filmes: {
		screen: Filmes,
		navigationOptions : ({navigation}) => ({
			tabBarIcon: ({focused, tintColor }) => {
				if(focused){
					return (
						<Ionicon name={'ios-film'} size={30} color={tintColor} />
					);
				}else{
					return (
						<Ionicon name={'ios-film-outline'} size={30} color={tintColor} />
					);
				}
			},
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
			tabBarIcon: ({focused, tintColor }) => {
				if(focused){
					return (
						<Ionicon name={'ios-person'} size={35} color={tintColor} />
					);
				}else{
					return (
						<Ionicon name={'ios-person-outline'} size={35} color={tintColor} />
					);
				}
			},
            header: null
		})
	}
},
{
	tabBarPosition: 'bottom',
	lazy: true,
	swipeEnabled: false,
	animationEnabled: false,
	tabBarOptions: {
		showIcon: true,
		showLabel: false,
		indicatorStyle: {
			backgroundColor: "transparent"
		},
		labelStyle: {
			margin: 0,
			fontSize: 8,
		},
		style: {
			height: 48,
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
			header: null
		}),
	},
	Amigos: {
		screen: Amigos,
		navigationOptions : ({navigation}) => ({
            headerTitle:
				<Text style={styleBase.txtTitleToolbar}>
					Meus Amigos
				</Text>
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
	},
	Sobre: {
		screen: Sobre,
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