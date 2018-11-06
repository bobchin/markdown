# Dockerについて

- [Docker](https://www.docker.com/)
- [Docker ToolBox](https://docs.docker.com/toolbox/overview/)

## 環境構築

### Windows

- Docker for Windows を使う場合
  - Windows10 Pro 以上
  - Hyper-V
    - 「タスクマネージャ」の「パフォーマンス」で「仮想化」が有効になっているか？
    - BIOS(UEFI)で仮想化を有効化（Intel: Intel Virtualization Technology, AMD: SVM）

- Docker Toolbox
  - Virtual Box
  - Hyper-V を無効に
  - [Download](https://download.docker.com/win/stable/DockerToolbox.exe)
  - 「Insatall VirtualBox with NDIS5 driver」にチェック
  - 「VirtualBox」や「Git」はすでに入っているならいれなくてもいいかも
  - 「Docker Quickstart Terminal」を実行すると、VirualBox上に環境を作成するので少し時間がかかる

## 用語

- Dockerイメージ: コンテナを作成するための設計図みたいなもの
- Dockerコンテナ: Dockerイメージを基に作成される実態。実行された状態。
- Docker Hub: Dockerイメージを作成するためのベースとなるイメージがたくさんある？

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




