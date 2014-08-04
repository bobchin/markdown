# SublimeText2

## インストール

- [ダウンロード](http://www.sublimetext.com/)
- [パッケージコントロール](http://wbond.net/sublime_packages/package_control)
- [インストール方法](http://wbond.net/sublime_packages/package_control/installation)

## パッケージ

### パッケージコントロール

- https://sublime.wbond.net/

```
"Ctrl+`" コンソール起動
以下を貼り付け

import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'
```

## 日本語関連

- ConvertToUTF8
- IMESupport
- Japanize

```
cd ~/Library/Application Support/Sublime Text 2/Packages/Default
mv "Context.sublime-menu" "Context.sublime-menu.org"
mv "Indentation.sublime-menu" "Indentation.sublime-menu.org"
mv "Main.sublime-menu" "Main.sublime-menu.org"
mv "Tab Context.sublime-menu" "Tab Context.sublime-menu.org"
cp "../Japanize/Context.sublime-menu.jp" "./Context.sublime-menu"
cp "../Japanize/Indentation.sublime-menu.jp" "./Indentation.sublime-menu"
cp "../Japanize/Main.sublime-menu.jp" "./Main.sublime-menu"
cp "../Japanize/Tab Context.sublime-menu.jp" "./Tab Context.sublime-menu"

cp "../Japanize/Main.sublime-menu" ../User
```

## フォント

```
[Preferences.sublime-settings]
"font_face": "Ricty",
"font_size": 16,
```

## 1 Click プレビュー

```
"preview_on_click": false,
```

## インストールパッケージ

- itg.flat

```
[Preferences.sublime-settings]
"color_scheme": "Packages/Theme - itg.flat/itg.dark.tmTheme",
"theme": "itg.flat.dark.sublime-theme",
"itg_xsmall_tabs": true,
```

- SideBarEnhancements

SublimeText3のみ対応のため古いソースをいれる

```
[コンソールから]
import os; path=sublime.packages_path(); (os.makedirs(path) if not os.path.exists(path) else None); window.run_command('exec', {'cmd': ['git', 'clone', 'https://github.com/titoBouzout/SideBarEnhancements', 'SideBarEnhancements'], 'working_dir': path})

import os; path=sublime.packages_path(); window.run_command('exec', {'cmd': ['git', 'checkout', '37429739a0452a2dc36343fb7875ba7fcbeb88a9'], 'working_dir': os.path.join(path, 'SideBarEnhancements')})
```

自動的にアップデートしないように

```
[Package Control.sublime-settings User]
"auto_upgrade_ignore":
[
	"SideBarEnhancements"
]
```

- LineEndings

```
Add Repository
https://github.com/titoBouzout/LineEndings
```

- Trailing Spaces

```
[Default.sublime-keymap]
{ "keys": ["ctrl+shift+d"], "command": "delete_trailing_spaces" },
{ "keys": ["ctrl+shift+t"], "command": "toggle_trailing_spaces" }
```

- Quick File Open
- GotoRecent|RecentActiveFiles
- AdvancedNewFile
- Terminal


## 設定

- [Preferences]-[基本設定]-[Default]
- [Preferences]-[基本設定]-[User]
- [Sublime Text 2 の設定をいじる](http://blue-ham-cake1024.hatenablog.com/entry/2012/09/07/Sublime_Text_2_%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%82%92%E3%81%84%E3%81%98%E3%82%8B)

### インストール一覧

- "ConvertToUTF8": ShiftJIS に対応する
- "Git": コマンドパレット(Ctrl+Shift+P)からGitコマンドが使用できる
- "HTML5": HTML5 用のスニペット
- "IMESupport": インライン変換の表示位置補正（Windows用）
- "Nettuts+ Fetch": 外部リソースをpullする
コマンドパレット(Ctrl+Shift+P)から"Fetch"コマンド
- "OmniMarkupPreviewer": MarkdownをHTML表示する
Ctrl+Alt+o で表示
- "Package Control"
- "Theme - Soda": テーマ
- "ZenCoding":
- "SublimeServer"
- "Terminal"
- "Alignment"
- "SublimeCodeIntel"
- "AutoFileName"
- "SublimeLinter"
- "IndentGuides"
- "SublimeBlockCursor"
- "DockBlockr"


## 参考

- <http://dev.classmethod.jp/tool/html-corder-sublime-text-2-customize/>






