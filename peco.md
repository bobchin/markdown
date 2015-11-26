# peco

インクリメンタルツール
percolというpython製のツールを、GO言語に焼き直したもの


## Goのインストール

Google作成の新しい言語

- [Go言語](http://golang.jp)
  - [ダウンロード](https://golang.org/dl)

- Windows

zip版をダウンロードして、任意の場所(d:\software\go)に解凍

```
# 環境変数を追加
SET GOROOT=d:\software\go
SET PATH=%PATH%;%GOROOT%\bin
```

- OS X

pkgをダウンロードして、インストール

```
# ~/.zshrc.local
export PATH=$PATH:/usr/local/go/bin
```

## peco

インクリメンタルツール
percolというpython製のツールを、GO言語に焼き直したもの

- [peco](http://peco.github.io)
- [peco src](https://github.com/peco/peco)

```
# 環境変数
SET GOPATH=%HOME%\.go
SET PATH=%PATH%;%GOPATH%\bin
```

```
go get github.com/peco/peco/cmd/peco
```

## ghq

リモートリポジトリ管理ツール

- インストール

```
go get github.com/motemen/ghq
```

- 設定

```
# ~/.gitconfig
[ghq]
	root = D:\\data\\home\\.go\\src
  root = D:\\data\\home\\.ghq
```














 
