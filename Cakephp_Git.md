# Git で管理する

- <http://scriptworks.jp/blog/2011/12/how_to_setup_multiple_cakephp_core/>
- <http://1-byte.jp/2010/12/06/cakephp_with_git/>

## フォルダ構成

```
+cakephp
 +cakecore（git で管理する部分）
 +plugins
 +vendors
 +app（自分の作成するアプリケーション）
```


## コアを Git で管理

フォルダ類の作成

```
mkdir -p /var/www/cakephp/{plugins,vendors,app}

// リポジトリから clone する
cd /var/www/cakephp
git clone git://github.com/cakephp/cakephp.git cakecore

.zshrc
alias cake = /var/www/cakephp/cakecore/lib/Cake/Console/cake

cd /var/www/cakephp/cakecore/app
cake bake or ./Console/cake bake

[P]roject を選択して /var/www/cakephp/app/app_hoge などに作成する
```

## バージョンを変更する

バージョンは、*ブランチ* と *タグ* で管理されている。
ブランチは各バージョンの開発ストリームで、タグはリリースのタイミングという扱い。
たぶんタグで取得したほうがいいかと思う。

> タグの取得

```
まだブランチを作成していない場合
ex) git checkout -b <NewBranch> <tag>
git checkout -b Branch-2.2.3 2.2.3

すでにブランチを作成している場合
git checkout Branch-2.2.3

最新に戻す
git checkout master
```

## 最新にする

```
cd /var/www/cakephp/cakecore
git pull
```

## アプリケーション側の設定

/var/www/cakephp/app/app_hoge/webroot/{index.php, test.php}
```
define('APP_DIR', 				 'app_hoge');
define('ROOT', 					 '/var/www/cakephp/app');
define('CAKE_CORE_INCLUDE_PATH', '/var/www/cakephp/cakecore/lib');
```











