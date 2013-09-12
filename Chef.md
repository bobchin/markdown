# Chef & Vagrant

- [入門Chef Solo](http://tatsu-zine.com/books/chef-solo)
- [Vagrant and Chef on Windows](http://qiita.com/ogomr/items/98a33f47f6ba050adac4)

## Windows

- vagrant インストール  
gem からインストールすると 1.0.x という古いバージョンになるので、
サイトからWin版をインストールする。[Vagrant](http://www.vagrantup.com/)

-- PATH を追加

```
PATH=%vagrant%\bin;...
```

- 仮想サーバイメージ（BOX）のインストール[](http://www.vagrantbox.es/)  
今回はCentOS 6.4 x64 をインストール

```
vagrant box add base http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box
```

- 設定ファイル作成 & 編集

```
cd %HOME%\vagrant
vagrant init
```

``` Vagrantfile
# 追加
config.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box"
config.vm.network :private_network, ip: "192.168.50.12"
```

- プラグイン（sahara）

```
vagrant plugin install sahara
```

- ssh (cygwinが使えれば)

```
vagrant ssh-config >> ~/.ssh/config
vagrant ssh
```


## 使い方

```
cd %HOME%\vagrant
```

- イメージの起動＆停止

```
vagrant up
vagrant halt
```

- 状態確認

```
vagrant status
```

- ssh(プライベートキー関連のファイルがどこにあるかみたいとき)

```
vagrant ssh
```

- ロールバック（スナップショット）

```
# スナップショット作成
vagrant sandbox on

# スナップショット作成時にする
vagrant sandbox rollback

# スナップショット確定？
vagrant sandbox commit

# スナップショット削除
vagrant sandbox off
```


