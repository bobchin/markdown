# Raspberry Pi

## Raspbian インストール

- イメージダウンロード　[ダウンロード](https://www.raspberrypi.org/downloads/raspbian/)

  - "Raspbian XXX with desktop" をダウンロード(XXX はバージョン名)

- SD カードをフォーマットする

  - Raspberry Pi は FAT(FAT16/FAT32)のみ対応
  - 32GB 以上の SD カードは exFAT でフォーマットされているので注意

    ```
    # Windows
    エクスプローラでフォーマット

    # Mac
    # ディスク一覧
    diskutil list
    diskutil eraseDisk MS-DOS RPI disk2
    ```

- イメージを SD カードにコピー
  - [balenaEtcher](https://www.balena.io/etcher/)

### Raspbian 設定

- メニューより、「設定」－「RaspberryPIの設定」
  - インターフェイス
    - SSH
    - SPI
    - I2C

- wifi
  - /etc/wpa_supplicant/wpa_supplicant.conf

  ```
  ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
  update_config=1
  country=JP

  # "=" の前後にスペースを入れたら駄目っぽいので注意
  network={
    ssid="bobchin"
    psk="password"
    scan_ssid=1     # SSIDがステルスの場合
  }
  ```

- 日本語入力

  ```
  sudo apt-get update
  sudo apt-get install fcitx-mozc
  ```


## ラズパイ入門ボード

- 主な機能

  - カラー LED(RGB) x2
  - 押しボタンスイッチ x4
  - 圧電スピーカー
  - 単色 LED(赤) x4
  - 単色 OLED
  - Grove コネクター
  - 拡張用スルーホール

- Raspbian の設定

  - デスクトップ左上のｐメインメニューより、「設定」-「Raspberry Pi の設定」
    - **SPI** と **I2C** を有効にする
  - 制御方法 Python と GPIO ライブラリ(RPi.GPPIO)のアップデート

    ```
    sudo apt-get update
    sudo apt-get install python-rpi.gpio python3-rpi.gpio
    ```

  - 制御方法 pigpio ライブラリのアップデート

    ```
    sudo apt-get update
    sudo apt-get install pigpio python-pigpio python3-pigpio
    ```

  - pip

    ```
    sudo apt-get update
    sudo apt-get install python-pip python3-pip
    ```


- GPIO の対応表

| 基盤       | GPIO 番号 |
| :--------- | :-------- |
| SW1        | GPIO P4   |
| SW2        | GPIO 17   |
| SW3        | GPIO 5    |
| SW4        | GPIO 6    |
| LED1       | GPIO 14   |
| LED2       | GPIO 15   |
| LED3       | GPIO 12   |
| LED4       | GPIO 16   |
| スピーカー | GPIO 18   |
| LED5 赤    | GPIO 20   |
| LED5 緑    | GPIO 22   |
| LED5 青    | GPIO 27   |
| LED6 赤    | GPIO 26   |
| LED6 緑    | GPIO 19   |
| LED6 青    | GPIO 13   |

- ファイル

  ```
  # entryboard.py
  LED1 = 14
  LED2 = 15
  LED3 = 12
  LED4 = 16
  SW1  = 4
  SW2  = 17
  SW3  = 5
  SW4    = 6
  BUZZER = 18
  LED5_R = 20
  LED5_G = 22
  LED5_B = 27
  LED6_R = 26
  LED6_G = 19
  LED6_B = 13
  ```

### 単色 OLED

Adafruit Industries社の "SSD1306 OLD モジュール" と互換性がある。
サイズは、128 x 64ドット。

- ライブラリのインストール

  ```sh
  # sudo apt-get install git
  git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
  cd Adafruit_Python_SSD1306
  sudo python setup.py install
  sudo python3 setup.py install
  ```

- フォントのインストール

  ```bash
  sudo apt-get install fonts-takao
  ```

- 設定
  - デスクトップ左上のｐメインメニューより、「設定」-「Raspberry Pi の設定」
    - **SPI** を有効にする


## nfcpy

- [node-nfcpy-id](https://qiita.com/mascii/items/ec79ad5a7026f771d181)

- PaSori(RC-S380)
  - 使用できる規格
    - FeliCa(ID => IDm)
    - MIFARE(ID => UID)

- nodejsインストール

  ```sh
  sudo apt-get update
  sudo apt-get install nodejs npm
  sudo npm cache clean
  sudo npm install -g npm n          # n はnode.jsのバージョン管理ツールnodistと同じようなもの
  sudo n stable
  ```

- nfcpy
  - Type2: MIFARE(DESFire以外)
  - Type3: FeliCa, Suica, WAON
  - Type4: MIFARE DESFire, au WALLET

  - インストール

    ```
    sudo apt-get install python-usb python-pip
    sudo pip install -U nfcpy
    sudo reboot

    # PaSoRiの確認(アクセスするための情報(usb:xxx:xxx)を取得できるはず)
    lsusb

    # チェック
    python -m nfc
    ```

  - サンプル

    ```python
    # nfcpyのみでやる場合
    import nfc
    clf = nfc.ContactlessFrontend("usb")
    if (clf):
      while clf.connect(rdwr={
        "on-startup": startup,
        "on-connect": connected,
        "on-release": released,
      }):
        pass

    def startup(clf):
      print "waiting for new NFC tags..."
      return clf

    def connected(tag):
      print("idm = " + binascii.hexlify(tag.idm))
      return True

    def released(tag):
      print("released: ")
      if tag.ndef:
        print(tag.ndef.message.pretty())
    ```

- node-nfcpy-id

  ```sh
  sudo pip install -U nfcpy-id-reader

  # root 以外でPaSoRiを使えるようにする
  cat << EOF | sudo tee /etc/udev/rules.d/nfcdev.rules
  SUBSYSTEM=="usb", ACTION=="add", ATTRS{idVendor}=="054c", ATTRS{idProduct}=="06c3", GROUP="plugdev"
  EOF

  npm install node-nfcpy-id --save
  ```

- サンプル

  - loopモード

    ```js
    const NfcpyId = require("node-nfcpy-id").default;
    const nfc = new NfcpyId().start();

    nfc.on("touchstart", (card) => {
      // カードリーダーの上にカードを置いたとき
      console.log("touchstart", "id:", card.id, "type: ", card.type);
    });
    nfc.on("touchend", () => {
      // カードリーダーの上からカードを外したとき
      console.log("touchend");
    });
    nfc.on("error", (err) => {
      console.error("\u001b[31m", err, "\u001b[0m");
    });
    ```

  - non-touchendモード

    ```js
    const NfcpyId = require("node-nfcpy-id").default;
    const nfc = new NfcpyId({mode: "non-touchend"}).start();

    nfc.on("touchstart", (card) => {
      // カードリーダーの上にカードを置いたとき
      console.log("touchstart", "id:", card.id, "type: ", card.type);
      console.log("５秒後に読み込みを再開します");
      setTimeout(() => {
        nfc.start();
      }, 5000);
    });
    nfc.on("error", (err) => {
      console.error("\u001b[31m", err, "\u001b[0m");
    });
    ```
