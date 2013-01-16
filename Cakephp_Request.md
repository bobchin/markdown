# Request

- [Request](http://book.cakephp.org/2.0/en/controllers/request-response.html)
- [passed-arguments](http://book.cakephp.org/2.0/en/development/routing.html#passed-arguments)
- [named-parameters](http://book.cakephp.org/2.0/en/development/routing.html#named-parameters)

## Arguments

URLでコントローラとアクション以降の部分

$controller->params['pass'] | $controller->passedArgs で取得できる。

> Passed Argument

```
http://localhost/calendars/view/recent/mark

=> $controller->params['pass'] = array(
	 0 => 'recent',
	 1 => 'mark',
   );
   $controller->passedArgs = array(
	 0 => 'recent',
	 1 => 'mark',
   );
```

> Named parameters

```
http://localhost/calendars/view/recent:foo/mark:bar

=> $controller->params['named'] = array(
	 'recent' => 'foo',
	 'mark'   => 'bar',
   );
   $controller->passedArgs = array(
	 'recent' => 'foo',
	 'mark'   => 'bar',
   );
```

> 混合

```
http://localhost/calendars/view/recent:foo/mark:bar/baz

=> $controller->params['pass'] = array(
	 0        => 'baz',
   );
   $controller->params['named'] = array(
	 'recent' => 'foo',
	 'mark'   => 'bar',
   );
   $controller->passedArgs = array(
	 0        => 'baz',
	 'recent' => 'foo',
	 'mark'   => 'bar',
   );
```

**※$controller->passedArgs = array_merge($controller->params['pass'], $controller->params['named'])** であることに注意！

## 送信データ

- $this->request->data	: POST データ
- $this->request->query	: GET データ
- $this->request->params: 全データ

> $this->request->params

- plugin    : プラグイン名
- controller: コントローラ名
- action    : アクション名
- named     : Named パラメータ
- pass      : Passed 引数
- prefix    : プリフィックス（ルーティング）
- requested : requestAction() からのリクエストのときtrue

requestAction() : 内部的にアクションを実行して結果を返す






