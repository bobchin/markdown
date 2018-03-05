# Ricty と vim の Powerline

## 作成方法
参考
- [http://save.sys.t.u-tokyo.ac.jp/~yusa/fonts/ricty.html](http://save.sys.t.u-tokyo.ac.jp/~yusa/fonts/ricty.html)

> git clone git://github.com/yascentur/Ricty.git Ricty  
> sudo yum install fontforge  

フォントの取得(Inconsolata & Migu 1M)  
> mkdir font  
> cd font  

\# Inconsolata  
> wget http://levien.com/type/myfonts/Inconsolata.otf  

\# Migu 1M  
> wget "http://sourceforge.jp/frs/redir.php?m=iij&f=%2Fmix-mplus-ipa%2F56156%2Fmigu-1m-20120411-2.zip" -O migu-1m-20120411-2.zip  
> unzip migu-1m-20120411-2.zip  
> cp migu-1m-20120411-2/*.ttf ./  


> cp {Inconsolata.otf,migu-1m-regular.ttf,migu-1m-bold.ttf} ../Ricty  
> cd ../Ricty  
> sh ricty_generator.sh Inconsolata.otf migu-1m-regular.ttf migu-1m-bold.ttf


## Windows での作成方法

- [参考](http://mikan.lunarscape.net/2015/06/ricty-option-rewrite.html)
  - Rictyからスクリプト
  	- [ricty_generator.sh](http://www.rs.tus.ac.jp/yyusa/ricty/ricty_generator.sh)
	- [os2version_reviser.sh](http://www.rs.tus.ac.jp/yyusa/ricty/os2version_reviser.sh)
  - Migu 1M フォント	
    - [Migu 1M](https://ja.osdn.net/frs/redir.php?m=iij&f=mix-mplus-ipa%2F63545%2Fmigu-1m-20150712.zip)
  - Inconsolata フォント
	- [Inconsolata](https://fonts.google.com/selection?selection.family=Inconsolata)
  - FontForge
	- [unofficial fontforge-cygwin](http://www.geocities.jp/meir000/fontforge/index.html)
	  - [fontforge-cygwin_2015_01_21.zip](http://www.geocities.jp/meir000/fontforge/fontforge-cygwin_2015_01_21.zip)
	  　※スクリプトが動かないみたいなので古い方を使用する方がよいみたい
	  


- discard
	- 参考  
	- [http://blog.remora.cx/2012/01/vim-powerline.html](http://blog.remora.cx/2012/01/vim-powerline.html)  

	- cygwin インストール  
		- [http://cygwin.com/setup.exe](http://cygwin.com/setup.exe)  
	- Cygwin Ports から Fontforge をインストール  

	```
	コマンドラインから起動  
	> setup.exe -K http://cygwinports.org/ports.gpg  
	リポジトリに以下を追加
	> ftp://ftp.cygwinports.org/pub/cygwinports  
	以下辺りを追加
	> fontforge, libfontforge, python, python-argparse, python-fontforge

	※注意  
	$HOME/.fonts にフォントを入れておくとうまくいく気がする。
	```

## Linux での作成方法

```
> sudo yum install fontforge
> sudo easy_install argparse
```

辺りで行けるはず。




