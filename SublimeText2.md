# SublimeText2

## インストール

- [ダウンロード](http://www.sublimetext.com/)
- [パッケージコントロール](http://wbond.net/sublime_packages/package_control)  
[インストール方法](http://wbond.net/sublime_packages/package_control/installation)

## 日本語化

- http://blog.huwy.org/article/292827228.html
- "Data\Packages\Default" のファイルを置き換える

## パッケージ

### パッケージコントロール

- http://wbond.net/sublime_packages/package_control

```
"Ctrl+`" コンソール起動
以下を貼り付け

import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'
```


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


## 参考

- <http://dev.classmethod.jp/tool/html-corder-sublime-text-2-customize/>







