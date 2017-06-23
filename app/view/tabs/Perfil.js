'use strict';

import React, { Component } from 'react';
import firebase from '../../dao/Banco';
import {LoginDAO} from '../../dao/LoginDAO';

import {
    Container,
    ListItem,
    Content,
    Left,
    Body,
    Text,
    Right,
    Switch,
    H2,
} from 'native-base';

import styleBase from "../../assets/styles";

import {
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import {
    Grid,
    Col,
    Row
} from "react-native-easy-grid";

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as color from '../../assets/colors';

export class Perfil extends Component {

  constructor(props) {
    super(props);

    this.user = firebase.auth().currentUser;

    this.nav = props.navigation;

    this.state = {
      'user' : this.user
    };
  }

  render() {
    return (

    <Container style={{backgroundColor: color.backgroundColor}}>
      <Content>
          <Grid>
              <Col style={{alignItems: 'center', marginBottom: 32, marginTop: 16}}>
                  <Image
                      style={styles.imagemPerfil}
                      source={{uri: this.state.user.photoURL}}/>
                  <Text style={styleBase.txtLabelBig}>
                      {this.state.user.displayName}
                  </Text>
                  <Text style={styleBase.txtLabelNormal}>
                    {this.state.user.email}
                  </Text>
              </Col>
              <Row>
                  <Col>
                      <ListItem icon>
                          <Left>
                              <Icon name="bell" size={20} color={color.accentColor} />
                          </Left>
                          <Body>
                          <Text style={styleBase.txtLabelNormal}>Notificações</Text>
                          </Body>
                          <Right style={{paddingLeft: 20}}>
                              <Switch  />
                          </Right>
                      </ListItem>

                      <ListItem icon>
                          <Left>
                              <Icon name="emotsmile" size={20} color={color.accentColor}  />
                          </Left>
                          <Body>
                          <Text style={styleBase.txtLabelNormal}>Gerenciar Amigos</Text>
                          </Body>
                          <Right>
                              <Icon name="arrow-right" color={color.accentColor}  />
                          </Right>
                      </ListItem>

                      <ListItem icon>
                          <Left>
                              <Icon name="trash" size={20} color={color.accentColor}  />
                          </Left>
                          <Body>
                          <Text style={styleBase.txtLabelNormal}>Excluir Conta</Text>
                          </Body>
                          <Right>
                              <Icon name="arrow-right" color={color.accentColor}  />
                          </Right>
                      </ListItem>

                      <ListItem icon>
                          <Left>
                              <Icon name="info" size={20} color={color.accentColor}  />
                          </Left>
                          <Body>
                          <Text style={styleBase.txtLabelNormal}>Sobre o App</Text>
                          </Body>
                          <Right>
                              <Icon name="arrow-right" color={color.accentColor}  />
                          </Right>
                      </ListItem>
                      <ListItem icon onPress={this._sair.bind(this)}>
                          <Left>
                              <Icon name="logout" size={20} color={color.accentColor} />
                          </Left>
                          <Body>
                          <Text style={styleBase.txtLabelNormal}>Sair</Text>
                          </Body>
                      </ListItem>
                  </Col>
              </Row>
          </Grid>
      </Content>
    </Container>
    );
  }

  _sair(){
    new LoginDAO().sair(this.nav);
  }
}

const styles = StyleSheet.create({
  content :{
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  nome : {
    fontSize: 28,
    color: 'black'
  },
  email : {
    fontStyle: 'italic',
    marginBottom: 20
  },
  imagemPerfil : {
    width: 150,
    height: 150,
    borderRadius: 100
  }
});