'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    StatusBar,
    Image
} from 'react-native';

import {
    Container,
    Content,
    H3,
    Badge,
    Text,
    Tab,
    Tabs,
} from 'native-base';

import {Row, Col, Grid } from "react-native-easy-grid/";

import * as color from '../../assets/colors';

import firebase from "../../dao/Banco";

import {TabFilmeSessoes} from "./TabFilmeSessoes";
import {TabFilmeInfo} from "./TabFilmeInfo";
import {TabFilmeInteresses} from "./TabFilmeInteresses";

import styleBase from '../../assets/styles';

export class Filme extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <Container style={{backgroundColor: color.backgroundColor}}>
                <StatusBar backgroundColor={color.darkPrimaryColor} />
                <Tabs>
                    <Tab
                        heading="Filme"
                        textStyle={{color: 'white'}}
                        activeTextStyle={{color: 'white'}}
                        tabStyle={{backgroundColor: color.primaryColor, elevation: 0}}
                        activeTabStyle={{backgroundColor: color.primaryColor, elevation: 0}} >
                        
                        <TabFilmeInfo {...this.props}/>

                    </Tab>
                    <Tab
                        heading="Sessão"
                        textStyle={{color: 'white'}}
                        activeTextStyle={{color: 'white'}}
                        tabStyle={{backgroundColor: color.primaryColor, elevation: 0}}
                        activeTabStyle={{backgroundColor: color.primaryColor}}>

                        <TabFilmeSessoes {...this.props}/>

                    </Tab>
                    <Tab
                        heading="Interesses"
                        textStyle={{color: 'white'}}
                        activeTextStyle={{color: 'white'}}
                        tabStyle={{backgroundColor: color.primaryColor, elevation: 0}}
                        activeTabStyle={{backgroundColor: color.primaryColor}}>

                        <TabFilmeInteresses {...this.props}/>

                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});