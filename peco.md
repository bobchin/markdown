# peco

インクリメンタルツール
標準入力から受けた行データリストをインクリメンタルサーチして、
選択した行を標準出力に返すツール。

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

### 使い方

- インクリメンタルサーチ
  - スペース区切りで文字入力することで結果をフィルタリングできる
- 複数行選択[C-<Space>]
- 絞込方法の変更(CaseSensitive, IgnoreCase, SmartCase, Regex)[C-r]
- コマンドライン引数

```
# レイアウトの変更
peco --layout=bottom-up

# フィルタの事前指定
peco --query=xxx

# 設定ファイル指定(JSON)
peco --rcfile=xxx

# 初期選択位置をインデックスで指定
peco --initial-index=0

# 絞込方法の指定
peco --initial-filter=IgnoreCase|CaseSensitive|SmartCase|Regex

# プロンプト文字の変更
peco --prompt=....=>

# 文字入力位置の指定
peco --layout=top-down|bottom-up

# 結果が1コしかないときに選択せずそのまま表示する
peco --select-1
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


### 使い方

```
# リモートリポジトリをクローンする
ghq get https://github.com/bobchin/dotfiles
ghq get bobchin/dotfiles
# リモートリポジトリをアップデート
ghq get -u https://github.com/bobchin/dotfiles

# ローカルにクローンしたリポジトリのリストを表示
ghq list [query]
# フルパス表示
ghq list -p

# 指定したリポジトリのフォルダに移動
ghq look dotfiles

# 標準入力に指定されたリモートリポジトリをクローンする(ghq getを複数実行する？)
ghq import < FILE

# リポジトリのルート(ghq.root)を表示する
ghq root
```
