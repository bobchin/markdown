# RaspberryPi Pico C/C++ 環境

## 参考

- [The C/C++ SDK](https://www.raspberrypi.com/documentation/microcontrollers/c_sdk.html)
  - [Getting started with Raspberry Pi Pico](https://datasheets.raspberrypi.com/pico/getting-started-with-pico.pdf?_gl=1*8wz72k*_ga*MjEwNjA4Nzk3Ny4xNjk4MjA3OTY0*_ga_22FD70LWDS*MTcxNjQxODc2NC4xMy4wLjE3MTY0MTg3NjQuMC4wLjA.)
- [「Raspberry Pi Pico W」のC/C++開発環境で最低限必要なモノ（Windows）](https://qiita.com/Ganesha/items/0ed2100baaddd3e737be)
- [ラズベリー・パイ Picoマイコン入門 C言語開発環境の構築](https://www.zep.co.jp/nbeppu/article/z-pico-da2/)

## まとめ

[Getting started with Raspberry Pi Pico](https://datasheets.raspberrypi.com/pico/getting-started-with-pico.pdf?_gl=1*8wz72k*_ga*MjEwNjA4Nzk3Ny4xNjk4MjA3OTY0*_ga_22FD70LWDS*MTcxNjQxODc2NC4xMy4wLjE3MTY0MTg3NjQuMC4wLjA.) の 9.2 Building on MS Windows

- Toolchain のインストール
  - [Windows Pico Installer](https://github.com/raspberrypi/pico-setup-windows)
    以下のソフトウェアがインストールされる
    - [Arm GNU Toolchain](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads) : Arm以外の環境でArm用の実行ファイルをコンパイルするためのツール（クロスコンパイルツール）
    - [CMake](https://cmake.org/download/) : C言語用コンパイル支援ツール
    - [Ninja](https://github.com/ninja-build/ninja/releases) : コンパイル速度を重視したビルドシステム。make の代替となるイメージ。
    - [Python3.9](https://www.python.org/downloads/windows/) : プログラム言語
    - [Git for Windows](https://git-scm.com/download/win) : バージョン管理ツール
    - [Visual Studio Code](https://code.visualstudio.com/) : エディタ
    - [OpenOCD](https://github.com/openocd-org/openocd/) : JTAG-ICE に対応したデバッガ(On-Chip Debugger = 組み込みデバイスのデバッガ)

  - VSCode起動
    ※すでにVSCodeがインストールされている場合、他の拡張機能をインストールしている影響をうけることがある。
      その場合は、[Known installation issues and solutions](https://github.com/raspberrypi/pico-setup-windows/wiki/Problems-using-Visual-Studio-Code-with-Raspberry-Pi-Pico#known-installation-issues-and-solutions) を参照する。

    1. **CMake(CMake Tool ではないので注意)** 拡張機能を有効にすること
    2. ビルドを実行して、"PICO SDK" が見つからない場合、以下をチェック
       - VSCode をスタートメニューから起動しているか？
       - ツールバーに 'no active kit' と表示されてるなら、クリックして "Pico Arm GCC" を選択する
       - CMake 拡張機能を選択して、トップのアイコンから "Configure all projects" を選択する
    3. プロジェクトの **.vscode** フォルダ内に推奨設定ファイルが有るか確認。
       インストーラによってコピーされるが、 pico-examples リポジトリからコピーしてもいい。
       exampleをコピーしたくない場合は、[JSON ファイル](https://github.com/raspberrypi/pico-setup-windows/tree/master/packages/pico-examples/ide/vscode) を **.vscode** フォルダ内にコピーすることもできる。
    4. インストーラがVisual Studio Code がインストールされていないというメッセージを出す場合は、[code.visualstudio.com](https://code.visualstudio.com/) から手動でインストールしてください。
    5. コンパイルの情報がみつからないというメッセージを出す、またはビルド形式を変更したりファイルを追加・削除したりしたあとにビルドが動作しない場合は、CMakeプロジェクトを再設定してください。

  - サンプルを開く
    スタートメニューからVSCodeを起動したら、pico-examples リポジトリを開きます。
    あとで再度開く場合は、" C:\ProgramData\Raspberry Pi\Pico SDK<version>\pico-examples." 二インストールされたコピーを開くことができます。

  - サンプルのビルド
    最初に開いた際に、pico-examples プロジェクトを設定したいかどうか聞かれます。
    Yes をクリックすると、作業表示します。キットを選択する表示された場合は、Pico ARM GCC - Pico SDK Toolchain with GCC arm-none-eabi エントリを選択してください。
    Pico ARM GCC がない場合は、Unspecified を選択します。

  - [参考 Pico Setup for Windows](https://github.com/raspberrypi/pico-setup-windows/blob/master/docs/tutorial.md)

