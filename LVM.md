# LVMについて

## 用語

- PV(Physical Volume): 物理ディスク単位(ex /dev/sda1, /dev/sdb1)
- PE(Physical Extent): PVを分割したLVMで利用する最小単位
- VG(Volume Group)   : PEをを集めてまとめたもの（物理ディスクをまたぐことができる）
- LV(Logical Volume) : VGを分割して、パーティションを割り当てる単位

## HDDを追加するとき

/dev/sda に既存のデータがあり、/dev/sdb, /dev/sdc を追加したとする。

- 操作

  - パーティション

```
# 現状の確認
sudo fdisk -l

# /dev/sdb にLVMボリュームを作成
sudo fdisk /dev/sdb

コマンド (m でヘルプ): n
Select (default p): p
パーティション番号 (1-4, default 1): 1
First sector (2048-16777215, default 2048): 
Last sector, +sectors or +size{K,M,G,T,P} (2048-16777215, default 16777215): 
コマンド (m でヘルプ): t
Partition type (type L to list all types): 8e

# 作成の確認
sudo fdisk -l /dev/sdb

# /dev/sdc にコピー
sudo sfdisk -d /dev/sdb | sudo sfdisk /dev/sdc --force
```

  - 物理ボリューム(PV)作成

PVはパーティション単位で作成する。物理ディスク単位ではない。

```
sudo pvcreate /dev/sdb1 /dev/sdc1

# 確認
sudo pvscan
sudo pvdisplay
```

  - ボリュームグループ(VG)作成

```
# 確認
sudo vgdisplay

# 作成(VG:test-vg)
sudo vgcreate test-vg /dev/sdb1 /dev/sdc1

# 既存のVG(mint-vg)に追加する場合
sudo vgextend mint-vg /dev/sdb1

# リネーム
sudo vgrename test-vg hoge-vg

# 削除
sudo vgremove test-vg
```

  - 論理グループ(LV)作成

```
# 確認
sudo lvsacn
sudo lvdisplay

# 作成(LV: lv_test)
sudo lvcreate -L 4G -n lv_test test-vg
sudo lvcreate --size 4GB --name lv_test test-vg

# 拡張
sudo lvextend -L 8G /dev/test-vg/lv_test
sudo lvextend -L +4G /dev/test-vg/lv_test

# 縮小
sudo lvreduce -L 4G /dev/test-vg/lv_test
sudo lvreduce -L -4G /dev/test-vg/lv_test
```

  - ファイルシステム作成

```
sudo mkfs.ext4 /dev/test-vg/lv_test
```




