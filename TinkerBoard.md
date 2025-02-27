# TinkerBoard

## 参考

- [ASUS](https://tinker-board.asus.com/jp/index.html)
  - [TinkerBoard 3S](https://tinker-board.asus.com/jp/series/tinker-board-3s.html)
  - [TinkerOS](https://tinker-board.asus.com/jp/download-list.html)
  - [マニュアル](https://tinker-board.asus.com/download/E22692_Tinker_Board_3_UM_WEB.pdf)

- [TinkerBoard wiki](https://github.com/TinkerBoard/TinkerBoard/wiki)
  - [DeveloperGuid](https://github.com/TinkerBoard/TinkerBoard/wiki/Developer-Guide)
  - [3&3S](https://github.com/TinkerBoard/TinkerBoard/wiki/Tinker-Board-3-&-3S)

## 情報

- 無印とSの違い
  SDカード版(ノーマル)かeMMC版(S)かの違い

---

- シリアルデバッグ
  - USB-UART変換を準備する
    ([SH-U09C](https://www.amazon.co.jp/DSD-TECH-SH-U09C-USB-TTL%E3%82%B7%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%A2%E3%83%80%E3%83%97%E3%82%BF%E3%83%BC/dp/B07BBPX8B8?ref_=ast_sto_dp))
  - ※ [マニュアル](https://tinker-board.asus.com/download/E22692_Tinker_Board_3_UM_WEB.pdf) P21 参照
    Degug UART header の TxとRx を接続する
  - Putty でシリアル接続する。Baudrate = 1,500,000

---

- イメージの書き込み
  - [TinkerOS](https://tinker-board.asus.com/jp/download-list.html) のダウンロード
  - SDカードに書き込んで起動 by [Etcher](https://etcher.balena.io/)
    **※SDカードに書き込んで、SDから起動しないとeMMCを認識しないので注意**
  - USB Type-B mini とPCを接続するとディスク(eMMC)を認識するので、Etcherで書き込む
    - **USB2.0じゃないとうまく認識しない**情報もあるので注意

- イメージのバックアップ
  - USB Type-B mini とPCを接続してディスク(eMMC)を認識する
  - [Win32DiskImager](https://win32diskimager.org/) でバックアップする

---

- 初回ログイン
  - パスワードの変更をする必要がある
  - 下記で初期ログイン後に変更する
    **※ログイン後のパスワード変更にパスワードを聞いてくるので注意**
    - 初期ID: linaro
    - 初期PW: linaro

    1. 初期IDと初期PWでログイン
    2. 自動的にパスワード変更するために、パスワード入力を求めるので、**初期PW** を入力
    3. 新しいパスワードに変更。新しいパスワードと再度確認パスワードを入力。

---

- /boot(/dev/mmcblk0p7) のサイズ拡張
  - eMMCから起動した場合はパーティションが変更できないので、SDからOSを起動する。
  - SD起動したOSに、"GParted" をインストールする

    ```bash
    sudo apt update
    sudo apt install gparted
    ```
  - GUI からGParted を起動して、/(/dev/mmcblk0p8) を縮小し、/boot(/dev/mmcblk0p7) を拡張する
    - ※/dev/mmcblk0 がeMMCなので注意
    - /dev/mmcblk0p8 の Free space preceding => 448Mib
    - /dev/mmcblk0p8 の New size => 512Mib

---

- Thunar で NAS にアクセス
  - smb://172.17.1.104/docuworks を入力し、user=admin でログインする

---

### 以降の設定はスクリプト化しているので、内容の確認と考えてください。

- 初期設定

  - ※Debian11 Xfce のカスタマイズ
    **~/.config/xfce4/xfconf/xfce-perchannel-xml/*.xml で設定を保持する**

    - 設定 - ディスプレイ => 解像度を 1920x1080 に

    - TinkerConfig
      - 2. Change User Password: p@ssword
      - 3. Boot Options
        - B1 Desktop/CLI => B4 Desktop自動ログイン
      - 4. Internationalisation Options
        - I1 Change Locale  => ja_JP.UTF-8
        - I2 Change Timezone  => Asia => Tokyo
        - I3 Change Keyboard Layout => Generic 102-key PC (intl.) => Other => Japanese => Japanese
          => The default for the kyeboard layout
          => No compose key
          => No
      - 5. Interface Options
        - F1 SSH  => enable
        - F5 Audio
          - 1 Force HDMI

    - デスクトップ
      - 背景
        - 設定 - デスクトップ
          - 背景
            - スタイル: 無し
            - 配色: 単一色　黒
          - メニュー
            - すべてチェック外す
          - アイコン
            - アイコンタイプ: 無し

      - マウスカーソル
        - 設定 - マウスとタッチパッド
          ※サイズをいじると大きさが変わる？

      - パネル
        - 設定 - パネル
          - パネル２削除
          - パネル１
            - 表示
              - 行サイズ: 16
              - 長さ: 1
              - 長さを自動的に伸ばす: チェック外す
            - 外観
              - スタイル: 単一色　黒
              - 自動的にサイズを調整する: オフ
              - 固定されたアイコンサイズ: 1
            - アイテム
              - セパレーター: 削除
              - ウィンドウボタン: 削除
              - ワークスペーススイッチャー: 削除
              - ステータストレイプラグイン: 削除
              - PulseAudioプラグイン: 削除
              - 時計: 削除
              - アクションボタン: 再起動とシャットダウンだけにする

      - キーボード
        - ショートカット

      - 電源
        - xxx

    - ネットワーク
      - IPv6を無効
      - IPv4
        - IP: 192.168.1.190
        - subnet: 24

    - セッションと起動
      - 全般
        - ログアウト時に確認する: チェック外す
      - パネルの起動を削除
      - セッションの保存

---

- overlayfs の設定
  - [Adapting Ubuntu for the Automotive: quick boot and power-loss resilience](https://medium.com/@fmntf/adapting-ubuntu-for-the-automotive-quick-boot-and-power-loss-resilience-74d25915250c)

  - /sbin/overlayinit

    ```bash:/sbin/overlayinit
    #!/bin/sh

    # コマンドが失敗するのでマウントする
    mount -t proc none /proc

    # tmpfs(メモリをディスクとして扱う) を /media にマウント。overlayfsで使用するフォルダを作成。
    mount -t tmpfs tmpfs /media
    mkdir /media/root-ro
    mkdir /media/root-rw
    mkdir /media/overlay
    mkdir /media/work

    # ルートのマウントし直し。/dev/mmcblk0p8 を読み込み専用に
    # overlayfs としては、
    # - メインを    /media/root-ro => /dev/mmcblk0p8
    # - 読み書きは  /media/root-rw
    # - 作業は      /media/work
    # - マウント    /media/overlay
    umount /
    mount -o ro /dev/mmcblk0p8 /media/root-ro
    mount -t overlay -o lowerdir=/media/root-ro,upperdir=/media/root-rw,workdir=/media/work overlay /media/overlay
    cd /media/overlay
    mkdir old_root
    pivot_root . old_root
    exec chroot . sh -c 'exec /sbin/init'
    ```

- overlayfs の有効化

  ```txt:/boot/cmdline.txt
  init=/sbin/overlayinit
  ```
- overlayfs の無効化

  ```bash
  sudo mount /dev/mmcblk0p7 ~/boot
  sudo vi ~/boot/cmdline.txt
  ```

  ```txt:/boot/cmdline.txt
  # 削除
  # init=/sbin/overlayinit
  ```

- 変更用スクリプト

  - change_bootmode.sh

    ```bash:change_bootmode.sh
    #!/bin/bash

    whiptail --title "環境復元の設定" --yesno "環境復元を有効にしますか？\n\n※選択後に再起動します。" 10 60
    RET=$?

    BOOTDIR=$(mktemp -d)
    sudo mount /dev/mmcblk0p7 ${BOOTDIR}
    CMDLINE=${BOOTDIR}/cmdline.txt

    if [ $RET -eq 0 ]; then
      # yes
      if ! grep -q "init=/sbin/overlayinit" ${CMDLINE}; then
        sudo sed -i ${CMDLINE} -e '$ s/$/ init=\/sbin\/overlayinit/g'
      fi
    elif [ $RET -eq 1 ]; then
      # no
      if grep -q "init=/sbin/overlayinit" ${CMDLINE}; then
        sudo sed -i ${CMDLINE} -e '$ s/ init=\/sbin\/overlayinit//'
      fi
    else
      exit 0
    fi

    sudo umount ${BOOTDIR}
    sudo reboot
    ```

---

- 起動時の非表示化

  ```txt:/boot/cmdline.txt
  consoleblank=1 quiet
  ```

- change_cmdline.sh

  ```bash:change_cmdline.sh
  #!/bin/bash

  BOOTDIR=$(mktemp -d)
  sudo mount /dev/mmcblk0p7 ${BOOTDIR}
  CMDLINE=${BOOTDIR}/cmdline.txt

  sudo sed -z -i ${CMDLINE} -e "$ s/#####\n*$/#####\n\n/g"
  sudo sed -i ${CMDLINE} -e "$ s/$/consoleblank=1 quiet/g"

  cat ${CMDLINE}
  sudo umount ${BOOTDIR}
  ```

---

- 自動起動(systemd)
  - [Grafana Kiosk Application](https://blog.rabu.me/grafana-kiosk-montiring-with-thinkboard-r2-0/)

    ```bash
    sudo systemctl enable selector.service
    sudo systemctl status selector.service
    ```

  - selector.service

    ```bash:/etc/systemd/system/selector.service
    [Unit]
    Description=Selector
    After=systemd-user-sessions.service

    [Service]
    User=linaro
    Environment="DISPLAY=:0"
    Environment="XAUTHORITY=/home/linaro/.Xauthority"
    Environment="XDG_RUNTIME_DIR=/run/user/1000"

    # X が起動するまで待つ必要がある
    ExecStartPre=/bin/sleep 5

    WorkingDirectory=/home/linaro/selector
    ExecStart=/home/linaro/selector/avselector

    [Install]
    WantedBy=graphical.target
    ```

  - systemctl でうまくいかない場合

    ```bash:start_selector.sh
    #!/bin/bash

    cd /home/linaro/selector
    xfce4-terminal \
      --geometry=1x1+0+0 \
      --hide-menubar \
      --hide-borders \
      --hide-toolbar \
      --working-directory="/home/linaro/selector" \
      -e "/home/linaro/selector/avselector"
    ```

---

- node.js 環境構築

  ```bash
  curl -fsSL https://fnm.vercel.app/install | bash
  source ~/.bashrc
  fnm use --install-if-missing 18
  node -v
  npm -v
  ```

---

- GPIO
  - [info](https://github.com/TinkerBoard/TinkerBoard/wiki/User-Guide#3-gpio)

    ```bash
    # GPIO の確認
    gpio readall

    # https://wiki.radxa.com/Rock3/hardware/3c/gpio
    # GPIO の番号の計算
    # マニュアルのPin Definition を参照
    # Pin 40 => GPIO3_A5 => bank=3, group(A=0,B=1,C=2,D=3)=0, index=5
    # pin_no = bank * 32 + group * 8 + index = 32*3 + 0*8 + 5 = 101

    # リスト
    "13": 147,
    "15": 149,
    "16": 23,
    "18": 20,
    "19": 83,
    "21": 82,
    "22": 117,
    "23": 81,
    "24": 84,
    "26": 85,
    "27": 108,
    "28": 107,
    "29": 150,
    "31": 22,
    "32": 106,
    "33": 105,
    "35": 100,
    "36": 75,
    "37": 76,
    "38": 102,
    "40": 101,
    ```

    ```js
    const pindefs = {
      // 使用済み？
      // "GPIO0_B3": 3,
      // "GPIO0_B4": 5,
      // "GPIO0_B0": 7,
      // "GPIO0_C1": 8,
      // "GPIO0_C0": 10,
      // "GPIO4_C2": 11,
      // "GPIO3_A3": 12,
      "GPIO4_C3": 13,
      "GPIO4_C5": 15,
      "GPIO0_C7": 16,
      "GPIO0_C4": 18,
      "GPIO2_C3": 19,
      "GPIO2_C2": 21,
      "GPIO3_C5": 22,
      "GPIO2_C1": 23,
      "GPIO2_C4": 24,
      "GPIO2_C5": 26,
      "GPIO3_B4": 27,
      "GPIO3_B3": 28,
      "GPIO4_C6": 29,
      "GPIO0_C6": 31,
      "GPIO3_B2": 32,
      "GPIO3_B1": 33,
      "GPIO3_A4": 35,
      "GPIO2_B3": 36,
      "GPIO2_B4": 37,
      "GPIO3_A6": 38,
      "GPIO3_A5": 40,
    }

    const map = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    }

    Object.entries(pindefs).forEach(([name, pin]) => {
      const bank  = parseInt(name.charAt(4))
      const group = parseInt(map[name.charAt(6)])
      const index = parseInt(name.charAt(7))

      const pad = pin.toString().padStart(2, "0")
      console.log(`${pad} : ${bank*32 + group*8 + index}`);
    })
    ```

  - GPIO の使い方

    - bash

      ```bash
      # GPIO の有効化
      gpio export 101 out
      echo 1 > /sys/class/gpio/gpio101/value
      cat /sys/class/gpio/gpio101/value
      echo 0 > /sys/class/gpio/gpio101/value
      cat /sys/class/gpio/gpio101/value
      gpio unexport 101
      ```

    - js

      ```js:gpio_sample.js
      const { execSync } = require('child_process')
      const gpio_number = 147
      const milisec = 1000

      execSync(`gpio export ${gpio_number} out`)
      execSync(`echo 1 > /sys/class/gpio/gpio${gpio_number}/value`)

      setTimeout(() => {
        execSync(`echo 0 > /sys/class/gpio/gpio${gpio_number}/value`)
        execSync(`gpio unexport ${gpio_number}`)
      }, milisec)
      ```

---

- UART
  - UART0(/dev/ttyS0)
    - TX:  8
    - RX: 10
  - UART1(/dev/ttyS1)
    - TX: 37
    - RX: 36
  - UART4(/dev/ttyS4)
    - TX: 32
    - RX: 33
  - UART9(/dev/ttyS9)
    - TX: 15
    - RX: 29

  - /boot/config.txt

    ```bash:/boot/config.txt
    initf:uart0=on
    initf:uart1=on
    initf:uart4=on
    initf:uart9=on
    ```

  - 使い方

    ```bash
    sudo apt install screen

    screen /dev/ttyS0 115200
    # Ctrl+a Ctrl+k で終了
    ```

---

- Network
  - nmcli
    - Device    : 物理的なネットワークインタフェース
    - Connection: 論理的なネットワークインタフェース（設定のためのオブジェクト）
      - 設定は「Connection」にまとめるイメージ。
      - 「Connection」と「Device」をマッピングすることで実際に設定が反映されるイメージ。

  - 設定サンプル

    ```bash
    # DHCP
    sudo nmcli c m "有線接続\ 1" ipv4.method auto
    ```


## 設定ファイルの場所

- TinkerConfig（実際のコマンド）
  - パスワード変更
    - passwd linaro

  - GUI 自動ログイン
    - systemctl set-default graphical.target
    - /etc/systemd/system/getty@tty1.service.d/override.conf の作成
      - mkdir -p /etc/systemd/system/getty@tty1.service.d/
      - /etc/systemd/system/getty@tty1.service.d/override.conf

        ```bash
        [Service]
        ExecStart=
        ExecStart=-/sbin/agetty --autologin $USER_NAME --noclear %I $TERM
        ```
    - /etc/lightdm/lightdm.conf の編集
      - sed /etc/lightdm/lightdm.conf -i -e "s/^\(#\|\)autologin-user=.*/autologin-user=$USER_NAME/"

  - 日本語化
    - dpkg-reconfigure locales
    - dpkg-reconfigure tzdata
    - dpkg-reconfigure keyboard-configuration && invoke-rc.d keyboard-setup start

- デスクトップ環境
  - デスクトップ
    - ~/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-desktop.xml
  - ディスプレイ
    - ~/.config/xfce4/xfconf/xfce-perchannel-xml/display.xml
  - マウスカーソル
    - ~/.config/xfce4/xfconf/xfce-perchannel-xml/xsettings.xml
  - パネル
    - ~/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-panel.xml
  - キーボード（ショートカット）
    - ~/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-keyboard-shortcutsmv x.xml

- ネットワーク
  - /etc/NetworkManager/system-connections/'有線接続 1.nmconnection'

    ```bash:'/etc/NetworkManager/system-connections/有線接続 1.nmconnection'
    [connection]
    id=有線接続 1
    uuid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    type=ethernet
    autoconnect-priority=-999
    interface-name=eth0
    timestamp=1684395394

    [ethernet]

    [ipv4]
    address1=192.168.1.1/24,192.168.1.254
    dns=192.168.1.254
    method=manual

    [ipv6]
    addr-gen-mode=stable-privacy
    method=disabled

    [proxy]
    ```

- タスク実行
  - /etc/crontab

    ```bash:/etc/crontab
    # minute(0-59), hour(0-23), day(1-31), month(1-12), week(0-6)
    0 5 * * *   root    reboot
    ```


