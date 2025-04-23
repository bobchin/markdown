# HTML/CSS

## TOC

- [HTML/CSS](#htmlcss)
  - [TOC](#toc)
  - [Links](#links)
    - [MDN](#mdn)
  - [CSS フレームワーク](#css-フレームワーク)
  - [マテリアルデザイン](#マテリアルデザイン)
  - [まとめ](#まとめ)

## Links

- [MDN ウェブ開発の学習](https://developer.mozilla.org/ja/docs/Learn_web_development)
- [MDN ウェブ開発のチュートリアル](https://developer.mozilla.org/ja/docs/MDN/Tutorials)
- [文系大学生のためのHTML／CSS入門](https://zenn.dev/ojk/books/intro-to-html-css)
- [HTML/CSSのレイアウト手法変遷 〜tableからgridまで〜](https://qiita.com/ebim/items/c406d40143d789a47eee)

### MDN

- [今日からはじめる「 MDN 」](https://note.com/dotinstall/n/n5d86e76dfc4e)

"MDN Web Doc" 仕様書の次に正確で信頼できる Web についてのドキュメント  
Mozilla Foundation が運営


## CSS フレームワーク

- [Trailwind CSS](https://tailwindcss.com/)
- [Bootstrap](https://getbootstrap.jp/)
- [Bulma](https://bulma.io/)

## マテリアルデザイン

Googleが発表したデザインのガイドライン。「見やすく、直感的に操作できるWebページ・サービス」を作ることを目的としています。

- 現実世界の物理法則を取り入れる
- 影を活用して立体感を作る
- 色の数を少なく配色する
  - 有彩色4色まで
    - メインカラー
    - サブカラー
    - アクセントカラー
- 紙とインクの要素で組み立てる
- 連続性のあるアニメーション

## まとめ

- ボックスモデル
  - Content: 子要素などの内容
  - Padding: 内側の余白（ContentとBorderの間）
  - Border : 境界線
  - Margin : 外側の余白（Borderの外）

    ```html
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="uft-8">
        <link rel="stylesheet" href="style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>チャンネル登録ボタンを作ろう</title>
      </head>

      <body>
        <p>チャンネル登録</p>
      </body>
    </html>
    ```

    ```css
    body {
      background-color: rgb(251, 244, 236);
    }

    p {
      width: 130px;
      color: #fff;
      background-color: #0f0f0f;
      text-align: center;
      font-size: 14px;
      padding: 8px 5px;
      border-radius: 18px;
      margin: 0px auto;
    }
    ```

- ブロックレベル
  - 要素はブロック＝全幅に広がる => 他要素は新しい行から始まる
  - ex) <p></p>, <div></div>
    - 要素が改行される
    - width, height が適用される
    - padding, margin が適用される
    - 親要素いっぱいの幅をとる
- インラインレベル
  - 要素はインライン＝幅は要素の幅 => 他要素はすぐ右から始まる
  - ex) <span></span>
    - 要素が**改行されない**
    - width, height が**適用されない**
    - padding, margin が**適用されない**
    - 要素の内容に応じた幅をとる

- レイアウト
  - table レイアウト
    - <table>を使う
  - float レイアウト
  - inline-block レイアウト
    - 要素自体はブロックで、他要素に対してはインライン
  - Flexbox レイアウト
  - Grid レイアウト

- HTML と CSS
  - 外部スタイルシート(CSS ファイル)
  - 内部スタイルシート(style 要素)
  - インラインスタイル(style 属性)

    ```html
    <!-- 外部スタイルシート -->
    <head>
      <link href="stle.css" rel="stylesheet">
    </head>

    <!-- 内部スタイルシート -->
    <head>
      <style>
        h1 {
          color: blue;
        }
      </style>
    </head>

    <!-- インラインスタイル -->
    <h1 style="color: blue; background-color: firebrick;">CSS とは</h1>
    ```

