# Search プラグイン

## 設定

> モデル

```php
class Post extends AppModel {
	public $actsAs = array('Search.Searchable');
	public $belongsTo = array('Category');

	// キー毎の設定を記述する
	public $filterArgs = array(
		'id'     => array('type' => 'value'),
		'title'  => array('type' => 'like', 'before' => true, 'after' => true),
		'range'  => array('type' => 'expression', 'method' => 'makeRangeCondition', 'field' => 'Category.views BETWEEN ? AND ?'),
		'tags'   => array('type' => 'subquery', 'method' => 'findByTags', 'field' => 'Article.id'),
        'filter' => array('type' => 'query', 'method' => 'orConditions'),
	);

	public function makeRangeCondition($data, $field)
	{
		// $data = $controller->passedArgs (parseCriteria()に渡された値)
		// $field = array('type' => 'expression', 'method' => 'makeRangeCondition', 'field' => 'Category.views BETWEEN ? AND ?')
		return array(1, 10);
	}

	public function findByTags($data, $field) {
		// "Article.id IN (%s)"" の %sの部分を作成する
        return '1, 2, 3, 4';
    }

    public function orConditions($data, $field) {
        $filter = $data['filter'];
        $cond = array(
            'OR' => array(
                $this->alias . '.title LIKE' => '%' . $filter . '%',
                $this->alias . '.body LIKE' => '%' . $filter . '%',
            ));
        return $cond;
    }
}
```

### type一覧

- value(int)	: 完全一致
- like(string)	: 部分一致（like）
- expression	: 独自メソッドで条件を作成（BETWEEN句の作成など）
- subquery		: サブクエリ（IN句の作成など）
- query			: 汎用検索

### キー一覧

- name		: Model::data 内に保存されるパラメータ
- type		: 上記検索の種類
- field		: 検索に使用する実際のテーブルのフィールド名
- method	: 条件を作成するモデル内のメソッド名
- allowEmpty: "expression" "subquery" "query" で使用するオプション設定。フィールドの値が空でも条件を生成する。
- checkbox	: ビューでチェックボックを使用する
- encode	: URL に支障がでないように "%" "/" をエンコードする
- empty		: 検索文字がない場合に URL から省略する
- value		: 処理を必要としない固定値


> コントローラ

```php
class ArticlesController extends AppController {
    public $components = array('Search.Prg');

    public $presetVars = true; // モデルの設定を使用する

    public function find() {
        $this->Prg->commonProcess();
        $this->paginate['conditions'] = $this->Article->parseCriteria($this->passedArgs);
        $this->set('articles', $this->paginate());
    }
}
```


