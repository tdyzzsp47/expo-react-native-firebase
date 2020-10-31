import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import firebase from '../firebase';

export default class DB extends Component {
  constructor(props) {
    super(props);
  }

  register = () => {
    firebase.firestore().collection("cities").doc("LA").set({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    }).then(function() {
      console.log("Document successfully written!");
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  render() {
    return (
      <View>
        <Text>Firebase Firestore</Text>
        <Button
          title="DBに追加"
          onPress={() => {this.register()}}
        />
      </View>
    );
  }
}
