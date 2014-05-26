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

## nvmw(Node Version Manager for Windows)

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
