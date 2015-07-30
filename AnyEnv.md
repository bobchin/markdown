# anyenv

**xxenv** という各言語ごとのバージョン管理ツールをラップする。

## 参考

- [Gihub: riywo/anyenv](https://github.com/riywo/anyenv)

## インストール

```
git clone https://github.com/riywo/anyenv ~/.anyenv

# .zshrc.local
export PATH="$HOME/.anyenv/bin:$PATH"
eval "$(anyenv init -)"
```

## 使用方法

- 各xxenvのインストール

```
anyenv install rbenv
anyenv install ndenv
anyenv install phpenv

# ~/.anyenv/envs 以下にインストールされる
```

- 以降はそれぞれのxxenvを使用する
