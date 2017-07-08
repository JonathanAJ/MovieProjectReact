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
    H2, Item, Input, Button,
} from 'native-base';

import styleBase from "../../assets/styles";

import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View, TouchableNativeFeedback,
} from 'react-native';

import {
    Grid,
    Col,
    Row
} from "react-native-easy-grid";

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as color from '../../assets/colors';
import Modal from 'react-native-modal'

export class Perfil extends Component {

  constructor(props) {
    super(props);

    this.user = firebase.auth().currentUser;

    this.nav = props.navigation;

    this.state = {
        photoURL : this.user.photoURL,
        statusTxt : "",
        status : undefined,
        isModalVisible: false,
    };
  }

  componentWillMount(){
    firebase.database().ref(`users/${this.user.uid}`).once("value", snap => {
        const user = snap.val();
        this.setState({
            photoURL : user.photoLargeURL,
            status : user.status
        });
    });
  }

  render() {
    return (
        <Container style={{backgroundColor: color.backgroundColor}}>
          <Content>
              <Grid>
                  <Image
                      style={{alignItems: 'center'}}
                      blurRadius={3}
                      source={{uri: this.state.photoURL}}>

                      <Image
                        style={styles.imagemPerfil}
                        source={{uri: this.state.photoURL}}/>

                        <Text style={{textAlign: 'center'}}>
                            <Text style={styleBase.txtInvertBig}>
                                {this.user.displayName}
                            </Text>
                        </Text>
                        
                        <TouchableOpacity
                            onPress={this._showModal}>
                            <Text style={{marginBottom: 16, marginLeft: 16, marginRight: 16, textAlign: 'center'}}>
                                <Text style={styleBase.txtInvertNormal}>
                                    {this.state.status === undefined?"Insira um status":this.state.status}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                  </Image>
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
                          <ListItem icon onPress={this._sair}>
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

              <Modal
                  isVisible={this.state.isModalVisible}
                  animationIn={'slideInUp'}
                  animationOut={'slideOutDown'}>
                  {this._modal()}
              </Modal>
          </Content>
        </Container>
    );
  }

    _sair = () => {
        new LoginDAO().sair(this.nav);
    }

    _mudaStatus = () => {
        firebase.database().ref(`users/${this.user.uid}`).update({
            status: this.state.statusTxt
        });
        this.setState({status : this.state.statusTxt});
        this.setState({statusTxt : ""});
        this._hideModal();
    };

    _showModal = () => this.setState({ isModalVisible: true });

    _hideModal = () => this.setState({ isModalVisible: false });

    _modal = () => {
        return(
            <View style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                padding: 16,
                borderRadius: 5
            }}>
                <Text style={styleBase.txtLabelBig}>
                    Status
                </Text>

                <Item>
                    <Icon style={{marginRight: 8}} size={15} color={color.darkPrimaryColor} name='pencil' />
                    <Input
                        style={styleBase.txtLabelNormal}
                        multiline={true}
                        onChangeText={(txt) => this.setState({statusTxt : txt})}
                        placeholder='Mude seus status'/>
                </Item>

                <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                    <Button
                        onPress={this._hideModal}
                        transparent warning>
                        <Text>Cancelar</Text>
                    </Button>
                    <Button
                        onPress={this._mudaStatus}
                        transparent success>
                        <Text>OK</Text>
                    </Button>
                </View>
            </View>
        );
    };
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
    marginTop: 50,
    marginBottom: 30,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 1
  }
});