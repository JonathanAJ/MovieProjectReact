'use strict';

import React, { Component } from 'react';
import {
  Text
} from 'react-native';

import {
  Button
} from 'native-base';

import {
  Grid,
  Row,
  Col
} from 'react-native-easy-grid';

import Animation from 'lottie-react-native';
import * as color from '../assets/colors';
import styleBase from '../assets/styles';

export default class AnimationScreenMessage extends Component{

    componentDidMount(){
        this.animation.play();
    }

    render(){
        return(
            <Grid style={{
                backgroundColor: color.backgroundColor,
                alignItems: 'center'
                }}>
            <Row size={70}>
                <Animation
                    ref={animation => {this.animation = animation;}}
                    style={{flex: 1, flexDirection: 'row'}}
                    loop={true}
                    source={this.props.animation}
                    />
            </Row>
            <Row size={30}>
                <Text style={{textAlign: 'center', margin: 16, marginTop: 0}}>
                <Text style={styleBase.txtLabelNormal}>
                    {this.props.message}
                </Text>
                </Text>
            </Row>
            <Row style={{height: 70}}>
                <Button
                style={{marginLeft: 16, marginTop: 8, marginBottom: 8, borderColor: "#444"}}
                onPress={this.props.buttonPress}
                dark bordered >
                <Text style={styleBase.txtLabelSmall}>
                    {this.props.messageButton}
                </Text>
                </Button>
            </Row>
            </Grid>
            );
    }
}