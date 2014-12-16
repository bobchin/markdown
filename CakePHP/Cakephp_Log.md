# ロギング

## 設定

> app/Config/bootstrap.php

```
CakeLog::config('foo', array(
	'engine' => 'FileLog',						// lib/Cake/Log/Engine/*.php
	'types' => array('warning', 'error'),		// ログを取得する種類を指定する
	'scopes' => array('orders', 'payments'),	// ログ設定を振り分けるのに使用する
	'file' => 'shops.log',						// FileLog.php の設定
));

CakeLog::config('bar', array(
	'engine' => 'FileLog',							// lib/Cake/Log/Engine/*.php
	'types' => array('notice', 'info', 'debug'),	// ログを取得する種類を指定する
	'scopes' => array('payments'),					// ログ設定を振り分けるのに使用する
	'file' => 'payments.log',						// FileLog.php の設定
));
```

## ログの書き込み

以下の２種類ある。

1. CakeLog::write('type', 'message', ['scope']);
2. 各オブジェクトの $this->log('message', 'type');

スコープとか指定できないので、CakeLog::write() を使った方がいいのかも？

※ write だと type を指定しないといけないので、以下がある。メソッド名がタイプとなる。
- CakeLog::emergency('msg', ['scope']);
- CakeLog::alert('msg', ['scope']);
- CakeLog::critical('msg', ['scope']);
- CakeLog::error('msg', ['scope']);
- CakeLog::warning('msg', ['scope']);
- CakeLog::notice('msg', ['scope']);
- CakeLog::debug('msg', ['scope']);
- CakeLog::info('msg', ['scope']);

```
CakeLog::warning('Warning!', 'orders');
CakeLog::warning('Warning!', 'payments');
CakeLog::warning('Warning!', 'contacts');
```

## ログを日付で分ける

> app/Config/bootstrap.php

FileLog ではファイル名に日付を指定してあげればいい。

```
CakeLog::config('foo', array(
	'engine' => 'FileLog',
	'types' => array('warning', 'error'),
	'file' => sprintf('debug-%s', date('Ymd')),
));
```

## 独自のロギングオブジェクトを作成する

CakeLogInterface を継承する。
基本的には write($type, $message) を実装するだけ。

> app/Lib/Log/Engine/DatabaseLogger.php

```
App::uses('CakeLogInterface', 'Log');

class DatabaseLogger implements CakeLogInterface {
    public function __construct($options = array()) {
        // ...
    }

    public function write($type, $message) {
        // write to the database.
    }
}
```

> bootstrap.php

```
CakeLog::config('otherFile', array(
    'engine' => 'DatabaseLogger',
    'model' => 'LogEntry',
    // ...
));
```
