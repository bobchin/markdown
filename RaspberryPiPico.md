# RaspberryPi Pico

- [RaspberryPi Pico](#raspberrypi-pico)
  - [参照](#参照)
  - [Windows の開発環境の作成](#windows-の開発環境の作成)
  - [Arduino IDE を使う](#arduino-ide-を使う)
  - [WebSocket 接続(arduinoWebSockets)](#websocket-接続arduinowebsockets)
  - [WebSocket 接続(WebSocket2\_Generic)](#websocket-接続websocket2_generic)
  - [WIZnet W5100S-EVB-Pico](#wiznet-w5100s-evb-pico)
    - [Arduino IDE で使う](#arduino-ide-で使う)
    - [MicoryPython で使う](#micorypython-で使う)

## 参照

- [Raspberry Pi Pico をセットアップしよう](https://datasheets.raspberrypi.com/pico/getting-started-with-pico-JP.pdf)
  - <a href="file://D:\data\eBooks\Raspi\getting-started-with-pico-JP.pdf">PDF</a>

- [RP2040 を使用したハードウェア設計](https://datasheets.raspberrypi.com/rp2040/hardware-design-with-rp2040-JP.pdf)
  - <a href="file://D:\data\eBooks\Raspi\hardware-design-with-rp2040-JP.pdf">PDF</a>

- [ラズベリー・パイ Picoマイコン入門 C言語開発環境の構築](https://www.zep.co.jp/nbeppu/article/z-pico-da2/)
- [Windows用 RaspberryPi Pico コンパイル環境（C言語）の作り方](https://zenn.dev/oze/articles/ba36099cec0848)
- [無知から始めるRaspberry Pi Pico with C/C++](https://himco.jp/2023/04/06/%E7%84%A1%E7%9F%A5%E3%81%8B%E3%82%89%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88/)

## Windows の開発環境の作成

- [Pico Setup for Windows](https://github.com/raspberrypi/pico-setup-windows/blob/master/docs/tutorial.md)

  - ツールのインストール
    - [最新版](https://github.com/raspberrypi/pico-setup-windows/releases/latest/download/pico-setup-windows-x64-standalone.exe)

  - Visual Studio Code の起動
    - 「スタート」－「Raspberry Pi Pico SDK vXX」－「Pico – Visual Studio Code」から起動

  - サンプルを起動
    - 「pico-examplesプロジェクト」を構成するかどうか聞かれたら、Yes
    - キットの選択は、「Pico ARM GCC – Pico SDK Toolchain with GCC arm-none-eabi」

## Arduino IDE を使う

- [参考](https://karakuri-musha.com/inside-technology/arduino-raspberrypi-pico-helloworld01/)

- Arduino IDE のインストール
  - [Download](https://www.arduino.cc/en/software)

- 開発するマイコン(RP2040)に対応したボードマネージャをインストール
  - "ファイル"-"基本設定"-"追加のボードマネージャのURL" に追加
    - https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json

  - 左ペインの「BOARDS MANAGER」か "ツール"=>"ボード"=>"ボードマネージャ" を開く
  - "pico" で検索
    - Arduino Mbed OS RP2040 Boards: 公式ライブラリ
    - Raspberry Pi Pico/RP2040: 非公式

  - WIZnet W5100S-EVB-Pico の場合
    - "ツール"-"ボード" から "Raspberry Pi Pico/RP2040"-"WIZnet W5100S-EVB-Pico" を選択

- ライブラリのインストール
  - 左ペインの「ライブラリマネージャ」か "ツール"-"ライブラリを管理" を開く

- uf2ファイルを書き込めるようにする
  - [Arduino-Pico](https://arduino-pico.readthedocs.io/en/latest/install.html)
    - [Install](https://arduino-pico.readthedocs.io/en/latest/install.html)
      - 初回書き込み時は、BOOTSELボタンを押しながら起動し、ファイル書き込みモードにしてから書き込む。
        - ツール - ポート で "UF2 Board" を選択してアップロードする。（ビルトインROM ブートローダを使う）
        - 以降はCOMポートを指定する
    - [LittleFS](https://github.com/earlephilhower/arduino-pico-littlefs-plugin/blob/master/README.md)
      - [arduino-littlefs-upload](https://github.com/earlephilhower/arduino-littlefs-upload)
        - arduino-littlefs-upload-1.0.0.vsix を "C:\Users\<username>\.arduinoIDE\plugins\" にコピーする

- 有線LANを使う
  - [Using a Static IP Address with the W5100S-EVB-Pico Board and Arduino IDE](https://maker.wiznet.io/scott/projects/using-a-static-ip-address-with-the-w5100s-evb-pico-board-and-arduino-ide/)
  - [Ethernetライブラリ](https://github.com/WIZnet-ArduinoEthernet/Ethernet)
    - 本家のEthernetでは固定IPが使えない？
    - zipでダウンロードしてプロジェクトに追加
      - スケッチ - ライブラリをインクルード - zip形式のライブラリをインストール
        - スケッチフォルダにlibrariesフォルダが追加される

  ```c
  #include <SPI.h>
  #include <Ethernet.h>

  const csPin = 17;
  byte mac[] = { 0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02 };
  IPAddress ip(192, 168, 1, 1);
  IPAddress dns(192, 168, 1, 254);
  IPAddress gw(192, 168, 1, 254);
  IPAddress sub(255, 255, 255, 0);

  void print_ip(char format[], IPAddress adr) {
    Serial.printf(format, adr.toString().c_str());
  }

  void setup() {
    Serial.begin(9600);
    while (!Serial);

    Ethernet.init(csPin);

    Serial.println("Initialize Ethernet with DHCP:");
    if (Ethernet.begin(mac) == 0) {
      Serial.println("Failed to configure Ethernet using DHCP.");
      Serial.println("Configuring Ethernet with a static IP address...");
      Ethernet.begin(mac, ip, dns, gw, sub);
    }

    print_ip("My IP address: %s\n", Ethernet.localIP());
    print_ip("Subnet mask: %s\n",   Ethernet.subnetMask());
    print_ip("Gateway IP: %s\n",    Ethernet.gatewayIP());
    print_ip("DNS Server IP: %s\n", Ethernet.dnsServerIP());

    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
    }
  }

  void loop() {
  }
  ```

- 本体への書き込み
  - 本体の "BOOT SEL" ボタンを押しながら、PC に USB で接続
  - "スケッチ" から "書き込む"
    - 初回はブートローダがないので、シリアルポート接続がされていないことに注意
    - 2回目以降は、シリアルポート接続できるようになる

## WebSocket 接続(arduinoWebSockets)

- [ESP32/Raspberry Pi Pico W]WebSocketでWebブラウザと双方向通信してみた](https://www.youtube.com/watch?v=Qs73H6UxD-Q)
- [arduinoWebSockets](https://github.com/Links2004/arduinoWebSockets)

- Example

  - WebSocketServer

    ```c
    #include <WebSocketsServer.h>

    int PORT = 8080;

    WebSocketsServer webSocket = WebSocketsServer(PORT);

    // イベント処理
    // num    : 接続クライアント番号
    // type   : イベントの種類
    // payload: データ
    // length : データ長
    void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {

      switch(type) {
        // クライアント接続時
        case WStype_CONNECTED:
          {
            IPAddress ip = webSocket.remoteIP(num);
            Serial1.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);

            // send message to client
            webSocket.sendTXT(num, "Connected");
          }
          break;

        // クライアント切断時
        case WStype_DISCONNECTED:
          Serial1.printf("[%u] Disconnected!\n", num);
          break;

        // 文字列受信時
        case WStype_TEXT:
          Serial1.printf("[%u] get Text: %s\n", num, payload);

          // send message to client
          webSocket.sendTXT(num, "message here");

          // send data to all connected clients
          webSocket.broadcastTXT("message here");
          break;

        // バイナリ受信時
        case WStype_BIN:
          Serial1.printf("[%u] get binary length: %u\n", num, length);
          hexdump(payload, length);

          // send message to client
          // webSocket.sendBIN(num, payload, length);
          break;
      }
    }

    void setup_serial() {
      Serial1.begin(115200);
      Serial1.setDebugOutput(true);

      Serial1.println();
      Serial1.println();
      Serial1.println();
      for(uint8_t t = 4; t > 0; t--) {
        Serial1.printf("[SETUP] BOOT WAIT %d...\n", t);
        Serial1.flush();
        delay(1000);
      }
    }

    void setup() {
      setup_serial();

      webSocket.begin();
      webSocket.onEvent(webSocketEvent);
    }

    void loop() {
      webSocket.loop();
    }
    ```

  - WebSocketClient

    ```c
    #include <WebSocketsClient.h>

    String SERVER_IP = "192.168.0.1";
    int SERVER_PORT = 8080;
    String SERVER_URL = "/";

    // イベント処理
    // type   : イベントの種類
    // payload: データ
    // length : データ長
    void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

      switch(type) {
        // 接続時
        case WStype_CONNECTED:
          {
            Serial1.printf("[WSc] Connected to url: %s\n", payload);

            // 接続時にサーバにメッセージを送信
            webSocket.sendTXT("Connected");
          }
          break;

        // 切断時
        case WStype_DISCONNECTED:
          Serial1.printf("[WSc] Disconnected!\n");
          break;

        // 文字列受信時
        case WStype_TEXT:
          Serial1.printf("[WSc] get text: %s\n", payload);

          // サーバにメッセージを送信
          webSocket.sendTXT("message here");
          break;

        // バイナリ受信時
        case WStype_BIN:
          Serial1.printf("[WSc] get binary length: %u\n", length);
          hexdump(payload, length);

          // サーバにデータを送信
          webSocket.sendBIN(payload, length);
          break;

        // ping 受信時
        case WStype_PING:
          // pong will be send automatically
          Serial1.printf("[WSc] get ping\n");
          break;

        // pong 受信時
        case WStype_PONG:
          // answer to a ping we send
          Serial1.printf("[WSc] get pong\n");
          break;
        }

    }

    void setup_serial() {
      Serial1.begin(115200);
      Serial1.setDebugOutput(true);

      Serial1.println();
      Serial1.println();
      Serial1.println();
      for(uint8_t t = 4; t > 0; t--) {
        Serial1.printf("[SETUP] BOOT WAIT %d...\n", t);
        Serial1.flush();
        delay(1000);
      }
    }

    void setup() {
      setup_serial();

      webSocket.begin(SERVER_IP, SERVER_PORT, SERVER_URL);

      // イベント処理
      webSocket.onEvent(webSocketEvent);
      // HTTP ベーシック認証
      // webSocket.setAuthorization("user", "Password");

      // 再接続回数
      webSocket.setReconnectInterval(5000);

      // ハードビートを開始 (オプション)
      // 15000 ms おきに ping する
      // 3000 ms 以内にサーバからレスポンスを期待する
      // 2回レスポンスがなければ切断とみなす
      webSocket.enableHeartbeat(15000, 3000, 2);
    }

    void loop() {
      webSocket.loop();
    }
    ```

## WebSocket 接続(WebSocket2_Generic)

- [WebSocket2_Generic](https://github.com/khoih-prog/WebSockets2_Generic#for-rp2040-boards-using-ethernet-w5x00-or-enc28j60)

- ライブラリのインストール
  - 左ペインの「ライブラリマネージャ」か "ツール"-"ライブラリを管理" を開く
  - "WebSockets2_Generic" を検索してインストール

- [パッチ](https://github.com/khoih-prog/WebSockets2_Generic#81-to-use-board_name)
  - platform.txt
  - Arduino.h

- [](https://github.com/khoih-prog/WebSockets2_Generic#important-notes)

## WIZnet W5100S-EVB-Pico

### Arduino IDE で使う

- [RaspberryPi PicoでEthernet通信](https://tamanegi.digick.jp/computer-embedded/module/ethernethat/)
  - [W5100S-EVB-Pico用のライブラリ](https://github.com/WIZnet-ArduinoEthernet/Ethernet)

- [arduinoWebSockets](#websocket-接続arduinowebsockets)

### MicoryPython で使う

- [MicroPython](https://github.com/Wiznet/RP2040-HAT-MicroPython/tree/main)
  - LAN接続に以下のGPIOを使用しているので汎用としては使えない
    - GPIO16: MISO
    - GPIO17: CS
    - GPIO18: SCLK
    - GPIO19: MOSI
    - GPIO20: RST
    - GPIO21: INT
    - GPIO24: VBUS
    - GPIO25: LED
    - GPIO29: ADC

- Wiznet5K Library
  - ビルド済みファームウェア
    - [ファーム](https://github.com/Wiznet/RP2040-HAT-MicroPython/releases)
    - [ファーム](https://micropython.org/download/W5100S_EVB_PICO/)
      - [v1.21.0](https://micropython.org/resources/firmware/W5100S_EVB_PICO-20231005-v1.21.0.uf2)

  - 自分でビルドする場合

    ```cmd
    cd D:\work
    git clone https://github.com/Wiznet/RP2040-HAT-MicroPython.git
    cd RP2040-HAT-MicroPython
    cmake CMakeLists.txt
    cd libraries/ports/rp2
    vi Makefile
    #以下があればOK##########
    MICROPY_PY_WIZNET5K ?= 5105
    CMAKE_ARGS += -DMICROPY_PY_WIZNET5K=$(MICROPY_PY_WIZNET5K)
    #######################

    make
    ```

- モジュール
  - [TMiniWebServer](https://github.com/techmadot/TMiniWebServer)
  - [uwebsockets](https://github.com/danni/uwebsockets)
  - [micropython-lib](https://github.com/micropython/micropython-lib)

- example

  - ネットワーク設定

    ```python
    import network
    import time

    IP  = '192.168.0.1'
    SUB = '255.255.255.0'
    GW  = '192.168.0.254'
    DNS = '8.8.8.8'

    def w5x00_init():
      nic = network.WIZNET5K()
      # 固定IP
      nic.active(True)
      nic.ifconfig((IP, SUB, GW, DNS))
      # DHCP
      # nic.ifconfig(True)

      while not nic.isconnected():
        time.sleep(1)

      print('IP: %s\nSUBNET: %s\nGW: %s\nDNS: %s\n' % nic.ifconfig())
    ```

  - Loopback Server

    ```python
    from usocket import socket

    def server_loop():
      # 192.168.0.1:5000 で待ち受ける
      s = socket()
      s.bind((IP, 5000))
      s.listen(5)

      conn, addr = s.accept()
      print('Connect to:', conn, "address:", addr)
      print('Loopback server Open!')

      # 受け取ったデータをそのまま返す
      while True:
        data = conn.recv(2048)
        try:
          print(data.decode('utf-8'))
          if data != 'NULL':
            conn.send(data)
        except:
          print("error")

    def main():
      w5x00_init()
      server_loop()

    if __name__ == "__main__":
      main()
    ```

  - Loopback Client

    ```python
    from usocket import socket

    def client_loop():
      s = socket()
      s.connect((IP, 5000))
      print('Loopback Client Connect!')

      # サーバから受け取ったデータをそのまま返す
      while True:
        data = s.recv(2048)
        print(data.decode('utf-8'))
        if data != 'NULL'
          s.send(data)

    def main():
      w5x00_init()
      client_loop()

    if __name__ == "__main__":
      main()
    ```

  - Ping

    ```python
    from machine import Pin, SPI
    import network
    import time

    IP  = '192.168.0.1'
    SUB = '255.255.255.0'
    GW  = '192.168.0.254'
    DNS = '8.8.8.8'

    led = Pin(25, Pin.OUT)

    def w5x00_init():
      # 省略

    def main():
      w5x00_init()
      while True:
        led.value(1)
        time.sleep(1)
        led.value(0)
        time.sleep(1)

    if __name__ == "__main__":
      main()
    ```

  - HTTP Server

    ```python
    from usocket import socket
    from machine import Pin, SPI
    import network

    IP  = '192.168.0.1'
    SUB = '255.255.255.0'
    GW  = '192.168.0.254'
    DNS = '8.8.8.8'
    PORT = 80

    led = Pin(25, Pin.OUT)

    def w5x00_init():
      # 省略

    def web_page():
      if led.value()==1:
        led_state="ON"
      else:
        led_state="OFF"

      html = """
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Raspberry Pi Pico Web server - WIZnet W5100S</title>
      </head>
      <body>
      <div align="center">
      <H1>Raspberry Pi Pico Web server & WIZnet Ethernet HAT</H1>
      <h2>Control LED</h2>
      PICO LED state: <strong>""" + led_state + """</strong>
      <p><a href="/?led=on"><button class="button">ON</button></a><br>
      </p>
      <p><a href="/?led=off"><button class="button button2">OFF</button></a><br>
      </p>
      </div>
      </body>
      </html>
      """
      return html

    def send_http(conn):
      response = web_page()
      conn.send('HTTP/1.1 200 OK\n')
      conn.send('Connection: close\n')
      conn.send('Content-type: text/html\n')
      conn.send('Content-Length: %s\n\n' % len(response))
      conn.send(response)
      conn.close()

    w5x00_init()
    s = socket()
    s.bind((IP, PORT))
    s.listen(5)
    while True:
      conn, addr = s.accept()
      print('Connect from %s' % str(addr))
      request = conn.recv(1024)
      request = str(request)
      led_on  = request.find('/?led=on')
      led_off = request.find('/?led=off')
      if led_on == 6:
        print('LED ON')
        led.value(1)
      if led_off == 6:
        print('LED OFF')
        led.value(0)

      send_http(conn)
    ```
