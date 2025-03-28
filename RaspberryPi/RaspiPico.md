# RaspberryPi Pico のまとめ

- [RaspberryPi Pico のまとめ](#raspberrypi-pico-のまとめ)
  - [参考](#参考)
  - [ファームウェア](#ファームウェア)
  - [機能](#機能)
  - [Thonny](#thonny)
  - [arduino IDE](#arduino-ide)
  - [部品](#部品)
    - [LED](#led)
    - [Button](#button)
    - [PWM](#pwm)
    - [ADC](#adc)
    - [NeoPixel](#neopixel)
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

## arduino IDE

- [オンライン](https://app.arduino.cc/)
- [IDE](https://www.arduino.cc/en/software)
- [ボードマネージャ](https://github.com/earlephilhower/arduino-pico)
- [Document](https://arduino-pico.readthedocs.io/en/latest/)

- 設定
  - 言語: 日本語
  - 追加のボードマネージャ: https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json
  - ボードの追加
    - "ツール" - "ボード" - "ボードマネージャ" で "pico" を検索
      - Raspberry Pi Pico/RP2040 を選択
        ※Arduino Mbed OS RP2040 Boardsは公式のボードマネージャ
    - ボードを選択する
      - Raspberry Pi Pico
      - Raspberry Pi Pico W
      - WIZnet W5100S-EVB-Pico

  - 有線LAN

    ```c
    #include <W5100lwIP.h>
    Wiznet5100lwIP eth(17);

    void setup() {
      SPI.setRX(16);
      SPI.setCS(17);
      SPI.setSCK(18);
      SPI.setTX(19);
      eth.begin();
      while (!eth.connected()) {
        Serial.print(".");
      }
    }
    ```

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

### NeoPixel

- LED 1 個は、WS2812 というものを使っている。
- 信号線は 1 本のみで、24 ビット(GRB の順で、8 ビットずつ。8\*3=24)のデータを渡す。
- 1ビットのデータは、デューティ比で指定する
  - データ転送レート = 800kbps(1ビット当たり1250ns)
  - 0    : Highのパルス幅:220ns~380ns  => 220/1250 = 0.176 ~  380/1250 = 0.304
  - 1    : Highのパルス幅:580ns~1000ns => 580/1250 = 0.464 ~ 1000/1250 = 0.800
  - reset: Lowを250μs以上つづけるとデータリフレッシュ

- データ順

  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
  | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
  | G7  | G6  | G5  | G4  | G3  | G2  | G1  | G0  | R7  | R6  | R5  | R4  | R3  | R2  | R1  | R0  | B7  | B6  | B5  | B4  | B3  | B2  | B1  | B0  |

```python
# Pico Python SDK Sample
import array, time
from machine import Pin
import rp2

UM_LEDS = 8

@rp2.asm_pio(sideset_init=rp2.PIO.OUT_LOW, out_shiftdir=rp2.PIO.SHIFT_LEFT, autopull=True, pull_thresh=24)
def ws2812():
  T1 = 2
  T2 = 5
  T3 = 3
  wrap_target()
  label("bitloop")
  out(x, 1)             .side(0) [T3 - 1]
  jmp(not_x, "do_zero") .side(1) [T1 - 1]
  jmp("bitloop")        .side(1) [T2 - 1]
  label("do_zero")
  nop()                 .side(0) [T2 - 1]
  wrap()

sm = rp2.StateMachine(0, ws2812, freq=8_000_000, sideset_base=Pin(22))
sm.active(1)

# 2bitゼロ埋めしておく
ar = array.array("I", [0 for _ in range(NUM_LEDS)])

# Cycle colours.
for i in range(4 * NUM_LEDS):
  for j in range(NUM_LEDS):
    r = j * 100 // (NUM_LEDS - 1)
    b = 100 - j * 100 // (NUM_LEDS - 1)
    if j != i % NUM_LEDS:
      r >>= 3
      b >>= 3
    ar[j] = r << 16 | b
  sm.put(ar, 8)
  time.sleep_ms(50)

# Fade out.
for i in range(24):
  for j in range(NUM_LEDS):
    ar[j] >>= 1
  sm.put(ar, 8)
  time.sleep_ms(50)
```

### PIO

- [Interface 2021 年 8 月号](https://interface.cqpub.co.jp/magazine/202108/)
- [ラズピコ PIO ～解説編～](https://moons.link/pico/post-498/)
- [](https://qiita.com/fude-t/items/d2baf1c98ba807273dcf)
- [初めの一歩！ラズパイ Pico マイコン ×Python で L チカ入門](https://www.zep.co.jp/utaguchi/article/z-picoled_all-da1/)

- できること

  - GPIO の値の読み書き
  - GPIO の方向の変更
  - 割り込み
  - DMA データ要求信号
  - FIFO の読み書き
  - デクリメント
  - ビットシフト
  - ビット反転
  - アドレスジャンプ
  - 待機（ウェイト）

- 構造

  ![ブロック図](http://moons.link/pico/wp-content/uploads/2023/02/block.png)
  ![ステートマシン(SM)](http://moons.link/pico/wp-content/uploads/2023/02/sm_block.png)

  - ２つの PIO ＋それぞれに４つのステートマシン
  - PIO
    - ステートマシン x4: CPU みたいなもの
      - OSR(Out Shift レジスタ)
        - ※出力レジスタ（CPU 側からみて出力なので）。PIO としてみるとデータが入ってくる。
      - ISR(In Shift レジスタ)
        - ※入力レジスタ（CPU 側からみて入力なので）。PIO としてみるとデータを出す。
      - Scratch X: スクラッチレジスタ X
      - Scratch Y: スクラッチレジスタ Y
        - 上記レジスタはすべて 32 ビット
      - PC(Program Counter): プログラムカウンタ
      - Clock Div: クロック分周器
      - Control Logic
    - FIFOx8 : システム側とデータを出し入れする場所。
      - 1FIFO は 32 ビット。
      - TX FIFOx4: PULL 命令で、TX FIFO => OSR の方向にデータ転送される
      - RX FIFOx4: PUSH 命令で、ISR => RX FIFO の方向にデータ転送される
      - ※設定で TX または RX のどちらかに全部を割り当てることができる
    - 命令メモリ
      - 32 命令を 4 つのステートマシンで共有
      - 1 命令は、16 ビット。全体は、32（命令数） \* 16 ビット(2 バイト) = 64 バイト
    - I/O マッピング : PIO と Pin を対応付けする。３つの方法がある。
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
    - 両方で 5 ビット使える
    - サイドセット Pin を使わない場合は、すべて遅延に回せるので、$ 2^5 = 32 $ で 31 サイクルまで遅延できる
      サイドセット Pin を 2 個使う場合は、残り$ 2^3 = 8 $ で 7 サイクルまで遅延できることになる。

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

  - サイクル数

    - 周波数 2000Hz の場合、1 サイクルは $ 1/2000 = 500μs $
    - 0.5s にする場合のサイクル数は、$ 0.5s / 0.0005(500μs) = 1000 サイクル $
    - x[Hz] の場合、t[s]のサイクル数 => $ x \* t $

  - 1 サイクルで指定できる処理

    1. 命令の実行
    2. サイドセット = 特定の GPIO ピンの状態を変更
    3. ディレイ

  - 自動プルと自動プッシュ

    - 自動プル
      OUT()によってビットシフトする際に、シフト数が事前に指定したビット数を超えた場合に
      自動的に TX FIFO => OSR にデータをロードする

    - 自動プッシュ
      IN()によってビットシフトする際に、シフト数が事前に指定したビット数を超えた場合に
      自動的に ISR => RX FIFO にデータをロードする

- 命令（micro python）

  - オペランド

    | 指定値 | 説明                                                      |
    | :----- | :-------------------------------------------------------- |
    | x      | スクラッチレジスタ x                                      |
    | y      | スクラッチレジスタ y                                      |
    | pins   | I/O マッピングで割り当てた GPIO ピン                      |
    | pndirs | I/O マッピングで割り当てた GPIO ピンの方向                |
    | osr    | 出力シフトレジスタ                                        |
    | isr    | 入力シフトレジスタ                                        |
    | pc     | プログラムカウンタ。指定したアドレスにジャンプ            |
    | exec   | 次実行命令                                                |
    | null   | OUT 命令の場合副作用のみ実行。IN 命令の場合定数ゼロを返す |

  - 命令の分岐

    - label(label) : ラベルの定義
      疑似命令（cycle 消費しない）
    - jmp(label)
    - jmp(cond, label)

      - cond

        | 指定値   | 説明                                                         |
        | :------- | :----------------------------------------------------------- |
        | None     | 無条件分岐                                                   |
        | not_x    | x レジスタがゼロなら分岐                                     |
        | x_dec    | x レジスタがゼロでないなら、x レジスタをデクリメントして分岐 |
        | not_y    | y レジスタがゼロなら分岐                                     |
        | y_dec    | y レジスタがゼロでないなら、x レジスタをデクリメントして分岐 |
        | x_not_y  | x レジスタと y レジスタが等しくないなら分岐                  |
        | not_osre | 出力レジスタが High なら分岐(not osr empty)                  |

  - 処理待ち

    - wait(polarity, src, index)
      - polarity: 0|1 指定した値になるのを待つ
      - src : gpio(ピン番号)|pin(I/O マッピングのビット位置)|irq(IRQ 番号)
      - index : チェックするピンまたはビット

  - レジスタ処理

    - in\_(src, bit_count)
      src で指定したレジスタの値を bit_count シフトして、ISR に書き込む
      src: pins|x|y|null|isr|osr
    - out(dest, bit_count) : OutShiftRegister(OSR)から dest にシフトする
      OSR の値を bit_count シフトして、dest で指定したレジスタに書き込む
      dest: pins|x|y|null|pindirs|pc|isr|exec
    - push(flag1, flag2)
      ISR の値を RX FIFO に書き込んで、ISR をクリアする。
    - pull(flag1, flag2)
      TX FIFO から OSR に 32 ビット書き込む。
    - mov(dest, src)
      src から dest にデータをコピー
      src : pins|x|y|null|status|isr|osr
      dest: pins|x|y|exec|pc|isr|osr

  - 割り込み

    - irq(mod, index)
      - mod:
        - 0x40 or clear : フラグをクリア
        - 0x00 or 未指定 : フラグをセット
        - 0x20 : 1 にセットしたフラグが 0 になるまでストール
      - index: 割り込み番号

  - 値書き込み

    - set(dest, data)
      dest に data を書き込む
      dest: pins|x|y|pindirs

  - 何もしない

    - nop()
      単純に 1cycle 消費。mov(y, y) と等価

  - ラッピング
    疑似命令（cycle 消費しない）。ループを記述する場合 jmp()も使えるが、1cycle 消費するためそれを避けるのに使う。
    wrap_target() から warp() までがループする。
    - wrap_target(): ラッピング の開始
    - warp() : ラッピング の終了

- example

  - プログラム構造サンプル

    ```python
    # モジュールの読み込み
    from machine import Pin
    import rp2

    # asm_pioデコレータでアセンブラ関数を定義
    @rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
    def blink_led():
      # ここからアセンブリで記述する

    # ステートマシンのインスタンス化
    sm = rp2.StateMachine(0, blink_led, freq=2000, set_base=Pin(25))

    # ステートマシンの開始と停止
    sm.active(1)
    sm.active(0)
    ```

  - LED 表示

    ```python
    # 初期バージョン版 ######################################################################
    from machine import Pin
    import rp2
    import time

    @rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
    def blink_led():
      set(pins, 1)  # led_pin を割り当ててているので、それをHighにする。命令のみなので1cycle。
      set(pins, 0)  # led_pin を割り当ててているので、それをLowにする。命令のみなので1cycle。

    led_pin = Pin("LED", Pin.OUT)
    # ステートマシン0にblink_ledを実行させる。周波数=2000Hz(1cycle = 1/2000sec = 500μsec)
    sm = rp2.StateMachine(0, blink_led, set_base=led_pin, freq=2000)

    # 5秒実行。
    # ただし、blink_ledは1cycleごとにHighとLowを繰り返すので見えないはず。
    sm.active(1)
    time.sleep(5)
    sm.active(0)
    #########################################################################################
    ```

    ```python
    # 改良バージョン版 #######################################################################
    from machine import Pin
    import rp2
    import time

    @rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
    def blink_led():
      wrap_target()
      set(pins, 1) [19] # 命令1cycle + 31cycle遅延 = 20cycle
      nop()        [31] # 命令1cycle + 31cycle遅延 = 32cycle
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31] # 32cycleを15回繰り返しているので、32*15 = 480cycle
      # ここまで、20+480=500cycle(250msec=500/2000)
      set(pins, 0)
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      nop()        [31]
      wrap()

    led_pin = Pin("LED", Pin.OUT)
    sm = rp2.StateMachine(0, blink_led, set_base=led_pin, freq=2000)

    # 5秒実行。
    # ただし、blink_ledは500cycle(250msec)ごとにHighとLowを繰り返す。
    sm.active(1)
    time.sleep(5)
    sm.active(0)
    #########################################################################################
    ```

    ```python
    # 改良バージョンジャンプ版 ################################################################
    from machine import Pin
    import rp2
    import time

    @rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
    def blink_led():
      set(pins, 1)                  # 命令1cycle
      set(x, 14)              [18]  # 命令1cycle + 18cycle遅延 = 19cycle。スクラッチレジスタx にカウントをセット。
      label('loop_high')            # ラベルをセット ※cycleを食わない
      jmp(x_dec, 'loop_high') [31]  # 命令1cycle + 31cycle遅延 = 32cycle。ループで0～14まで15回実行するので、32*15=480cycle
                                    # 1+19+480=500cycle(500/2000=250msec)
      set(pins, 0)
      set(x, 14)              [18]
      label('loop_low')
      jmp(x_dec, 'loop_low')  [31]

    led_pin = Pin("LED", Pin.OUT)
    sm = rp2.StateMachine(0, blink_led, set_base=led_pin, freq=2000)

    # 5秒実行。
    # ただし、blink_ledは480cycle(240msec)ごとにHighとLowを繰り返す。
    sm.active(1)
    time.sleep(5)
    sm.active(0)
    #########################################################################################
    ```

  - RGB LED(NeoPixel)

    ```python
    from machine import Pin
    import rp2

    # アセンブリ命令＝初期設定を引数で指定する
    #  サイドセットは初期値LOW
    #  OUT命令のシフトは左方向
    #  自動プルを有効にし、24ビットで自動実行
    @rp2.asm_pio(sideset_init=rp2.PIO.OUT_LOW, out_shiftdir=rp2.PIO.SHIFT_LEFT, autopull=True, pull_thresh=24)
    def ws2812():
        # T3 cycle(0.125*8 = 1μs) LOWにする
        # T1 cycle(0.125*2 = 0.25μs) HIGHにしてウェイト
        # x=High: T2 cycle(0.125*5 = 0.625μs) HIGHにしてウェイト => 00000000 11 11111 => H: 7/15(0.875μs) L:  8/15(1μs)
        # x=Low : T2 cycle(0.125*5 = 0.625μs) LOW にしてウェイト => 00000000 11 00000 => H: 2/15(0.25μs)  L: 13/15(1.625μs)
        T1 = 2
        T2 = 5
        T3 = 8
        wrap_target()                               # ループ開始（T指定しているのでそこを避けるのに使用している？）
        label("bitloop")                            # ラベルbitloopを作成
        out(x, 1)              .side(0)    [T3 - 1] # OSR から汎用レジスタX に 1bit 左にシフトアウト。サイドセットに指定したGPIOをLOWに。T3 = 8 cycleウェイト
        jmp(not_x, "do_zero")  .side(1)    [T1 - 1] # 汎用レジスタX が0ならdo_zeroにジャンプ。サイドセットに指定したGPIOをHIGHに。T1 = 2 cycleウェイト
        jmp("bitloop")         .side(1)    [T2 - 1] # 汎用レジスタX が1なら、サイドセットに指定したGPIOをHIGHに。T2 = 5 cycleウェイトして、bitloopへジャンプ
        label("do_zero")                            # ラベルdo_zeroを作成
        nop()                  .side(0)    [T2 - 1] # サイドセットに指定したGPIOをLOWに。T2 = 5 cycleウェイト
        wrap                                        # ループ終了

    # 周波数=8MHz(1cycle 125ns=0.125μs)
    class myNeopixel:
      def __init__(self, num_leds, pin, delay_ms=1):
        self.state_machine = 0
        self.sm = rp2.StateMachine(self.state_machine, ws2812, freq=8_000_000, sideset_base=Pin(pin))
        self.sm.active(1)
        self.num_leds = num_leds
        self.delay_ms = delay_ms
        self.brightnessvalue = 255

    # LED1個分のカラーデータを作成する
    # 明るさは値のパーセンテージで指定する
    def set_pixel(self, pixel_num, r, g, b):
        blue  = round(b * (self.brightness() / 255))
        red   = round(r * (self.brightness() / 255))
        green = round(g * (self.brightness() / 255))

        # G,R,B の順で8*3=24ビットデータにする
        self.pixels[pixel_num] = blue | red << 8 | green << 16

    # 明るさを考慮したデータをセットする
    def fill(self, r, g, b):
        for i in range(self.num_leds):
            self.set_pixel(i, r, g, b)
        time.sleep_ms(self.delay_ms)

    # TX FIFOに書き込む
    # FIFO は32ビットのため、先頭8ビットをシフトして以降24ビットを書き込む
    def show(self):
        for i in range(self.num_leds):
            self.sm.put(self.pixels[i],8)
        time.sleep_ms(self.delay_ms)

    # @rp2.asm_pio
    # out_init, set_init, sideset_init: out, set命令やサイドセットで使うピンの初期状態を指定する
    #   rp2.PIO_IN_LOW | rp2.PIO_IN_HIGH, rp2.PIO_OUT_LOW | rp2.PIO_OUT_HIGH,
    #   最大５つ指定でき、複数の場合はタプルで指定。
    # in_shiftdir, out_shiftdir: ISR, OSR がシフトする方向を指定(rp2.PIO.SHIFT_LEFT | rp2.PIO.SHIFT_RIGHT)
    #   PIO.SHIFT_LEFT : 左にシフト＝最下位ビットからデータが入り、最上位ビットを破棄
    #   PIO.SHIFT_RIGHT: 右にシフト＝最上位ビットからデータが入り、最下位ビットを破棄
    # push_thresh, pull_thresh: 自動プッシュ｜自動プル が起きるしきい値をビット数で指定
    # autopush, autopull: 自動プッシュ | 自動プルを有効にするかどうか
    # fifo_join: FIFOを、TX:RX = 4:4（PIO.JOIN_NONE） | 8:0（PIO.JOIN_TX） | 0:8（PIO.JOIN_RX） にする
    ```
