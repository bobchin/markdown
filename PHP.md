# 最近触ってない PHP のメモ

## リスト

- phpenv
- 名前空間(5.3 <=)
- 遅延静的束縛(5.3 <=)
- SPL
- Composer
- Phar
- コーディング規約(PSR-x)

### phpenv

- [](https://github.com/CHH/phpenv)
- [](http://qiita.com/uchiko/items/5f1843d3d848de619fdf)

- インストール

```
curl https://raw.githubusercontent.com/CHH/phpenv/master/bin/phpenv-install.sh | bash
git clone git://github.com/CHH/php-build.git ~/.phpenv/plugins/php-build
```

- アップデート

```
UPDATE=yes phpenv-install.sh
```

- 設定

```
# .zshrc.local
# ※rbenvを利用しているのでrbenvの後に記述する？
export PATH=$HOME/.phpenv/bin:$HOME/.phpenv/shims:$PATH
source $HOME/.phpenv/completions/rbenv.zsh
if [ -f phpenv ]; then
	eval "$(phpenv init -)"
fi
```

### コーディング規約

- [](http://www.infiniteloop.co.jp/blog/2012/10/psrphp/)
- [](http://www.slideshare.net/yandod/psrphp)
- [](http://9ensan.com/blog/programming/php/php-psr-coding-standards/)


### 名前空間

```
namespace キーワード
```

### Composer

- リンク
  - [本家](https://getcomposer.org/)
  - [日本語](https://kohkimakimoto.github.io/getcomposer.org_doc_jp/doc/)

依存関係管理ツール。yumやaptのようなパッケージ管理ツールではない。
パッケージやライブラリを扱うことができるが、
PEARはOS単位だったのに対して、プロジェクト単位で扱えるようになっている。
基本的にはプロジェクト内の **「vendor」** というディレクトリにそれらがインストールされる。
グローバルにはインストールされないが、 **"global"** コマンドを使用することで、
グローバルなプロジェクトもサポートされている。

- システム要件
  - PHP 5.3.2 以上
  - 多少センシティブなコンパイルオプションが必要だが、  
    インストーラを使用すれば警告を出してくれる。
  - zipファイルでインストールしない場合は、git, snv, hg などが必要


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

  - (Download)[https://getcomposer.org/download/]
  - Linux / OSX
    - ローカル

```
# https://getcomposer.org/installer をダウンロードして実行する。
# PHP の設定をチェックして、composer.phar ダウンロードする。
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '070854512ef404f16bac87071a6db9fd9721da1684cd4589b1196c3faf71b9a2682e2311b36a5079825e155ac7ce150d') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

# composer.phar のインストール場所を指定したい場合(bin/ composerができる)
php composer-setup.php --install-dir=bin --filename=composer
```
	- グローバル
      - composer.phar をパスの通ったところにおけばいい。

```

mv ~/composer.phar /usr/local/bin/composer
ln -s ~/composer.phar /usr/local/bin/composer
など
```

  - Windows
   - (インストーラ)[https://getcomposer.org/Composer-Setup.exe]を使う
   - マニュアルインストール

```
Linuxと同様にして "composer.phar" を作成する。
composer.phar の近くに composer.bat を作成する。

# composer.bat
echo @php "%~dp0composer.phar" %*>composer.bat
```

- 基本的な使い方
  ロギングライブラリ "monolog/monolog" をインストールすることを例にする。

  - プロジェクトのセットアップ
    - **composer.json** が必要となる。このファイルにプロジェクトの依存関係やメタデータを記述する。

  - require キー
    - プロジェクトが依存しているパッケージを指定する
	- パッケージ名(ベンダー名とプロジェクト名)
	- パッケージバージョン
	  - 範囲指定      : ">", ">=", "<", "<=", "!="
	  - 論理積・論理和: AND:カンマ区切り OR: パイプ区切り
	  - ワイルドカード: "*"
	  - チルダ(セマンティックバージョニング): ~1.2 => >=1.2,>2.0   ~1.2.3 => >=1.2.3,<1.3

```
# composer.json
{
	"require": {
		"monolog/monolog": "1.0.*"
	}
}
```

  - 依存ライブラリのインストール
    - 以下を実行すると、vendorディレクトリに依存ライブラリがダウンロードされる
	- composer.lock が作成され、実際にインストールされたバージョンが記述される

```
# install では composer.lock のバージョンが維持される
php composer install

# update すると新しいバージョンをインストールする
php composer update
php composer update monolog/monolog # 個別のライブラリのみ指定
```

  - [Packagist](https://packagist.org/): Composer リポジトリ（パッケージの取得元）

  - オートロード
    - 依存ライブラリをインストールした vendorディレクトリに **autoload.php** ができる。
	- これをinlcludeすることでライブラリをオートロードできる

```
require __DIR__ . '/vendor/autoload.php';

$log = new Monolog\Logger('name');
$log->pushHandler(new MonoLog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));
$log->addWarning('Foo');
```

    - composer.json 内でautoload フィールドを使用すれば自由にオートロードを追加できる
	  - 名前空間とディレクトリをマッピングする。
	  - 以下でsrcはプロジェクトのルートディレクトリにあり、同じレベルにvendorディレクトリがあるとする。
	  - autoload を追加したら**dump-autoload**を再実行して、vendor/autoload.php を再作成する。

```
# composer.json
{
	"autoload": {
		"psr-4": {"Acme\\": "src/"}
	}
}

# vendor/autoload.php はオートローダのインスタンスを返すのでオブジェクトを利用できる。
$loader = require __DIR__ . '/vendor/autoload.php';
$loader->Add('Acme\\Test\\'. __DIR__);
```



- アップデート

```
composer self-update
```

#### autoload

ダウンロードしたフォルダ(etc Venderなど)に "autoload.php" ができるので、
自分のアプリ内でこれを require すればいい。

```
require 'vender/autoload.php';
```

#### composer.json

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

#### 主な使い方
