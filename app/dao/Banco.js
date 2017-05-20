'use-strict'

import RNFirebase from 'react-native-firebase';

const firebase = RNFirebase.initializeApp({
	debug: true,
	persistence: true
});

export default firebase;