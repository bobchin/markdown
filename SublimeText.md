# SublimeText

## インストール

- [ダウンロード](http://www.sublimetext.com/)
- [パッケージコントロール](http://wbond.net/sublime_packages/package_control)
- [インストール方法](http://wbond.net/sublime_packages/package_control/installation)

## キー操作

- [キーボードショートカット](http://wakamsha.github.io/dev.cm/appendix/cheatsheet/sublimetext.html)

- コンソール起動
> *[Ctrl + `]*

- コマンドパレット起動
> *Win: [Ctrl+Shift+P]*  
> *Mac: [Cmd+Shift+P]*  

- ウィンドウ分割
> *[Alt+Shift+1~4]* 縦分割  
> *[Alt+Shift+5]*   ４分割  
> *[Alt+Shift+8~9]* 横分割  

- 単語選択
> *[ctrl+D]* 同じ単語を選択  
> *[ctrl+K]* 上記最中に単語をスキップ  

- 行操作
> *[ctrl+shift+↑]* 行ごと上に移動  
> *[ctrl+shift+↓]* 行ごと下に移動  
> *[ctrl+shift+D]*  行をコピー  
> *[ctrl+shift+K]*  行を削除  

- テキスト操作
> *[ctrl+shift+enter]* 前に空行を挿入  
> *[ctrl+enter]*       後ろに空行を挿入  



## パッケージ

### パッケージコントロール

- [インストール](https://sublime.wbond.net/installation)

"Ctrl+`" コンソール起動し、以下を貼り付け

```
# SublimeText 3

import urllib.request,os,hashlib; h = '2deb499853c4371624f5a07e27c334aa' + 'bf8c4e67d14fb0525ba4f89698a6d7e1'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```


### パッケージのインストール

コマンドパレット起動して、*Install Package* を選択する。

### インストールしたパッケージのリスト

**"Package Control.sublime-settings"** ファイル内の **[installed_packages]** セクションで取得できる。

Win: *"%APPDATA%\Sublime Text 3\Packages\User"*  
Mac: *"~/Library/Application Support/Sublime Text 3/Packages/User"*  


## テーマ

- [Theme - Flatland](https://github.com/thinkpixellab/flatland)
- [Theme - Nexus](https://github.com/EleazarCrusader/nexus-theme)
- [Theme - itg.flat]()

```js
[Preferences.sublime-settings]

// Flatland
"color_scheme": "Packages/Theme - Flatland/Flatland Dark.tmTheme",
"theme": "Flatland Dark.sublime-theme",

// Nexus
"color_scheme": "Packages/Theme - Nexus/Nexus.tmTheme",
"theme": "Nexus.sublime-theme",

"color_scheme": "Packages/Theme - itg.flat/itg.dark.tmTheme",
"theme": "itg.flat.dark.sublime-theme",
"itg_xsmall_tabs": true,
```


## 日本語関連

- ConvertToUTF8
- Codecs33(Macのみ)
- IMESupport(Winのみ)
- Japanize

```shell
// Japanize
// Win: %APPDATA%\Sublime Text 3\Packages\
// Mac: ~/Library/Application Support/Sublime Text 3/Packages/

cd %DIR%/Default
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


## 設定

```js
[Preferences.sublime-settings]

// フォント
"font_face": "Ricty",
"font_size": 16,

// 1Click プレビュー 
"preview_on_click": false,

// ファイルエンコード・改行コード表示
"show_encoding": true,
"show_line_endings": true,
```


## インストールパッケージ

- [SideBarEnhancements](https://sublime.wbond.net/packages/SideBarEnhancements)
- [BracketHighlighter](https://sublime.wbond.net/packages/BracketHighlighter)
- [Alignment](https://sublime.wbond.net/packages/Alignment)
- [EditorConfig](https://sublime.wbond.net/packages/EditorConfig)
- [Smart Delete](https://sublime.wbond.net/packages/Smart%20Delete)
- [Terminal](https://sublime.wbond.net/packages/Terminal)
- [Sublime Files](https://sublime.wbond.net/packages/Sublime%20Files)
- [Emmet](https://sublime.wbond.net/packages/Emmet)
- [DataConverter](https://sublime.wbond.net/packages/DataConverter)
- [FindKeyConflicts](https://sublime.wbond.net/packages/FindKeyConflicts)
- [RecentActiveFiles](https://sublime.wbond.net/packages/RecentActiveFiles)
- [SublimeGit](https://sublime.wbond.net/packages/SublimeGit)
- [Git​Gutter](https://sublime.wbond.net/packages/GitGutter)
- [OmniMarkupPreviewer](https://sublime.wbond.net/packages/OmniMarkupPreviewer)
- [LineEndings](https://sublime.wbond.net/packages/LineEndings)
- [Markdown Extended](https://sublime.wbond.net/packages/Markdown%20Extended)


## 設定

- [Preferences]-[基本設定]-[Default]
- [Preferences]-[基本設定]-[User]
- [Sublime Text 2 の設定をいじる](http://blue-ham-cake1024.hatenablog.com/entry/2012/09/07/Sublime_Text_2_%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%82%92%E3%81%84%E3%81%98%E3%82%8B)

### インストール一覧

- "Git": コマンドパレット(Ctrl+Shift+P)からGitコマンドが使用できる
- "HTML5": HTML5 用のスニペット
- "Nettuts+ Fetch": 外部リソースをpullする
コマンドパレット(Ctrl+Shift+P)から"Fetch"コマンド
- "SublimeServer"
- "SublimeCodeIntel"
- "AutoFileName"
- "SublimeLinter"
- "IndentGuides"
- "SublimeBlockCursor"
- "DockBlockr"
- "ExpandRegion"

## 参考

- <http://dev.classmethod.jp/tool/html-corder-sublime-text-2-customize/>






