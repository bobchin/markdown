# mosh

- <http://mosh.mit.edu/>

## install(Server)

### CentOS

```sh
sudo yum --enablerepo=epel install mosh
```

> /etc/sysconfig/iptables

```sh
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 60000:61000 -j ACCEPT
```


## install(Client)

### Windows

- <http://n.blueblack.net/articles/2012-07-21_02_mosh_on_cygwin_windows/>

以下を修正

```
open P, '-|', $ssh, '-p', '<SSHポート番号>', '-i', '/cygdrive/c/path/to/home/.ssh/<秘密鍵ファイル名>', '-S', 'none', '-o', "ProxyCommand=$quoted_self --fake-proxy -- %h %p 2>$quoted_tmp", '-t', $userhost, '--', $server, @server

open P, '-|', $ssh, '-p', '22', '-i', '/cygdrive/c/data/home/.ssh/id_rsa', '-S', 'none', '-o', "ProxyCommand=$quoted_self --fake-proxy -- %h %p 2>$quoted_tmp", '-t', $userhost, '--', $server, @server
```

```
mosh bobchin@example.com
```

### Linux

```sh
sudo yum --enablerepo=epel install mosh
```

### Mac

```
brew install mobile-shell
```
