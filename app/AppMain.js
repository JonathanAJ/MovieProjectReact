import {AppRegistry} from 'react-native';

//database
import { Banco } from './dao/Banco';
import { navigatorMain } from './rout/config';

export class AppMain{

	static start(){

		Banco.init();
		AppRegistry.registerComponent('BatePapoReact', () => navigatorMain);
	}
}
