'use-strict'

import { StackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';

//View Navigation
import Login from './view/Login';
import Chat from './view/Chat';

//Database
import Banco from './dao/Banco';

export default class AppMain{

	static start(){

		const navigator = StackNavigator({
		  Home: { screen: Login },
		  Chat: { screen: Chat }
		});

		Banco.init();
		AppRegistry.registerComponent('BatePapoReact', () => navigator);
	}
}