# 赤外線のまとめ

## 仕様など

- [赤外線の送信機と受信機を作る（前編）](https://nn-hokuson.hatenablog.com/entry/2021/04/06/215557)
- [赤外線の送信機と受信機を作る（後編）](https://nn-hokuson.hatenablog.com/entry/2021/04/14/213744)
- 38kHzの搬送波
- 信号の考え
  - 単位時間
    - 425μs(T)
  - データ
    - ON信号のあとにOFF信号がどれだけの長さ（時間）があるかで判断
    - 1: 800μs未満
    - 0: 800μs以上
  - デリミタ
    - ON/OFF信号の長さで判断
    - ヘッダ
      - ON信号の長さが3400μs(8T)以上
      - ONの後にOFF信号1700μs(4T)
    - ストップビット
      - ON信号を単位時間セット
      - ONの後にOFF信号の長さが10000μs以上

## マイコン(arduino)

- 搬送波
  - 38kHzでON/OFFする矩形波
    - PWMを使う
    - 周期: 1/38k = 0.000026 = 26μs

    - システムクロック: 16MHz
      - 8分周の場合: 16/8 = 2MHz
    - システム周期: 1/16M = 62.5ns
      - 8分周の場合: 1/2M = 500ns
    - デューティ比(ONの割合): 1/3
    - 回数: 26μs / 0.5μs = 52
      - (1/38k) / (1/(F_CPU/8)) = (1/38k)/(8/F_CPU) = F_CPU / (38k * 8)

    ```arduino
    pinMode(10, OUTPUT)
    // Port9:00, Port10:10, N/A:00, Timer: 11
    TCCR1A = B00100011;
    // N/A: 000, Timer: 11, Clock: 010(システムクロックを8分周)
    TCCR1B = B00011010;
    // タイマーの上限値(51カウント)
    OCR1AL = F_CPU / 38000L / 8 - 1;
    // デューティ比(1/3)
    OCR1BL = OCR1AL / 3;
    ```
- プログラム

  ```arduino
  int top = 0;              // タイマーの上限カウント
  const int onTime = 480;   // ON信号の単位時間
  const int offTime = 380;  // OFF信号の単位時間

  const unsigned char data[] = {0,1,0,0,1,0,1,1};

  void setup() {
    pinMode(10, OUTPUT);      // 赤外線LED
    pinMode(4, INPUT_PULLUP); // ボタン

    TCCR1A = B00100011;
    TCCR1B = B00011010;
    top = F_CPU / 38000 / 8 - 1;
    OCR1AL = top;
    OCR1BL = OCR1AL / 3;
  }

  void loop()
  {
    // ボタンを押している間送信する
    if (digitalRead(4) == LOW) {
      sendData();
    }
  }

  void sendData()
  {
      // リーダ部（8T ONして、4T OFF）
      OCR1A = top;
      _delay_us(3400);
      OCR1A = 0;
      _delay_us(1700);

      // データ部（1T ONして、3or1T OFF）
      for(int i = 0; i < 8; i++){
        OCR1A = top;
        _delay_us(onTime);
        OCR1A = 0;
        if( data[i] ){
          // 1の場合は3T OFF
          _delay_us(offTime*3);
        } else {
          // 0の場合は1T OFF
          _delay_us(offTime);
        }
      }

      // ストップ部（単位時間ONして、8ms以上OFF）
      OCR1A = top;
      _delay_us(onTime);
      OCR1A = 0;
      _delay_ms(65);
  }
  ```
