# RaspberryPi Pico のまとめ

- [RaspberryPi Pico のまとめ](#raspberrypi-pico-のまとめ)
  - [参考](#参考)
  - [ファームウェア](#ファームウェア)
  - [機能](#機能)
  - [Thonny](#thonny)
  - [部品](#部品)
    - [LED](#led)
    - [Button](#button)
    - [PWM](#pwm)
    - [ADC](#adc)
    - [PIO](#pio)

## 参考

- [Raspberry Pi Pico](https://www.raspberrypi.com/products/raspberry-pi-pico/)
- [Raspberry Pi Pico をセットアップしよう](https://datasheets.raspberrypi.com/pico/getting-started-with-pico-JP.pdf)
- [RP2040 を使用したハードウェア設計](https://datasheets.raspberrypi.com/rp2040/hardware-design-with-rp2040-JP.pdf)
- [GetStart MicroPython](https://www.raspberrypi.com/documentation/microcontrollers/micropython.html)
- [python-sdk](https://datasheets.raspberrypi.com/pico/raspberry-pi-pico-python-sdk.pdf)

- [Freenove Ultimate Starter Kit for Raspberry Pi Pico](https://github.com/Freenove/Freenove_Ultimate_Starter_Kit_for_Raspberry_Pi_Pico)
- [Thonny](https://thonny.org/)

## ファームウェア

- [MicroPython downloads](https://micropython.org/download/)
  - [Pico](https://micropython.org/download/RPI_PICO/)
  - [Pico W](https://micropython.org/download/RPI_PICO_W/)
  - [Wiznet W5100S-EVB-Pico](https://micropython.org/download/W5100S_EVB_PICO/)

## 機能

- Pico

  - GND
  - Power
    - VBUS : USB 電源
    - VSYS : 2-5V 入力
    - 3V3 : 3.3V 出力
    - 3V3_EN: 3.3V 出力を有効にするかどうか
  - System
    - RUN: 起動・停止・リセット
  - ADC : アナログ入出力(12bit)x3
    - ADC0:GP26
    - ADC1:GP27
    - ADC2:GP28
  - PWM : パルス制御 x16
  - UART: シリアル制御 x2
  - SPI: シリアル制御 x2
  - I2C: シリアル制御 x2

  - シリアル制御(デフォルト)
    - UART
      - BAUDRATE: 115200
      - BITS: 8
      - STOP: 1
      - TX0: GP0
      - RX0: GP1
      - TX1: GP4
      - RX1: GP5
    - I2C
      - Frequency: 400,000
      - SCL0: GP9
      - SDA0: GP8
      - SCL1: GP7
      - SCL1: GP6
    - SPI
      - BAUDRATE: 1,000,000
      - POLARITY: 0
      - PHASE : 0
      - BITS : 8
      - FIRSTBIT: MSB
      - SCK0 : GP6
      - MOSI0: GP7
      - MISO0: GP4
      - SCK1 : GP10
      - MOSI1: GP11
      - MISO1: GP8

- Pico W
  - Wireless
    - ON : GP23
    - D : GP24
    - CLK: GP29
    - CS : GP25

## Thonny

- [Thonny](https://thonny.org/)

- 設定
  - 表示
    - シェル
    - ファイル
  - 実行
    - インタプリタ設定
      - MicroPython(Raspberry Pi Pico)

## 部品

### LED

| LED  | 電圧降下 | 最大電流 | 推奨電流 |
| :--: | :------: | :------: | :------: |
| 赤色 | 1.9-2.2V |   20mA   |   10mA   |
| 緑色 | 2.9-3.4V |   10mA   |   5mA    |
| 青色 | 2.9-3.4V |   10mA   |   5mA    |

- GPIO

  - [datasheet 2.19.4.Pads](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf)
  - 出力電圧は 3.3V
  - 電流は、2mA, 4mA, 8mA, 12mA が選択できるが、デフォルトは 4mA

- 赤色の場合
  - $ (3.3 - 2.0)V / 220Ω = 5.9mA $

### Button

- 入力電流
  - $ 3.3V / (10k+10k)Ω = 1.6mA $

### PWM

デジタル信号をアナログ信号として表す。
デジタルピンに一定周期の矩形波を送る。
周期のうちハイレベルが出力されている時間をパルス幅と呼び、
周期のうちパルス幅の割合をデューティ比と呼ぶ。

- 16 個の PWM チャンネルがあり、個別に周波数とデューティ比を指定できる
- 周波数は、7Hz ～ 125MHz
- デューティ比が、デジタルの Max 値に対する割合の値になる
  - ex) 5V でデューティ比 75%の場合、3.75V となる
  - duty_u16() を使う場合は、16bit=2^16=65536 分割で指定する
- 周波数の逆数が周期になる。
  - ex) 周波数 10000Hz => 1/10000 = 100μsec

### ADC

Analog-to-digital converter
アナログ信号をデジタルコードに変換する。
分解能とチャンネルという２つの主な特徴がある。

- 分解能

  - 12 ビットの分可能がある
    - $2^{12} = 4096$ 段階でアナログ信号をデジタル信号に変える
    - 3.3V の電圧であれば、0 ～ 3.3 を 4096 分割する
  - **ただし、Micropython のファームウェアでは内部的に 16 ビットのため、**
    $ 2^{16} = 65536 $ => 0 ～ 65535$ の範囲となる
    - V = 3V の場合、$ ADC(0 ～ 65535) = 3 / 3.3 \* 65535 = 59577 $
    - ADC = 59577 の場合、$ V = 59577 / 65535 \* 3.3 = 3 $

- Pin(実質使えるのは ADC0-2 までの３つ)

  - ADC0: GP26
  - ADC1: GP27
  - ADC2: GP28
  - ADC3: GP29(ただし VSYS で使用されている)
  - ADC4: 組み込みの温度センサー

- 電流
  - $ 3.3V / 10kΩ = 0.3mA $

### PIO

- [Interface 2021 年 8 月号](https://interface.cqpub.co.jp/magazine/202108/)
- [ラズピコ PIO ～解説編～](https://moons.link/pico/post-498/)
- [](https://qiita.com/fude-t/items/d2baf1c98ba807273dcf)
- [初めの一歩！ラズパイ Pico マイコン ×Python で L チカ入門](https://www.zep.co.jp/utaguchi/article/z-picoled_all-da1/)

- 構造

  - ２つの PIO ＋それぞれに４つのステートマシン
  - PIO
    - ステートマシン x4: CPU みたいなもの
      - OSR(Out Shift レジスタ)
      - ISR(In Shift レジスタ)
      - Scratch X: スクラッチレジスタ X
      - Scratch Y: スクラッチレジスタ Y
        - 上記レジスタはすべて32ビット
      - PC(Program Counter): プログラムカウンタ
      - Clock Div: クロック分周器
      - Control Logic
    - FIFOx8 : システム側とデータを出し入れする場所。
      - 1FIFO は 32 ビット。
      - TX FIFOx4: PULL 命令で、TX FIFO => OSR の方向にデータ転送される
      - RX FIFOx4: PUSH 命令で、ISR => RX FIFO の方向にデータ転送される
    - 命令メモリ
      - 32 命令を 4 つのステートマシンで共有
      - 1 命令は、16 ビット。
    - I/O マッピング : PIO と Pin を対応付けする
      - out pins : 出力 Pin と対応付け
      - in pins : 入力 Pin と対応付け
      - side-set pins: サイドセットピンとして出力 Pin を対応付け
    - IRQ : 割り込み要求

- 命令セット

  | bit: | 15  | 14  | 13  | 12  | 11  | 10  | 09  |       08       | 07  | 06  |     05      | 04  | 03  | 02  | 01  |    00     |
  | :--: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :------------: | :-: | :-: | :---------: | :-: | :-: | :-: | :-: | :-------: |
  | JMP  |  0  |  0  |  0  |  >  |  >  |  >  |  >  | Delay/Side-Set |  >  |  >  |  Condition  |  >  |  >  |  >  |  >  |  Address  |
  | WAIT |  0  |  0  |  1  |  >  |  >  |  >  |  >  | Delay/Side-Set | Pol |  >  |   Source    |  >  |  >  |  >  |  >  |   Index   |
  |  IN  |  0  |  1  |  0  |  >  |  >  |  >  |  >  | Delay/Side-Set |  >  |  >  |   Source    |  >  |  >  |  >  |  >  | Bit count |
  | OUT  |  0  |  1  |  1  |  >  |  >  |  >  |  >  | Delay/Side-Set |  >  |  >  | Destination |  >  |  >  |  >  |  >  | Bit count |
  | PUSH |  1  |  0  |  0  |  >  |  >  |  >  |  >  | Delay/Side-Set |  0  | IfF |     Blk     |  0  |  0  |  0  |  0  |     0     |
  | PULL |  1  |  0  |  0  |  >  |  >  |  >  |  >  | Delay/Side-Set |  1  | IfE |     Blk     |  0  |  0  |  0  |  0  |     0     |
  | MOV  |  1  |  0  |  1  |  >  |  >  |  >  |  >  | Delay/Side-Set |  >  |  >  | Destination |  >  | Op  |  >  |  >  |  Source   |
  | IRQ  |  1  |  1  |  0  |  >  |  >  |  >  |  >  | Delay/Side-Set |  0  | Clr |    Wait     |  >  |  >  |  >  |  >  |   Index   |
  | SET  |  1  |  1  |  1  |  >  |  >  |  >  |  >  | Delay/Side-Set |  >  |  >  | Destination |  >  |  >  |  >  |  >  |   Data    |

  - 遅延とサイドセット
    - 両方で5ビット使える
    - サイドセットPinを使わない場合は、すべて遅延に回せるので、$ 2^5 = 32 $ で31サイクルまで遅延できる
      サイドセットPinを2個使う場合は、残り$ 2^3 = 8 $ で7サイクルまで遅延できることになる。

- 勘所

  - pico の PIO は、クロック周波数 125MHz で動作する。

    - 1 クロックの時間 = 1sec / (125 \* 10^6)Hz = 8 nsec
    - 1 命令の時間 = 1 命令のクロック数 \* 1 クロックの時間
    - 1 秒の命令数 = 1sec / 1 命令の時間(時間で考えた場合) = クロック周波数 / 1 命令のクロック数（回数で考えた場合）

    - 使用したい周波数 = クロック周波数 / 分割数
    - 分割数 = クロック周波数 / 使用したい周波数
    - 分割数 = クロック周波数 / (ビットレート \* 1bit あたりのクロックサイクル数)

  - クロック分周
    - クロック周波数をいくつかに分けて、周波数を下げる
  - 1 ワード = 32bit

```python
from machine import Pin
import rp2

# アセンブリ命令＝初期設定を引数で指定する
@rp2.asm_pio(sideset_init=rp2.PIO.OUT_LOW, out_shiftdir=rp2.PIO.SHIFT_LEFT, autopull=True, pull_thresh=24)
def ws2812():
    T1 = 2
    T2 = 5
    T3 = 8
    wrap_target()                               # 開始
    label("bitloop")                            # ラベルbitloopを作成
    out(x, 1)              .side(0)    [T3 - 1] # OSR から汎用レジスタX に 1bit シフトアウト
    jmp(not_x, "do_zero")  .side(1)    [T1 - 1] # 汎用レジスタX が0ならdo_zeroにジャンプ
    jmp("bitloop")         .side(1)    [T2 - 1] # ラベルbitloopへジャンプ
    label("do_zero")                            # ラベルdo_zeroを作成
    nop()                  .side(0)    [T2 - 1] #
    wrap                                        # 終了

# @rp2.asm_pio
# out_init, set_init, sideset_init: out, set命令やサイドセットで使うピンの初期状態を指定する
#   rp2.PIO_IN_LOW | rp2.PIO_IN_HIGH, rp2.PIO_OUT_LOW | rp2.PIO_OUT_HIGH,
#   最大５つ指定でき、タプルで指定。
# in_shiftdir, out_shiftdir: ISR, OSR がシフトする方向を指定(rp2.PIO.SHIFT_LEFT | rp2.PIO.SHIFT_RIGHT)
#   PIO.SHIFT_LEFT : 左にシフト＝最下位ビットからデータが入り、最上位ビットを破棄
#   PIO.SHIFT_RIGHT: 右にシフト＝最上位ビットからデータが入り、最下位ビットを破棄
# push_thresh, pull_thresh: 自動プッシュ｜自動プル が起きるしきい値をビット数で指定
# autopush, autopull: 自動プッシュ | 自動プルを有効にするかどうか
# fifo_join: FIFOを、TX:RX = 4:4（PIO.JOIN_NONE） | 8:0（PIO.JOIN_TX） | 0:8（PIO.JOIN_RX） にする

```

- 命令
  - wrap_target(): PIO の開始
  - warp() : PIO の終了
  - label(label) : ラベルの定義
  - word(instr, label=None)
  - jmp(label)
  - jmp(copnd, label)
  - wait(polarity, src, index)
  - in\_(src, bit_count) : src から InShiftRegister(ISR)にシフトする
  - out(dest, bit_count) : OutShiftRegister(OSR)から dest にシフトする
  - push(...)
  - pull(...)
  - mov(dest, src)
  - irq(index)
  - irq(mode, index)
  - set(dest, data)
  - nop()
  - .side(value) : サイドセットピンに値をセット
  - .delay(value) :
