import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import firebase from './firebase';

import Auth from './components/Auth'

export default function App() {

  const auth = () => {
    firebase.auth().signInAnonymously().then(user => {
      console.log(user)
    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <Auth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
