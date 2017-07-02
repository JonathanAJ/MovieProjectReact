'use-strict';

import React, { Component } from 'react';
import firebase from '../../dao/Banco';

import {
    StyleSheet,
    TextInput,
    View,
    Text,
    StatusBar,
    TouchableOpacity, FlatList
} from 'react-native';

import * as color from '../../assets/colors';
import styleBase from '../../assets/styles';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Icon from "react-native-vector-icons/Ionicons";
import {Button} from "native-base";
import {FilmeDAO} from "../../dao/FilmeDAO";

export class Filtro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataFilmes : [],
            dataCinemas : []
        };

        this.filmeDAO = new FilmeDAO(this);
    }

    componentWillMount(){
        this.filmeDAO.initListenerFilmesValue();
        this.filmeDAO.initListenerCinemasValue();
    }

    render() {

        const voltar = () => this.props.navigation.goBack();

        return (
			<Grid style={{backgroundColor: color.primaryColor, paddingLeft:32, paddingRight:32}}>
				<TouchableOpacity onPress={voltar}>
					<Icon style={{marginTop: 8}} name="ios-close" size={40} color='white'/>
				</TouchableOpacity>
				<Row style={{height: 16}}>
					<View style={{marginTop: 8}}>
						<Text style={styleBase.txtInvertBigMedium}>
							FILTROS
						</Text>
					</View>
				</Row>
				<Col style={{marginTop: 32}}>
					<Text style={styleBase.txtInvertNormal}>
						Filmes
					</Text>
					<Row>
						<FlatList
							data={this.state.dataFilmes}
							keyExtractor={(item) => item.id}
							renderItem={({item}) => <FiltroButton item={item} />}
						/>
					</Row>
					<Text style={styleBase.txtInvertNormal}>
						Cinemas
					</Text>
					<Row>
						<FlatList
							data={this.state.dataCinemas}
							keyExtractor={(item) => item.keyChat}
							renderItem={({item}) => <FiltroButton item={item} />}
						/>
					</Row>
				</Col>
			</Grid>
        );
    }
}

export class FiltroButton extends Component {
    render() {

		const item = this.props.item;

        return (
			<Button
				style={{marginLeft: 16, marginTop: 8, marginBottom: 8}}
				light bordered >
				<Text style={styleBase.txtInvertExtraSmall}>
					{item.nome}
				</Text>
			</Button>

        );
    }
}