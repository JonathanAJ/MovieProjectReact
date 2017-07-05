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
            // dataCinemas : []
        };

        this.filmeDAO = new FilmeDAO(this);
    }

    componentWillMount(){
        this.filmeDAO.initListenerFilmesValue();
        // this.filmeDAO.initListenerCinemasValue();
    }

    render() {

		const { params } = this.props.navigation.state;
        const voltar = () => this.props.navigation.goBack();
        const limparFiltro = () => {
			
			params.context.setState({
				filtro: undefined
			});
			
			params.context.interestDAO.listInterest();

			this.props.navigation.goBack();
		};

        return (
			<Grid style={{backgroundColor: color.primaryColor, paddingLeft:32, paddingRight:32}}>
				<TouchableOpacity onPress={voltar}>
					<Icon style={{marginTop: 8}} name="ios-close" size={40} color='white'/>
				</TouchableOpacity>
				<Row style={{height: 1, alignSelf: "flex-end"}}>
					<TouchableOpacity style={{height: 40}} onPress={limparFiltro}>
						<Icon name="ios-trash-outline" size={30} color='white'/>
					</TouchableOpacity>
				</Row>
				<Row style={{height: 1}}>
					<View>
						<Text style={styleBase.txtInvertBigMedium}>
							FILTROS
						</Text>
					</View>
				</Row>
				<Col style={{marginTop: 50}}>
					<Text style={styleBase.txtInvertNormal}>
						Filmes
					</Text>
					<Row>
						<FlatList
							style={{marginTop: 16}}
							data={this.state.dataFilmes}
							keyExtractor={(item) => item.id}
							renderItem={({item}) => <FiltroButton item={item} {...this.props} />}
						/>
					</Row>
					{/*<Text style={styleBase.txtInvertNormal}>
						Cinemas
					</Text>
					<Row>
						<FlatList
							data={this.state.dataCinemas}
							keyExtractor={(item) => item.id}
							renderItem={({item}) => <FiltroButton item={item} {...this.props} />}
						/>
					</Row>*/}
				</Col>
			</Grid>
        );
    }
}

export class FiltroButton extends Component {
    render() {

		const { params } = this.props.navigation.state;

		const item = this.props.item;

		const selectFiltro = () => {
			
			params.context.setState({
				filtro: item
			});
			
			params.context.interestDAO.listInterest(item);

			this.props.navigation.goBack();
		};

        return (
			<Button
				onPress={selectFiltro}
				style={{marginLeft: 16, marginTop: 8, marginBottom: 8}}
				light bordered >
				<Text style={styleBase.txtInvertExtraSmall}>
					{item.nome}
				</Text>
			</Button>

        );
    }
}