# SublimeText2

## インストール

- [ダウンロード](http://www.sublimetext.com/)
- [パッケージコントロール](http://wbond.net/sublime_packages/package_control)  
[インストール方法](http://wbond.net/sublime_packages/package_control/installation)

```
"Ctrl+`" コンソール起動
以下を貼り付け

import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'
```


## 設定

- [Preferences]-[基本設定]-[Default]
- [Preferences]-[基本設定]-[User]
- [Sublime Text 2 の設定をいじる](http://blue-ham-cake1024.hatenablog.com/entry/2012/09/07/Sublime_Text_2_%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%82%92%E3%81%84%E3%81%98%E3%82%8B)


## 参考

- <http://dev.classmethod.jp/tool/html-corder-sublime-text-2-customize/>







