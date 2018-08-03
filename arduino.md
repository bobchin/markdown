* arduino について

** 入手

- 梅沢無線

※2012.12現在の最新バージョンは、*Arduino Uno Rev3*

** 環境

- [http://arduino.cc/en/Main/Software](http://arduino.cc/en/Main/Software)

** メモ

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

** IDE

Webエディタとアプリケーションの2種類がある[[Download](https://www.arduino.cc/en/Main/Software)]
通常はWebエディタで十分か？

- Webエディタ
- アプリケーション

** 参考

- [本家](https://www.arduino.cc/)
- <http://www.slideshare.net/funa3/arduino-13169622>
- [日本語リファレンス](http://www.musashinodenpa.com/arduino/ref/)
- [artgul Aruduino関係のメモ](http://artful.jp/blogs/arduino_memo/)
- [Arduino便利メモ](http://ndesign.ifdef.jp/a/a_m.html)
- [建築発明工作ゼミ2008](http://kousaku-kousaku.blogspot.jp/2008/07/arduino.html)
