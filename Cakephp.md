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


