'use strict';

import React, { Component } from 'react';
import {FilmeDAO} from '../../dao/FilmeDAO';

import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import {
    Container,
    Content,
    Card,
    Text,
    H3,
	List
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

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
            <Container style={{padding: 16, paddingTop: 0, paddingBottom: 0}}>
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
			<TouchableOpacity onPress={this._abreFilme.bind(this)}>
				<Card>
					<Grid>
						<Col>
							<Image
								style={{flex:1, height: 200}}
								resizeMode="cover"
								source={{uri: filme.imagem}}/>
						</Col>
						<Col style={{padding: 8, marginBottom: 8}}>
							<H3 style={{marginBottom: 16}}>{filme.nome}</H3>
							<Text numberOfLines ={5}>
                                {filme.sinopse}
							</Text>
						</Col>
					</Grid>
				</Card>
			</TouchableOpacity>
        );
    }

    _abreFilme(){
        console.log(this.props.nav)
        this.props.nav.navigate('Filme', {filme : this.props.filme});
    }
}

const styles = StyleSheet.create({

});