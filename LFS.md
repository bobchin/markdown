# Linux from Scratch

## 環境

- Mint Linux Cinnamon 17.1
- Parallels 10
  - CPU x1
  - Mem 2048MB
  - Disk 64GB(Mint Linux用 SATA 0:1)
  - CD(Mint Linux用 SATA 0:2)
  - Disk 10GB(LFS SATA 0:3) ※追加
  
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












