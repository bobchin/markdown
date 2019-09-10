# arduino について

## 入手

- [梅沢無線](http://umezawa-sendai.shop-pro.jp/?pid=136587880)
- [スイッチサイエンス](https://www.switch-science.com/catalog/789/)
- [秋月通商](http://akizukidenshi.com/catalog/g/gM-07385/)

※2012.12現在の最新バージョンは、*Arduino Uno Rev3*

## メモ

- Arduino Uno : Arduino Duemilanove の後継
- Arduinoはハードウェアの設計がオープンソースになっている。
  そのため互換性のあるハードウェアがたくさん存在している。
- CPUは主にAtmelのAVRが使われている
- マイコンのようなライター（書き込み機）は不要で、PCとUSBで接続しIDE上から書き込みができる
- 本体にない機能は **シールド** という別基板があり本体基盤上に接続することで機能拡張ができる
- 電源
    - PCのUSBポートから(5V)
    - ACアダプタ(+6V～12V)からDCジャックより
    - ピンに直接5Vから

    ```text
    最大定格電流：LEDに最大定格以上の電流を流し続けるとLEDは壊れる
    電気的特性：LEDに電気的特性の順電流を流したら、LEDの電圧が電気的特性の順電圧になる
    順方向電流：IF
    順方向電圧：VF
    ```

## IDE

Webエディタとアプリケーションの2種類がある。
通常はWebエディタで十分か？

- [Download](https://www.arduino.cc/en/Main/Software)
  - [Webエディタ](https://create.arduino.cc/editor)
  - アプリケーション
    - Windows
    - Mac
    - Linux

### Webエディタ

- "https://create.arduino.cc" にログインする
- 「Getting Started」から「INSTALL ARDUINO CREATE PLUGIN」でプラグインをインストール
- インストールされるとタスクバーにアイコンが表示される。そこから「Go to Arduino Create」でスケッチ作成ページに飛べる
  - もしくは上記ページから「Arduino Web Editor」でもいい

- 使い方
  - サンプルの使い方
    - 左の「Examples」よりサンプルを選択する。 ex) Examples - BUILT IN - 01.BASICS - Blink
    - 上部のチェックボタンを押してVerifyする。Successが表示されればOK。
    - 上部の右矢印ボタンを押してArduino本体にプログラムをアップロードする。

    ```
    void setup() {
      pinMode(LED_BUILTIN, OUTPUT);
    }

    void loop() {
      // １秒おきにLEDが点滅する
      digitalWrite(LED_BUILTIN, HIGH);
      delay(1000);
      digitalWrite(LED_BUILTIN, LOW);
      delay(1000);
    }
    ```


## LCDキーパッドシールド

- http://physics.cocolog-nifty.com/weblog/2018/07/arduino18lcd-8c.html

- ボタン
  - VCC(5V)
  - R2(2K)
  - RIGHT - AD0 ----- (5.25K) 3mA
  - R3(330)
  - DOWN        ----- () 1.6A
  - R4(620)
  - LEFT
  - R5(1K)
  - SELECT
  - R6(3.3K)

  - analogRead() は0～5Vを0～1023で表示する
    - 5/1024 = 0.005（1 = 0.005V）

|ボタン|AD0|analogRead()
|:--|:--|:--|
|なし  |  0V?|0|
|RIGHT |  0V |0|
|UP    |5x 330/2330 = 0.7V |0.7/0.005 = 140|
|DOWN  |5x 950/2950 = 1.6V |1.6/0.005 = 320|
|LEFT  |5x1950/3950 = 2.5V |2.5/0.005 = 500|
|SELECT|5x5250/7250 = 3.6V |3.6/0.005 = 720|


## 参考

- [本家](https://www.arduino.cc/)
- [今すぐ始めるArduino](http://www.slideshare.net/funa3/arduino-13169622)
- [日本語リファレンス](http://www.musashinodenpa.com/arduino/ref/)
- [artgul Aruduino関係のメモ](http://artful.jp/blogs/arduino_memo/)
- [Arduino便利メモ](http://ndesign.ifdef.jp/a/a_m.html)
- [建築発明工作ゼミ2008](http://kousaku-kousaku.blogspot.jp/2008/07/arduino.html)
