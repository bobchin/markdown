# ubuntu

## マニュアル

- [Help](https://help.ubuntu.com)

## パッケージ管理

- アップデート

```
sudo apt-get update
sudo apt-get upgrade
or
sudo aptitude
```

- 検索

```
apt-cache search <package>
```

- 設定

```
/etc/apt/sources.list.d/ 以下
```


## ネットワーク

```
/etc/network/interface

# [DHCP]
auto eth0
iface eth0 inet dhcp

# [Static IP]
auto eth0
iface eth0 inet static
address 10.0.0.100
netmask 255.255.255.0
gateway 10.0.0.1

# 再起動
sudo ifdown eth0 && sudo ifup eth0
```



## インストールパッケージ

- zsh
- git
- ctags

```
sudo apt-get install zsh
chsh
sudo apt-get install git
sudo apt-get install exuberant-ctags
```
