import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import firebase from '../firebase';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true }
  }

  auth = () => {
    firebase.auth().signInAnonymously().then(user => {
      console.log(user)
    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }

  render() {
    return (
      <View>
        <Text>Firebase Auth</Text>
        <Button
          title="認証"
          onPress={() => {this.auth()}}
        />
      </View>
    );
  }
}
