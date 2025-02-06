---
tags:
  - Info
---

daily:: [2024-03-28](/Daily_Note/2024-03-28.md)
up:: [React](../Bar/Library/React.md)
up:: [React Native](../Bar/Framework/React%20Native.md)

js.

## Library
ここで探せる。
[https://reactnative.directory/](https://reactnative.directory/)

ライブラリによってはプラットフォーム固有のコードがある。
これを使用する場合はAuto-Linkingを使うといい。

`yarn react-native run-android`

[cli/docs/autolinking.md at main · react-native-community/cli · GitHub](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md)

## useState
戻り値の第一引数に読み込み用の値、第二引数に変更用の関数が入る。
関数の引数は初期値。

## Text

最小構成
```js
const TextInANest = () => {
  const bodyText = 'This is not really a bird nest.';

  return (
      <Text>{bodyText}</Text>
  );
};

export default TextInANest;
```

`<Text>`タグに包んで出せば文字になる。


```js
const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText} onPress={onPressTitle}>
        {titleText}
        {'\n'}
        {'\n'}
      </Text>
      <Text numberOfLines={5}>{bodyText}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TextInANest;
```

### 主要なProps

onPress
押すと関数が呼び出される。

selectable
セレクトできるようになる。

## 