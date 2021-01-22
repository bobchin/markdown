# Puppy Linux

## サイト

- [本家](http://puppylinux.com/)
- 日本語系
  - [パピーリナックス 日本語版](http://openlab.jp/puppylinux/)
  - [パピーリナックス日本語フォーラム](http://sakurapup.browserloadofcoolness.com/)
  - [Puppy Linux 非公式 サイト](http://linux-unofficial.blogspot.com/p/pup.html)
  - [Windowsはもういらない](http://no-windows.blog.jp/)

## Puppy Linux について

```text
Puppy Linux is a unique family of Linux distributions meant for the home-user computers.
It was originally created by Barry Kauler in 2003.

Puppy Linux は独特な Linux ディストリビューションの１つで、個人で使用するコンピュータ向けになっています。
もともとは、2003年に Barry Kauler が作成しました。
```

### Puppy Linux の利点

1. Ready to use → all tools for common daily computing usage already included.
1. Ease of use → grandpa1.friendly certified ™
1. Relatively small size → 300 MB or less.
1. Fast and versatile.
1. Customisable within minutes → remasters.
1. Different flavours → optimised to support older computers, newer computers.
1. Variety → hundreds of derivatives (“puplets”), one of which will surely meet your needs.
1. If one of these things interest you, read on.

---

1. すぐに使える → 日常で一般的に使用する全てのツールが予め含まれています
1. 簡単に使える→ おじいちゃんでも使えるお墨付きです
1. 比較的サイズが小さい → 300 MB かそれ以下です
1. 動作が早く多目的に使用できる
1. 数分でカスタマイズ可能 → remasters
1. いくつかのフレーバー（種類）→ より古いコンピュータをサポートしたり、より新しいコンピュータに対応したりします
1. バラティが豊富→ 何百ものモジュール(“puplets”)があります。どれかは必ずあなたのニーズに合致するはずです
1. 以上の点に興味があれば、ぜひ試してみてください

## はじめに

- Puppy Linux は、Debian のような単一のディストリビューションではなく、Ubuntu(Ubuntu, Kubuntu, Xubuntu) のような複数のフレーバーを持つディストリビューションでもない。
- Puppy Linux は、複数のディストリビューションの集まりです。
  - 共通の方針を守っている
  - 同じツールを使用している
  - puppy に特化したアプリケーションや設定でビルドされていて、フレーバーで違いがない
- Puppy Linux ディストリビューションには３つの配布カテゴリがあります
  - 公式 Puppy Linux ディストリビューション
    - Puppy Linux チームにメンテされている
    - 一般的な使い方をターゲットにしている
    - Woof-CE と呼ばれるPuppy Linux システムビルダーを使ってビルドされている
  - woof-built Puppy Linux ディストリビューション
    - 特定の目的や外観に合わせて開発されている
    - 一般的な使い方をターゲットにしている
    - Woof-CE と呼ばれるPuppy Linux システムビルダーを使ってビルドされているが、いくつかパッケージの追加や修正がされている
  - 非公式モジュール (“puplets”)
    - 通常はremasters（カスタマイズ）されています。
    - Puppy Linux のファンにメンテされていて、特定の目的をターゲットにしています。

### Official distributions

- Ubuntu
  - Ubuntu Focal 64
  - Ubuntu Bionic
  - Ubuntu Xenial
  - Ubuntu Trusty
- Slackware
  - Slackware 14.2
  - Slackware 14.1
- Raspbian
  - Buster

## インストール

### ステップ

1. 必要なバージョンのPuppyLinuxが含まれた iso や zip などのコンテナファイルを入手する  
   一般的には以下の３つのファイルのセットです。
   - vmlinuz
   - initrd.gz
   - *.sfs( * はPuppyのバージョン)

2. 自分のコンピュータでどのようにPuppyLinuxを使うかを決める  
    メディアの種類によって決まります。  
     - インストールせずに使用する'Live'
     - PuppyLinuxだけをインストール
     - 複数のOSを選択して使う

    Puppy はパーティション全体を使うこともできるし、パーティションを共有して使うこともできます。

    - LiveDVD-non-persistant: LiveDVD起動でデータ保存しない
      - DVD(CD), USBメモリ, SDカードなどの外部ディスクから起動する
      - メモリにインストールするのでデータは残らずシャットダウンで消えてしまう
      - 起動中であれば、コンピュータのその他の全ハードウェアにアクセス可能
      - 初めてのシャットダウン時に保存ファイルを作成するかどうか聞かれるが、保存ファイルを作成しない場合は起動後に変更されたデータは保存されない
    - LiveDVD-persistant: LiveDVD起動でデータ保存しない
      - 上記LiveDVD-non-persistantと同様
      - ただし、起動後に変更されたデータはシステム内の保存ファイルに書き込まれる
      - 保存する内容により保存ファイルのサイズは増えていく
      - リムーバブルメディアに保存ファイルを置くこともできる
    - InstallationFrugal: パーティションを他のOSと共用する
      - USBメモリやハードディスクを使うが、パーティションを専有しない
      - USBメモリ、SDカード、ハードディスクにフォルダをインストールし、そこにはシステム関連のファイルが保存される
      - 保存ファイルを持つので、LIVEインストールより少し永続的になる
      - リムーバブルメディアの代わりにシステム（Windows等）に上記フォルダから起動するように許可して起動する。
    - InstallationFullHDD: パーティションを専用として使う
      - ハードディスクにインストールし、パーティションを専有する
    - PXELINUX: ネットワークブートして使用

3. Puppyについて学ぶ

### Frugal インストール

Frugal は、PuppyLinuxをインストールする標準的な方法です。
Linux システムファイルは、ドライブのパーティション全体にバラバラと保存されるのではなく、
ディレクトリ内のごくわずかなファイルにまとめて保存します。
より技術的な用語を使用すると、レイヤードファイルシステムを使用します。
ベースとなる　**SFS** ファイル、それ以外の **SFS** ファイル、**PupSave** (圧縮されたファイルで、1ファイル内にファイルシステムとして閉じ込めた) ファイルです。
しかしそれらは、通常ではパーティション全体に広がっているLinuxのRootFSとして、ターミナル、ファイルマネージャ内では見えます。
フィアルへの変更や追加は、PupSaveファイルに追加されます。
/mnt ディレクトリ内のファイルとは別に、マウント場所が指定されています。

この方法は、OS全体をメモリに読み込むことを可能にしています。
さらに、1つのパーティションに複数のPuppyLinuxをインストールすることができ、
Windowsパーティションにインストールすることもできます。

#### Frugal インストール詳細

Frugal インストールは、コンテナファイル（isoやzipファイル）の内容を解凍して実現します。
これらをインストールするために、希望するパーティションにターゲットパーティションとして知らせます。
そのパーティションは次のような場所になります:

- 外部デバイス（フラッシュメモリやUSBメモリ）
- 内部デバイス（通常はハードディスク）

そのため、ターゲットデバイスは、上記ファイルをインストールするパーティションを含んでいるデバイスになります。
たとえば、外部フラッシュメモリドライブや内部ハードディスクなどです。
フラッシュメモリドライブの容量は256MB以上必要です。
Copy-to-R.A.M.モードのシステム制御は、
どのようにOSが一時的な環境を作成するかを指示します。
RAM内にファイルシステム全体を配置して読み書きします。

Copy-to-R.A.M.モードをもつOS:

- Puppy GNU/Linux
- PartedMagic GNU/Linux
- Porteus GNU/Linux

次の手順は、Puppy GNU/Linuxが実行されていると仮定します。
しかし、同様の手順がGNU/Linuxディストリビューションでは使えるはずです。
Windowsを使用したい場合は、下記のAppendixを参照してください。

1. パーティショニング

    このステップはオプションです。たとえば、既存のパーティション構成（ターゲットドライブX）を保持する必要がない場合にだけ実行してください。

    ```bash
    # ターゲットドライブX上にパーティション構成が存在しているか確認
    /usr/sbin/parted /dev/sdX print

    # ターゲットドライブXをアンマウント
    umount /dev/sdX

    # ターゲットドライブX上にパーティションテーブル（ディスクラベル）を作成
    /usr/sbin/parted /dev/sdX mklabel gpt && /usr/sbin/parted -l

    # ターゲットドライブX上にパーティションを作成
    /usr/sbin/parted -a opt /dev/sdX mkpart primary ext4 8 100% set 1 boot on
    /usr/sbin/parted /dev/sdX disk_set pmbr_boot on
    /usr/sbin/parted /dev/sdX set 1 legacy_boot on print
    ```

2. フォーマット

    このステップはオプションです。ターゲットドライブにある既存のファイルシステムを保持する必要がない場合にだけ実行してください。

    ```bash
    # ターゲットデバイスXのパーティションに、ファイルシステムを作成する（フォーマット）
    # EXT4ファイルシステムの場合
    /sbin/mkfs.ext4 -b 4096 -m 0 -L PUPPY -O extents,uninit_bg,dir_index,filetype,has_journal,sparse_super -E stride=4,stripe-width=256 /dev/sdXY
    # FAT16ファイルシステムの場合
    mkdosfs -v -n PUPPY -F 16 /dev/sdXY
    ```

3. ブートローダーインストール

    最新バージョンのブートローダー(SYSLINUX)をインストール。これは実際のOSでも使用されています。

    ```bash
    # ブートローダーのインストール
    cp -af /usr/lib/syslinux/{libcom32,libutil,linux,menu}.c32 /dev/sdXY/boot/syslinux/
    cp -af /usr/lib/syslinux/{libcom32,libutil,linux,menu}.c32 /dev/sdXY/syslinux/

    # ブートローダーのブートセクタコードをインストール
    /bin/dd bs=440 conv=notrunc count=1 if=/usr/lib/syslinux/gptmbr.bin of=/dev/sdX && sync

    # ブートローダー設定ファイルsyslinux.cfgをインストール
    # /boot/syslinux または /syslinux にコピー

    # ブートローダーシステムファイルldlinux.sysをインストール
    # EXT4の場合
    /bin/mount /dev/sdXY /mnt/sdXY && /bin/mkdir -p /mnt/sdXY/boot && /sbin/extlinux -i -s /mnt/sdXY/boot && sync
    # FATの場合
    /bin/mkdir -p /mnt/sdXY/boot && /usr/bin/syslinux --directory /boot -i -s /dev/sdXY && sync
    ```



4. システムインストール


### Grub4Dos

- [Grub4Dosの仕組み](https://ameblo.jp/shinobar-blog/entry-11885521432.html)

- 通常の起動時の流れ
  1. BIOS
    BIOS設定で起動する記憶装置順に見ていく
  1. MBR(Master Boot Record) （各記憶装置における最初のセクタ）
    bootフラグを目印にして自身のパーティションの中から起動するパーティションを選択する
  1. PBS(Partition Boot Sector) （各パーティションの最初のセクタ）
    自分の中にあるブートローダを探してそれを起動する
  1. ブートローダ
  1. OS起動

- Windowsを使う場合の流れ
  - BIOS
  - MBR(Grub4Dos)
  - PBS
  - bootmgr(Windowsのブートローダー)
  - ブートローダー(grldr)
  - puppy(OS)

- Grub4Dosに変更するのに必要なこと
  - MBR を Grub4Dosに変える
  - bootmgrにgrldrを登録する

- [ブートローダーはWindows Boot Managerのまま、WindowsとLinuxでデュアルブート/GRUB4DOSを使ってデュアルブート](https://w.atwiki.jp/linuxjapanwiki/pages/213.html)
  - 何かしらのLiveCD等でLinuxを起動する

- [WINDOWS BOOT LOADERでWIN10+LINUXのマルチブート環境を作る](https://nyacom.net/?p=202)
  - Windows boot loader の設定

    ```cmd
    REM 現在の構成を確認(id はidentifier欄)
    $ bcdedit /v

    REM ブート構成データ ストア内に新しいエントリを作成
    REM アプリケーションエントリになるように指定。種類はブートセクタを指定。
    REM bcdedit /create /d <説明> /application <apptype>
    $ bcdedit /create /d "<Label>" /application bootsector

    REM エントリ オプションの値を設定
    REM アプリケーションが存在するデバイスを定義。パーティションで指定。
    $ bcdedit /set {entry id showed above} device partition c:
    REM アプリケーションのパスを定義。パーティションで指定。
    $ bcdedit /set {entry id showed above} path \windows\system32\winload.exe

    REM ブート オプションをユーザーに表示する場合にブート マネージャーで使われる表示順序を指定します。
    REM 一番下に設定
    $ bcdedit /displayorder {entry id showed above} /addlast
    ```
