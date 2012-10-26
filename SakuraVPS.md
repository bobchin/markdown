# さくらのVPS設定

## コントロールパネル

- [https://secure.sakura.ad.jp/vpscontrol/](https://secure.sakura.ad.jp/vpscontrol/ "コントロールパネル")
- IP: xxx.xxx.xxx.xxx
- コントロールパネルのパスワード変更
- 仮想サーバ情報－仮想サーバ操作で「起動」
- [OSセットアップ情報](http://support.sakura.ad.jp/manual/vps/ossetup.html)  

## リモートアクセス
- ssh でOK

## 初期設定関係
### rootパスワード変更
```
[root@www1234xx ~] passwd
```

### ユーザ作成
```
[root@www1234xx ~] useradd bobchin
```

### sudo
```
[root@www1234xx ~] visudo
```

> /etc/sudoers  

```
# 2012.10.16  
bobchin        ALL=(ALL)       NOPASSWD: ALL
```

### sshd
> /etc/sshd/sshd_config

```
Port 2222  
PermitRootLogin no  
PasswordAuthentication no
```

### iptables
> /etc/init.d/iptables save  
=> /etc/sysconfig/iptables ができる

```
/etc/sysconfig/iptables  
*filter  
:INPUT ACCEPT [30:2344]  
:FORWARD ACCEPT [0:0]  
:OUTPUT ACCEPT [24:2576]  
:RH-Firewall-1-INPUT - [0:0]  
-A INPUT -j RH-Firewall-1-INPUT  
-A FORWARD -j RH-Firewall-1-INPUT  
-A RH-Firewall-1-INPUT -i lo -j ACCEPT  
-A RH-Firewall-1-INPUT -p icmp --icmp-type any -j ACCEPT  
-A RH-Firewall-1-INPUT -p 50 -j ACCEPT  
-A RH-Firewall-1-INPUT -p 51 -j ACCEPT  
-A RH-Firewall-1-INPUT -p udp --dport 5353 -d 224.0.0.251 -j ACCEPT  
-A RH-Firewall-1-INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT  
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 2222 -j ACCEPT  
-A RH-Firewall-1-INPUT -j REJECT --reject-with icmp-host-prohibited  
COMMIT  
```

## DNS
> crontab -e  

```
15 */6 * * * wget -O - 'http://free.ddo.jp/dnsupdate.php?dn=bobchin&pw=xxxxxx' > /dev/null  
```

## zsh
```
sudo yum install zsh  
chsh  
/bin/zsh  
cd  
git clone https://github.com/bobchin/dotfiles.git dotfiles  
ln -s dotfiles/.zshrc ./  
ln -s dotfiles/git-completion.bash ./  
```


## checkinstall
参照  
- [http://d.hatena.ne.jp/pcmaster/20120916/p1]()  
- [http://d.hatena.ne.jp/hi_c_mayu/20100916/1284584095]()  

```
cd  
git clone http://checkinstall.izto.org/checkinstall.git checkinstall  
cd checkinstall  
vi installwatch/Makefile (64bit版はlibではなくlib64になる対応)  
LIBDIR=$(PREFIX)/lib64  
vi checkinstallrc-dist (設定ファイルを編集しておく)  
make  
sudo make install

sudo mkdir -p /root/rpmbulid/SOURCES  
sudo /usr/local/sbin/checkintall --review-spec  
 %config(noreplace) "//usr/local/lib/checkinstall/checkinstallrc"  に編集  
```


## vim
参照  
- [http://qiita.com/items/604ebffb5cd4bcf4dccc](http://qiita.com/items/604ebffb5cd4bcf4dccc)  
- [http://d.hatena.ne.jp/janus_wel/20110104/1294107609](http://d.hatena.ne.jp/janus_wel/20110104/1294107609)  

```
sudo yum install ncurses-devel (必要)  
mkdir -p ~/vim  
cd vim  
wget ftp://ftp.vim.org/pub/vim/unix/vim-7.3.tar.bz2  
tar xvfj vim-7.3.tar.bz2  
mkdir patches  
curl -O "ftp://ftp.vim.org/pub/vim/patches/7.3/7.3.[001-691]"  
cd ../vim73  
for i in `ls ../patches/7.3/*`; do patch -p0 < $i; done  
cd src  
./configure  
 --disable-selinux  
 --enable-multibyte  
 --disable-gui  
 --with-features=huge  
make ARCH=x86_64  
sudo /usr/local/sbin/checkinstall  
```

設定  
```
cd  
ln -s dotfiles/.vimrc ./  
mkdir -p ~/.vim/bundle  
cp -r dotfiles/.vim/* ~/.vim  
git clone https://github.com/Shougo/neobundle.vim neobundle.vim  
vi にて :NeoBundleInstall  
```

## PHP
```
sudo yum install php php-gd php-mbstring php-pdo php-pear  
vi /etc/sysconfig/iptables  
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT  
```

- xdebug   
```
sudo yum install php-devel  
sudo pecl install xdebug  
sudo echo 'extension=xdebug.so' > /etc/php.d/xdebug.ini  
```

## yum

### repoforge
- http://repoforge.org/use/

```
sudo rpm -ivh http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.2-2.el6.rf.x86_64.rpm
```

### remi
```
sudo rpm --import http://rpms.famillecollet.com/RPM-GPG-KEY-remi
sudo rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
```

### epel
※さくらVPSではすでに入っている  
- http://support.sakura.ad.jp/manual/vps/ossetup.html

```
sudo rpm --import http://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-6
sudo rpm -ivh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-7.noarch.rpm
```

### 設定
> /etc/yum.repos.d/rpmforge.repo  
> /etc/yum.repos.d/remi.repo
> /etc/yum.repos.d/epel.repo

```
enabled=0
```

> /etc/yum.repos.d/CetOS-Base.repo  

```
[base]
...
priority=1

[updates]
...
priority=1

[extras]
...
priority=1
```







