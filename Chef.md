# Chef & Vagrant

- [入門Chef Solo](http://tatsu-zine.com/books/chef-solo)
- [Vagrant and Chef on Windows](http://qiita.com/ogomr/items/98a33f47f6ba050adac4)

## Windows

- Ruby インストール[](http://rubyinstaller.org/)

- Chef Solo インストール

```
gem install chef
```

- vagrant インストール  
gem からインストールすると 1.0.x という古いバージョンになるので、
サイトからWin版をインストールする。[Vagrant](http://www.vagrantup.com/)

-- vagrant にはRubyが同梱されているので、上記Rubyを参照しないように  
PATHの順序を変える。vagrant が Rubyより先になるようにする。

```
PATH=%vagrant%\bin;%RUBY%\bin
```

- 仮想サーバイメージ（BOX）のインストール[](http://www.vagrantbox.es/)  
今回はCentOS 6.4 x64 をインストール

```
vagrant box add base https://dl.dropbox.com/u/5721940/vagrant-boxes/vagrant-centos-6.4-x86_64-vmware_fusion.box
```

- 設定ファイル作成 & 編集

```
cd %HOME%\vagrant
vagrant init
```

``` Vagrantfile
# 追加
config.vm.box_url = "https://dl.dropbox.com/u/5721940/vagrant-boxes/vagrant-centos-6.4-x86_64-vmware_fusion.box"
config.vm.network :private_network, ip: "192.168.50.12"
```

- プラグイン（sahara）

```
vagrant plugin install sahara
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


