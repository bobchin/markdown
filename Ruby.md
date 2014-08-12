# Ruby

参照  
- https://github.com/sstephenson/rbenv

## rbenv

Homebrew でインストール  
```
brew update
brew install rbenv
brew install ruby-build
```

github からインストール  
```
cd
git clone git://github.com/sstephenson/rbenv.git .rbenv
git clone git://github.com/sstephenson/ruby-build.git .rbenv/plugins/ruby-build
```

> ~/.zshrc
```
export PATH=$HOME/.rbenv/bin:$PATH
if [ -f rbenv ]; then
    eval "$(rbenv init -)"
fi
```

### コマンド

```
rbenv install -l: インストールできるバージョン一覧を表示
rbenv install 1.9.2-p320: 1.9.2-p320 をインストール
rbenv version: 現在実行中のrubyのバージョン
rbenv versions: インストールされているrubyバージョンの一覧
rbenv rehash: ~/.rbenv/shims にあるファイルを移動するらしい。とりあえずバイナリ系をインストールしたら実行しとく。
```

### 最新にする

最新のRubyのバージョンがでないときはruby-buildが最新になっていない可能性がある

```
cd ~/.rbenv
git pull
cd ~/.rbenv/plugins/ruby-build
git pull
```



