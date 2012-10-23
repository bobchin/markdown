# cakephp の tips

## 設置
前提  
/var/www/cakephp222 に cakephp のzip を解凍したと仮定する。  


### Alias を使う場合  

/var/www/cakephp222/app/webroot/.htaccess に以下を追加  

```
RewriteBase /cakephp  
```

/etc/httpd/conf.d/cakephp.conf を追加  
> Alias /cakephp /var/www/cakephp222/app/webroot/  

```
<Directory "/var/www/cakephp222/app/webroot">  
   Options FollowSymLinks  
   AllowOverride FileInfo  

   Order deny,allow  
   Deny from all  
   Allow from 127.0.0.1  
   Allow from xxx.xxx.xxx.xxx  
</Directory>  
```

### シンボリックリンクを使う場合  
> sudo ln -s /var/www/cakephp222/app/webroot /var/www/html/cakephp  

/etc/httpd/conf/httpd.conf  

```
AllowOverride None => All  
```

## AuthComponent の使い方

- 種類は３つ
> - Form   : Form の POST を使用して認証する
> - Basic  : HTTP の Basic 認証を使用する
> - Digest : HTTP の Digest 認証を使用する

※上記認証は複数同時使用することができ、設定した順にチェックされる。
　この場合、一旦チェックOKになったものは次のチェックはされずにOKとなる。

### 設定方法
- 設定箇所はController内の2箇所
- $components ※設定位置に注意。
末端のコントローラの場合そのコントローラのみ対象となる。
通常は全体に認証をかけるのでAppControllerに記述する。  
- beforeFilter()  

















