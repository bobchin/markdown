---
marp: true
headingDivider: 2 # 通常は「---」で改ページ指定だが、"#"が改ページとなり、2個以内を改ページ対象とする
theme: gaia
header: "__Marp Sample__"
footer: "by **@ichihashi**"
---

# Marpでプレゼン資料を作る

- 参考
  - [【VS Code + Marp】Markdownから爆速・自由自在なデザインで、プレゼンスライドを作る](https://qiita.com/tomo_makes/items/aafae4021986553ae1d8)

  - [MarpIt](https://marpit.marp.app/markdown)

---

- 設定
  - Global Directive(トップで指定する)
    - headingDivider: 改ページ指定を#で指定できる。数値で指定。
    - theme: 表示テーマ(default|gaia|uncover)
  - Local Directive(各ヘッダ下で指定する)
    - pagination: ページ番号
    - header: ヘッダー
    - footer: フッター
    - "_" を先頭につけた項目は対象スライドのみに適用される

---

- PDFの作成
  - 右上のMarpアイコンより、Export slide deck

- 外部ツールの図表の取り込み
  - [Kroki.io](https://kroki.io/)
  - [Draw.io](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
  - [Vega](https://vega.github.io/vega/)

## ウォーミングアップ

  ```markdown
  ---
  marp: true
  ---
  # タイトル

  ---
  # スライド1

  テスト

  ---
  # スライド1

  テスト

  ---
  ```

<!-- Marpサンプル -->

# タイトル

# スライド1
<!--
_backgroundColor: black
_color: red
-->

テスト

# スライド2

テスト


## 画像の指定
<!--
_color: white
-->

![bg brightness:0.4](back.jpg)
Brightnessを落とし、文字の視認性を上げました

## 左に画像を入れる
<!--
# ページ番号をいれる
paginate: true
-->

![bg left:40%](back.jpg)

- 表示場所は比率を指定する

## 複数画像を並べる

![bg brightness:0.5 vertical right:40%](ayase1.jpg)
![bg brightness:0.5](ayase2.jpg)
![bg brightness:0.5](ayase3.jpg)

単純に複数並べると横に整列する。
left/right + 割合指定で大きさを指定できる


