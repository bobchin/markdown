# Laravel

## 参考

- (Laravel)[http://laravel.jp/]

## PHP環境

- <= PHP5.4
- mcrypt
- mbstring
- openssl
- tokenizer
- xml

## インストール

```
sudo yum --enable-repos=ius install php54
sudo yum --enable-repos=ius install php54-mcrypt php54-mbstring php54-xml

# laravel5
composer create-project laravel/laravel [projectname] --prefer-dist

# laravel4
composer create-project laravel/laravel [projectname] 4.2 --prefer-dist

# スキャフォールドの削除
php artisan fresh
```

## 設定(laravel4)

```
chmod -R a+o app/storage
```
