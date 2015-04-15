# CentOS

## yum

- rpmforge

  - [Wiki](http://wiki.centos.org/AdditionalResources/Repositories/RPMForge)

```
rpm --import http://apt.sw.be/RPM-GPG-KEY.dag.txt
rpm -ivh http://packages.sw.be/rpmforge-release/rpmforge-release-0.5.2-2.el6.rf.x86_64.rpm
```

- epel

  - [Wiki](http://fedoraproject.org/wiki/EPEL/ja) ※リンクが古いので注意
  - [](http://fedoraproject.org/wiki/EPEL)
  - [Download](http://ftp.jaist.ac.jp/pub/Linux/Fedora/epel/6/i386/repoview/epel-release.html)

```
rpm --import http://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-6
rpm -ivh http://ftp.riken.jp/Linux/fedora/epel/6/i386/epel-release-6-8.noarch.rpm
```

- remi

- http://rpms.famillecollet.com/

```
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
```

## firewalld

```
#有効/無効化
systemctl enable firewalld
systemctl disable firewalld

#ゾーンの確認
firewall-cmd --list-all

firewall-cmd --get-services   #定義済みサービスの一覧
firewall-cmd --list-service   #publicゾーンのサービス一覧
firewall-cmd --add-service=http --permanent #publicゾーンにhttpサービスを追加
firewall-cmd --remove-service=http #publicゾーンにhttpサービスを追加
```
