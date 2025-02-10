---
date: 2024-03-01
tags:
  - Bar
---

up:: [React](<../Library/React.md>)

Web上で動くReactでネイティブアプリを作るプロジェクト。
ブラウザを含めてアプリ作るElectronより小さくなる。
簡単に作りたいなら[Expo](<../../Info/Expo.md>)が使える。

## component
htmlでいう要素の概念。
正しく言うとMarkupを返すJavascript関数。

まず、Reactからコアコンポーネントをimport。
ここでは`Text`コンポーネントを使う。
```tsx
import React from 'react';
import {Text} from 'react-native';
```

続いてコアコンポーネントが入るコンポーネントを作る。
関数だがラムダ式っぽいの。これに入れると関数コンポーネントと呼ばれる。
**必ず大文字で始めること**。HTMLタグと見分けるため。
```tsx
const Cat = () => {};
```
**関数コンポーネントが返す要素は、全てReact要素としてレンダリングされる。**

関数であるため、export defaultとすればアプリ全体でそのコンポーネントを扱うことが出来る。
```tsx
import React from 'react';
import {Text} from 'react-native';

const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};

export default Cat;
```
このタグで囲むような書き方はjsx。要素中にjsを記述する記法。
`{}`内にjsの変数や関数を入力できる。

### カスタムコンポーネント
コンポーネントはネスト出来る。
以下のようにすると、Cat関数を三回呼び出せる。
```tsx
import React from 'react';
import {Text, View} from 'react-native';

const Cat = () => {
  return (
    <View>
      <Text>I am also a cat!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
};

export default Cafe;
```

### Props
関数の引数のような概念。
()に入れて作る。
```tsx
import React from 'react';
import {Text, View} form 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </View>
  );
};

export default Cafe;
```

これはコアコンポーネントによく使う。
```tsx
import React from 'react';
import {Text, View, Image} from 'react-native';

const CatApp = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
        }}
        style={{width: 200, height: 200}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
};

export default CatApp;
```

`{{}}`はJSオブジェクトを渡すときの記法。
そもそもオブジェクトが`{}`で表現されるため、ある種エスケープとして二重にする。
数値や配列といった文字列以外であれば`{}`でも渡せる。

### state
コンポーネントごとの個人データストレージのようなもの。
時間の経過で変わるデータ、ユーザー操作によるデータなどの処理に役立つ。

これはReactの関数で作る。ここでは`useState`をimportして使用。
これは関数コンポーネントに状態を追加するためのフック。
```tsx
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

流石に長くなってきたので解説。
`useState`をimportしたら、()にデフォルトの状態を入力して代入。
```tsx
const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);
  // ...
};
```
ここで後者の`setIsHungry`は前者の`isHungry`の値を変更するためのset関数。
というかこういうこと。
`[<getter>, <setter>] = useState(<initialValue>).`
内部的にはsetを使った時点でこのuseState関数があるコンポーネントが再レンダリングされる。

Button componentでこのsetIsHungryを使っている。
押したらsetIsHungryを通してfalseにするので注意。
```tsx
<Button
  onPress={() => {
    setIsHungry(false);
  }}
  //..
/>
```

あとは状態によって書き分け。
Buttonのdisable propsにboolを入れれば、それがtrueの時にButtonが無効化される。

```tsx
<Button
  //..
  disabled={!isHungry}
  title={isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
/>
```

最後の文は猫を二匹呼ぶ。
```tsx
const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};
```

`<>`はfragmentと呼ばれるもの。
`<view>`など余分なものを使わずすっきり記述できる。

[React Fundamentals · React Native](https://reactnative.dev/docs/intro-react)

## Expo
React Native用フレームワーク。アプリの構築、配布、反復の支援。
開発ワークフローの自動化に使われる。

[Expo](<../../Info/Expo.md>)

## Ignite
ボイラープレートとコンポーネントライブラリを備えた技術スタック。
画面やモデルを一瞬で作れる。

## 独自コンポーネント
コンポーネント配布コミュニティのReact Native Directoryがある。

[More Resources · React Native](https://reactnative.dev/docs/more-resources)
[https://reactnative.directory/](https://reactnative.directory/)