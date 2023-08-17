# ESP32

## ポインタ

- [Espressif](https://www.espressif.com)
  - [ESP32-DevKitC](https://www.espressif.com/en/products/devkits/esp32-devkitc)
- [M5Stack](https://m5stack.com)

## ESP32

- ESP-WROOM-32: Espressif社のESP32モジュール基板
- ESP32-DevKitC: Espressif社の開発用ボード
  - [リンク](https://www.espressif.com/en/products/devkits/esp32-devkitc)
  - ![ピンアサイン](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/_images/esp32-devkitC-v4-pinout.png)

- M5Stack: ESP32をCPUにし、IOを付けた製品

## M5Stack

- Stackシリーズ
  - Basic
  - Gray
  - Core2
- Stickシリーズ
  - PLUS
- ATOMシリーズ
  - Lite
  - Matrix

## 開発環境

- [USBドライバ](https://jp.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- [M5Stack USBドライバ](https://docs.m5stack.com/en/download)

- ArduinoIDE
  - [IDE](https://www.arduino.cc/en/software)
  - ESP32コアライブラリ
    - [Docs](https://docs.espressif.com/projects/arduino-esp32/en/latest/index.html)
    - 「ファイル」-「環境設定」-「追加のボードマネージャ のURL」に**"https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json"** を追記
    - 「ツール」-「ボード」-「ボードマネージャ」から**ESP32**をインストール
  - M5Stackライブラリ
    - [Docs](https://docs.m5stack.com/en/quick_start/m5core/arduino)
    - 「ファイル」-「環境設定」-「追加のボードマネージャ のURL」に**"https://m5stack.oss-cn-shenzhen.aliyuncs.com/resource/arduino/package_m5stack_index.json"** を追記
    - 「ツール」-「ボード」-「ボードマネージャ」から**M5Stack**をインストール
    - 「スケッチ」-「ライブラリをインクルード」-「ライブラリを管理」から **"M5Stack"** をインストール

- Python
  - MicroPython
    - [ESP32での始め方](https://micropython-docs-ja.readthedocs.io/ja/latest/esp32/tutorial/intro.html)
    - [ファームウェア](https://micropython.org/download/#esp32)
      - コピー
        ```python
        esptool.py --port /dev/ttyUSB0 erase_flash
        esptool.py --chip esp32 --port /dev/ttyUSB0 write_flash -z 0x1000 esp32-yyyymmdd-vx.x.x.bin
        ```
  - CircuitPython
