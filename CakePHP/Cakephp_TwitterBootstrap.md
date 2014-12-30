# TwitterBootstrap

## 準備

- node のインストール
- パッケージのインストール

```
npm install -g less jshint recess uglify-js
```

プラグインの設定

plugins/TwitterBootstrap/Vendor 以下にbootstrapのモジュールをダウンロード

```
cd /usr/local/cakephp
git submodule update --init --recursive
```

## 設定変更

> app/Config/bootstrap.php

```
CakePlugin::load('TwitterBootstrap');
```

コンパイル

```
cd app
./Console/cake TwitterBootstrap.copy
./Console/cake TwitterBootstrap.make
```

## 使用方法

> Controller/AppController.php

```
class AppController extends Controller
{
	public $helpers = array(
		'Session',
		'Html' => array('className' => 'TwitterBootstrap.BootstrapHtml'),
		'Form' => array('className' => 'TwitterBootstrap.BootstrapForm'),
		'Pagination' => array('className' => 'TwitterBootstrap.BootstrapPaginator'),
	);
}
```



