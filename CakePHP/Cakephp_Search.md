# Search プラグイン

## 設定

> モデル

```php
class Post extends AppModel {
	public $actsAs = array('Search.Searchable');
	public $belongsTo = array('Category');

	// POSTパラメータ毎の設定を記述する
    // キーはPOSTするパラメータ名
	public $filterArgs = array(
		'id'     => array('type' => 'value'),
		'title'  => array('type' => 'like', 'before' => true, 'after' => true),
		'range'  => array('type' => 'expression', 'method' => 'makeRangeCondition', 'field' => 'Category.views BETWEEN ? AND ?'),
		'tags'   => array('type' => 'subquery', 'method' => 'findByTags', 'field' => 'Article.id'),
        'filter' => array('type' => 'query', 'method' => 'orConditions'),
	);

    /**
     * $data : $controller->passedArgs (parseCriteria()に渡された値)
     * $field: array('type' => 'expression', 'method' => 'makeRangeCondition', 'field' => 'Category.views BETWEEN ? AND ?')
     */
	public function makeRangeCondition($data, $field)
	{
        // フィールド名は不要
		return array(1, 10);
	}

	public function findByTags($data, $field) {
        // フィールド名は不要
		// "Article.id IN (%s)"" の %sの部分を作成する
        return '1, 2, 3, 4';
    }

    public function orConditions($data, $field) {
        // フィールド名も含めた条件を返す
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
- lookup        : 
- checkbox      : 

### $filterArgs キー一覧

- name		  : Model::data 内に保存されるパラメータ
- type		  : 上記検索の種類
- field		  : 検索に使用する実際のテーブルのフィールド名。指定しない場合はキー名もしくは'name'で指定した値  
                フィールド名の優先度 **'field' > 'name' > 'key'**  
                配列で指定した場合は "OR" で結合される。
- method	  : "expression" "subquery" "query" では必須。条件を作成するモデル内のメソッド名
- allowEmpty  : "expression" "subquery" "query" で使用するオプション設定。フィールドの値が空でも条件を生成する。
- connectorAnd: type=like のときに検索文字で AND とする区切り文字。ex) '+' q=a+b => (q like %a%) AND (q like %b%)
- connectorOr : type=like のときに検索文字で OR とする区切り文字。ex) '|' q=a|b => (q like %a%) OR (q like %b%)

> ここで設定するけどPrgコンポーネントで使用する

- checkbox	  : ビューでチェックボックスを使用する
- encode	  : URL に支障がでないように "%" "/" をエンコードする
- empty		  : 検索文字がない場合に URL から省略する
- value		  : 処理を必要としない固定値


> コントローラ

```php
class ArticlesController extends AppController {
    public $components = array('Search.Prg' => array(
        'model' => 'Post',
    ));
    /*
    public $components = array('Search.Prg' => array(
        // モデル名
        'model' => 'Post',

        // プリセットFormのメソッドの設定
        'presetForm' => array(
            'model'     => null,    // モデル名
        ),

        // commonProcess() 用の設定
        'commonProcess' => array(
            'formName'      => null, // データにセットされるモデル名になる
            'keepPassed'    => true, // Passed 引数を引き継ぐかどうか。通常はNamedパラメータのみ。
            'action'        => null, // Redirect されるときのアクション名
            'modelMethod'   => 'validateSearch', // バリデーションメソッド名
            'allowedParams' => array(), // $this->request->params でパラメータとして有効にするキーのリスト
            'paramType'     => 'named', // named | querystring
            'filterEmpty'   => false, // POSTデータから空の要素を削除するかどうか
        ),
    ));
    */

    // $controller->data | $controller->parsedData に送信データを入れる設定
    public $presetVars = true; // true の場合モデルのfilterArgs設定を使用する

    public function find() {
        // 送信データをバリデートしView用に値をrequestにセットする
        // 検索文字がPOSTされた場合はredirectしてquerystring形式でやり直す
        $this->Prg->commonProcess('Post'); // モデル名を指定したおいたほうが無難
        $this->paginate['conditions'] = $this->Article->parseCriteria($this->passedArgs);
        $this->set('articles', $this->paginate('Post'));
    }
}
```

> $presetVars の設定

```
// キー名はモデルのカラム名を指定する。異なるものを使用する場合は、"field" で指定する。
public $presetVars = array(
    'title'  => array('type' => 'value'), // value | like | query
    'hoge'   => array('type' => 'value', 'field' => 'title'),
    'range'  => array('type' => 'checkbox'), // field（カラム名）が"|"でsplitされる
    // field値をIDとしてモデルを検索してデータをセットする
    // formField : 送信データとするキー名
    // modelField: モデルから取得した
    // mode      : モデル名
    'tags'   => array('type' => 'lookup', 'formField' => '', 'modelField' => '', 'model' => ''),
    'filter' => true, // モデルのfilterArgs設定を使用する
);
```

## サンプルモジュール

> AppController.php

```
    // paginate & search 用モジュール /////////////////////////////////////////////
    public $limitKey = null;

    /**
     * 検索条件が指定されない場合の初期化処理。
     * ソート順もここで処理する。
     */
    protected function initNamedParam($model, $defaults = array())
    {
        // $paginate のパラメータタイプによってデータ取得するパラメータを判断する
        if (isset($this->paginate[$model]['paramType'])
                && $this->paginate[$model]['paramType'] == 'querystring') {
            $target =& $this->request->query;
        } else {
            $target =& $this->request->params['named'];
        }

        // 検索条件が変わった場合は1ページ目を表示する
        if ($this->request->is('post')) {
            unset($target['page']);
        }

        foreach ($defaults as $k => $v) {
            // 初期化処理。request だけでなく passedArgs も処理しておく。
            if (!isset($target[$k])) {
                $target[$k] = $v;
                $this->passedArgs[$k] = $v;
            }

            // ソート順の処理
            if (is_string($this->limitKey) && $k == $this->limitKey) {
                $this->paginate['Master']['limit'] = $target[$k];
            }
        }
    }

    /**
     * 指定した検索データは Form 系なので、ビューで表示するために
     * クエリデータをPOSTデータに入れる処理
     */
    protected function sameParamsToData($model, $keys = array())
    {
        // $paginate のパラメータタイプによってデータ取得するパラメータを判断する
        if (isset($this->paginate[$model]['paramType'])
                && $this->paginate[$model]['paramType'] == 'querystring') {
            $target =& $this->request->query;
        } else {
            $target =& $this->request->params['named'];
        }

        foreach ($keys as $k => $v) {
            $this->request->data['Master'][$k] = $target[$k];
        }
    }

    protected function paginateForSearch($defaults, $model = null, $scope = array(), $whitelist = array())
    {
        $this->initNamedParam($model, $defaults);

        $this->Prg->commonProcess($model);

        $this->sameParamsToData($model, $defaults);

        $conditions = $this->{$model}->parseCriteria($this->passedArgs);
        $conditions = array_merge($conditions, $scope);

        return parent::paginate($model, $conditions, $whitelist);
    }

    // paginate & search 用モジュール /////////////////////////////////////////////
```

> HogeController.php

```
    public function index()
    {
        $defaults = array(
            's' => 0,               // 全学校
            't' => 2,               // 未完了案件
            'p' => 20,              // 20件
            'sort' => 'mt_id',      // ID
            'direction' => 'desc',  // 降順
            'page' => 1,            // ページ
        );
        $this->limitKey = 'p'; 
        $troubles = $this->paginateForSearch($defaults, 'Master');

        $schools = $this->Customer->getCustomerList();

        $this->set(compact('troubles', 'schools'));
    }
```
