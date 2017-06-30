'use-strict';

import {AppRegistry} from 'react-native';

import navigatorMain from './rout/config';

export class AppMain{

	static start(){
		AppRegistry.registerComponent('BatePapoReact', () => navigatorMain);
	}
}
