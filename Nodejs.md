# 目次

- [目次](#目次)
- [Node.js](#nodejs)
	- [バージョンについて](#バージョンについて)
	- [volta(Windows \& Mac)](#voltawindows--mac)
	- [nodebrew(Mac)](#nodebrewmac)
	- [fnm(Windows \& Mac)](#fnmwindows--mac)
	- [nodist(Windows)](#nodistwindows)
		- [nvmw(Node Version Manager for Windows)](#nvmwnode-version-manager-for-windows)
	- [nvm](#nvm)
	- [for twitterbootstrap](#for-twitterbootstrap)
- [使い方](#使い方)
	- [モジュール](#モジュール)
	- [exports](#exports)
	- [npm (Node Packaged Modules)](#npm-node-packaged-modules)
- [デバッグ](#デバッグ)
	- [VSCode](#vscode)
- [おすすめモジュール](#おすすめモジュール)

# Node.js

## バージョンについて

- 0.12.x系と6.x系
  - 一時期Node.jsが0.xの時代に開発が停滞し、io.jsというフォークが発生しバージョン1から3までできた。
    その後統合されて4.0を名乗るようになった。
		そのため **0.12.x系は過去のバージョン** という位置づけ。
  - 現在は10.xというのが最新のものになる。
  - バージョン体系は奇数が開発版、偶数が安定版
	- 8.x : Maintenance
	- 9.x : No LTS
	- 10.x: Active

## volta(Windows & Mac)

- [Volta](https://volta.sh/)

- インストール

	```cmd
	# Windows
	winget Volta.Volta
	```

- 操作

		```bash
		# node
		volta install node@18

		# パッケージにバージョンを固定する
		# package.json に設定が保存される
		# "volta": {
		#	  "node": "18.x.x",
		#	  "npm": "x.x.x",
		# }
		volta pin node@18
		```


## nodebrew(Mac)

- [nodebrew](https://github.com/hokaccha/nodebrew)

- インストール

```bash
# homebrew
brew install nodebrew
/usr/local/opt/nodebrew/bin/nodebrew setup_dirs

# インストール
curl -L git.io/nodebrew | perl - setup
or
wget git.io/nodebrew
perl nodebrew setup
```

- PATH

```bash
# PATH
export NODEBREW_ROOT=$HOME/.nodebrew
export PATH=$NODEBREW_ROOT/current/bin:$PATH
```

- 操作

```bash
# インストール確認
nodebrew help

# インストール可能バージョン確認
nodebrew ls-remote

# node インストール
nodebrew install-binary v8.9.1
nodebrew install-binary latest

# インストール済みのバージョン確認
nodebrew ls

# 使用バージョンの変更
nodebrew use v8.9.1

# 削除
nodebrew uninstall v8.9.1
```


## fnm(Windows & Mac)

- [サイト](https://github.com/Schniz/fnm)
- 参考
  - [Node.jsのバージョン管理ツールを改めて選定する【2021年】](https://qiita.com/heppokofrontend/items/5c4cc738c5239f4afe02)
  - [Node.jsのバージョン管理ツールとは](https://qiita.com/heppokofrontend/items/1746c73a34d59b124013)
	- [fnm（Fast Node Manager）の導入方法](https://zenn.dev/kazuma_r5/articles/cd5eaf3d8b5b9f)
- nodistのアンインストール
  - 現在のバージョン
    - 14.17.3
    - 11.13.0
  - 環境変数の削除
    - NODIST_PREFIX
    - NODIST_X64
    - NODE_PATH
  - %HOMEPATH%/.npmrc からnodistの記述を削除
  - %PROGRAMFILES%と%PROGRAMFILES(X86)%からnodistインストール先フォルダの削除
  - %APPDATA%からnpm-cacheフォルダを削除

- fnm コマンド

	```cmd
	# 環境変数表示
	fnm env
	fnm env --use-on-cd

	# プロジェクトでnodeのバージョンを指定する
	# プロジェクトフォルダに ".node-version" or ".nvmrc" を作成する
	node -v
	v14.18.1
	node -v > .node-version

	fnm list-remote		# 使用できるnodeバージョン
	fnm list					# インストールされているバージョン
	fnm install				# インストール
	fnm uninstall
	fnm use						# 使用するバージョン
	```

- fnmインストール
  - [Node.jsバージョン管理ツール「fnm」のインストール方法と使い方](https://qiita.com/heppokofrontend/items/fe1c3bc41a0ae943c2ca?0)

	- Windows

		- Release Binary

			```cmd
			REM https://github.com/Schniz/fnm/releases から fnm-windows.zip をダウンロード
			REM PATH の通ったところに解凍する
			```

    - Chocolateyインストール
      - [Chocolatey](https://chocolatey.org/)
      - [Markdown Chocolatey](./chocolatey.md)

  			```cmd
  			# インストール
  			choco install fnm -y

  			# 有効化(%HOMEPATH%/Documents/(Windows)PowerShell/Microsoft.PowerShell_profile.ps1 に追記)
  			fnm env --use-on-cd | Out-String | Invoke-Expression

  			# Nodeインストール
  			fnm install 14
  			fnm use 14.18.1
  			```

	- コマンドプロンプト対応

			```cmd
			reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Command Processor" /v AutoRun /t "REG_SZ" /d "call c:%HOMEPATH%\.cmdrc.cmd" /f

			# c:%HOMEPATH%\.cmdrc.cmd
			@ECHO OFF
			IF "%FNM_SETUP%"=="True" (
					EXIT /b
			)
			SET FNM_SETUP=True
			FOR /f "tokens=*" %%z IN ('fnm env --use-on-cd') DO CALL %%z
			```

## nodist(Windows)

__※duplicated!__

Windows 専用の node.js バージョン管理ツール
nvmwよりいいらしいのでこちらを使う。

- [nodist](https://github.com/marcelklehr/nodist)

インストール

```
# PATH等が設定されるのでインストーラからいれるのが一番いいらしい

# gitより
git clone git://github.com/marcelklehr/nodist.git "D:\data\nodist"
```

PATH追加

```
NODIST_PREFIX=D:\data\nodist
PATH=%NODIST_PREFIX%\bin;%PATH%

# node の REPL でモジュールをグローバルで見えるようにする場合追加
NODE_PATH=%NODIST_PREFIX%\bin\node_modules;%NODE_PATH%

# node の 64bit バージョンを使用する場合
NODIST_X64=1

# プロキシ
HTTP_PROXY=http://myproxy.com:8213
```

操作

```
# インストール可能なバージョンのリスト
nodist dist

# インストール
nodist + v0.12.0
nodist add v0.12.0

# 削除
nodist - v0.8.0
nodist rm v0.8.0

# globalにする
nodist v0.12.0

# npm のバージョンを合わせる
# https://nodejs.org/ja/download/releases/ らへんでnodeとnpmの対応バージョンを確認する
nodist npm match

# npm のグローバルモジュールの表示
# グローバルモジュールは %NODE_PATH% に入る
npm ls -g --depth 0
```

### nvmw(Node Version Manager for Windows)

__※duplicated!__

- https://github.com/hakobera/nvmw

- 必要なもの
-- python 2.7+
-- git


環境変数

```
HOME=D:\data\home
NVMW_HOME=%HOME%\.nvmw\
PATH=%NVMW_HOME%\%PATH%

以下は必須ではないけど。。。
NVMW_CURRENT=v0.10.8
NODE_HOME=%NVMW_HOME%%NVMW_CURRENT%
```

インストール

```
git clone git://github.com/hakobera/nvmw.git "D:\data\home\.nvmw"
```

## nvm

__※duplicated!__

インストール

```
cd
git clone git://github.com/creationix/nvm.git
```

> ~/.zshrc.local

以下を追記
```
export NODE_PATH=${NVM_PATH}_modules
. ~/nvm/nvm.sh
```

使い方

```
nvm ls-remote				# インストール可能なnode.jsのリスト
nvm install v0.9.3			# インストールする
nvm use v0.9.3				# バージョンを変更する
nvm alias default v0.9.3	# デフォルトのバージョンを設定
```

## for twitterbootstrap

```
npm install -g less jshint recess uglify-js
```



# 使い方

## モジュール

- 標準モジュールは **"require" 関数**を使用して読み込む。

```
var http = require("http");
```

- 自作したモジュールを読み込むこともできる。
  ただし素の状態では読み込み時点で実行のみしかできない。

```
// hello.js
var Name = "Bobchin";

function hello(s) {
	console.log(Name + ": Hello " + s);
}
hello();
```

```
var hello = require("./hello.js");
hello.Name // 見えない！！！
```

- 外部から変数や関数を呼び出しできるようにするには **"exports" 変数**に追加する

```
// hello.js
var Name = "Bobchin";
exports.Name = Name;

function hello(s) {
	console.log(Name + ": Hello " + s);
}
exports.hello = hello;

hello();
```

```
var hello = require("./hello.js");
hello.Name;
hello.hello();
```

- バイナリ形式(*.node)やJSONファイルも読み込める

```
var hoge = require("hoge.node");
var json = require("sample.json");
```

- ディレクトリを読み込んだ場合以下のファイルを順に探す。
  ファイル内の "main" フィールドを実行する。

++ package.json
++ index.js
++ index.node
++ 例外発生

- 探索パス（以下の順で検索する）
  カレントが "/home/bobchin" の場合に、
  hoge.js 内で、"require('foo.js')" したときの探索順

++ /home/bobchin/node_modules/foo.js
++ /home/node_modules/foo.js
++ /node_modules/foo.js
++ ENV['NODE_PATH']/foo.js
++ ~/.node_modules/foo.js
++ ~/.node_libraries/foo.js
++ 通常は /usr/local/lib/foo.js

++ 標準モジュール
++ requireを実行したモジュールと同じフォルダの"node_modules"
++ requireを実行したモジュールと同じフォルダから親フォルダに向かって"node_modules"
++ 環境変数 NODE_PATH
++ 実行ユーザの ".node_modules" フォルダ
++ 実行ユーザの ".node_libraries" フォルダ
++ nodeコンパイル時のライブラリディレクトリ

- 拡張子は省略可能

```
// hoge.js か hoge.node を探す
var hoge = require("hoge");
```

## exports

- モジュールを公開するときに使用する **exports** の実体は、**"module.exports"**
- require 関数の返り値も **"module.exports"**
- １つずつの公開が面倒な場合は、**"module.exports"** を上書きする

```
// hello.js
module.exports = {
	Name: "bobchin",
	hello: function hello(s) {
		console.log(Name + ": Hello " + s);
	}
}
```

```
var hello = require("hello.js");
console.log(hello.Name);
hello.hello("World");
```

## npm (Node Packaged Modules)

- Node.jsのパッケージマネージャ
- Node.jsをインストールすると自動的にインストールされる

```bash
node -v
npm -v
```

- 2つのモード
  - フォルダは *node_modules* フォルダにインストールされる
	- ローカルモード　：ワーキングディレクトリの下
	- グローバルモード： *npm config get prefix* で表示されるディレクトリの下
	  - nodist管理のWindowsの場合は「%NODIST%\bin\node_module」だった
	  - **npm config set prefix=$HOME/.node_modules_global な感じで変更可能**

- パッケージ操作

```bash
# インストール

# パッケージ管理する
npm init # package.jsonが作成される。このファイルで管理する。

# グローバルモードは -g を指定する。つけなければローカルモード
# --save を指定するとpackage.jsonに追記してくれる
npm install serialport [-g] --save
npm install serialport [--global] --save
npm install serialport@1.0.0  --save # バージョン指定

# リスト表示
npm list [-g]
npm list [-g] --depth 0 # 1段目だけ表示されて見やすい

# 更新
npm outdated # 更新の有無の確認
npm update serialport
```

# デバッグ

- [Debugging Guide](https://nodejs.org/ja/docs/guides/debugging-getting-started/)

## VSCode

「デバッグ」-「構成を開く」を選択すると、「.vscode\launch.json」が作成される  
もしくは左の「デバッグペイン」を開き、上部の「設定を追加」を選択する。

「構成の追加」から「Node.js: nodemonのセットアップ」を選択。




# おすすめモジュール

- [nodemon](https://nodemon.io/)  
  ソースの変更を監視して、自動的にサーバを再起動するユーティリティ
  
```javascript
// インストール（グローバルでインストールした方がいいかな？）
npm install -g nodemon

// 使い方
nodemon app.js

// ローカルにインストールした場合
//./node_module/.bin/nodemon app.js
```




- あ



