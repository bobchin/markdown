# zsh

## 参考

- <http://www.clear-code.com/blog/2011/9/5.html>


## antigen

> <https://github.com/zsh-users/antigen>

```
cd
git clone git://github.com/zsh-users/antigen.git
```

## zprezto

```
git clone --recursive https://github.com/sorin-ionescu/prezto.git ~/.zprezto
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

## 設定

- .zshenv と .zshrc
  シェルスクリプト実行時に読み込まれるかどうかの違い。
  .zshenv はzshを起動したときに必ず読み込まれる。起動時もシェルスクリプト実行時も読み込まれる。
  .zshrc は起動時は読み込まれるが、シェルスクリプト実行の際は読み込まれない。

- typeset: シェルパラメータの属性(attributes)や値(values)を設定したり表示したりする
  - -U: 配列などで重複を排除する。変数にユニーク属性をつけて最初に追加した値だけを有効にする  
        ex) パスで重複を防いだりする




