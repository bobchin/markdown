# Arduino Nano R4

## Links

- [Nano R4](https://docs.arduino.cc/hardware/nano-r4/)
- [ユーザマニュアル](https://docs.arduino.cc/tutorials/nano-r4/user-manual/)

## 用語

- Qwiic（クイック）
  - SparkFun が開発した I2C を使用した電子部品同士を簡単に接続するためのエコシステム
  - デイジーチェーン接続できる



## 機能など

- 32-bit Arm Cortex-M4 プロセッサ
- ルネサス RA4M1 マイコン
- 256kB Flash / 32kB SRAM / 8kB EEPROM
- 48MHz clock
- 14bit ADC
- 12bit DAC

- serial
  - UART/USART x1
  - I2C        x1
  - SPI        x1
  - CAN

- power
  - 3V3
  - VIN
  - VBATT
  - +5V

- I/O
  - Digitail x22(うち8個はアナログと共用)
  - Analog   x8

- LED
  - BUILTIN LED
  - RGB LED

- OPAMP

## 電源

- USB-C コネクタから
- VIN: 6-21V DC電源供給（内部的には5V）
- +5V: 直接DC5Vを給電

- 3.3V出力（内部的には3.3V）
  - Qwiic端子
  - I2C レベル
  - DC 出力

- VBATT
  - バックアップバッテリー用の端子
  - 1.6V-3.6V DC

## サンプル

- LED Blink

  ```c
  // LED_BUILTIN: オンボードLEDのピン番号（ボード毎に違いを吸収して定数として使えるようになっている）
  #define LED_PIN LED_BUILTIN

  void setup() {
    Serial.begin(115200);
    // Serialが有効になるまで、最大 2.5 秒ウェイトする
    for (auto startNow = millis() + 2500; !Serial && millis() < startNow; delay(500));

    pinMode(LED_PIN, OUTPUT);

    Serial.println("- Arduino Nano R4 - Blink Example started...");
  }

  void loop() {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("- LED on!");
    delay(1000);

    digitalWrite(LED_PIN, LOW);
    Serial.println("- LED off");
    delay(1000);
  }
  ```



