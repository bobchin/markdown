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
| 緑色 | 2.9-3.4V |   10mA   |   5mA   |
| 青色 | 2.9-3.4V |   10mA   |   5mA   |

- GPIO
  - [datasheet 2.19.4.Pads](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf)
  - 出力電圧は3.3V
  - 電流は、2mA, 4mA, 8mA, 12mA が選択できるが、デフォルトは4mA

- 赤色の場合
  - $ (3.3 - 2.0)V / 220Ω =  5.9mA $

### Button

- 入力電流
  - $ 3.3V / (10k+10k)Ω = 1.6mA $

### PWM

デジタル信号をアナログ信号として表す。
デジタルピンに一定周期の矩形波を送る。
周期のうちハイレベルが出力されている時間をパルス幅と呼び、
周期のうちパルス幅の割合をデューティ比と呼ぶ。

- 16個のPWMチャンネルがあり、個別に周波数とデューティ比を指定できる
- 周波数は、7Hz ～ 125MHz
- デューティ比が、デジタルのMax値に対する割合の値になる
  - ex) 5V でデューティ比75%の場合、3.75V となる
  - duty_u16() を使う場合は、16bit=2^16=65536分割で指定する
- 周波数の逆数が周期になる。
  - ex) 周波数10000Hz => 1/10000 = 100μsec
