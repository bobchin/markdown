# Vim のキーマッピングメモ

## マニュアル

- キーバインド
  - <CTRL-]>: リンクへジャンプする
  - <CTRL-O>: もとに戻る

- 引き方

```
:help xxx       # ノーマルモードコマンドのヘルプ
:help CTRL-X    # ノーマルモードのキーのヘルプ

:help i_xxx     # 挿入モード
:help i_CTRL-X
:help v_xxx     # ビジュアルモード
:help v_CTRL-X
:help c_xxx     # コマンドラインモード
:help c_CTRL-X

:help 'option'  # オプション
:help func()    # 関数
```

## 移動

- 単語
  - w : 次の単語先頭へ
  - b : 前の単語先頭へ
  - e : 次の単語末尾へ
  - ge: 前の単語末尾へ
- 行
  - ^ : 空白以外の行頭
  - 0 : 行頭
  - $ : 行末
- カッコ
  - % : 対応するカッコ
- 指定行
  - G : 文末
  - xG: x行目
  - gg: 文頭
- スクロール
  - CTRL-U: 画面半分上へ
  - CTRL-D: 画面半分下へ
  - CTRL-E: 1行上へ
  - CTRL-y: 1行下へ
  - CTRL-B: 1画面上へ
  - CTRL-F: 1画面下へ
- カーソル行
  - zz: カーソル行を中央へ
  - zt: カーソル行を画面1行目へ
  - zb: カーソル行を画面最下行へ

## 検索

- /: 前方検索
- ?: 後方検索
- \*: 単語を指定して検索（指定した単語に\<\>が付く。ex) search => \<search\> ）
-  #: 単語を指定して検索（指定した単語に\<\>が付く。ex) search => \<search\> ）
  - \<: 単語で始まっている（単語の境界）
  - \>: 単語で終わっている（単語の境界）
- g*: 単語を指定して検索（指定した単語に単語境界をつけない）

## オペレータとモーション

操作の方法として以下がある
1. オペレータ＋モーション
1. オペレータ＋テキストオブジェクト

**オペレータ** は動作・操作。つまり何をするか？

**モーション** と **テキストオブジェクト** は動作の対象。どこを？
違いは
  - **モーション**        : カーソルの移動で表現する
  - **テキストオブジェクト** : オブジェクトで表現する


- オペレータ
  - d: 削除
  - c: 変更
  - .: 直前の変更の繰り返し
  - y: コピー
  - p: ペースト
  - >: 右にシフト
  - <: 左にシフト

- クリップボード
  - "\*: クリップボードを使用する
    - "\*yw: 単語をクリップボードへコピー
    - "\*p : クリップボードからペースト

- ショートカット
  - D: 行末まで削除

- テキストオブジェクト
  - aw: a word
  - as: a sentence
  - is: inner sentence

## キーマップ

- :map 現在のマップを確認


## ウィンドウ

- 分割
  - :split  : 上下に分割
  - :close  : ウィンドウを閉じる
  - :only   :
  - :new    :
  - :vsplit : 左右に分割
  - :vnew   : 左右に分割
- サイズ変更
  - (CTRL-W +)  : 大きくする
  - (CTRL-W -)  : 小さくする
  - (CTRL-W \_) : 最大表示
- 移動
  - (CTRL-W w)or(CTRL-W CTRL-W): ウィンドウの移動
  - (CTRL-W h)  : 左
  - (CTRL-W j)  : 下
  - (CTRL-W k)  : 上
  - (CTRL-W l)  : 右
  - (CTRL-W t)  : 一番上
  - (CTRL-W b)  : 一番下

## 編集

- qx  : x=a〜z 操作(マクロ)の記録
- @x  : x=a〜z 操作(マクロ)の実行
- @@  : 1回やった操作マクロ実行の繰り返し

- :[range]s/from/to/[flag] : 置換
  - ex) :%s/Professor/Teacher/  : ファイル全体でProfessorをTeacherに置換
  - ex) :%s/Professor/Teacher/g : 通常は行単位ではじめにみつかったものだけ置換。
                                  g(globalフラグ)でそれを解除。

- :[range]g/{pattern}/{command} : コマンド実行

- 範囲指定
  - {number}, {number} : 範囲指定   :1,5s/foo/bar/ 1から5行目まで
  - {number}           : 行指定    :54s/foo/bar/  54行目のみ
  - .                  : 現在行
  - $                  : 最終行    :.,$s/foo/bar/ 現在行から最終行まで
  - %                  : 全体

## 折りたたみ

- zf[range] : 折りたたみを定義する
- zn   : 折りたたみを無効にする
- zo   : 折りたたみを開く
  - zO : すべて開く
- zc   : 折りたたみを閉じる
  - zC : すべて閉じる
- zd   : 削除
  - zD : すべて削除
- zr   :
- zm   :

- foldmethod : 折りたたみの方式を指定
- foldcolumn : 左側に表示される折りたたみ用のカラム幅





## ノーマルモード
- <S-k>(K): PHPモードのときマニュアルを検索する
- <C-i>k: カーソル文字を英辞郎で検索
- ft: タグリスト表示
- ff: VimFiler でバッファのディレクトリを表示
- fi: VimFiler で分割表示
- fb: バッファ一覧
- fu: バッファ＆ファイル一覧
- fa: 全部
- <C-i>: ヘルプ
- <C-i><C-i>: カーソルしたのキーをヘルプ

## インサートモード
- <C-k>: スニペットの展開
- <C-y>: 補完候補を確定
- <C-c>: 補完候補をキャンセル
-


# CentOS で RPMを作成する

- http://ptan.info/archives/617#.VGqtuPmsV8F

```
sudo yum install rpm-build rpmdevtools python-devel ncurses-devel \
perl-devel libacl-devel gpm-devel ruby-devel ruby lua-devel \
gtk2-devel libSM-devel libXt-devel libXpm-devel perl-ExtUtils-Embed \
libselinux-devel desktop-file-utils

rpmdev-setuptree
cd rpmbuild/SPRM
wget http://rpmfind.net/linux/fedora/linux/development/rawhide/source/SRPMS/v/vim-7.4.xxx-1.fc22.src.rpm
useradd -s /sbin/nologin mockbuild
rpm -ivh vim-7.4.xxx-1.fc21.src.rpm
cd ../SPECS/
vim vim.spec " export CXXFLAGS=XXX の下に export LIBS="-ltermcap" を追加
rpmbuild -bb vim.spec
```
