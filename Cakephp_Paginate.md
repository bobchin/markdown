# ペジネーション

## 設定

コントローラの $paginate プロパティに設定する。  
モデルの find() メソッドと同じキーを指定できる。

```
ex)
$paginate = array(
    'fields' => array('Post.id', 'Post.name'),
    'conditions' => array(),
    'order' => array(
        'Post.title' => 'asc',
    ),
    'limit' => 20,
    'page' => 1,
    'contain' => array('Post'),
    'joins' => array(),
    'recursive' => 1,
);
```

モデル毎に設定することができる。
$paginate = array(
    'Post' => array(
        ...
    ),
);

## データを取得

```
$this->paginate();
$this->paginate('Post');

// $paginate プロパティで指定した "conditions" とマージされる
$conditions = array('Post.name LIKE' => '%hoge%');
$this->paginate('Post', $conditions);
```


## カスタムクエリによるページネーション

> 参考：PaginationComponent::paginate()

```
function paginate($conditions, $fields, $order, $limit, $page = 1, $recursive = null, $extra = array())
{
    return $this->find('all');
}

function paginateCount($conditions, $recursive = null, $extra = array())
{
    return 10;
}
```

Behavior を使用する場合
```
Behaviorメソッドの仕様として引数の先頭が$modelとなり、使用モデルのインスタンスが渡される。
function paginate($model, $conditions, $fields, $order, $limit, $page = 1, $recursive = null, $extra = array())
{
    return $this->find('all');
}

function paginateCount($model, $conditions, $recursive = null, $extra = array())
{
    return 10;
}
```








