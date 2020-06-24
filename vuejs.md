# Vue.js

ユーザーインターフェースを構築するための**プログレッシブフレームワーク**

## Table of Contents

- [Vue.js](#vuejs)
  - [Table of Contents](#table-of-contents)
  - [参考](#%e5%8f%82%e8%80%83)
  - [要件](#%e8%a6%81%e4%bb%b6)
  - [準備](#%e6%ba%96%e5%82%99)
  - [使い方](#%e4%bd%bf%e3%81%84%e6%96%b9)
    - [テンプレート構文](#%e3%83%86%e3%83%b3%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88%e6%a7%8b%e6%96%87)

## 参考

- [Vue.js](https://jp.vuejs.org/)
  - [ガイド](https://jp.vuejs.org/v2/guide/): Vue.jsについての全般
  - [クックブック](https://jp.vuejs.org/v2/cookbook/): ある項目を掘り下げたもの
- [jsFiddle](https://jsfiddle.net/boilerplate/vue)
  - [HelloWolrd](https://jsfiddle.net/chrisvfritz/50wL7mdz/)
- [Scrimba](https://scrimba.com/playlist/pXKqta)

## 要件

- ECMAScript5準拠のブラウザ
- バージョニング(X.Y.Z)
  - メジャーバージョン(X): APIに互換性のない更新
  - マイナーバージョン(Y): 後方互換性があり、機能性の追加の更新
  - パッチ            (Z): 後方互換性があり、バグの修正のみ

## 準備

- 直接埋め込み
  - [vue.min.js](https://jp.vuejs.org/js/vue.min.js) をダウンロードして、<scrpt> で埋め込む
    ```HTML
    <script src="js/vue.min.js"></script>
    ```

- CDN

  ```HTML
  <!-- 最新バージョン -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  or

  <!-- 本番バージョン: 特定のバージョンで固定する -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
  ```
- NPM
- CLI
  - オフィシャルなコマンドラインツール


## 使い方

- 簡単なもの
  Vueのオブジェクトの変数とDOMを関連付けて、変数を変えることで表示を変えることができるようになる。

  - 変数表示
    ```
    {{ message }}
    ```

  - 属性値等への変数割り当て
    ```
    <span v-bind:title="message">
    ```

  - if文
    ```
    <span v-if="seen">Now you see me</span>
    ```

  - for文
    ```
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
    ```

  - ユーザ入力関係・双方向
    ```
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">ReverseMessage</button>

    <p>{{ message2 }}</p>
    <input v-model="message2">
    ```

  - コンポーネント
    ひとまとまりの機能をパッケージングする。VBとかGUIプログラムのtextboxとかみたいなイメージ。

- Vue インスタンス
  Vue インスタンスをDOMに関連付けて、操作はこのインスタンスを扱うことで表示等も変更できるという感じ。
  => リアクティブシステムに追加されたものが反応する

  - インスタンスの生成
    ```
    var vm = new Vue({
    });
    ```

  - データ
    Vueインスタンス生成時に、dataプロパティに割り当てたもののみ**リアクティブ**になる。

    - dataプロパティに渡したものは、インスタンスのプロパティとしてアクセスできるようになる。

    ```
    var data = { a: 1 }
    var vm = new Vue({
      data: data
    });

    vm.a == data.a // => true
    ```

  - メソッド


  - ライフサイクルフック
    インスタンスの生成じに初期化処理がされるが、そのある段階でフック処理をかけることができる。

    - ライフサイクル
      - イベント・ライフサイクル初期化
      - インジェクション・リアクティビティ初期化（前:beforeCreate, 後:created）
      - テンプレートコンパイル
      - vm.$elの生成とvm.elへの割り当て（前:beforeMount, 後:mounted）
      - マウント
        - データ変更（前:beforeUpdate, 後:updated）
      - ウォッチャー・子コンポーネント・イベントリスナーの終了（前:beforeDestory, 後:destroyed）
      - 廃棄

    - created:
    - mounted:
    - updated:
    - destoryed:

    ```
    var vm = new Vue({
      data: {
        a: 1
      },
      created: function(){
        console.log("a is:" + this.a)
      }
    })
    ```
### テンプレート構文

  ```HTML
  # テキスト
  <span>Message: {{ msg }}</span>
  ```




