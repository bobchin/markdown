# 最近触ってない PHP のメモ

## リスト

- 名前空間(5.3 <=)
- 遅延静的束縛(5.3 <=)
- SPL
- Composer
- Phar
- コーディング規約(PSR-0)

## コーディング規約

- http://www.infiniteloop.co.jp/blog/2012/10/psrphp/
- http://www.slideshare.net/yandod/psrphp
- http://9ensan.com/blog/programming/php/php-psr-coding-standards/


## 名前空間

```
namespace キーワード
```

## Composer

依存関係管理ツール。パッケージ管理ではない。
ただし、PEARはOS単位だったのに比較してプロジェクト単位で扱えるようになっている。
設定は「composer.json」で設定する。

monolog/monolog パッケージの1.2で始まるバージョン
```
{
	"require" : {
		"monolog/monolog": "1.2.*"
	}
}
```

- インストール


要は"https://getcomposer.org/installer" を実行すればいい。
"composer.phar" が作成される。
"composer.phar" は実行可能ファイルなので
/usr/loca/bin 辺りにリネームコピー or シンボリックリンクを張るといい。

```
curl -sS https://getcomposer.org/installer | php
 or
php -r "readfile('https://getcomposer.org/installer');" | php

ln -s composer.phar /usr/local/bin/composer
```

### autoload

ダウンロードしたフォルダ(etc Venderなど)に "autoload.php" ができるので、
自分のアプリ内でこれを require すればいい。

```
require 'vender/autoload.php';
```

### composer.json

```
{
	# パッケージの名称
	”name”: "",

	# リポジトリ
	"repositories": [
		{
			"type": "composer",
			"url": "http://xxx"
		},
		{
			"type": "vcs",
			"url": "git://xxx"
		},
		{
			"type": "pear",
			"url": "http://xxx"
		}
	],

	# 必要なパッケージとバージョンを指定する
	"require": {
		"hoge/hoge": "1.2.3",
		"hoge/hoge": "1.2.3",
	},
}
```

### 主な使い方




