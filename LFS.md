# Linux from Scratch

## 環境

- Mint Linux Cinnamon 17.1
- Parallels 10
  - CPU x1
  - Mem 2048MB
  - Disk 64GB(Mint Linux用 SATA 0:1)
  - CD(Mint Linux用 SATA 0:2)
  - Disk 10GB(LFS SATA 0:3) ※追加

## ホスト環境のチェック

```
cat > version-check.sh << "EOF"
#!/bin/bash
# Simple script to list version numbers of critical development tools

export LC_ALL=C
bash --version | head -n1 | cut -d" " -f2-4
echo "/bin/sh -> `readlink -f /bin/sh`"
echo -n "Binutils: "; ld --version | head -n1 | cut -d" " -f3-
bison --version | head -n1

if [ -h /usr/bin/yacc ]; then
  echo "/usr/bin/yacc -> `readlink -f /usr/bin/yacc`";
elif [ -x /usr/bin/yacc ]; then
  echo yacc is `/usr/bin/yacc --version | head -n1`
else
  echo "yacc not found"
fi

bzip2 --version 2>&1 < /dev/null | head -n1 | cut -d" " -f1,6-
echo -n "Coreutils: "; chown --version | head -n1 | cut -d")" -f2
diff --version | head -n1
find --version | head -n1
gawk --version | head -n1

if [ -h /usr/bin/awk ]; then
  echo "/usr/bin/awk -> `readlink -f /usr/bin/awk`";
elif [ -x /usr/bin/awk ]; then
  echo yacc is `/usr/bin/awk --version | head -n1`
else
  echo "awk not found"
fi

gcc --version | head -n1
g++ --version | head -n1
ldd --version | head -n1 | cut -d" " -f2-  # glibc version
grep --version | head -n1
gzip --version | head -n1
cat /proc/version
m4 --version | head -n1
make --version | head -n1
patch --version | head -n1
echo Perl `perl -V:version`
sed --version | head -n1
tar --version | head -n1
makeinfo --version | head -n1
xz --version | head -n1

echo 'main(){}' > dummy.c && g++ -o dummy dummy.c
if [ -x dummy ]
  then echo "g++ compilation OK";
  else echo "g++ compilation failed"; fi
rm -f dummy.c dummy
EOF

bash version-check.sh


cat > library-check.sh << "EOF"
#!/bin/bash
for lib in lib{gmp,mpfr,mpc}.la; do
  echo $lib: $(if find /usr/lib* -name $lib|
               grep -q $lib;then :;else echo not;fi) found
done
unset lib
EOF

bash library-check.sh
```

### 必要なファイル

ホスト側で必要な開発ツール

- C言語はソースから実行ファイルを作成するには以下の順をたどる
  - コンパイル: オブジェクト（中間）ファイルができる
  - リンク: オブジェクト（中間）ファイルをまとめて実行ファイルができる
  - ビルド: 統合環境による自動処理で実行ファイルをつくる
  - メイク: makefileをもとにコマンドラインで実行ファイルをつくる

- Bash: シェル
- Binutils: オブジェクトファイル（コンパイル後の中間コード）を扱うバイナリツール一式。アセンブラ、逆アセンブラ、リンカなど。
- Bison: 構文解析をするパーサをC言語でつくる
- Bzip: ファイル圧縮(.bz2)
- Coreutils: ファイル操作、テキスト操作、シェルなどのユーティリティコマンド一式
- Diffutils: ファイルの差異を見つけるためのツール一式
- Findutils: ファイル検索するためのツール一式
- Gawk: テキストファイルの処理ツール
- GCC: C言語のコンパイラ一式
- Glibc: C言語の標準ライブラリ
- Grep: ファイル内検索ツール
- Linux Kernel: カーネル
- M4: マクロプロセッサー（C言語のマクロを処理する）
- Make: メイクを実行するためのツール
- Patch: diffにより生成されたファイルの差分を適用するツール
- Perl: スクリプト言語
- Sed: ストリームエディタ
- Tar: アーカイバ(.tar)
- Texinfo: ソフトウェアのドキュメント（マニュアル）を画一的に作成するためのツール
- Xz: ファイル圧縮(.xz)



## LFS

- LFS用のディスクは "/dev/sdb" 

```
# パーティションの作成
fdisk /dev/sdb
mkfs -v -t ext4 /dev/sdb1

# マウント
export LFS=/mnt/lfs
sudo mkdir -pv $LFS
mount -v -t ext4 /dev/sdb1 $LFS
```

- 変数を忘れないようにする
  - "~/.bashrc", "/root/bashrc" に以下を記述しておく

```
export LFS=/mnt/lfs
```

## ソースリストのダウンロード

```
sudo mkdir $LFS/sources
sudo chmod a+wt $LFS/sources
sudo wget http://lfsbookja.sourceforge.jp/7.6.ja/wget-list
sudo wget -i wget-list -P $LFS/sources
sudo wget http://lfsbookja.sourceforge.jp/7.6.ja/md5sums

# 内容のチェック
pushd $LFS/sources
md5sum -c md5sum
popd
```

## インストールディレクトリと作業ユーザの作成

```
sudo mkdir $LFS/tools
ln -sv $LFS/tools /

# ユーザ”lfs”の作成
groupadd lfs
# -k /dev/null でディレクトリのスケルトンを無しにして何もコピーしないようにしている
useradd -s /bin/bash -g lfs -m -k /dev/null lfs
passwd lfs # pw => lfs
chown -v lfs $LFS/tools
chown -v lfs $LFS/sources

su - lfs
```

## 作業ユーザの環境設定

```
cat > ~/.bash_profile <<"EOF"
exec env -i HOME=$HOME TERM=$TERM PS1='\u:\w\$ ' /bin/bash
EOF

cat > ~/.bashrc <<"EOF"
set +h
umask 022
LFS=/mnt/lfs
LC_ALL=POSIX
LFS_TGT=$(uname -m)-lfs-linux-gnu
PATH=/tools/bin:/bin:/usr/bin
export LFS LC_ALL LFS_TGT PATH
EOF
```












