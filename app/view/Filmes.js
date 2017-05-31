'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	Image,
} from 'react-native';

import {
	Container,
	Content,
	Card,
	CardItem,
	Text,
} from 'native-base';

export class Filmes extends Component {
  render() {
	return (
		<Container style={{padding: 16}}>
			<Content style={{flex: 1, flexDirection: 'column'}}>
				<Card style={{flex: 1, flexDirection: 'row'}}>
					<Image
						style={{flex: 1, width: 200, height: 200}}
						resizeMode="cover"
						source={{uri: "https://pbs.twimg.com/media/DA3EsjdXYAAbLJm.jpg:small"}}/>
					<Text style={{flex: 1, flexDirection: 'column', padding: 16}}>
						<Text>Mulher Maravilha</Text>
					</Text>
				</Card>
				<Card style={{flex: 1, flexDirection: 'row'}}>
					<Image
						style={{flex: 1, width: 200, height: 200}}
						resizeMode="cover"
						source={{uri: "http://www.dvdsreleasedates.com/posters/800/B/Batman-v-Superman-Dawn-of-Justice-2016-movie-poster.jpg"}}/>
					<Text style={{flex: 1, flexDirection: 'column', padding: 16}}>
						<Text>Batman vs Superman</Text>
					</Text>
				</Card>
			</Content>
		</Container>
	);
  }
}

const styles = StyleSheet.create({

});