# StreamDeck

## Links

- [StreamDeck](https://www.elgato.com/jp/ja/s/explore-stream-deck)
- [SDK](https://docs.elgato.com/streamdeck/sdk/introduction/getting-started/)
  - Node.js によるプラグイン開発

## できること

- 開く
- ウェブサイト
- ホットキー
- テキスト

- アクションリスト
- アイコン・画像
- プロパティ

## Raspberry Pi

- [Managing a Stream Deck with a Raspberry Pi](https://raspberry.piaustralia.com.au/blogs/news/managing-a-stream-deck-with-a-raspberry-pi)
- [StreamDeck UI](https://github.com/timothycrosley/streamdeck-ui)
  - StreamDeck を Linux 上で使う

    - Linux 互換: Linux 上で Stream Deck デバイス(Original, MK2, Mini and XL)を使用できる
    - マルチデバイス: 1台のPC上で、複数の Stream Deck に接続し設定できる
    - 明るさ制御: 設定UIとデバイスのボタン両方の明るさの制御をサポート
    - ボタン表示の制御: Stream Deck 上のボタンに対して アイコンとテキスト、アイコンのみ、テキストのみ と設定できる
    - マルチアクションサポート: コマンドの実行、テキストの書き込み、ホットキーの押下などのコンビネーションをStream Deck上の1つのボタン押下に指定できる
    - ボタンページ: 複数のボタンのページをサポート。ページ間の移動を動的にボタンに割り当てできる
    - 自動再接続: 自動的に優しく再接続する、デバイスがケーブルを外し再接続した場合に。
    - インポート/エクスポート: 設定を保存したり、戻したりできる
    - ドラッグアンドドロップ: 簡単にドラッグアンドドロップでボタンを移動
    - ドラッグアンドドロップイメージ: ボタン画像をファイルマネジャからボタンにドラッグして設定できる
    - 自動消灯: 一定時間がたつと自動的に表示を暗くします。ボタンが押された再度表示します。
    - アニメーションアイコン: アニメーションGIFを使用します
    - systemd で実行: systemd --user サービスとしてバックグランドで自動的に実行します
    - Stream Deck ペダル: ペダルを踏んだときにアクションを実行します

- for raspberry pi

```bash
# OSを最新に
$ sudo apt update && sudo apt upgrade

# pythonのインストール
$ sudo apt install python3 python3-pip

# stream-ui のインストール
$ pip3 install streamdeck_ui

# 起動
$ streamdeck
```

- for ubuntu

```bash
# OSを最新に
$ sudo apt update && sudo apt upgrade

# pythonのインストール
$ sudo apt install libhidapi-libusb0 python3-pip

# PATH の設定(~/.local/bin に置く)
$ vi ~/.bashrc
$ PATH=$PATH:$HOME/.local/bin

# pip
$ python3 -m pip install --upgrade pip

# Elgato デバイスへの接続
# /etc/udev/rules.d/70-streamdeck.rules
# SUBSYSTEM=="usb"
# ATTRS{idVendor}=="0fd9"
# TAG+="uaccess"
$ sudo sh -c 'echo "SUBSYSTEM==\"usb\", ATTRS{idVendor}==\"0fd9\", TAG+=\"uaccess\"" > /etc/udev/rules.d/70-streamdeck.rules'
$ sudo udevadm trigger

# stream-ui のインストール
$ pip3 install --user streamdeck_ui

# 起動
$ streamdeck
```

- 自動起動

- Raspberry Pi の GUI 自動起動

```bash
$ mkdir -p ~/.config/autostart
$ vi ~/.config/autostart/streamdeck.desktop

[Desktop Entry]
Type=Application
Name=StreamDeck
Exec=streamdeck
```

- systemd

```bash
$ mkdir -p $HOME/.local/share/systemd/user/
$ touch $HOME/.local/share/systemd/user/streamdeck.service
$ vi $HOME/.local/share/systemd/user/streamdeck.service

[Unit]
Descreption=A Linux compatible UI for the Elgato Stream Deck.

[Service]
Type=Simple
ExecStrat=/home/<username>/.local/share/bin/streamdeck -n
Restart=on-failure

[Install]
WantedBy=default.target


$ systemctl --user daemon-reload
$ systemctl --user enable streamdeck
$ systemctl --user start streamdeck
```


### StreamDeck を使わずに代替する

- [Stream-Pi](https://stream-pi.com/)

## Node.js

- [@elgato-stream-deck](https://github.com/Julusian/node-elgato-stream-deck)
