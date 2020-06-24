# Dockerについて

- [Docker](https://www.docker.com/)
- [Docker ToolBox](https://docs.docker.com/toolbox/overview/)

## 環境構築

### Windows

- 種類
  - Docker Desktop for Windows
    - Docker Engine
    - Docker CLI client
    - Docker Compose
    - Notary
    - Kubernetes
    - Credential Helper
  - Docker for Windows(Docker Toolbox): 古い？
    - Docker Engine
    - Docker Compose
    - Kubernetes
    - VirtualBox

- 要件
  - Windows10 64bit Pro/Enterprise/Education 以上
  - Hyper-Vを有効 => Docker Desktopを実行するのに必要
    - 「タスクマネージャ」の「パフォーマンス」で「仮想化」が有効になっているか？
  - Second Level Address Translation(SLAT)
  - 4GB RAM
  - BIOS(UEFI)で仮想化を有効化（Intel: Intel Virtualization Technology, AMD: SVM）

- インストール（Docker Desktop for Windows）
  - [Download](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)
  - [Stable](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe)
  - 基本的にはexeをインストールするだけ
    - Configuration
      - Enable required Windows Features: On
      - Add shortcut to desktop: On
  - メモリ不足で起動しない場合は以下あたりを調整
    - CPU
    - メモリ
    - swap
  - ca.pemどうのこうののエラーが出る。以前にDockerToolboxを使用していた場合環境変数が残るらしい。
    ```
    SET DOCKER_CERT_PATH=
    SET DOCKER_HOST=
    SET DOCKER_MACHINE_NAME=
    SET DOCKER_TLS_VERIFY=
    SET DOCKER_TOOLBOX_INSTALL_PATH=
    ```

- （古い）Docker Toolbox
  - Virtual Box
  - Hyper-V を無効に
  - [Download](https://download.docker.com/win/stable/DockerToolbox.exe)
  - 「Insatall VirtualBox with NDIS5 driver」にチェック
  - 「VirtualBox」や「Git」はすでに入っているならいれなくてもいいかも
  - 「Docker Quickstart Terminal」を実行すると、VirualBox上に環境を作成するので少し時間がかかる
  - https でない通信も有効にする設定

```sh
docker-machine ssh
# /etc/docker/daemon.json
{ "insecure-registries" : ["192.168.99.100:5000"] }
```


## 用語

- Dockerイメージ: コンテナを作成するための設計図みたいなもの
- Dockerコンテナ: Dockerイメージを基に作成される実態。実行された状態。
- Docker Hub: Dockerイメージを作成するためのベースとなるイメージがたくさんある？
- Dockerホスト: Dockerコンテナを実行するサーバ。
- DockerCompose: 単一ホストで複数コンテナを扱う場合に一括して管理できる。
- Data Volume: ホストとDockerコンテナで共有する領域。ホストのファイルシステムをマウントするイメージ。
- Data Volume コンテナ: Data Volumeではホストのファイルシステムに依存してしまうので、共有する領域をコンテナにする。
- Docker Swarm: 複数ホスト（マルチホスト）を束ねてクラスタ化する
- Docker Service: Swarm内でクラスタ内の複数のコンテナを管理する
- Docker Stack: Swarm内で複数のServiceをまとめて管理する

## docker-machineコマンド

VirtualBoxを操作するためのコマンド

- [docker-machineコマンド](https://qiita.com/maemori/items/e7318b088b9e4bf22310)

```sh
# ゲスト名を"default"とする

# ゲストを起動する
docker-machine start default

# 再起動
docker-machine restart default

# 停止
docker-machine stop default

# 状態, IP確認
docker-machine status default
docker-machine ip default

# 接続する
docket-machine ssh default

# 一覧表示
docker-machine ls

# イメージの作成と削除
docker-machine create --driver virtualbox default
docker-machine create -d virtualbox --virtualbox-disk-size 40000 default # サイズ指定
docker-machine rm default
```


## 簡単な使い方

- 簡単な使い方

```bash
# Dockerイメージのダウンロード
docker image pull [イメージ]

# イメージの一覧
docker image ls

# Dockerイメージの実行
# 起動 dockerコンテナ内のポート8080で動作しているのを、
# ポートフォワードで外部の9000でアクセスできるようにしている
docker container run -t -p 9000:8080 [イメージ:タグ]

# 停止 $(docker container ls -q) IDだけを取得している
docker stop $(docker container ls -q)
```

- Docker ToolBoxの場合の注意点

Docker ToolBox の場合Dockerは、VirtulaBox上のゲストとして動作しているLinuxで動作しているため、
接続するにはlocalhostとはならない。
接続するにはVirtulaBox上のゲストのIPを知る必要があるので、"docker-machine ls" などで
IPを確認して接続すること。


## docker image

- イメージの作成

```bash
# docker image build -t イメージ名[:タグ名] Dockerfileがあるのパス
# カレントにDockerfileがある場合
docker image build -t example/echo:latest .
# -t: イメージ・タグ名を指定する
# -f: 指示ファイルがDockerfileではないときにファイル名を指定する
# --pull=true: build時にFROMから取得するベースイメージをキャッシュを使わずに必ずダウンロードする
```


## docker container

- 使い方

```bash
# 実行
# -t: 仮想端末を割り当てる
# -i: インタラクティブモード（対話モード）。
#     他のコマンドでどこに割り当てるか決めるが、-t で仮想端末に割り当てることが多い
# -d: バックグラウンド実行
# -p: ポートフォワード(外部ポート:内部ポート)
docker container run -it -d -p 9000:8080 [イメージ:タグ]
```




