# Vimプラグイン

## NeoBundle

プラグイン管理ツール。
何はなくてもまず (NeoBundle)[https://github.com/Shougo/neobundle.vim]
.vimrc に以下を記述する

```
if has('vim_starting')
  if &compatible
    " vi との互換性をもたない
    set nocompatible
  endif

  set rtp+=~/.vim/bundle/neobundle.vim/
endif

let vundle_readme=expand('~/.vim/bundle/neobundle.vim/README.md')
if !filereadable(vundle_readme)
  echo "Installing NeoBundle..."
  echo ""
  silent !mkdir -p ~/.vim/bundle
  silent !git clone https://github.com/Shougo/neobundle.vim ~/.vim/bundle/neobundle.vim/
endif

call neobundle#begin(expand('~/.vim/bundle/'))

" NeoBundle 自体を NeoBundle で管理する
NeoBundleFetch 'Shougo/neobundle.vim'

" ここにインストールするプラグインを記述する
" 通常はgithubのリポジトリと判断する
" ex) NeoBundle 'Shougo/neobundle.vim'
" urlの場合はそのままダウンロードされる？
" ex) NeoBundle 'https://github.com/Shougo/neobundle.vim'
" vim-scripts(http://vim-scripts.org/vim/scripts.html)から取得する場合
" ex) NeoBundle "taglist.vim"

NeoBundle 'Shougo/vimproc', {
    \ 'build' : {
    \     'cygwin' : 'make -f make_cygwin.mak',
    \     'mac'    : 'make',
    \     'linux'  : 'make',
    \     'unix'   : 'gmake',
    \     },
    \ }

call neobundle#end()
filetype plugin indent on
NeoBundleCheck
```

  - 操作
    - :NeoBundleInstall   プラグインをインストールする
    - :NeoBundleClean     記述されていないプラグインを削除する

  - vimproc
    インストール時に非同期で実行できるので速度が早くなる


## unite

検索して表示するという一連の動作を管理するプラットフォーム。

```
NeoBundleLazy 'Shougo/unite.vim', {
  \ 'depends' : 'Shougo/neomru.vim',
  \ 'commands' : [{
  \     'name' : ['unite'],
  \     'complete' : 'customlist,unite#complete_source',
  \   }],
  \ }
NeoBundleLazy 'thinca/vim-unite-history'
NeoBundleLazy 'Shougo/unite-help'
NeoBundleLazy 'tsukkee/unite-tag'
NeoBundleLazy 'osyo-manga/unite-quickfix'
NeoBundleLazy 'osyo-manga/unite-filetype'
NeoBundleLazy 'sorah/unite-ghq'
```
