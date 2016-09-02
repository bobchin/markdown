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

## Ver 7 から変わった点

### ポイント

- システムアーキテクチャが **init** から **systemd** に変更されている
  - [http://www.slideshare.net/enakai/linux-27872553](Linux女子部 systemd徹底入門)
- ネットワーク管理方式が変更
- セキュリティ管理方式が **iptables** から **firewalld** に変更

#### systemd

- SysVinitの初期化スクリプトをいい塩梅に項目ごとに分けて最小単位「Unit」とした
- Unit の種類（自：自動作成される　明：明示的に作成する）
  - .service  :明: サービス（有効化したサービスが起動する）
  - .target   :明: 何もしない（Unit の依存関係や順序関係を定義したり、グループ化するために使う）
  - .mount    :自 /etc/fstab: マウントポイント（有効化するとマウントされる）
  - .swap     :自 /etc/fstab: Swap領域（有効化するとSwap領域が有効になる）
  - .device   :自 udev: デバイス（udev がデバイスを認識すると有効化される）
  - .socket   :－: ソケット（systemdが特定のソケットをListenする。xinetdのようなもの。）
- 定義ファイルの場所
  - /etc/systemd/system/xxx     : 管理者がカスタマイズする（こっちが優先される）
  - /usr/lib/sustemd/system/xxx : システムデフォルト
- 「依存関係」と「順序関係」
  - 「依存関係」=> 「A Unit を有効化するなら、B Unit も有効化すべき」という関係
  - 「順序関係」=> 「A Unit を有効化する前に、B Unit を有効化すべき」という関係
- systemd起動時「**default.target**」というUnitが有効化される => ランレベル
  - 実体は「multi-user.target」「graphical.target」などへのシンボリックリンク
- 依存関係
  - [Unit]セクション  
    => 一緒に有効化するUnitを指定する  
    - [Wants=]    : 前提Unitが起動に失敗しても起動処理を継続する
    - [Requires=] : 前提Unitが起動に失敗するとこのUnit起動処理をやめる
  - 「<Unit>.wants」「<Unit>.requires」ディレクトリにシンボリックリンクを作成する
  - [Conflicts=]  : 同時に有効化してはいけないUnitを指定

  - サービスの自動起動
    - *WantedBy=* に指定したUnitの「.wants」ディレクトリにシンボリックリンクを作成したり削除したりする。

```
/usr/lib/systemd/sshd.service
----------------------------
:
[Install]
WantedBy=multi-user.target
:
----------------------------
```

```
# systemctl disable sshd.service
rm '/etc/systemd/system/multi-user.target.wants/sshd.service'

# systemctl enable sshd.service
ln -s '/usr/lib/systemd/sshd.service' '/etc/systemd/system/multi-user.target.wants/sshd.service'
```

- 依存関係ツリー
  - systemd は起動時に default.target を起動する
  - ランレベルに応じて default.target のシンボリックリンクを変更する
    - runlevel0 => poweroff.target 
    - runlevel1 => rescie.target 
    - runlevel2 => multi-user.target 
    - runlevel3 => multi-user.target 
    - runlevel4 => multi-user.target 
    - runlevel5 => graphical.target 
    - runlevel6 => reboot.target 
  - graphical.target: Requires=multi-user.target
    - multi-user.target: Requires=basic.target
      - basic.target: Requires=sysinit.target
        - sysinit.target: Wants=local-fs.target swap.target
  - 設定変更

```
# 確認
systemctl get-default

# type=target一覧
systemctl list-units --type=tareget

# 変更
systemctl set-default multi-user.target  # ランレベル３(CUI)
systemctl set-default graphical.target   # ランレベル５(GUI)
```


- 順序関係
  - [Unit]セクション
    - Before=A B C  : 自分はUnit「A」「B」「C」の**前**に起動する
    - After=A B C   : 自分はUnit「A」「B」「C」の**後**に起動する

- コマンド

```
# 指定したUnitが必要とするUnitを表示
systemctl list-dependencies <Unit>

# 現在有効なUnitとその状態の一覧表示
systemctl list-units [--type=service]

# 定義されているUnitの一覧表示(= chkconfig --list)
systemctl list-unit-files [--type=service]
enabled : 「WantedBy=」指定があり、自動起動が有効。
disabled: 「WantedBy=」指定があり、自動起動が無効。
static  : 「WantedBy=」指定がない

## static 以外のものに限定して表示
systemctl list-unit-files --type=service | grep -Ev 'static\s+$'

# サーバ起動時の自動機能有効化/無効化
systemctl enable/disable <Unit>

# Unitの起動/停止/再起動
systemctl start/stop/restart <Unit>

# Unitの実行状態表示
systemctl status <Unit>

# Unitの設定ファイルの変更をsystemdに通知する
systemctl daemon-reload

# cgroup
systemctl kill -s9 sshd.service
```

- Unit 設定ファイル
  - セクション
    - [Unit]    : 依存関係/順序関係など。タイプに依存しない設定項目
    - [Install] : systemctl enable/disable コマンドの動作の設定
    - [タイプ固有のセクション]

```
[Unit]
Description=Unitの説明
Documentation=ドキュメントのURL
Requires=|Wants=このUnitと同時に有効化が必要なUnit
Before=このUnitより後に起動するUnit
After=このUnitより先に起動するUnit

[Install]
WantedBy=   enable時にこのUnitの .wants ディレクトリにシンボリックリンクを作成する
RequiredBy= enable時にこのUnitの .requires ディレクトリにシンボリックリンクを作成する
Also=       enable/disable時に同時にenable/disableするUnit

[Service]
ExecStart=  サービス起動コマンド
ExecReload= サービスリロードコマンド
ExecStop=   サービス停止コマンド
ExecStartPre/ExecStartPost サービス起動前後の追加コマンド（サービス起動判定には関連させたくないコマンドを記載）
EnvironmentFile=環境変数を読み込むファイル
```

- ログ(journald)
  - systemdの環境で、標準的に提供されるログ管理のサービスです
  - 設定は「systemd-journald.service」
  - 「/var/run/log/journal」に保存されるが、再起動すると消える領域である。  
    「/var/log/journal」を作成すると永続的に保存する

  - ログ確認方法

```
# すべてのログを表示（lessにパイプ）
journalctl

# すべてのログを表示（lessなし）
journalctl -l --no-pager

# 特定のサービスを指定
journalctl -u xxx.service

# メタデータを含めて表示
journalctl -u xxx.service -o json-pretty

# tail -f ライク
journalctl -f
```



#### ipコマンド

- ifconfig, route, netstat, arp などの旧ネットワーク関連コマンドはデフォルトで入っていない

```
# 以下でインストールする
# yum install net-tools
```

- コマンド対比

|**net-tools**|**iproute2**|
|:---|:---|
|ifconfig   |ip a(ddr) or ip l(ink)|
|route      |ip r(route)|
|netstat    |ss|
|netstat -i |ip -s l(ink)|
|arp        |ip n(eighbor)|

#### NetworkManager

- ネットワークを動的に設定するサービス
- 設定内容（接続[connection]）とネットワークデバイス（デバイス[device]）を  
  別々に定義して、それれを紐付けする。

- [http://enakai00.hatenablog.com/entry/20140712/1405139841](RHEL7/CentOS7でipコマンドをマスター)

- NICネーミングルール
  - ens6
    - en: Ethernet | wl: wireless
    - s: PCIExpress | o: onboard
  - eno1, eno2: オンボードのNIC
  - ens1, ens2: PCIExpressのNIC

- nmcli

 - コマンド
   - connection: 接続の設定
   - device    : デバイス管理
   - general   : ホスト名、状態表示
   - networking: 有効化・無効化の管理
   - radio     : ワイヤレス設定

```
# ホスト名表示
nmcli g[eneral] hostname
# systemdを使用しているのでこっちの方がいいか？
hostnamectl

# ホスト名変更
nmcli g[eneral] hostname xxx
hostnamectl xxx

# インタフェースの起動・停止
nmcli c[onnection] down <connection>
nmcli c[onnection] up <connection>

# 接続[connection]の情報の表示（設定項目の表示）
nmcli c[onnection] show <connection>

# 接続[connection]の情報の追加・削除
nmcli c[onnection] add type eth ifname <device> con-name <connection>
nmcli c[onnection] delete <connection>

# 設定の変更
nmcli c[onnection] mod[ify] <connection> <項目> <値> ...
nmcli c mod eth0 ipv4.method manual ipv4.addresses "172.16.105.201/24 172.16.105.2"
## 項目の追加・削除
nmcli c[onnection] mod[ify] <connection> +<項目> <値> ...
nmcli c[onnection] mod[ify] <connection> -<項目> <値> ...
nmcli c mod eth0 +ipv4.dns 192.168.0.1
nmcli c mod eth0 -ipv4.dns 192.168.0.1

# デバイス一覧表示
nmcli device
# デバイス情報表示
nmcli device show <device>
```

#### firewalld

- 導入

```
# iptables とは併用できないので余計なのは停止しておく
systemctl stop iptables.service
systemctl stop ip6tables.service
systemctl stop ebtables.service
systemctl mask iptables.service
systemctl mask ip6tables.service
systemctl mask ebtables.service

# firewalld パッケージの導入
yum install firewalld
systemctrl enable firewalld.service
systemctrl start firewalld.service
```

- 内部的には iptables を使用しているが、設定の管理は firewalld サービスが担当する
- ゾーン(zone)(フィルタリングルール)を定義して、それをNICに適用する

- ゾーン
  - /usr/lib/firewalld/zones/*.xml
  - /etc/firewalld/zones/*.xml（こっちで上書きする）
  - NICポートに明示的に指定しない場合は、「デフォルトゾーン」が適用される

```
firewall-cmd --get-default-zone
firewall-cmd --set-default-zone=external

# NICポートにゾーンを追加
firewall-cmd --remove-interface=eth1                 # eth1 に適用したゾーンを削除
firewall-cmd --add-interface=eth1 --zone=trusted     # eth1 にtrustedゾーンを適用
firewall-cmd --query-interface=eth1 --zone=trusted   # eth1 にtrustedゾーンを適用されているか？
firewall-cmd --list-interfaces --zone=trusted        # trustedゾーンが適用されているNICポートを表示
firewall-cmd --change-interface=eth1 --zone=public
※ --permanent をつけると起動時の設定を変更する
```

- サービス
  - ポート番号を名前で管理する。ex) ssh => tcp 22
  - /usr/lib/firewalld/services/*
  - /etc/firewalld/services/*

```
# ゾーンにサービスを追加
firewall-cmd --list-services --zone=public
firewall-cmd --add-service=http --zone=public
firewall-cmd --query-service=http --zone=public
firewall-cmd --remove-service=http --zone=public
```

- icmp

```
# ゾーンにicmpを追加
firewall-cmd --get-icmptypes
firewall-cmd --list-icmp-blocks --zone=public
firewall-cmd --add-icmp-block=echo-request --zone=public
firewall-cmd --queryadd-icmp-block=echo-request --zone=public
firewall-cmd --remove-icmp-block=echo-request --zone=public
```

- マスカレード/DNAP(ポートフォワード)

```
# マスカレード
firewall-cmd --query-masquarade --zone=public
firewall-cmd --add-masquarade --zone=public
firewall-cmd --remove-masquarade --zone=public

# DNAP(ポートフォワード)
firewall-cmd --list-forward-ports --zone=public
firewall-cmd --query-forward-port=<変換ルール> --zone=public
firewall-cmd --add-forward-port=<変換ルール> --zone=public
firewall-cmd --remove-forward-port=<変換ルール> --zone=public

# 変換ルール
port=22:proto=tcp:toport=3753         # 22番ポート宛のパケットを3753ポート宛に変更
port=22:proto=tcp:toaddr=192.168.1.1  # 22番ポート宛のパケットを192.168.1.1に転送
ex) firewall-cmd --add-forward-port=port=22:proto=tcp:toport=3753 --zone=public
```


- コマンド

```
# 状態確認
systemctl status firewalld.service
firewalld-cmd --state

# ゾーンごとの設定
firewall-cmd --list-all-zones

# サービス一覧
firewall-cmd --get-services
firewall-cmd --get-icmptypes

# 設定の読みなおし
firewall-cmd --reload
```








