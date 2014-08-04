# Vagrant

## 参考

- http://www.symmetric.co.jp/blog/archives/533
- http://lab.raqda.com/vagrant/getting-started
- http://te2u.hatenablog.jp/entry/2014/05/11/181841

## 必要なもの

- VirtualBox(https://www.virtualbox.org/)
- Vagrant(http://www.vagrantup.com/)

## インストール

とりあえずいれる。問題ない。

## 用語

- Vagrantfile: 設定ファイル
- BOX: 最低限vagrantが動作する環境のはいったOSのイメージファイル
-- http://www.vagrantbox.es/ 辺りで探す


## とりあえず

```
# バージョン確認
vagrant -v

# ヘルプ
vagrant -h

# プロジェクトの作成
mkdir vagrant_getting_started
cd vagrant_getting_started
vagrant init
=> "Vagrantfile" ができる
```










