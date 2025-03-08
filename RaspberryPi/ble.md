# BLE

Bluetoth Low Energy

## links

- [BluetoothのシャッターボタンとRaspberry Pi PICO W の接続の仕方について詳しく解説します](https://www.youtube.com/watch?v=DrwTmrqhjnc)
- [サルでもわかるBLE入門](https://www.musen-connect.co.jp/blog/course/trial-production/ble-beginner-1/)
- [Pi Pico W でBluetooth Low Energy（BLE）を試してみる](https://wisteriahill.sakura.ne.jp/CMS/WordPress/2023/10/09/pi-pico-bluetooth-low-energy-ble/)

## 用語

- 規格
  - Bluetooth Classic
  - BLE(Bluetooth Low Energy)
    省電力に特化した。4.0以降から使える。

- セントラル(Central)
  親機。サーバ。複数のペリフェラルが同時に接続できる。
- ペリフェラル(Peripheral)
  子機。クライアント。

- アドバタイズ(advertise)
  ペリフェラルがセントラルからの接続を待つ仕組み。
  ペリフェラルがセントラルに対して存在を知らせるための信号。（ブロードキャスト）
  機器の名称や属性データを含めることができる。
- スキャン(scan)
  ペリフェラルのアドバタイズを受信すること。
  - RSSI
    ペリフェラルからの受信電波強度。強度によって距離を知ることができる。
  - パッシブスキャン
    アドバタイジングパケットを受信するだけ
  - アクティブスキャン
    アドバタイジングパケットを受信に加えて、ペリフェラルにリクエストを送って追加情報を取得する

- GAP(General Access Profile)
  異なるメーカーのデバイス間での相互運用性を保証し、データのやり取りが行えるようにするための制御手順を規定するもの

- GATT(Generic Attribute Profile)
  1対1の接続通信のこと。

  - プロファイル
    プロトコルみたいなものか？
    [Bluetooth SIG](https://www.bluetooth.com/ja-jp/) が公式に提供しているものと、機器メーカ独自のものがある。
    ある程度標準的なプロファイルがあるので互換性が高くなっている？
  - サービス(Service)
    キャラクタリスティックをまとめたもの。
    固有のUUIDを持つ。
    （オブジェクト指向のクラスのようなイメージ？）

    - キャラクタリスティック(Characteristic)
      ペリフェラルがセントラルに公開するデータ構造
      （オブジェクト指向のクラスの属性のようなイメージ？）

      - ディスクリプタ
        Read  : 読み込み
        Write : 書き込み
        Notify: 通知

- UUID
  16バイトの一意な番号
  サービス・キャラクタリスティックなどはすべてUUIDがあり、UUIDで指定する。

## サンプル

### aioble

- [aioble](https://github.com/micropython/micropython-lib/tree/master/micropython/bluetooth/aioble)
  - Broadcaster (advertiser)
    - アドバタイジングやスキャンレスポンスのペイロードを生成する
    - アドバタイジングやスキャンレスポンスのペイロードを自動分割する
    - アドバタイジングを開始する
  - Peripheral
    - セントラルの接続を待つ
    - MTU 交換を待つ
  - Observer (scanner)
    - デバイスをスキャンする（パッシブスキャン・アクティブスキャン）
    - 同じデバイスのアドバタイジングやスキャンレスポンスのペイロードを混合する
    - アドバタイジングペイロードからコモンフィールドを解析する
  - Central
    - ペリフェラルに接続する
    - MTU 交換を初期化する
  - GATT クライアント
    - サービス、キャラクタリスティック、ディスクリプタを探索する
    - 文字列やディスクリプタを読み込み/書き込み/その両方をする
    - キャラクタリスティックに通知をする
    - 通知を待つ
  - GATT サーバ
    - サービス、キャラクタリスティック、ディスクリプタを登録する
    - 文字列やディスクリプタの書き込みを待つ
    - 読み込み要求を割り込む
    - 通知の送信
  - L2CAP
    - L2CAP 接続チャンネルを許可し、接続する
    - チャンネルフローを管理する
  - セキュリティ
    - JSON管理
    - ペアリングの初期化
    - クエリーの暗号化と認証状態

  - 5秒間近くのデバイスをパッシブスキャンする

    ```python
    import aioble
    async with aioble.scan(duration_ms=5000) as scanner:
      async for result in scanner:
        print(result, result.name(), result.rssi, result.services())
    ```

  - 5秒間近くのデバイスをアクティブスキャンする

    ```python
    import aioble
    async with aioble.scan(duration_ms=5000, interval_us=30000, window_us=30000, active=True) as scanner:
      async for result in scanner:
        print(result, result.name(), result.rssi, result.services())
    ```

  - セントラル: ペリフェラルに接続する

    ```python
    import aioble
    result = None
    async with aioble.scan(duration_ms=5000) as scanner:
      async for res in scanner:
        if res.name == "":
          result = res
          break

    device = result.device                                      # スキャンで取得
    #device = aioble.Device(aioble.PUBLIC, "aa:bb:cc:dd:ee:ff")  # アドレスがわかっている場合
    try:
      connection = await device.connect(timeout_ms=2000)
    except asyncio.TimeoutError:
      print("Timeout")
    ```

  - ペリフェラル, サーバ: サービスを登録し接続を待つ

    ```python
    import aioble
    import bluetooth

    _ENV_SENSE_UUID = bluetooth.UUID(0x181A)
    _ENV_SENSE_TEMP_UUID = bluetooth.UUID(0x2A6E)
    _GENERIC_THERMOMETER = const(768)
    _ADV_INTERVAL_US = const(250000)

    temp_service = aioble.Service(_ENV_SENSE_UUID)
    temp_char = aioble.Characteristic(temp_service, _ENV_SENSE_TEMP_UUID, read=True, notify=True)
    aioble.register_services(temp_service)

    while True:
      connection = await aioble.advertise(
        _ADV_INTERVAL_US,
        name="temp-sense",
        services=[_ENV_SENSE_UUID],
        appearance=_GENERIC_THERMOMETER,
        manufacturer=(0xabcd, b"1234"),
      )
      print(f"Connection from {device}")
    ```

### bluetooth

- [MicroPython Pico W](https://micropython.org/download/RPI_PICO_W/)
  - [uf2ファイル](https://micropython.org/resources/firmware/RPI_PICO_W-20240222-v1.22.2.uf2)


- ble_advertising.py

  ```python
  from micropython import const
  import struct
  import bluetooth

  # アドバタイジングペイロードは以下の形式のパケットを繰り返す
  #   1 byte データ長 (N + 1)
  #   1 byte 型 (以下の定数を参照)
  #   N bytes 型を指定したデータ
  _ADV_TYPE_FLAGS = const(0x01)
  _ADV_TYPE_NAME = const(0x09)
  _ADV_TYPE_UUID16_COMPLETE = const(0x3)
  _ADV_TYPE_UUID32_COMPLETE = const(0x5)
  _ADV_TYPE_UUID128_COMPLETE = const(0x7)
  _ADV_TYPE_UUID16_MORE = const(0x2)
  _ADV_TYPE_UUID32_MORE = const(0x4)
  _ADV_TYPE_UUID128_MORE = const(0x6)
  _ADV_TYPE_APPEARANCE = const(0x19)

  # Generate a payload to be passed to gap_advertise(adv_data=...).
  def advertising_payload(limited_disc=False, br_edr=False, name=None, services=None, appearance=0):
      payload = bytearray()

      def _append(adv_type, value):
          nonlocal payload
          payload += struct.pack("BB", len(value) + 1, adv_type) + value

      _append(
          _ADV_TYPE_FLAGS,
          struct.pack("B", (0x01 if limited_disc else 0x02) + (0x18 if br_edr else 0x04)),
      )

      if name:
          _append(_ADV_TYPE_NAME, name)

      if services:
          for uuid in services:
              b = bytes(uuid)
              if len(b) == 2:
                  _append(_ADV_TYPE_UUID16_COMPLETE, b)
              elif len(b) == 4:
                  _append(_ADV_TYPE_UUID32_COMPLETE, b)
              elif len(b) == 16:
                  _append(_ADV_TYPE_UUID128_COMPLETE, b)

      # See org.bluetooth.characteristic.gap.appearance.xml
      if appearance:
          _append(_ADV_TYPE_APPEARANCE, struct.pack("<h", appearance))

      return payload

  def decode_field(payload, adv_type):
      i = 0
      result = []
      while i + 1 < len(payload):
          if payload[i + 1] == adv_type:
              result.append(payload[i + 2 : i + payload[i] + 1])
          i += 1 + payload[i]
      return result

  def decode_name(payload):
      n = decode_field(payload, _ADV_TYPE_NAME)
      return str(n[0], "utf-8") if n else ""

  def decode_services(payload):
      services = []
      for u in decode_field(payload, _ADV_TYPE_UUID16_COMPLETE):
          services.append(bluetooth.UUID(struct.unpack("<h", u)[0]))
      for u in decode_field(payload, _ADV_TYPE_UUID32_COMPLETE):
          services.append(bluetooth.UUID(struct.unpack("<d", u)[0]))
      for u in decode_field(payload, _ADV_TYPE_UUID128_COMPLETE):
          services.append(bluetooth.UUID(u))
      return services

  def demo():
      payload = advertising_payload(
          name="micropython",
          # 0x181A: 環境調査
          # 6E400001-B5A3-F393-E0A9-E50E24DCCA9E: UART
          services=[bluetooth.UUID(0x181A), bluetooth.UUID("6E400001-B5A3-F393-E0A9-E50E24DCCA9E")],
      )
      print(payload)
      print(decode_name(payload))
      print(decode_services(payload))

  if __name__ == "__main__":
      demo()
  ```

- ble_simple_peripheral.py

  ```python
  # UART ペリフェラルをデモするサンプル
  import bluetooth
  import random
  import struct
  import time
  from ble_advertising import advertising_payload

  from micropython import const

  _IRQ_CENTRAL_CONNECT = const(1)
  _IRQ_CENTRAL_DISCONNECT = const(2)
  _IRQ_GATTS_WRITE = const(3)

  _FLAG_READ = const(0x0002)
  _FLAG_WRITE_NO_RESPONSE = const(0x0004)
  _FLAG_WRITE = const(0x0008)
  _FLAG_NOTIFY = const(0x0010)

  _UART_UUID = bluetooth.UUID("6E400001-B5A3-F393-E0A9-E50E24DCCA9E")
  _UART_TX = (
      bluetooth.UUID("6E400003-B5A3-F393-E0A9-E50E24DCCA9E"),
      _FLAG_READ | _FLAG_NOTIFY,
  )
  _UART_RX = (
      bluetooth.UUID("6E400002-B5A3-F393-E0A9-E50E24DCCA9E"),
      _FLAG_WRITE | _FLAG_WRITE_NO_RESPONSE,
  )
  _UART_SERVICE = (
      _UART_UUID,
      (_UART_TX, _UART_RX),
  )

  class BLESimplePeripheral:
      def __init__(self, ble, name="mpy-uart"):
          self._ble = ble
          self._ble.active(True)
          # コールバックを登録
          self._ble.irq(self._irq)
          # サービスの起動
          ((self._handle_tx, self._handle_rx),) = self._ble.gatts_register_services((_UART_SERVICE,))
          self._connections = set()
          self._write_callback = None
          self._payload = advertising_payload(name=name, services=[_UART_UUID])

           # 新しい接続を許可するためにアドバタイズを開始する
          self._advertise()

      # イベントハンドラ
      # event: _IRQ_XXX(https://micropython-docs-ja.readthedocs.io/ja/latest/library/bluetooth.html)
      # data : データ
      def _irq(self, event, data):
          # セントラルがペリフェラルに接続した
          if event == _IRQ_CENTRAL_CONNECT:
              conn_handle, _, _ = data
              print("New connection", conn_handle)
              self._connections.add(conn_handle)

          # セントラルがペリフェラルから切断した
          elif event == _IRQ_CENTRAL_DISCONNECT:
              conn_handle, _, _ = data
              print("Disconnected", conn_handle)
              self._connections.remove(conn_handle)

              # 新しい接続を許可するために再度アドバタイズを開始する
              self._advertise()

          # クライアントがキャラクタリスティックまたはディスクリプタに書き込んだ
          elif event == _IRQ_GATTS_WRITE:
              conn_handle, value_handle = data
              value = self._ble.gatts_read(value_handle)
              if value_handle == self._handle_rx and self._write_callback:
                  self._write_callback(value)

      def send(self, data):
          # 接続している全クライアントにノーティフィケーション要求を送信
          for conn_handle in self._connections:
              self._ble.gatts_notify(conn_handle, self._handle_tx, data)

      def is_connected(self):
          return len(self._connections) > 0

      # アドバタイジングを開始する
      def _advertise(self, interval_us=500000):
          print("Starting advertising")
          self._ble.gap_advertise(interval_us, adv_data=self._payload)

      def on_write(self, callback):
          self._write_callback = callback

  def demo():
      ble = bluetooth.BLE()
      p = BLESimplePeripheral(ble)

      def on_rx(v):
          print("RX", v)

      p.on_write(on_rx)

      i = 0
      while True:
          if p.is_connected():
              # Short burst of queued notifications.
              for _ in range(3):
                  data = str(i) + "_"
                  print("TX", data)
                  p.send(data)
                  i += 1
          time.sleep_ms(100)


  if __name__ == "__main__":
      demo()
  ```

- main.py

  ```python
  from machine import Pin
  import bluetooth
  from ble_simple_peripheral import BLESimplePeripheral

  # BLE オブジェクトを生成
  ble = bluetooth.BLE()

  # BLESimplePeripheral のインスタンスを生成
  sp = BLESimplePeripheral(ble)

  # LED ピンオブジェクトを生成
  led = Pin("LED", Pin.OUT)
  led.off()

  # データを受信したときの処理を定義する
  def on_rx(data):
      print("Data received: ", data)
      global led_state
      if data == b'toggle\r\n':
        led.toggle()

  # 無限ループを開始
  while True:
      if sp.is_connected():
          sp.on_write(on_rx)
  ```
