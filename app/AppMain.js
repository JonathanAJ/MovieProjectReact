'use-strict'

import { StackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';
import * as firebase from 'firebase';

//View Navigation
import Login from './view/Login';
import Chat from './view/Chat';

//Database
import Banco from './dao/Banco';

export default class AppMain{

	start(){

		Banco.init();

		const navigator = StackNavigator({
		//RouteConfigs
			Login: {
				screen: Login,
				navigationOptions : ({navigation}) => ({
			      title: 'Login',
			    }),
			},
			Chat: {
				screen: Chat,
				navigationOptions : ({navigation}) => ({
				    headerLeft: null,
    				statusBarStyle: {color: 'blue'} ,
				})
			}
		},
		//StackNavigatorConfig
			{
				initialRouteName : 'Login',
				navigationOptions : ({navigation}) => ({
				    headerTintColor: '#fff',
				    headerStyle: {backgroundColor: '#3b5998'}
				})
			}
		);

		AppRegistry.registerComponent('BatePapoReact', () => navigator);
	}
}