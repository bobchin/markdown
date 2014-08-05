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
- BOX: 最低限vagrantが動作する環境の入ったOSのイメージファイル
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

# コマンド
vagrant statu	# 状況確認
vagrant up		# 起動
vagrant ssh		# 接続
vagrant halt 	# 停止
```

## 独自BOXを作成する

- CentOS 6.5 x86_64 minimalで試行

```
### isoファイルを取得
http://ftp-srv2.kddilabs.jp/Linux/packages/CentOS/6.5/isos/x86_64/CentOS-6.5-x86_64-minimal.iso

### VirtualBox上で仮想マシン作成
- 名前: vg_centos65
- タイプ:Linux
- バージョン:RedHat(64bit)
- メモリ:2048MB(少ないとGUIインストールできない？)
- ハードドライブ:仮想ハードドライブを作成:VDI:可変サイズ:8GB
- ネットワーク:アダプタ1のみでNATになっていることを確認
  （vagrant sshするにはNATが必須なので注意）

### OSのインストール
iso をCDドライブに割り当ててインストール
```

## vagrant用の環境設定
```
# 起動時にネットワークを有効に
vi /etc/sysconfig/network-scripts/ifcfg-eth0

ONBOOT=yes

# yumリポジトリの登録
rpm -ivh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
rpm -ivh http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm

# ユーザ
useradd vagrant
passwd vagrant 		# パスワードを "vagrant" にする

# ssh
sudo - vagrant

mkdir ~/.ssh
chmod 700 ~/.ssh
cd ~/.ssh
curl -k -L -o authorized_keys 'https://raw.github.com/mitchellh/vagrant/master/keys/vagrant.pub'
chmod 600 ~/.ssh/authorized_keys

# sudo
visudo

# ttyなしで実行可能に
#Defaults requirety
...
# パスワード無しでsudoを実行可能に
vagrant ALL=(ALL) 	NOPASSWD:ALL

# rpm
yum update
yum groupinstall "Development Tools"
yum install man man-pages-ja

# git の入れなおし
yum remove git
yum --enablerepo=rpmforge-extras install git

# SELINUXの無効化
vi /etc/sysconfig/selinux

SELINUX=disabled

# iptablesの無効化
service iptables stop
service ip6tables stop

chkconfig iptables off
chkconfig ip6tables off

# VirtualBox Guest Additionsのインストール
mkdir /media/cdrom
mount -r /dev/cdrom /media/cdrom
# 開発ツールをインストールした後再起動しないとインストールに失敗する可能性あるので注意！
sh /media/cdrom/VBoxLinuxAdditions.run
umount /media/cdrom
/etc/init.d/vboxadd setup

# udevルールの削除
rm /etc/udev/rules.d/70-persistent-net.rules
rm -rf /dev/.udev/
rm /lib/udev/rules.d/75-persistent-net-generator.rules

# 最適化
yum clean all
dd if=/dev/zero of=/EMPTY bs=1M
rm -f /EMPTY
```

## Boxの作成

```
# 上記で作成した仮想マシン名を指定する
vagrant package --base vg_centos65
```



