# chocolatey

Windows 用のパッケージマネージャ
HomeBrewみたいなものらしい

# サイト
- [ホームページ](https://chocolatey.org/)

# インストール

```
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

デフォルトでは "C:\ProgramData\Chocolatey" にインストールされる。
変更したい場合はインストールする前に環境変数 "ChocolateyInstall" にパスを設定しておく。

削除したい場合は、上記フォルダを削除するだけでいい。

# 使い方

```
choco /?			# ヘルプ
choco list -lo		# ローカルにインストールされているパッケージのリスト
choco list			# インストール可能なパッケージのリスト
choco search <pkg>
choco install <pke>
choco update <pkg>
choco update all
choco uninstall <pkg>
choco version
```

# packages.config

```
choco install pacakges.config
```

```
<?xml version="1.0"?>
<packages>
    <package id="GoogleChrome" />
    <package id="Firefox" />
    <package id="Opera" />
    <package id="git" />
    <package id="dropbox" />
    <package id="nodejs.install" />
    <package id="ruby" />
    <package id="winmerge" />
    <package id="Desktops" />
    <package id="7zip.install" />
    <package id="Atom" />
    <package id="ganttproject" />
    <package id="Gow" />
    <package id="putty" />
    <package id="skitch" />
    <package id="redis-64" />
    <package id="redis-desktop-manager" />
    <package id="vagrant" />
    <package id="virtualbox" />
    <package id="mysql.workbench" />
    <package id="console2" />
    <package id="TcpView" />
</packages>
```



