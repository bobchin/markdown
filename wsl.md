# Windows Subsystem for Linux

- [Windows Subsystem for Linux](#windows-subsystem-for-linux)
  - [参考](#参考)
  - [インストール](#インストール)
  - [使い方](#使い方)

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
  wsl --install
  wsl -l -v
  ```

- ディストリビューション

  ```PowerShell
  wsl --list --online
  wsl --install -d <distro>
  ```

## 使い方

- Linux => Windows

  ```sh
  # マウントされているのでアクセスできる
  cd /mnt/c/
  ```

- Windows => Linux

  ```PowerShell
  cd \\wsl$\
  ```

- Linux のコマンドを実行

  ```PowerShell
  wsl ls -la
  ```

- zsh インストール

  ```sh
  $ sudo apt install zsh
  $ zsh --version
  $ chsh -s $(which zsh)
  ```

  - [Oh my zsh](https://ohmyz.sh/)

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
