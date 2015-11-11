# Vim のキーマッピングメモ

## インストール

- Gitからでインストールできる

```
cd ~
git clone https://github.com/vim/vim.git vim_git
cd vim_git

# アップデートする場合
git pull

cd src
make distclean
make
sudo make install
```

- コンパイルオプション

```
cd ~
cd vim_git/src
./configure \
  --with-features=huge \
  --enable-multibyte \
  --enable-luainterp=yes \
  --enable-perlinterp=yes \
  --enable-pythoninterp=yes \
  --enable-rubyinterp=yes \
  --enable-fail-if-missing
make
make install
```

## 内容確認

- オプション

```
set             " 既定値ではないオプションの内容一覧
set all         " 全オプションの内容一覧
set <option>?   "
```

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

- マップ一覧
  - :map    = ノーマル・ビジュアル・オペレータ待機
  - :vmap   = ビジュアル
  - :nmap   = ノーマル
  - :omap   = オペレータ待機
  - :map!   = 挿入・コマンドライン
  - :imap   = 挿入
  - :cmap   = コマンドライン

- 再マップ

**no** が付かないmapの場合、マッピングしたキーは再帰的に展開される
もうそれ以上内容を展開したくない場合はnoremap系を使う

- 特殊文字
- <Bar>   = "|"
- <Space> = " "

:map コマンドの後ろには他のコマンドを続けてかくことができる。
その場合に "|" 文字で区切る

- キーワード
  - \<script\>  = スクリプトローカルなマップ
  - \<buffer\>  = バッファローカルなマップ
  - \<unique\>  = 2重定義時にコマンドが失敗する。上書き定義を避ける。
  - \<Nop\>     = 何もしない
  - \<SID\>     = 実行時に"<SID>"の部分がスクリプトIDに変わる
  - \<Plug\>    = キーボードからは入力できない。外部から影響を受けずにスクリプト内部で使用するのに使う


## 自動コマンド

  ```
  " [group]: 省略可
  " {events}： 実行するタイミング=イベント
  " {file_pattern}： 対象とするファイル名。ワイルドカード指定可
  " [nested]： 省略可
  " {command}：実行するコマンド
  :autocmd [group] {events} {file_pattern} [nested] {command}

  " 削除 {command}は指定しない
  :autocmd {events} {file_pattern}
  ```

    - イベント
      - |autocmd-events| を参照


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


## スクリプト書法

- 変数
  - s:xxx   = スクリプトローカル変数：スクリプトファイル内のみ有効
  - b:xxx   = バッファローカル変数
  - w:xxx   = ウィンドウローカル変数
  - g:xxx   = グローバル変数
  - v:xxx   = vimが定義する変数

定義は **let** を使う

- 文字列

"" もしくは '' で囲む。
**""** 内は特殊文字（\+x）が展開される

- 式

  - 実行
    - execute   : コロンで指定できるコマンドのみ実行可能
    - eval      : 実行結果を取得したい

```
" コマンドは文字列で指定する
execute "tag " . tag_name

let optname
let optval = eval('&' . optname)
```

以下が使用できる

  - 数値
  - 文字列
  - 変数
    - $xxx  ：環境変数
    - &xxx  ：オプション
    - @x    ：レジスタ

  - 数値計算
    - a + b
    - a - b
    - a * b
    - a / b
    - a % b

  - 条件式
    - if

```
if {condition}
  {statement}
elseif {condition}
  {statement}
else
{statement}
endif
```

  - 論理演算
    - a == b
    - a != b
    - a > b
    - a >= b
    - a < b
    - a <= b
    - a =~ b  : パターンマッチ。文字列aがパターンbにマッチするか？ **(文字列のみ)**
    - a !~ b  : パターンマッチしないか。

  - 繰り返し
    - while
    - for
    - continue
    - break

```
while counter < 40
  call do_something()
  if skip_flag
    continue
  endif
  if finished_flag
    break
  endif
  sleep 50m
endwhile

for {varname} in {list}
  {command}
endfor

for a in range(8, 4, -2)
  echo a
endfor
" 8
" 6
" 4
```

  - 関数
    - rangeキーワード
      - a:firstline : 暗黙の変数
      - a:lastline  : 暗黙の変数
    - 可変長引数
      - a:0         : オプション引数の数
      - a:1~a:20    : オプション引数

```
" 関数名は大文字
" function! は関数の再定義
function {name}({var1}, {var2}, ...) [range]
  {body}
endfunction

function Min(num1, num2)
  if a:num1 < a:num2
    let smaller = a:num1
  else
    let smaller = a:num2
  endif
  return smaller
endfunction
```

  - リストと辞書

```
" リスト
let alist = ['foo', 'bar', 'baz']
for n in alist
  echo n
endfor
" foo
" bar
" baz

" 辞書
let uk2nl = {'one': 'een', 'two': 'twee', 'three': 'drie'}
echo uk2nl['two']
echo uk2nl.two
" twee
" twee
for key in keys(uk2nl)
  echo key
endfor
" three
" one
" two
```

## 設定

set autoindent      : 改行したときにインデントを前の行に合わせる
set smartindent     : 少し賢く自動インデントする
set shiftwidth=4    : インデントに使用する空白文字の数
set tabstop=4       : tab文字を表示するときに使用する空白文字の数
set softtabstop=0   : 編集でtab文字の幅として使用する空白文字の数（0で無効にする）
set expandtab       : 挿入モード時にtab文字を使用しないで空白文字を使用する


## 日本語固定入力モード

- (Vim/GVimで「日本語入力固定モード」を使用する)[https://sites.google.com/site/fudist/Home/vim-nihongo-ban/vim-japanese/ime-control]

### Windowsの環境

(AutoHotKey)[http://ahkscript.org]を使う。
PuTTY+Vimの場合にウィンドウとVimのモードを取得する必要がある。
Vimの設定でウィンドウタイトルを使用する。

- 参考
  - (AutoHotKey Wiki)[http://ahkwiki.net/Top]
  - (AutoHotkeyJp)[https://sites.google.com/site/autohotkeyjp/]

- vimの設定

```
# ウィンドウタイトルを変更する。通常時は"vim - normal"。挿入モード時は"vim - insert"
set title titlestring=vim\ -\ normal
augroup EnterInsertMode
    autocmd!
    autocmd InsertEnter * set title titlestring=vim\ -\ insert
    autocmd InsertLeave * set title titlestring=vim\ -\ normal
augroup END
```

- AutoHotKeyの設定
  - (IME制御用 関数群)[http://www6.atwiki.jp/eamat/pages/17.html]が必要

```
; vim.ahk
;

GroupAdd Terminal, ahk_class PuTTY
;GroupAdd Terminal, ahk_class mintty

; IME.ahk は　"C:\Users\%USERPROFILE%\Documents\AutoHotkey\Lib"
; に入れておくとIncludeしなくてよい
;#Include %A_ScriptDir%\IME.ahk
;Return

; 日本語固定入力モードの状態（0:無効 1:固定入力モード）
JapaneseFixMode=0

SetTitleMatchMode 2
#IfWInActive vim - insert ahk_group Terminal
^j::
  JapaneseFixMode:=!JapaneseFixMode
  Return

Esc::
  Send {Esc}
  IME_SET(0)
  Return

^[::
  Send ^[
  IME_SET(0)
  Return

#IfWInActive vim - normal ahk_group Terminal
i::
  Send i
  if (JapaneseFixMode) {
    IME_SET(1)
  }
  Return

a::
  Send a
  if (JapaneseFixMode) {
    IME_SET(1)
  }
  Return
#IfWInActive
```


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
