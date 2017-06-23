import React, {Component} from 'react';
import {
    View,
    TouchableNativeFeedback,
} from 'react-native';

import * as colors from "../assets/colors";

export class RoundIconButton extends Component {

    render() {

        const {onPress, icon, color = "white", colorRipple = colors.primaryColor} = this.props;

        return (
            <View style={{width: 80, height: 80, margin: 20}} >
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(colorRipple, true)}
                    delayPressIn={0}
                    onPress={onPress}>
                    <View style={{
                        height: 80,
                        width: 80,
                        elevation: 1,
                        backgroundColor: color,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {icon}
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}