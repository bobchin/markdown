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
NeoBundle 'h1mesuke/vim-alignta'
```

```
nnoremap [unite] <Nop>
nmap f [unite]
nnoremap <silent> [unite]b :<C-u>Unite buffer<CR>
nnoremap <silent> [unite]u :<C-u>Unite buffer file_mru<CR>
nnoremap <silent> [unite]l :<C-u>Unite alignta<CR>
nnoremap <silent> [unite]a :<C-u>UniteWithBufferDir -buffer-name=files buffer file_mru bookmark file <CR>
nnoremap <C-i> :<C-u>Unite -start-insert help<CR>
nnoremap <C-i><C-i> :<C-u>UniteWithCursorWord help<CR>
```


## Help

ヘルプ関連

```
NeoBundleLazy 'vim-jp/vimdoc-ja', {
 \ 'filetypes' : 'help',
 \ }
```

```
set helplang=ja
" "q" でヘルプウィンドウが閉じられるようにする
augroup CloseHelpWithQ
    autocmd!
    autocmd FileType help nnoremap <buffer>q <C-w>c
augroup END

" "K" でヘルプを開く
set keywordprg=:help

nnoremap <Space>t :<C-u>tab help<Space>
nnoremap <Space>v :<C-u>vertical belowright help<Space>
nnoremap <silent> tm :<C-u>call <SID>MoveToNewTab()<CR>
function! s:MoveToNewTab()
    tab split
    tabprevious

    if winnr('$') > 1
      close
    elseif bufnr('$') > 1
      buffer #
    endif

    tabnext
endfunction
```


## Lightline

ステータス表示

```
NeoBundle 'itchyny/lightline.vim', {
  \ 'depends' : 'tpope/vim-fugitive',
  \ }
```

```
set laststatus=2
set showmode
let g:lightline = {
  \ 'colorscheme': 'jellybeans',
  \ 'active': {
  \ 'mode_map': {'c': 'NORMAL'},
  \   'left': [ [ 'mode', 'paste' ], [ 'fugitive', 'filename' ] ]
  \ },
  \ 'component_function': {
  \   'modified': 'LightLineModified',
  \   'readonly': 'LightLineReadonly',
  \   'fugitive': 'LightLineFugitive',
  \   'filename': 'LightLineFilename',
  \   'fileformat': 'LightLineFileformat',
  \   'filetype': 'LightLineFiletype',
  \   'fileencoding': 'LightLineFileencoding',
  \   'mode': 'LightLineMode'
  \ },
  \ }

" 変更状態(変更されていれば"+"、変更できない場合は"-")
function! LightLineModified()
  return &ft =~ 'help\|vimfiler\|gundo' ? '' : &modified ? '+' : &modifiable ? '' : '-'
endfunction

" 読み込み専用(読み込み専用であれば"x")
function! LightLineReadonly()
  return &ft !~? 'help\|vimfiler\|gundo' && &readonly ? 'x' : ''
endfunction

" ファイル名(前後に読み込み専用と変更状態を挿入する)
function! LightLineFilename()
  return ('' != LightLineReadonly() ? LightLineReadonly() . ' ' : '') .
        \ (&ft == 'vimfiler' ? vimfiler#get_status_string() :
        \  &ft == 'unite' ? unite#get_status_string() :
        \  &ft == 'vimshell' ? vimshell#get_status_string() :
        \ '' != expand('%:t') ? expand('%:t') : '[No Name]') .
        \ ('' != LightLineModified() ? ' ' . LightLineModified() : '')
endfunction

" Gitリポジトリ(fugitiveがあればリポジトリのHEAD名を表示)
function! LightLineFugitive()
  try
    if &ft !~? 'vimfiler\|gundo' && exists('*fugitive#head')
      return fugitive#head()
    endif
  catch
  endtry
  return ''
endfunction

" ファイル形式を表示
function! LightLineFileformat()
  return winwidth(0) > 70 ? &fileformat : ''
endfunction

" ファイル種類を表示
function! LightLineFiletype()
  return winwidth(0) > 70 ? (strlen(&filetype) ? &filetype : 'no ft') : ''
endfunction

" ファイルのエンコードを表示
function! LightLineFileencoding()
  return winwidth(0) > 70 ? (strlen(&fenc) ? &fenc : &enc) : ''
endfunction

" モード表示
function! LightLineMode()
  return winwidth(0) > 60 ? lightline#mode() : ''
endfunction
```

## folding

折りたたみを使いやすくする

```
NeoBundle 'LeafCage/foldCC.vim'
```

```
set foldtext=FoldCCtext()
let g:foldCCtext_enable_autofdc_adjuster = 1
set foldcolumn=3
set fillchars=vert:\|
set foldmethod=marker

" マーカーの追加
nnoremap  z[     :<C-u>call <SID>put_foldmarker(0)<CR>
nnoremap  z]     :<C-u>call <SID>put_foldmarker(1)<CR>
function! s:put_foldmarker(foldclose_p) " {{{
  let crrstr = getline('.')
  let padding = crrstr=='' ? '' : crrstr=~'\s$' ? '' : ' '
  let [cms_start, cms_end] = ['', '']
  let outside_a_comment_p = synIDattr(synID(line('.'), col('$')-1, 1), 'name') !~? 'comment'
  if outside_a_comment_p
    let cms_start = matchstr(&cms,'\V\s\*\zs\.\+\ze%s')
    let cms_end = matchstr(&cms,'\V%s\zs\.\+')
  endif
  let fmr = split(&fmr, ',')[a:foldclose_p]. (v:count ? v:count : '')
    exe 'norm! A'. padding. cms_start. fmr. cms_end
