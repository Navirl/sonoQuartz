---
tags:
  - Info
---

daily:: [2024-05-20](/Daily_Note/2024-05-20.md)
up:: [Expo](Expo.md)

react-native-push-notificationが先に出るが、標準でexpo-notificationsというのがあるのでそれを使えばいい。

ハンドラセットとパーミッション設定だけすれば、asyncで送れる。

```ts
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const requestPermissionsAsync = async () => {
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) { return }

  await Notifications.requestPermissionsAsync();
}

const scheduleNotificationAsync = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      body: 'test'
    },
    trigger: {
      seconds: 3,
    }
  })
}
```

[Expo Push API でReact-nativeアプリに通知処理を実装する #expo - Qiita](https://qiita.com/yukihigasi/items/9ffb569823eee2c88586)
