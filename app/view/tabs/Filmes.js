'use strict';

import React, { Component } from 'react';
import {FilmeDAO} from '../../dao/FilmeDAO';

import {
    StyleSheet,
    Image,
    View,
    TouchableNativeFeedback
} from 'react-native';

import {
    Container,
    Content,
    Card,
    H3,
    Text,
	List,
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

import * as color from '../../assets/colors';

import styleBase from '../../assets/styles';

export class Filmes extends Component {

    constructor(props){
        super(props);

        this.filmeDAO = new FilmeDAO(this);

        this.filmes = [];
        this.state = {
            dataFilmes : this.filmes
        };
    }

    componentWillMount(){
        this.filmeDAO.initFilmes();
    }

	render() {
        return (
            <Container style={{padding: 16, paddingTop: 0, paddingBottom: 0, backgroundColor: color.backgroundColor}}>
                <Content>
                    <List
                        dataArray={this.state.dataFilmes}
                        renderRow={(item) => <ListFilmes filme={item} nav={this.props.navigation}/>}
                    />
                </Content>
            </Container>
        );
	}
}

class ListFilmes extends Component{
    render(){

        let filme = this.props.filme;

        return (
			<TouchableNativeFeedback
                useForeground={true}
                background={TouchableNativeFeedback.Ripple(color.primaryColor, false)}
                delayPressIn={0}
                onPress={this._abreFilme.bind(this)} >
                <View pointerEvents='box-only'>
                    <Card style={{elevation: 2}}>
                        <Grid>
                            <Col>
                                <Image
                                    style={{flex:1, height: 200}}
                                    resizeMode="cover"
                                    source={{uri: filme.imagem}}/>
                            </Col>
                            <Col style={{padding: 8, marginBottom: 8}}>
                                <Text style={{marginBottom: 8}}>
                                    <Text style={styleBase.txtLabelNormal}>
                                        {filme.nome}
                                    </Text>
                                </Text>
                                <Text style={styleBase.txtLabelTiny} numberOfLines ={5}>
                                    {filme.sinopse}
                                </Text>
                            </Col>
                        </Grid>
                    </Card>
                </View>
			</TouchableNativeFeedback>
        );
    }

    _abreFilme(){
        //console.log(this.props.nav);
        this.props.nav.navigate('Filme', {filme : this.props.filme});
    }
}

const styles = StyleSheet.create({

});