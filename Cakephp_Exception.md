# 例外

## 設定

> app/Config/core.php

```php
Configure::write('Exception', array(
    'handler' => 'ErrorHandler::handleException',
    'renderer' => 'ExceptionRenderer',
    'log' => true
));
```

hander 		 : 例外を処理するハンドラ
renderer 	 : 例外を表示するクラス。app/Lib/Error/ 以下に作成し、render() メソッドを実装することで独自のクラスを作成できる。
               コンストラクタに例外クラスが引数として渡される。
log 		 : true の場合、例外とスタックトレースがログに出力される。
consoleHander: コンソール使用時に例外を処理するハンドラ


## HTTP エラー

> 使用例

```php
class SampleController {
	public function view($id)
	{
	    $post = $this->Post->findById($id);
	    if (!$post) {
	        throw new NotFoundException('Could not find that post');
	    }
	    $this->set('post', $post);
	}
}
```

以下は例外と対応するHTTPエラー

- 400: BadRequestException
- 403: ForbiddenException
- 404: NotFoundException
- 405: MethodNotAllowedException
- 500: InternalErrorException
- 501: NotImplementedException


## エラー描画

以下が使用される。

- app/View/Errors/error400.ctp
- app/View/Errors/error500.ctp
- app/View/Layouts/default.ctp

独自のレイアウトを使用したい場合は、
app/View/Layouts/my_layout.ctp を作成し、error400.ctp 内で
```
$this->layout = 'my_layout';
```
を指定する


## 独自の例外クラス

CakeException クラスを継承する。通常は 500 エラーになるので、
テンプレートは error500.ctp が使用される。

```php
class MissingWidgetException extends CakeException {
};
```

独自のテンプレートを使用したい場合は、クラス名から *Exception* を除いた部分の変数名(Inflector::variable())。
`app/View/Errors/missing_widget.ctp`
を作成する。

テンプレートに値を渡したい場合は例外スロー時に指定する。
またエラーメッセージのテンプレートも指定できる。

```php
class MissingWidgetException extends CakeException {
    protected $_messageTemplate = '%s Seems that %s is missing.';
}

throw new MissingWidgetException(array(
	'title' => [Error]', 
	'widget' => 'Pointy',
));
```

> app/View/Errors/missing_widget.ctp

```
Error Contents: <?php echo $name; ?>	// [Error] Seems that Pointy is missing.
widget: <?php echo $widget; ?>			// Pointy
```








