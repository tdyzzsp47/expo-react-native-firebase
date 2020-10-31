import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import firebase from './firebase';

import Auth from './components/Auth'
import DB from './components/DB'
import PushNotification from './components/PushNotification'

export default function App() {
  return (
    <View style={styles.container}>
      <Auth />
      <DB />
      <PushNotification />
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
