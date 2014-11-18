# Vim のキーマッピングメモ

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

