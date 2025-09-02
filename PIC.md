# PIC マイコン

## Links

- [PICマイコン（PIC16F1827）で実現できる機能と解説リンクまとめ](https://smtengkapi.com/engineer-pic16f1827-main)
  - [MPLAB X IDEによるPICマイコンの開発環境作りの手順](https://smtengkapi.com/engineer-pic-idexc8)
  - [MPLAB Code Configurator(MCC)の追加と使い方](https://smtengkapi.com/engineer-pic-mplab-plugin-mcc)

- [MICROCHIP University](https://mu.microchip.com/page/all-classes-jp)

- [超入門 PICマイコンの使い方](https://www.marutsu.co.jp/pc/static/large_order/begin_pic?srsltid=AfmBOoqVI6ETVzdgQ11md7bG2Z534t2QgDoKmYOkvAYkTOpa3opiHUVd)
- [PICマイコン電子工作入門〜基礎編〜](https://tool-lab.com/pic-basic/)
- [PICマイコン Lab.](https://sanuki-tech.net/pic/)

## ソフトウェアの関係

- [MPLAB X IDE(IDE)](https://www.microchip.com/en-us/tools-resources/develop/mplab-x-ide)
  - 開発環境（エディタ・ツール関係）
  - Apache NetBeans でできている？
    - [日本語化](https://github.com/junichi11/netbeans-translations-ja)
  - MPLAB IPE(Integrated Programming environment)
    - PIC に HEXファイルを書き込んだり読み込んだりするツール
- [MPLAB XC Compilers(コンパイラ)](https://www.microchip.com/en-us/tools-resources/develop/mplab-xc-compilers)
  - マイコン用の C コンパイラ
  - [MPLAB XC8 Compiler(8bit)]()
  - [MPLAB XC16 Compiler(16bit)]()
  - [MPLAB XC32 Compiler(32bit)]()
- ツール
  - マイコンのシステム設定や周辺モジュールの初期化処理をGUIによって設定できる
  - [Code Configurator](https://www.microchip.com/en-us/tools-resources/configure/mplab-code-configurator)
    - Classic
    - Melody
  - [Harmony v3](https://www.microchip.com/en-us/tools-resources/configure/mplab-harmony)

## MPLAB X IDE

- プロジェクトの作成
  - テンプレートを選べる
    - standalone = 空のテンプレータオ
  - デバイスの選択
    - デバイス名を入力
    - Tool はデバッガ？
  - コンパイラを選択
    - XCxx を選択

- cファイルの作成
  - 新しいファイル - XC8コンパイラ - main.c

- プログラム
  - C で記述
  - アセンブラで記述
  - コンパイル結果は "HEX(ヘキサ)ファイル" と呼ぶ

## MCC(MPLAB Code Configurator)

- [MPLAB Code Configurator](https://tool-lab.com/pic-app-25/)

マイコンの動作周波数設定やピンの入出力設定のコードを作成してくれる？

- MCC Classic  : 古くからある。8ビットメイン
- MCC Melody   : 新しいバージョン。8/16/32ビット
- MPLAB Harmony: 最新。32ビット

## 構成

- CPU
- プログラムメモリ: プログラムを書き込む。プログラムバスでCPUのみ接続されている。
- データメモリ   : 周辺機器やCPUに接続されているので、データアクセスに使う。
- 周辺機器
  - GPIO
  - PWM
  - タイマー
  - etc...

## データ書き込み

- ICSP(In Circuit Serial Programming)
  - 基盤に挿したままでメモリに書き込むことができる

- PIC ライター
  - PICkit5
  - PICkit4
  - PICkit3
  - [PIC-K150](https://www.aitendo.com/product/12851)
  - [AKI-PICプログラマー Ver.4](https://akizukidenshi.com/catalog/g/g102018/)

- VDD
- VSS
- MCLR
- ICSPDAT
- ICSPCLK

## ファミリー

- [PICマイコンの種類と選び方](https://ana-dig.com/pic15/)
  - 8bit
    - PIC10
    - PIC12
    - PIC16
      - PIC16F1シリーズ4桁
      - PIC16F1シリーズ5桁
    - PIC18
  - 16bit
    - PIC24
    - dsPIC
  - 32bit
    - PIC32

  - ビットコア = 1命令(1 word)に使用するビット数
    - 12bit core（ベースライン アーキテクチャ）
    - 14bit core（ミッドレンジ  アーキテクチャ）
    - 16bit core（ハイパフォーマンス アーキテクチャ）

- [16F84Aはもう古い!?格段に使いやすくなったPIC16F1ファミリとは？](https://www.youtube.com/watch?v=yNX6CNtNY10&t=7s)
  - 内蔵プルアップ抵抗・状態変化検出機能
  - AD/DAコンバータ
  - Configurable Logic Cell(CLC): ハードウェアロジック回路
  - Pulse Width Modulation(PWM)
  - Numerically Controlled Oscillator(NCO)
  - Complementary Waveform Generator(CWG)/Complementary Output Generator(COG)
  - タイマー
  - 容量検知モジュール
- 16F15325
- 16F1827
- 16F84A(旧定番)
- 16F627A(旧定番)



