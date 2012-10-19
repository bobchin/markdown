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







