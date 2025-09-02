# Arduino IDE の使い方

## Links

- [ダウンロード](https://www.arduino.cc/en/software/)
- [Arduino IDE 2 Document](https://docs.arduino.cc/software/ide/#ide-v2)

- リファレンス
  - [Language Reference](https://docs.arduino.cc/language-reference/)
  - [Arduino日本語リファレンス](http://www.musashinodenpa.com/arduino/ref/)
  - [MicroPython](https://docs.arduino.cc/micropython/)
    - [Arduino Lab for MicroPython(MicroPython用の簡易エディタ)](https://labs.arduino.cc/en/labs/micropython)

## 環境構築

- 日本語化
  - 【ファイル(File)】 - 【基本設定(Preference)】-【設定(Settings)タブ】- 【エディター言語(Language)】： 日本語

## 画面構成

- 上部
  - 検証(ベリファイ)     : スケッチブックをコンパイルする
  - 書き込み(アップロード): 対象のボードにコンパイルしたものをアップロードする
  - ボードセレクトとポート: 対象のボード(ex. arudino uno, raspberry pi pico ...)によって適当な種類を選択する


- 左ペイン
  - スケッチブック     : いわゆるソースコードのプロジェクト
  - ボードマネージャ   : ボードに応じた ArduinoIDE 用のパッケージ群
  - ライブラリマネージャ: Arduino 用のライブラリ
  - デバッグ           : デバッガ
  - 検索              : 検索


## 設定

- ボードマネージャ
  使用するボード（マイコン）に応じたボードマネジャーを取得する

- Raspberry Pi Pico  

  - [Arduino-Pico](https://arduino-pico.readthedocs.io/en/latest/index.html)

    基本対象外のボードは、追加の URL を登録する必要がある。  
    ファイル(File)】 - 【基本設定(Preference)】-【設定(Settings)タブ】で **追加のボードマネージャURL** に以下を追記する  
    これでボードマネジャのリストに Pico が含まれるようになる。  
    RP2040用のボードマネジャ: https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json  

    - ボードマネジャの追加
      ボードマネジャより **pico** で検索。複数ボードマネジャーが出てくる。  
      **Raspberry Pi Pico/RP2040/RP2350** をインストール  
      ***※MBed版*** もあるが、Earle Philhower版のほうができが良い  

    - スケッチのアップロードで初回のみの処理  
      オートリセットが効かないので、BOOTSEL ボタンを押してボードを起動する。  
     【ツール】 - 【接続ポート】で **UF2ボード** を選択  
     ボードを再起動後は、新しいポートで認識されるので【ツール】 - 【接続ポート】で選択する  


## プログラミング

通常は、Arduino 専用言語を使う。MicryPython も使えるようだ。


- [プログラミング](https://docs.arduino.cc/programming/)

### 定数

- HIGH | LOW                   : degitalRead()|degitalWrite() 用
- INPUT | OUTPUT | INPUT_PULLUP: pinMode() 用
- 数値
  - 10進: 101   => 101
  - 2進 : 0b101 => 2^2 + 2^0 = 5
  - 8進 : 0101  => 8^2 + 8^0 = 65
  - 16進: 0x101 => 16^2 + 16^0 = 257
- LED_BUILTIN: オンボードLEDのピン番号を表す定数
- true | false

### 型

- bool(boolean): true | false
- byte: 8bit unsigned number(0-255)
  - unsigned char: byteと同じ
- size_t: オブジェクトの大きさを表す
- array: 配列
- void: 関数で使用。何も返さないことを表す。

- 文字・文字列
  - char: 文字
    - シングルクォートで作成
    - 内部的にはAsciiコードで保持した数値
  - string: 文字列
    - ダブルクォートで作成
    - char の配列
  - String(): 文字列オブジェクトを作成

- 数値
  - int   : 16bit
  - long  : 32bit
  - short : 16bit
  - float : 32bit
  - double: 32bit or 64bit(float と同じ)
  - word  : 16bit unsigned
  - byte  : 8bit unsigned

#### 配列

```c
int  myInts[6];                         // 初期化なし
int  myPins[] = {2, 4, 8, 3, 6, 4};     // サイズ指定なし
int  mySensVals[5] = {2, 4, -8, 3, 2};  // サイズ指定あり、初期化あり
char message[6] = "hello";              // 文字列の場合は、サイズは文字数 + 1(null分)

int myArray[10]={9, 3, 2, 4, 3, 2, 7, 8, 9, 11};
myArray[9];       // 11
myArray[10];      // 不正アクセス
myArray[0] = 10;  // 代入
```

#### 文字・文字列

```c
char myChar = 'A';  // これとこれは同じもの
char myChar = 65;   // ASCIIコード値が保存される

// 文字列は、(1)string型 (2)charの配列 のどちらか
char Str1[15];
char Str2[8] = {'a', 'r', 'd', 'u', 'i', 'n', 'o'};
char Str3[8] = {'a', 'r', 'd', 'u', 'i', 'n', 'o', '\0'};
char Str4[] = "arduino";
char Str5[8] = "arduino";
char Str6[15] = "arduino";

String thisString = String(13);       // "13"    10進指定の場合は、そのまま文字列
String thisString = String(13, HEX);  // "d"     HEX指定の場合は、値の16進表示を文字列
String thisString = String(20, HEX);  // "14"    HEX指定の場合は、値の16進表示を文字列
String thisString = String(13, BIN);  // "1101"  BIN指定の場合は、値の2進表示を文字列
```

### 大枠

- setup(): 初期設定。起動時に1回だけ走る。
- loop() : ループ処理。メイン処理を記述することになる。

### 演算

- 代入: =

- 算術演算
  - 加算: +
  - 減算: -
  - 乗算: *
  - 除算: /
  - 剰余: %

- 比較演算
  - 等価: ==
  - 不等価: !=
  - 大小: >, >=. <, <=

- 論理演算

- ビット演算
  - <<, >>, &, ~


## Raspi Pico

- [Arduino環境でRaspberry Pi Picoを使う](https://tamanegi-digick.com/it/rpipico/)

- IDE インストール
  - RP2040 ボードライブラリ
    - [ボードマネージャ](https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json)