endfunction

" 次のマーカーへ移動
nnoremap <silent>zj :<C-u>call <SID>smart_foldjump('j')<CR>
nnoremap <silent>zk :<C-u>call <SID>smart_foldjump('k')<CR>
function! s:smart_foldjump(direction) "{{{
  if a:direction == 'j'
    let [cross, trace, compare] = ['zj', ']z', '<']
  else
    let [cross, trace, compare] = ['zk', '[z', '>']
  endif

  let i = v:count1
  while i
    let save_lnum = line('.')
    exe 'keepj norm! '. trace
    let trace_lnum = line('.')
    exe save_lnum

    exe 'keepj norm! '. cross
    let cross_lnum = line('.')
    if cross_lnum != save_lnum && eval('cross_lnum '. compare. ' trace_lnum') || trace_lnum == save_lnum
      let i -= 1
      continue
    endif

    exe trace_lnum
    let i -= 1
  endwhile
  mark `
  norm! zz
endfunction

" フォールドレベル
nnoremap <silent>z0    :set foldlevel=0<CR>
nnoremap <silent>z1    :set foldlevel=1<CR>
nnoremap <silent>z2    :set foldlevel=2<CR>
nnoremap <silent>z3    :set foldlevel=3<CR>
nnoremap <silent>zu    :set foldlevel=<C-r>=foldlevel('.')-1<CR><CR>
```

## snippet

```
NeoBundleLazy 'Shougo/neosnippet.vim', {
  \ 'depends': [
  \   'Shougo/neosnippet-snippets',
  \   'Shougo/context_filetype.vim',
  \ ],
  \ 'insert': 1,
  \ 'filetypes': 'snippet',
  \ 'unite_sources': [
  \   'neosnippet',
  \   'neosnippet/user',
  \   'neosnippet/runtime',
  \ ],
  \ }
```

```
let g:neosnippet#snippets_directory = $HOME.'/.vim/snippets'

" スニペットを展開する
imap <C-k> <Plug>(neosnippet_expand_or_jump)
smap <C-k> <Plug>(neosnippet_expand_or_jump)
xmap <C-k> <Plug>(neosnippet_expand_target)
```

## neocomplete

いろいろな補完をしてくれる。

- ファイル名補完
- オムニ補完(C-x C-o)
- vimshel で補完
- Vim 補完

<C-y>: 補完確定
<C-e>: キャンセル

```
NeoBundleLazy 'Shougo/neocomplete.vim', {
  \ 'depends': 'Shougo/context_filetype.vim',
  \ 'insert': 1,
  \ }
```

```
" 競合するのでAutoComplPopがある場合に無効化する
let g:acp_enableAtStartup = 0

" 起動時にneocomplecacheを有効にする
let g:neocomplete#enable_at_startup = 1

" 大文字が入力されるまで大文字小文字の区別を無視する
let g:neocomplete#enable_smart_case = 1

" シンタックスをキャッシュするときの最小文字数
let g:neocomplete#sources#syntax#min_keyword_length = 3

" neocomplete を自動的にロックするバッファ名のパターン
let g:neocomplete#lock_buffer_name_pattern = '\*ku\*'

" 辞書補完の辞書を指定。filetype:辞書ファイル名
let g:neocomplete#sources#dictionary#dictionaries = {
    \ 'default' : '',
    \ 'vimshell' : $HOME.'/.vimshell_hist',
    \ 'javascript' : $HOME.'/.vim/dict/jacascript.dict',
    \ 'php' : $HOME.'/.vim/dict/php.dict',
    \ }

" キーワードの定義
if !exists('g:neocomplete#keyword_patterns')
  let g:neocomplete#keyword_patterns = {}
endif
let g:neocomplete#keyword_patterns['default'] = '\h\w*'

" キーマッピング
" <C-g>: UNDO  <C-l>: 補完候補の共通部分までを補完する
inoremap <expr><C-g> neocomplete#undo_completion()
inoremap <expr><C-l> neocomplete#complete_common_string()

" 推奨のキーマッピング
" <CR>: ポップアップを閉じてインデントを保存
inoremap <silent><CR> <C-r>=<SID>my_cr_function()<CR>
function! s:my_cr_function()
  "return (pumvisible() ? "\<C-y>" : "" ) . "\<CR>"
  " For no inserting <CR> key.
  return pumvisible() ? "\<C-y>" : "\<CR>"
endfunction

" <TAB>: 補完実行
inoremap <expr><TAB>  pumvisible() ? "\<C-n>" : "\<TAB>"

" <C-h>, <BS>: ポップアップを閉じて<BS>を削除
inoremap <expr><C-h> neocomplete#smart_close_popup()."\<C-h>"
inoremap <expr><BS> neocomplete#smart_close_popup()."\<C-h>"

" オムニ補完を有効にする
autocmd FileType css           setlocal omnifunc=csscomplete#CompleteCSS
autocmd FileType html,markdown setlocal omnifunc=htmlcomplete#CompleteTags
autocmd FileType javascript    setlocal omnifunc=javascriptcomplete#CompleteJS
autocmd FileType python        setlocal omnifunc=pythoncomplete#Complete
autocmd FileType xml           setlocal omnifunc=xmlcomplete#CompleteTags

" 重いオムニ補完を有効にする
if !exists('g:neocomplete#sources#omni#input_patterns')
  let g:neocomplete#sources#omni#input#patterns = {}
endif
```
