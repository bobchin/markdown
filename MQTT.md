# MQTT

Message Queuing Telemetry Transport.
リソースに制約のあるデバイスや低帯域幅、高遅延、または信頼性の低いネットワーク向けに設計された、軽量でパブリッシュ・サブスクライブに基づくメッセージングプロトコル

- [MQTT](#mqtt)
  - [Links](#links)
  - [用語](#用語)
  - [クイックチュートリアル](#クイックチュートリアル)
    - [MQTTブローカーを準備](#mqttブローカーを準備)
    - [MQTTクライアントを準備](#mqttクライアントを準備)
  - [Node.js で使う](#nodejs-で使う)
    - [MQTTブローカー](#mqttブローカー)
    - [MQTTクライアント](#mqttクライアント)
  - [MicroPython で使う](#micropython-で使う)
  - [ブローカー(Mosquitto)](#ブローカーmosquitto)

## Links

- [MQTT](https://mqtt.org/)
- [MQTTチュートリアル](https://www.emqx.com/ja/blog/category/mqtt-protocol)
  - [基礎知識とクイック・チュートリアル](https://www.emqx.com/ja/blog/the-easiest-guide-to-getting-started-with-mqtt)

## 用語

- MQTTブローカー
  クライアントの接続・切断・サブスクリプション・メッセージのルーティングを処理する。
  サービスの中央に置く司令塔のようなもの。  
  [MQTT Broker：動作と一般的なオプションとクイックスタート](https://www.emqx.com/ja/blog/the-ultimate-guide-to-mqtt-broker-comparison)

- MQTTクライアント
  MQTTブローカーに接続するもの。いろいろな形態がある。

  - Publisher
    MQTTクライアントの中で、**メッセージを送信する**もの。
  - Subscriber
    MQTTクライアントの中で、**メッセージを受信する**もの。

- Topic
  メッセージのルーティングの際に参照される情報。階層化されていて、ワイルドカード指定もできる。  
  [MQTT TopicとWildcardの初心者向けガイド](https://www.emqx.com/ja/blog/advanced-features-of-mqtt-topics)

  - スラッシュでレベルが区切られる
  - **先頭と最後はスラッシュにしない**
  - ワイルドカード（前方一致や後方一致はできないので注意。あくまでレベル全体をマスクできる）
    - "+": シングルレベル
    - "#": マルチレベル
    - ex)
      - "sensor/+/temperature" => ⚪️"sensor/123/temperature"　✖️"sensor/123/abc/temperature"
      - "sensor/+" => ⚪️"sensor/abc" ⚪️"sensor/123/abc/temperature"

- QoS
  サービスの品質。3種類ある。
    - QoS 0: メッセージは最大1回配信される。クライアントが現在利用できない場合、このメッセージは失われる。
    - QoS 1: 少なくとも1回はメッセージが届く。
    - QoS 2: メッセージは確保して1回のみ届く。
  - [QoS 0、1、2 のクイックスタート](https://www.emqx.com/ja/blog/introduction-to-mqtt-qos)

- パブリッシュ・サブスクライブパターン
  - サブスクライブ
    Topicを指定してパブリッシュの購読を開始する。サブスクライブすることでパブリッシュの配信対象になる。

  - パブリッシュ
    Topicを指定してサブスクライバ–にデータ配信する。Topicをサブスクライブしているクライアントにデータ配信される。

## クイックチュートリアル

とりあえずブラウザで動作を見てみる

### MQTTブローカーを準備

- [パブリックMQTTブローカー](https://www.emqx.com/ja/mqtt/public-mqtt5-broker) : ウェブ上で動作するフリーのMQTTブローカー

  - URL            : broker.emqx.io
  - TCPポート      : 1883
  - WebScoketポート: 8083
  - SSL/TLSポート  : 8883
  - WebScoketSecureポート: 8084


### MQTTクライアントを準備

- [MQTTX](https://mqttx.app/web-client) : ウェブ上で動作するフリーのMQTTブローカー

  - コネクションを作成(MQTTブローカーへの接続設定) **※１つのクライアントと考えるとよい**
    - name     : Simple Demo
    - ホスト   : wss://broker.emqx.io
    - ポート   : 8084
    - Client ID: デフォルト
    - Path     : /mqtt (broker.emqx.ioでは固定？)

  - サブスクリプションを作成
    - Topic: sensor/+/temperature  // "+" は1レベルのワイルドカードを表す = "/" 間はなんでもいいということ。
    - QoS  : 0

## Node.js で使う

### MQTTブローカー

- [aedes](https://github.com/moscajs/aedes)

  ```js
  npm install aedas aedes-server-factory
  ```

  ```js:server.js
  const aedes = require('aedes')()
  const { createServer } = require('aedes-server-factory')
  const port = 1883
  const json = true
  const server = createServer(aedes)
  server.listen(port, () => {
    console.log(`server started and listening on port ${port}`)
  })

  const EVENTS = {
    client          : "client",
    clientReady     : "clientReady",
    clientDisconnect: "clientDisconnect",

    clientError     : "clientError",
    connectionError : "connectionError",
    keepaliveTimeout: "keepaliveTimeout",

    publish         : "publish",

    ack             : "ack",
    ping            : "ping",

    subscribe       : "subscribe",
    unsubscribe     : "unsubscribe",

    connackSent     : "connackSent",
    closed          : "closed",
  }

  aedes.on(EVENTS.clientReady, (client) => {
    console.log(`client ready: id=${client.id} connecting=${client.connecting} connected=${client.connected}`)
  })
  aedes.on(EVENTS.clientDisconnect, (client) => {
    console.log(`client disconnect: id=${client.id}`)
  })

  aedes.on(EVENTS.clientError, (client, error) => {
    console.log(`clientError: id=${client.id} error=${error.message}`)
  })

  aedes.on(EVENTS.publish, (packet, client) => {
    const topics = packet.topic.split('/')
    if (topics[0] && topics[0] === '$SYS') {
      return
    }

    const id = (client)? client.id: ''
    console.log(`publish: id=${id} topic=${packet.topic} data=`, packet.payload)
  })
  ```

### MQTTクライアント

- [mqtt.js](https://github.com/mqttjs/MQTT.js)

  ```js
  npm install mqtt
  ```

  ```js
  const mqtt = require('mqtt')

  const protocols = {
    tcp  : 1883,
    mqtt : 1883,
    mqtts: 8883,
    ws   : 8083,
    wss  : 8084,
  }
  const protocol = 'mqtt'

  const clientId = (2 < process.argv.length)? process.argv[2]: 'node_client_1'
  const topic = `message/${client_id}`

  // ブローカーへ接続
  const client  = mqtt.connect({
    clientId: clientId,
    // host    : 'broker.emqx.io',
    host    : 'localhost',
    protocol: protocol,
    port    : protocols[protocol],
    path    : '/mqtt',
  })

  // パプリッシュ汎用メソッド
  function publish(topic, data) {
    client.publish(topic, JSON.stringify(data))
  }

  // events
  const EVENTS = {
    connect      : 'connect',
    reconnect    : 'reconnect',
    close        : 'close',
    disconnect   : 'disconnect',
    offline      : 'offline',
    error        : 'error',
    end          : 'end',
    message      : 'message',
    packetsend   : 'packetsend',
    packetreceive: 'packetreceive',
  }

  // connect
  client.on(EVENTS.connect, (connack) => {
    console.log(`connected: code=${connack.returnCode}`)

    client.subscribe(topic)
  })

  // reconnect と close はブローカーに接続できない場合にイベントが出続けるので使用しないほうがいい

  // client.on(EVENTS.reconnect, () => {
  //   console.log(`reconnected`)
  // })
  // client.on(EVENTS.close, () => {
  //   console.log(`close`)
  // })

  // client.on(EVENTS.disconnect, (packet) => {
  //   // MQTT 5.0 <
  //   console.log(`disconnect`)
  // })

  // disconnect
  client.on(EVENTS.offline, () => {
    console.log(`disconnected`)
  })

  // error
  client.on(EVENTS.error, (err) => {
    console.log(`error: erro.message`)
  })

  // client.on(EVENTS.end, () => {
  //   console.log(`end() called`)
  // })

  // receive publish
  client.on(EVENTS.message, (topic, message, _) => {
    const payload = JSON.parse(message.toString())
    console.log(`published: topic=${topic} payload=`, payload)
  })

  client.on(EVENTS.packetsend, (packet) => {
    console.log(`packetsend: cmd=${packet.cmd}`)
  })

  client.on(EVENTS.packetreceive, (packet) => {
    console.log(`packetreceive: cmd=${packet.cmd}`)
  })
  ```

- [node_mqtt_client](https://github.com/yilun/node_mqtt_client)

## MicroPython で使う

- [Picoを使用してAWS IoTに接続する](https://qiita.com/WIZnet/items/b88f6cfdff318d9498e5)
  - [Wiznet W5100S-EVB-Pico](https://micropython.org/download/W5100S_EVB_PICO/)
  - [Sample Source](https://github.com/renakim/W5100S-EVB-Pico-Micropython/blob/main/examples/AWS/main.py)

- [umqtt.simple](https://github.com/micropython/micropython-lib/tree/master/micropython/umqtt.simple/umqtt)
  手動でダウンロードして、W5100S-EVB-Pico 内の "lib" フォルダ以下にコピー

  ```text
  192.168.1.1
  255.255.255.0
  192.168.1.254
  192.168.1.254
  ```

  ```python:boot.py
  import network
  import sys
  import time

  args = ['IP', 'SUB', 'GW', 'DNS']
  try:
      with open('laninfo.txt', 'rt') as f:
          args = list(map(lambda s: s.rstrip(), f.readlines()))
          del args[4:]
  except:
      print("Failed LAN Configuration.")
      sys.exit(1)

  nic = network.WIZNET5K()
  nic.active(True)
  nic.ifconfig(tuple(args[0:4])) # 固定IP
  # nic.ifconfig()               # DHCP

  while not nic.isconnected():
      time.sleep_ms(100)

  print('Connected!')
  print('####################\nIP: %s\nSUBNET: %s\nGW: %s\nDNS: %s\n####################\n' % nic.ifconfig())
  ```

```python:main.py
import utime
import json
from umqtt.simple import MQTTClient

client_id = 'client1'
hostname  = b'localhost'
port      = 8883
topic     = b'message/client1'
global client

def init_mqtt_client():
  global client
  try:
    client = MQTTClient(
      client_id=client_id,
      server=hostname,
      port=port
    )
    client.connect()
    print("connect to broker")
  except Exception as e:
    print(f'init_mqtt_client error: {e}')

def subscribe_client(topic, cb=None):
  global client

  if cb is not None:
    client.set_callback(cb)
  client.subscribe(topic=topic)

def publish_client(topic, data):
  global client
  msg = json.dumps(data)
  client.publish(topic=topic, msg=msg)

def callback_handler(topic, message):
  print("received massage")
  print(message)


def main():
  global client
  init_mqtt_client()

  try:
    subscribe_client(topic, callback_handler)

    while True:
      client.wait_msg()
      # client.check_msg()

  except Exception as e:
    print(e)

  finally:
    client.disconnect()

if __name__ == "__main__":
    main()
```

## ブローカー(Mosquitto)

- [Mosquitto](https://www.mosquitto.org/)
  オープンソースの MQTT メッセージブローカー実装

  - [Download](https://mosquitto.org/download/)

    - Debian

      ```bash
      # GPGキー追加
      wget http://repo.mosquitto.org/debian/mosquitto-repo.gpg.key
      sudo apt-key add mosquitto-repo.gpg.key

      # リポジトリの追加
      cd /etc/apt/sources.list.d/
      sudo wget http://repo.mosquitto.org/debian/mosquitto-bullseye.list
      sudo apt-get update

      apt-cache search mosquitto
      apt-get install mosquitto
      ```

- QoS(Quality of Service) メッセージの品質
  - Level 0: broker/client は、**確認なし**で **1 回だけ**メッセージを送信する。
    - メッセージを失う可能性がある。
  - Level 1: broker/client は、**確認あり**で、**少なくとも 1 回**メッセージを送信する。
    - メッセージが重複する可能性がある。
  - Level 2: broker/client は、**4ステップの確認を使って**、**必ず 1 回**メッセージを送信する。
    - メッセージが重複せずに1回だけ配信されることが保証される。

  - パブリッシャー（発信者）とサブスクライバ（購読者）のQoSが異なる場合、低い方に合わせる。
    - パブリッシャーQoS > サブスクライバQoS => サブスクライバQoS
    - パブリッシャーQoS =< サブスクライバQoS => パブリッシャーQoS
      - ex) Pub QoS2, Sub QoS1 => QoS1
      - ex) Pub QoS2, Sub QoS0 => QoS0
      - ex) Pub QoS0, Sub QoS1 => QoS0

- Retained Messages
