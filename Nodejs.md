# Node.js

## nvm

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

## nodist

Windows 専用の node.js バージョン管理ツール
nvmwよりいいらしいのでこちらを使う。

- [nodist](https://github.com/marcelklehr/nodist)

インストール

```
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
```

操作

```
nodist selfupdate

# インストール可能なバージョンのリスト
nodist dist

# インストール
nodist + v0.12.0

# 削除
nodist - v0.8.0

# globalにする
nodist v0.12.0
```


### nvmw(Node Version Manager for Windows)

※duplicated!

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
