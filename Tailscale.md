# Tailscale

AI時代に最適な、セキュアな接続プラットフォーム
(The best secure connectivity platform for the AI era)

面倒な設定（ルータの設定やポート開放など）をせずに、デバイス同士を安全に接続できるVPNサービス

## 特徴

- ポート開放不要
- メッシュ型ネットワーク
- WireGuard を使用した通信の暗号化
- デバイス100台まで無料

## Links

- [本家](https://tailscale.com/)

## 手順

- アカウントの作成

- デバイスにアプリをインストール

  ```bash
  # Linux
  curl -fsSL https://tailscale.com/install.sh | sh
  sudo tailsacle up

  # 認証をかけるためのURLが表示されるのでそれを使ってデバイスを登録
  ```

- サブネットを利用できるようにする

  WebコンソールからRaspiデバイスを選択して、右の「...」ボタンから「Set up subnet router」を選択

  - デバイスからサブネットルートの使用の宣言をする

    ```bash
    sudo tailscale set --advertise-routes=192.168.10.0/24
    sudo tailscale up
    ```

  - ウェブ上で宣言を許可する

- ウォッチドッグタイマ-

  ```bash
  # 動作確認
  dmesg | grep watchdog
  # /boot/firmware/config.txt
  # dtparam=watchdog=on を追記

  sudo vi /etc/systemd/system.conf

  # RuntimeWatchdogSec=10
  #RebootWatchdogSec=2min

  sydi systemctl daemon-reexec
  ```
