# Raspberry Pi

- [Raspberry Pi](#raspberry-pi)
  - [ドキュメント等](#ドキュメント等)
  - [Raspbian インストール](#raspbian-インストール)
    - [Raspbian 設定](#raspbian-設定)
  - [SSD起動](#ssd起動)
  - [デバイス関連](#デバイス関連)
  - [リモート管理](#リモート管理)
  - [momo(WebRTC)](#momowebrtc)
  - [ストリーミング](#ストリーミング)
  - [ストリーミング２](#ストリーミング２)
  - [AirPlay](#airplay)
  - [Miracast](#miracast)
  - [ラズパイ入門ボード](#ラズパイ入門ボード)
    - [単色 OLED](#単色-oled)
  - [nfcpy](#nfcpy)

## ドキュメント等

- [Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/)
- [インストール](https://www.raspberrypi.org/documentation/installation/)
- [ダウンロード](https://www.raspberrypi.org/downloads/)

## Raspbian インストール

- OSの種類
  - Raspberry Pi OS (32-bit)
    - desktop and recommended software(Debian Busterベースのデスクトップ＋推奨アプリ)
    - desktop(Debian Busterベースのデスクトップのみ)
    - Lite(Debian Busterベースの最小イメージ)

  - NOOBS（New Out Of the Box Software）: OSのインストーラ付きの環境
    - NOOBS
    - NOOBS Lite

- SDカードのフォーマット
  - [SD Formatter](https://www.sdcard.org/downloads/formatter/)
  - 手動でフォーマットする
    - Raspberry Pi は FAT(FAT16/FAT32)のみ対応
    - 32GB 以上の SD カードは exFAT でフォーマットされているので注意

      ```sh
      # Windows
      エクスプローラでフォーマット

      # Mac
      # ディスク一覧
      diskutil list
      diskutil eraseDisk MS-DOS RPI disk2
      ```

- イメージのコピー
  - Mac

    ```sh
    diskutil list
    # example
    --------------------------------
    /dev/disk0 (internal):
    /dev/disk1 (synthesized):
    /dev/disk2 (external, physical):
    --------------------------------

    diskutil unmountDisk /dev/disk2
    sudo dd bs=1m if=raspios.img of=/dev/rdisk2; sync # diskNの代わりにrdiskNを使った方が速い
    sudo diskutil eject /dev/rdisk2
    ```

  - Windows
    - [balenaEtcher](https://www.balena.io/etcher/)
    - [Win32DiskImager](https://sourceforge.net/projects/win32diskimager/)
    - [Upswift imgFlasher](https://www.upswift.io/imgflasher/)

- イメージのバックアップ
  - Mac

    ```sh
    diskutil list
    # example
    --------------------------------
    /dev/disk0 (internal):
    /dev/disk1 (synthesized):
    /dev/disk2 (external, physical):
    --------------------------------

    diskutil unmountDisk /dev/disk2
    sudo dd bs=1m if=/dev/disk2 of=raspios.img
    sudo diskutil eject /dev/disk2
    ```

  - Windows
    - [Win32DiskImager](https://sourceforge.net/projects/win32diskimager/)

- インストール
  - **[Raspberry Pi Imager](https://downloads.raspberrypi.org/imager/imager_1.4.exe)** を使う
    - SDカードへのコピーも早くて簡単？
    - アプリケーション起動後に、「インストールするOS」と「インストール先(SDカード)」を選択するだけ
    - OSとしてダウンロードせずに「Use custom」でイメージファイル(.img)を選択可能

  - NOOBSを使う
    - SDカードをフォーマット
    - [NOOBSイメージ](https://www.raspberrypi.org/downloads/noobs/)をダウンロードし、ファイルの中身をSDカードにコピー

  - 手動でインストール
    - イメージダウンロード　[ダウンロード](https://www.raspberrypi.org/downloads/raspbian/)
      - "Raspbian XXX with desktop" をダウンロード(XXX はバージョン名)
    - SD カードをフォーマット
    - イメージを SD カードにコピー

- アップデート

  ```sh
  # アプリケーション取得元のリスト
  sudo vi /etc/apt/sources.list
  # リストのアップデート
  sudo apt update

  # アプリケーションインストール
  sudo apt install [app]
  # 削除
  sudo apt remove [app]
  # 設定ファイルも含めて削除
  sudo apt purge [app]

  # アップグレード
  sudo apt full-upgrade

  # スペース確保(/var/cache/apt/archives)
  sudo apt clean
  sudo apt autoremove
  sudo apt autoclean

  # 検索
  apt-cache search [app]
  apt-cache show [app]

  # パッケージ構成を変える更新
  sudo apt dist-upgrade
  ```

### Raspbian 設定

- メニューより、「設定」－「RaspberryPIの設定」
  - インターフェイス
    - SSH
    - SPI
    - I2C
- CUI

  ```sh
  raspi-config
  ```

- wifi
  - /etc/wpa_supplicant/wpa_supplicant.conf

  ```sh
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

  ```sh
  sudo apt-get update
  sudo apt-get install fcitx-mozc
  ```

- カスタマイズ

  ```sh
  # vim
  sudo apt install vim
  # ~/.vimrc
  # VimをVi互換にしない
  set nocompatible
  # 挿入モードの削除の動作
  set backspace=indent,eol,start
  # 行挿入開始時にインデントを揃える
  set autoindent
  # 行の折り返し表示をしない
  set nowrap
  # 構文ハイライト表示を有効に
  syntax on
  colorscheme torte

  # ~/.bash_aliases
  alias sudo='sudo -E'
  alias ls='ls -lhAF --color=auto'
  alias ll='ls -l'
  alias la='ls -a'
  alias pd='pushd'
  alias po='popd'
  ```

  - HDMIを必ず認識させる

    ```bash
    # /boot/config.txt
    # コメントを外す
    hdmi_force_hotplug=1
    ```

  - 起動速度確認

    ```bash
    systemd-analyze time
    systemd-analyze blame
    ```

  - 仮想ネットワーク

    ```bash
    # /etc/network/interface.d/eth0:1
    auto eth0:1
    iface eth0:1 inet static
    address 172.17.1.85
    netmask 255.255.255.0
    gateway 172.17.1.254
    # dns-domain hoge.local
    # dns-nameserver 172.17.1.254
    ```

  - wifiパワーマネジメント無効

    ```bash
    sudo iw dev wlan0 set power_save off
    ```

## SSD起動

- 古いラズパイではSSD起動できるようになっていない。
  これはブートローダの機能によるものなので、バージョンアップが必要になる。
  バージョンが、**2020-09-03** 以降であればSSD起動できるようだ。
  確認は一旦 SD カードにRaspberryPi OS をインストールして試す。

  ```bash
  # ブートローダのバージョン確認
  vcgencmd bootloader_bersion

  # ブートローダのアップデート方法
  # sudo rpi-eeprom-update
  # sudo rpi-eeprom-update -r # 元に戻す
  # 最近は、raspi-config で設定できるよう。
  sudo raspi-config
  > Advanced Options -> A7 Boot ROM

  # ブート順の設定(raspi-config)
  sudo raspi-config
  > Advanced Options -> A6 Boot Order
  ```

- SSDにデータをコピー
  既に動作しているRaspi OS をコピーするのは簡単。
  "SD Card Copier" を使用する。
  ※使用するSSDはフォーマットされるので注意。

  - または、Raspberry Pi Imager を使ってもいい

## デバイス関連

- USB
  - Bus: 複数のバス（信号線）を持つ
    - Port: Busごとにポートがある。ポートががポートを持つこともあり（USBハブ？）。
    - Device: 一意の値
      - ID: "vendor:product" という形式
      - If: 複数のインタフェースを持つ
        - Class: デバイスの機能

  ```sh
  # デバイスの確認
  lsusb
  # Bus [バス番号] Device [デバイス番号]: ID [ベンダーID]:[プロダクトID] [デバイスの説明]
  Bus 001 Device 006: ID 0424:7800 Standard Microsystems Corp.
  Bus 001 Device 003: ID 0424:2514 Standard Microsystems Corp. USB 2.0 Hub
  Bus 001 Device 002: ID 0424:2514 Standard Microsystems Corp. USB 2.0 Hub
  Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

  lsusb -t # ツリー表示
  lsusb -s busnum:devnum  # バス番号とデバイス番号 ex) lsusb -s 1:3
  lsusb -d vendor:product # ベンダーIDとプロダクトID ex) lsusb -d 0424:2514

  # 詳細表示(/dev/bus/usb/[busno]/[deviceno])
  lsusb -D /dev/bus/usb/001/003
  ```

- 映像デバイス
  - v4l2(Video for Linux 2): Linuxでビデオを扱うための統一的なAPIを使う。特にUVCカメラを使う場合はこれを使う。

    ```sh
    # v4l2で扱えるデバイスのリスト
    v4l2-ctl --list-devices
    # デバイスの情報を表示
    v4l2-ctl -d /dev/video0 --all
    v4l2-ctl -d /dev/video0 --info
    v4l2-ctl -d /dev/video0 --list-formats
    v4l2-ctl -d /dev/video0 --list-formats-ext
    ```

  - フォーマット
    - YUYV
    - MJEPG

- 音声デバイス
  - [Raspberry Piのオーディオの仕組み](https://www.ukeyslabo.com/raspberry-pi/audio/)
  - [Raspberry Pi で再生と録音を行う](https://blog.natade.net/2019/08/27/raspberry-pi-%E5%86%8D%E7%94%9F-%E9%8C%B2%E9%9F%B3-%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9/)
  - ALSA(Advanced Linux Sound Architecture): Linuxでサウンドを扱うためのAPI

    ```sh
    # 音声入力デバイスの表示（カード番号とデバイス番号が必要になる）
    arecord -l

    # 音声出力デバイスの表示
    aplay -l

    # サンプル
    # カード番号Xを使用して、"plughw:X" と指定することができる
    # デバイス番号Yを使用して、"plughw:X,Y" と指定することができる
    # サブデバイス番号Zを使用して、"plughw:X,Y,Z" と指定することができる
    aplay -l

    **** ハードウェアデバイス PLAYBACK のリスト ****
    カード 0: b1 [bcm2835 HDMI 1], デバイス 0: bcm2835 HDMI 1 [bcm2835 HDMI 1]
    サブデバイス: 4/4
    サブデバイス #0: subdevice #0
    サブデバイス #1: subdevice #1
    サブデバイス #2: subdevice #2
    サブデバイス #3: subdevice #3
    カード 1: Headphones [bcm2835 Headphones], デバイス 0: bcm2835 Headphones [bcm2835 Headphones]
    サブデバイス: 4/4
    サブデバイス #0: subdevice #0
    サブデバイス #1: subdevice #1
    サブデバイス #2: subdevice #2
    サブデバイス #3: subdevice #3

    arecord -l

    **** ハードウェアデバイス CAPTURE のリスト ****
    カード 2: U0x46d0x81d [USB Device 0x46d:0x81d], デバイス 0: USB Audio [USB Audio]
    サブデバイス: 1/1
    サブデバイス #0: subdevice #0

    # サウンドカードの確認（playback: スピーカー, capture: マイク）
    cat /proc/asound/cards

      0: [ 0]   : control
    16: [ 0- 0]: digital audio playback
    32: [ 1]   : control
    33:        : timer
    48: [ 1- 0]: digital audio playback
    64: [ 2]   : control
    88: [ 2- 0]: digital audio capture

    # PCMストリームの確認（XX-YY: XXカード番号, YYデバイス番号）
    cat /proc/asound/pcm

    00-00: bcm2835 HDMI 1 : bcm2835 HDMI 1 : playback 4
    01-00: bcm2835 Headphones : bcm2835 Headphones : playback 4
    02-00: USB Audio : USB Audio : capture 1

    # デバイスの優先度
    cat /proc/asound/modules

    0 snd_bcm2835
    1 snd_bcm2835
    2 snd_usb_audio

    # オーディオデバイス順を変える
    # /etc/modprobe.d/alsa-base.conf
    options snd slots=snd_usb_audio,snd_bcm2835
    options snd_usb_audio index=0
    options snd_bcm2835 index=1

    # オーディオデバイス番号を指定
    export ALSADEV="pluginw:1,0"

    # ffmpegで指定する場合（カード:2, デバイス:0）に以下のようになる
    -i hw:2,0
    ```

- 無線LAN

  ```sh
  # GUIで無効にした場合に有効に戻す
  # rfkillが使われている？
  rfkill unblock wifi
  ```

## リモート管理

- [remote.it](https://remote.it/)

  ```bash
  # サインアップしてIDを登録しておく
  sudo apt install remoteit

  # http://172.17.1.82:29999 にアクセスして、上記登録したIDでログインする

  # 自動アップデート
  nohup sudo apt install remoteit &
  ```

## momo(WebRTC)

- [WebRTC Native Client Momo](https://momo.shiguredo.jp)
- [Github](https://github.com/shiguredo/momo)

- インストール

  ```sh
  mkdir -p ~/momo
  cd ~/momo
  wget https://github.com/shiguredo/momo/releases/download/2020.8.1/momo-2020.8.1_raspberry-pi-os_armv7.tar.gz
  tar xvfz momo-2020.8.1_raspberry-pi-os_armv7.tar.gz

  # ラズパイのアップデート
  sudo apt update
  sudo apt upgrade

  # 必要ライブラリのインストール
  sudo apt install libnspr4 libnss3 libsdl2-dev

  # 音声が入らない場合
  sudo apt install pulseaudio
  ```

## ストリーミング

- 構成
  - nginx の rtmp モジュールを使用して、自身がRTMPサーバ（映像受信サーバ）となる。
    また、そのままHLSやMPEG-DASHサーバとなりストリーミングを公開する。
  - RTMP で受信した映像はファイル化されるので書き込み領域をRAMディスク化する。

- インストール

  ```sh
  sudo apt install nginx libnginx-mod-rtmp ffmpeg
  ```

- nginx

  ```sh
  # /etc/nginx/rtmp.conf
  rtmp {
    server {
      listen 1935;
      chunk_size 4096;

      application live {
        # LIVE
        live on;
        record off;
        wait_key on;
        wait_video on;
        sync 10ms;

        # HLS
        hls on;
        hls_path /var/www/html/live/hls;
        hls_fragment 3s;
        hls_type live;

        # MPEG-DASH
        dash on;
        dash_path /var/www/html/live/dash;
        dash_fragment 3s;
      }
    }
  }

  # モジュールを読み込むように
  ln -s /etc/nginx/rtmp.conf /etc/nginx/modules-enabled
  ```

- RAMディスク化

  ```sh
  # /etc/fstab
  tmpfs /var/www/html/live  tmpfs defaults,size=64m,noatime,mode=1777  0 0
  ```

  - fstab
    - filesystem: マウントされるパーティションやストレージデバイス
    - dir       : マウントポイント
    - type      : ファイルシステム
    - options   : ファイルシステムのマウントオプション
      - defaults : デフォルト設定を使う(rw, suid, dev, exec, auto, nouser, async)
        - rw     : 読み書きモードでマウント
        - suid   : set user IDビットを許可する
        - dev    : キャラクタデバイス・ブロックデバイスを受け取る
        - exec   : バイナリの実行を許可
        - auto   : mount -a でマウントする
        - nouser : 一般ユーザはマウントできない
        - async  : 非同期にI/Oを処理する
      - size     : 割り当てるサイズ
      - noatime  : inodeアクセス時間を更新しない
      - mode     : mode&0777 のパーミンションを当てる
    - dump      : dumpコマンドによるバックアップの対象にするか
    - pass      : 起動時にfsckがチェックする順

- クライアント表示用ブラウザプレーヤー
  - HLS

    ```html
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="utf-8"/>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </head>

    <body>
      <video id="video" controls width="95%"></video>
      <script>
        if(Hls.isSupported()) {
          var video = document.getElementById('video');
          var hls = new Hls();
          hls.loadSource('live/hls/stream.m3u8');
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
        });
      }
      </script>
    <p>
      iPhoneなどで再生されない場合は、<a href="live/hls/stream.m3u8">こちら</a>をクリック。
    </p>
    </body>
    </html>
    ```

  - MPEG-DASH

    ```html
    <!doctype html>
    <html lang="ja">
    <head>
      <meta charset="utf-8"/>
      <script src="http://cdn.dashjs.org/latest/dash.all.min.js"></script>
    </head>
    <body>
        <video id="video" controls width="95%"></video>
        <script>
            (function(){
                var url = "live/dash/stream.mpd";
                var player = dashjs.MediaPlayer().create();
                player.initialize(document.querySelector("#video"), url, true);
            })();
        </script>
    </body>
    </html>
    ```

## ストリーミング２

- [SRS](https://github.com/ossrs/srs)

  ```sh
  # コンパイル
  git clone https://gitee.com/winlinvip/srs.oschina.git srs
  cd srs/trunk
  git remote set-url origin https://github.com/ossrs/srs.git && git pull
  # git clone https://github.com/ossrs/srs.git
  # cd srs/trunk
  ./configure
  make

  # 起動
  ./objs/srs -c conf/rtmp.conf

  # systemctl
  sudo ln -sf srs/trunk/etc/init.d/srs /etc/init.d/srs
  sudo cp -f srs/trunk/usr/lib/systemd/system/srs.service /usr/lib/systemd/system/srs.service
  sudo systemctrl daemon-reload
  sudo systemctrl enable srs
  ```

## AirPlay

- [RPiPlay](https://github.com/FD-/RPiPlay)

  ```sh
  # 依存パッケージ
  sudo apt-get install cmake
  sudo apt-get install libavahi-compat-libdnssd-dev
  sudo apt-get install libplist-dev
  sudo apt-get install libssl-dev

  # コンパイル
  mkdir -p ~/rpiplay
  cd ~/rpiplay
  git clone https://github.com/FD-/RPiPlay.git
  cd RPiPlay
  mkdir build
  cd build
  cmake ..
  make

  # 実行
  ./rpiplay

  -n: クライアントに表示される名前
  -b: (on|auto|off)背景表示を常に表示|接続があるときのみ|表示しない
  -r: (90|180|270)画面の回転
  -l: 低遅延モードを有効にする
  -a: (hdmi|analog|off)音声出力
  -d: デバッグを有効にする
  -h: ヘルプ

  # 自動起動に登録する
  # rpiplay.service
  ---------------------------------
  [Unit]
  Description=RPi Play
  After=network.target
  StartLimitIntervalSec=30

  [Service]
  Type=simple
  Restart=always
  RestartSec=10
  User=pi
  ExecStart=/home/pi/rpiplay/RPiPlay/build/rpiplay -n らずべりーぱいぱい -b auto -a analog
  StandardOutput=inherit
  StandardError=journal

  [Install]
  WantedBy=multi-user.target
  ---------------------------------

  ## 登録
  sudo ln -s /home/pi/rpiplay/RPiPlay/build/rpiplay.service /etc/systemd/system/
  sudo systemctl enable rpiplay
  ```

- [ShareportSync](https://github.com/mikebrady/shairport-sync)

  ```sh
  # 依存パッケージ
  sudo apt-get install libshairport2
  sudo apt-get install autoconf
  sudo apt-get install libtool
  sudo apt-get install libdaemon-dev
  sudo apt-get install libasound2-dev
  sudo apt-get install libpopt-dev
  sudo apt-get install libconfig-dev
  sudo apt-get install avahi-daemon
  sudo apt-get install libavahi-client-dev
  sudo apt-get install libssl-dev
  sudo apt-get install libsoxr-dev

  # コンパイル
  mkdir -p ~/shairport-sync
  cd ~/shairport-sync
  git clone https://github.com/mikebrady/shairport-sync.git
  cd shairport-sync
  autoreconf -i -f
  ./configure --with-alsa --with-avahi --with-ssl=openssl --with-metadata --with-soxr --with-systemd
  make
  make install

  # 設定(/usr/local/etc/shairport-sync.conf)
  general =
  {
    name = "shairport-sync";
  }
  alsa =
  {
    output_device = "plughw:1,0";
  }

  # 自動起動に登録する
  sudo systemctl enable shairport-sync
  ```

## Miracast

- [Lazycast](https://github.com/homeworkc/lazycast)

  ```sh
  # 依存関係
  sudo apt install net-tools python udhcpd
  sudo apt install libx11-dev libasound2-dev libavformat-dev libavcodec-dev

  cd /opt/vc/src/hello_pi/libs/ilclient/
  make
  cd /opt/vc/src/hello_pi/hello_video
  make

  mkdir -p ~/lazycast
  cd ~/lazycast
  git clone https://github.com/homeworkc/lazycast.git
  cd lazycast

  # 自動起動に登録する
  sudo ln -s /home/pi/lazycast/lazycast/lazycast.service /etc/systemd/system/
  sudo systemctl enable lazycast
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

    ```sh
    sudo apt-get update
    sudo apt-get install python-rpi.gpio python3-rpi.gpio
    ```

  - 制御方法 pigpio ライブラリのアップデート

    ```sh
    sudo apt-get update
    sudo apt-get install pigpio python-pigpio python3-pigpio
    ```

  - pip

    ```sh
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

  ```sh
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

  ```sh
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

    ```sh
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
