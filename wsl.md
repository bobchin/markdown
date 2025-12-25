# Windows Subsystem for Linux

- [Windows Subsystem for Linux](#windows-subsystem-for-linux)
  - [参考](#参考)
  - [インストール](#インストール)
  - [アンインストール](#アンインストール)
  - [使い方](#使い方)
    - [Linux =\> Windows](#linux--windows)
    - [Windows =\> Linux](#windows--linux)
    - [Linux のコマンドを実行](#linux-のコマンドを実行)
    - [zsh インストール](#zsh-インストール)
    - [Oh my zsh](#oh-my-zsh)
    - [import/export](#importexport)

## 参考

- [WSL2のインストールを分かりやすく解説【Windows10/11】](https://chigusa-web.com/blog/wsl2-win11/)
- [WindowsでWSL2を使って「完全なLinux」環境を作ろう！](https://www.kagoya.jp/howto/it-glossary/develop/wsl2_linux/)
- [とほほのWSL入門](https://www.tohoho-web.com/ex/wsl.html)
- [WSL の基本的なコマンド](https://learn.microsoft.com/ja-jp/windows/wsl/basic-commands)
- [WSL / WSL 2 をコマンドラインでインストールする](https://qiita.com/moriai/items/850ee91d60edc91e7b7e)
- [Linuxを手軽に動かしたい！　Windows標準機能の「WSL2」がお薦め](https://xtech.nikkei.com/atcl/nxt/column/18/02647/111500001/)

## インストール

- "OptionalFeatures.exe" から Windows の機能の有効化または無効化を起動
  「Linux 用 Windows サブシステム」と「仮想マシンプレットフォーム」にチェックを入れる

  ```PowerShell
  Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
  Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
  ```

- PowerShell からインストール

  ```PowerShell
  # 状態確認
  wsl -l -v

  # インストール可能なディストリビューションを表示
  wsl --list --online
  # ディストリビューションを指定してインストール
  wsl --install -d <distro>

  # 状態確認
  wsl -l -v
  ```

## アンインストール

- [WSL:保存版！【完全削除】する手順](https://broaden-your-horizons.com/ai-ss/wsl/complete-uninstall/)

  ```PowerShell
  # Linuxの全停止
  wsl --shutdown

  # Linuxの個別停止
  wsl --terminate <distro>

  # 停止確認(STATE=Stopped)
  wsl -l -v

  # 登録解除
  wsl --unregister ubuntu
  ```


## 使い方

### Linux => Windows

  ```sh
  # マウントされているのでアクセスできる
  cd /mnt/c/
  ```

### Windows => Linux

  ```PowerShell
  cd \\wsl$\
  ```

### Linux のコマンドを実行

  ```PowerShell
  wsl ls -la
  ```

### zsh インストール

  ```sh
  $ sudo apt install zsh
  $ zsh --version
  $ chsh -s $(which zsh)
  ```

### [Oh my zsh](https://ohmyz.sh/)

  ```sh
  # curl
  $ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  # wget
  # sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"

  # テーマ変更
  # ~/.zshrc
  # ZSH_THEME="robbyrussell"
  ZSH_THEME="dpoggi"
  ```

### import/export

  ```sh
  wsl --export Ubuntu-24.04 C:\WSL\ubuntu2404.tar [--format tar]
  wsl --import copy_ubuntu C:\WSL\copy_ubuntu C:\WSL\ubuntu2404.tar --version 2
  ```

