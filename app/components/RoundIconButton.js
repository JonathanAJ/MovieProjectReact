import React, {Component} from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';

import * as colors from "../assets/colors";

export class RoundIconButton extends Component {

    render() {

        const {onPress, icon, color = "white"} = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}>
                <View
                    style={{
                        height: 70,
                        width: 70,
                        margin: 16,
                        elevation: 1,
                        backgroundColor: color,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {icon}
                </View>
            </TouchableOpacity>
        );
    }
}