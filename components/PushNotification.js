import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import firebase from '../firebase';

export default class PushNotification extends Component {
  constructor(props) {
    super(props);
  }

  registerForPushNotificationsAsync = async () => {

    try {
        //現在のNotificationパーミッション状況取得
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        //statusが許可じゃなければ（許可済みなら何もしない）
        if (existingStatus !== 'granted') {
            //許可を尋ねる
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        //それでも許可されてなかったら何もしない
        if (finalStatus !== 'granted') {
            return;
        }

        //token取得
        const token = await Notifications.getExpoPushTokenAsync();

        //保存
        await this.saveDeviceToken(token);

        //表示
        alert("token=" + token);
        console.log(token);

    } catch (e) {
        console.log(e);
        alert(e)
    }
  }

  saveDeviceToken = async (token) => {
    try {
      const docRef = await firebase.firestore().collection('tokens').doc('testuser').set({
        token: token,
        user: 'sample',
      })
    } catch (e) {
      console.log(e);
      alert(e)
    }
  }

  handleNotification = (notification) => {
    if (notification.origin === 'selected') {
      //何もしなくても通知される
    } else if (notification.origin === 'received') {
      //jsonで{"message":"ほげほげ"}が送られていることが前提なら、下記のように書ける。
      //alert('通知が来たようです。内容は:' + notification.data.message + "です。");
      alert('通知が来たようです。');
    }
  }

  componentDidMount = () => {
    //リスナー登録
    this.notificationSubscription = Notifications.addNotificationReceivedListener(this.handleNotification);
  }

  componentWillUnmount = () => {
    //これを入れないと、起動時に通知が来る
    this.notificationSubscription.remove();
  }

  render() {
    return (
      <View>
        <Text>Firebase Firestore→Push通知</Text>
        <Button
          title="Push通知を送信"
          onPress={() => {this.registerForPushNotificationsAsync()}}
        />
      </View>
    );
  }
}
