# Powerline

## 参考

- [Powerline](https://github.com/powerline)
- [Git](https://github.com/powerline/powerline)
- [Docs](https://powerline.readthedocs.org/en/latest/index.html)

## 環境

- Python(2.6+ | 3.2+ | PyPy)
- pip with setuptools
- Fonts
  - Fontconfig(フォントカスタマイズ時)

## インストール

- Vimでインストール（Pythonのpipでもインストールできるが結局Gitからダウンロードする？）

```
# ~/.vimrc

# NeoBundle 'alpaca-tc/alpaca_powertabline'
NeoBundle 'powerline/powerline'
NeoBundle 'powerline/fontpatcher'
```

- フォント
  1. すでにパッチがあたったのを使う
  1. 自分でパッチを当てる

- すでにパッチがあたったのを使う場合

```
# これらをコピーして使えるようにする
NeoBundle 'powerline/fonts'
```

- 自分でパッチを当てる場合
  - http://blog.pg1x.com/entry/2014/08/10/025902-mac-iterm2-and-powerline
  - fontforge

```
# 時間がかかる
brew install fontforge --with-python

# パッチを当てるフォントをコピー
# cp ~/Ricty*.ttf /System/Library/Fonts/

fontforge /System/Library/Fonts/Ricty*.ttf -lang=py -script ~/.vim/bundle/powerline-fontpatcher/scripts/powerline-fontpatcher

mv *Powerline.ttf /System/Library/Fonts/
sudo fc-cache -vf
```
