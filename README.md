# expo-react-native-firebase
## 概要
Expo×ReactNative×Firebaseのサンプル
## 実行
```
$ yarn install
$ yarn start
```
## 機能
### Auth
匿名ログイン
### DB
firestoreへのデータ書き込み
### PushNotification
firestoreへのデータ書き込みをトリガーにしてcloud functionsが実行され、expo-notificationsを利用して端末にpush通知を送信

```send_expo_notification
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const { Expo } = require('expo-server-sdk');
const expo = new Expo();

exports.pushNotification = functions.firestore
    .document('tokens/testuser')
    .onCreate((snap, context) => {
      const token = snap.data().token.data;
      
      const message = {
        to: token,
        sound: 'default',
        title: 'test',
        body: 'hello',
        data: { name: 'foo', message: 'test' }
      }

      const chunks = expo.chunkPushNotifications([message]);
      const tickets = [];

      chunks.forEach(async chunk => {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk).catch(e => console.log(e));
        tickets.push(...ticketChunk);
      });
});
```
