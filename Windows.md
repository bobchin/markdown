# Windows

## 参考

- http://upinetree.hatenablog.com/entry/2013/03/06/220800
- 

## Windows 上に Linux 環境を作成

- [MinGW](http://www.mingw.org/)
  - [MSYS] : GNU のユーティリティ
- [cygwin](http://www.cygwin.com/)
- [Gow](https://github.com/bmatzelle/gow/wiki) : cygwin の代替

## ターミナル
- [ckw-mod](https://github.com/ckw-mod/ckw-mod/wiki)
- [Console2](http://sourceforge.net/projects/console/) : あらゆるシェルをタブとして起動する

## コマンドラインシェル
- cmd.exe
- [Nyaos](http://www.nyaos.org/index.cgi?p=FrontPage.ja) : シェル

## 構築
- http://tanakh.jp/posts/2011-11-15-windows-terminal.html

## ConEmu or Cmder

- [ConEmu](https://conemu.github.io/)
- [Cmder](http://cmder.net/)
  - Windows用のコンソールエミュレータ
    - 複数のシェルをタブで開ける
    - タブごとに別のシェルを起動できる
  - インストール
    - Portable版をダウンロードして、PATHに追加する
  - 設定（上右端のボタンからsettings）
    - Main
      - Main console font: Ricty
      - Alternative font: Ricty
      - Monospace: チェック外す（日本語カーソルがズレる）
      - Anti-aliasing: Clear Type
    - Startup
      - Specified named task: {Nyagos}
      - Tasks（＋で追加）
        - グループ名: Nyagos
        - Command: D:\software\Nyagos\nyagos.exe
        - Up でTasksの一番上に移動する
    - Features
      - Colors
        - Schemes: <Solarized>
      - Transparency
        - Active window transparency
  - エイリアスの追加
    - D:\software\Nyagos\nyagos.d\aliases.lua

 ```
alias{
    ls='ls -oF $*',
    ll='ls -ol',
    lua_e=function(args) assert(load(args[1]))() end,
    ["for"]='%COMSPEC% /c "@set PROMPT=$G & @for $*"',
}
 ```






