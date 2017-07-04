import * as color from "./colors";

import {
    Dimensions
} from 'react-native';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
    container:{
        margin: 16,
        marginTop: 8,
        marginBottom: 4,
        backgroundColor: color.backgroundColor
    },
    txtTitleToolbar:{
        marginLeft: 8,
        marginRight: 8,
        fontSize: 16,
        color: 'white',
        fontFamily: 'Quicksand-Medium'
    },
    txtTitleToolbarCenter:{
        width: width,
        fontSize: 16,
        color: 'white',
        fontFamily: 'Quicksand-Medium',
        textAlign: 'center'
    },
    txtInvertExtraSmall:{
        fontSize: 12,
        color: 'white',
        fontFamily: 'Quicksand-Regular'
    },
    txtLabelSmall:{
        fontSize: 14,
        color: '#444',
        fontFamily: 'Quicksand-Regular'
    },
    txtLabelTiny:{
        fontSize: 16,
        color: '#444',
        fontFamily: 'Quicksand-Regular'
    },
    txtLabelNormal:{
        fontSize: 18,
        color: '#444',
        fontFamily: 'Quicksand-Light'
    },
    txtInvertNormal:{
        fontSize: 18,
        color: 'white',
        fontFamily: 'Quicksand-Light'
    },
    txtLabelBig:{
        fontSize: 22,
        color: '#444',
        fontFamily: 'Quicksand-Regular'
    },
    txtInvertBig:{
        fontSize: 22,
        color: 'white',
        fontFamily: 'Quicksand-Regular'
    },
    txtInvertBigMedium:{
        fontSize: 22,
        color: 'white',
        fontFamily: 'Quicksand-Medium'
    }
};