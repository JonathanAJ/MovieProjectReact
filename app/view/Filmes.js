'use strict';

import React, { Component } from 'react';

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
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

export class Filmes extends Component {
  render() {
    return (
		<Container style={{padding: 16, paddingTop: 0, paddingBottom: 0}}>

			<Content>
				<TouchableOpacity>
					<Card>
						<Grid>
							<Col>
								<Image
									style={{flex:1, height: 200}}
									resizeMode="cover"
									source={{uri: "https://pbs.twimg.com/media/DA3EsjdXYAAbLJm.jpg:small"}}/>
							</Col>
							<Col style={{padding: 8, marginBottom: 8}}>
								<H3 style={{marginBottom: 16}}>Mulher Maravilha</H3>
								<Text numberOfLines ={5}>
									Treinada desde cedo para ser uma guerreira imbatível, Diana Prince nunca saiu da paradisíaca ilha em que é reconhecida como princesa das Amazonas. Quando o piloto Steve Trevor se acidenta e cai numa praia do local, ela descobre que uma guerra sem precedentes está se espalhando pelo mundo e decide deixar seu lar certa de que pode parar o conflito. Lutando para acabar com todas as lutas, Diana percebe o alcance de seus poderes e sua verdadeira missão na Terra.
								</Text>
							</Col>
						</Grid>
					</Card>
				</TouchableOpacity>


				<Card>
					<Grid>
						<Col>
							<Image
							style={{flex:1, height: 200}}
							resizeMode="cover"
							source={{uri: "http://t1.gstatic.com/images?q=tbn:ANd9GcQonBC9vWOR2ezdT7qAiCGaWwMf95qOwlLir6wGzTWn8IkgUlhL"}}/>
						</Col>
						<Col style={{padding: 8, marginBottom: 8}}>
							<H3 style={{marginBottom: 16}}>Rei Arthur: A Lenda da Espada</H3>
							<Text numberOfLines ={5}>
								Arthur é um jovem das ruas que controla os becos de Londonium e desconhece sua predestinação até o momento em que entra em contato pela primeira vez com a Excalibur. Desafiado pela espada, ele precisa tomar difíceis decisões, enfrentar seus demônios e aprender a dominar o poder que possui.
							</Text>
						</Col>
					</Grid>
				</Card>

				<Card>
					<Grid>
						<Col>
							<Image
							style={{flex:1, height: 200}}
							resizeMode="cover"
							source={{uri: "http://br.web.img3.acsta.net/r_672_960/newsv7/17/03/08/19/25/256817.jpg"}}/>
						</Col>
						<Col style={{padding: 8, marginBottom: 8}}>
							<H3 style={{marginBottom: 16}}>Piratas do Caribe: A Vingança de Salazar</H3>
							<Text numberOfLines ={5}>
								O capitão Salazar é a nova pedra no sapato do capitão Jack Sparrow. Ele lidera um exército de piratas fantasmas assassinos e está disposto a matar todos os piratas existentes na face da Terra. Para escapar, Sparrow precisa encontrar o Tridente de Poseidon, que dá ao seu dono o poder de controlar
							</Text>
						</Col>
					</Grid>
				</Card>
			</Content>

		</Container>
    );
  }
}

const styles = StyleSheet.create({

});