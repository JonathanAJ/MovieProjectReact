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
            <View style={{width: 80, height: 80, margin: 20}} >
                <TouchableOpacity
                    onPress={onPress}>
                    <View
                        style={{
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
                </TouchableOpacity>
            </View>
        );
    }
}