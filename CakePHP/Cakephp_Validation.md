# Validation

## 設定方法

1. シンプルルール
2. １フィールド１ルール
3. １フィールド複数ルール
4. 独自ルール

> シンプルルール

```
# フィールド名 => ルール名
public $validate = array('name' => 'alphaNumeric');
```

> １フィールド１ルール

```
# フィールド名 => ルール名
public $validate = array(
	'name' => array(
		'rule'       => 'alphaNumeric',      // ルール名。引数が必要な場合は、array('minLength', 3)
		'required'   => true,                // true|'create'|'update': フィールドが必要かどうか
		'allowEmpty' => false,               // true|false: フィールドの値が空でもOKかどうか
		'on'         => 'create',            // 'create'|'update': バリデートするタイミング
		'message'    => 'Error Occurred!!!', // エラーメッセージ
	)
);
```

> １フィールド複数ルール

```
# フィールド名 => ルール名
public $validate = array(
	'name' => array(
		'rule1' => array(                        // 適当なルール名を被らないように
			'rule'       => 'alphaNumeric',
			'required'   => true,
			'allowEmpty' => false,
			'on'         => 'create',
			'message'    => '英数字のみ有効です',
			'last'       => false,               // デフォルトではエラーに成ったら次に行かない。false にすると次のバリデーションも実行する。
		),
		'rule2' => array(                        // 適当なルール名を被らないように
			'rule'       => array('minLength', 8),
			'message'    => '８文字以上必要です',
		),
	)
);

# ルール名が勿体無いので、エラーメッセージにできる。
public $validate = array(
	'name' => array(
		'英数字のみ有効です' => array(           // エラーメッセージ
			'rule'       => 'alphaNumeric',
		),
		'８文字以上必要です' => array(           // エラーメッセージ
			'rule'       => array('minLength', 8),
		),
	)
);
```


> 独自ルール

```
public $validate = array(
	# 正規表現で指定
	'name' => array(
		'rule' => '/^[a-z0-9]{3,}$/i', // rule に正規表現を指定する
		'message' => '英数字のみ３文字以上で指定してください',
	),

	# 独自メソッドで指定
	'promotion_code' => array(
		'rule' => array('limitDuplicates', 25), // メソッド名とメソッドに渡す引数
		'message' => 'このコードは２５回までしか使用できません',
	),
);

// メソッドは public で指定する必要あり
public function limitDuplicates($check, $limit)
{
	// $check = array('promotion_code' => 'value') 第１引数は対象フィールドと入力値
	// $limit = 25
	$existing_promo_count = $this->find('count', array(
		'conditions' => $check,
		'recursive' => -1,
	));
	return $existing_promo_count < $limit;
}
```

## バリデーションのメソッド

- *メソッドは、バリデートを実装したモデル|ビヘイビア内で検索されます*
- ルールの検索順序は以下の通り(see CakeValidationRule::process())

1. モデル|ビヘイビアのメソッド名
2. Validationクラスのメソッド名
3. 正規表現（そのままpreg_match()に渡されます）

*モデル|ビヘイビアのメソッドが優先なので既存のバリデーションをオーバーライドできます*


## 動的な追加・削除

モデル内で
> $this->validator()->add()
を使用する

XXX Model

```
# $this->validator()->add('field', 'validate name', array('rule'));

$this->validator()->add('name', 'required', array(
	'rule' => 'notEmpty',
	'required' => true,
));

# 複数指定の場合、「１フィールド複数ルール」と同じ考え
$this->validator()
	->add('name', 'required', array(
		'rule' => 'notEmpty',
		'required' => true,
		'message' => '何かを指定してください',
	))
	->add('name', 'size', array(
		'rule' => array('between', 8, 20),
		'message' => '８～２０文字で入力してください',
	));

# もしくは
$this->validator()->add('name', array(
	'required' => array(
		'rule' => 'notEmpty',
		'required' => true,
		'message' => '何かを指定してください',
	),
	'size' => array(
		'rule' => array('between', 8, 20),
		'message' => '８～２０文字で入力してください',
	),
));

```

```
// getField() = CakeValidationSet

// 単発
$this->validator()->getField('name')->setRule('required', array(
	'rule' => 'notEmpty',
	'required' => true,
	'message' => '何かを指定してください',
));

// 複数
$this->validator()->getField('name')->setRules(array(
	'required' => array(
		'rule' => 'notEmpty',
		'required' => true,
		'message' => '何かを指定してください',
	),
	'size' => array(
		'rule' => array('between', 8, 20),
		'message' => '８～２０文字で入力してください',
	),
));
```

```
// 指定フィールドのすべてのルールを削除
$this->validator()->remove('name');

// 指定フィールドの指定バリデートを削除
$this->validator()->remove('name', 'required');
```


## 既設のバリデーション

- notEmpty: ホワイトスペース以外の文字が含まれるか  
```array('rule' => 'notEmpty')```

- alphaNumeric: 英数字のみか  
```array('rule' => 'alphaNumeric')```

- between: 文字数が指定以上、指定以下か（1以上10以下）  
```array('rule' => array('between', 1, 10))```

- blank: 空欄もしくはホワイトスペースのみ  
```array('rule' => 'blank')```

- boolean: 0|1|true|false|'0'|'1'  
```array('rule' => 'boolean')```

- cc: クレジットカードの番号か  
```array('rule' => array('cc', array('visa'), false, null))```

- comparison: ２つの数値を比較  
```array('rule' => array('comparison', '<', 18))```  
```array('rule' => array('comparison', 'isless', 18))```  
オペレータ: > | < | >= | <= | == | != |  
            isgreater | isless | greaterorequal | lessorequal | equalto | notequal  

- custom: 正規表現に合致するか
```array('rule' => array('custom', '/\d{3,}/'))```  

- date: 日付フォーマットに合致するか
```array('rule' => array('date', 'ymd'))```  
```array('rule' => array('date', array('ymd', 'dmy')))```  
フォーマット: dmy(27-12-2013) | mdy(12-27-2013) | ymd(2013-12-27) | dMy(27 Dec 2013) | Mdy(Dec 27 2013) | My(Dec 2013) | my(12 2013)  
区切り文字は、' ' | '.' | '-' | '/'

- time: 日付フォーマットに合致するか
```array('rule' => 'time')```  
フォーマット: HH:MM | [H]H:MM[a|p]m  

- datetime: 日付フォーマットに合致するか
```array('rule' => array('datetime', 'ymd'))```  
```array('rule' => array('datetime', array('ymd', 'dmy')))```  
フォーマット: 日付部分は"date" 時間部分は"time" と同じ

- decimal: 有効な10進数か
```array('rule' => 'decimal'))```  
```array('rule' => array('decimal', true))```  
フォーマット: なし（10進数か）| true(少数か) | 数値(少数点数が指定の数か)

- email: メールアドレスの形式。
```array('rule' => 'email'))```  
```array('rule' => array('email', true))```  DNSに問い合わせて有効かどうか  

- equalTo: 指定値と同じか
```array('rule' => array('equalTo', 'abc'))```  

- extension: 拡張子が指定値と同じか
```array('rule' => 'extension'))```  
```array('rule' => array('extension', array('jpg', 'gif')))```  
拡張子を指定しない場合は、array('gif', 'jpeg', 'png', 'jpg') が指定されたものとする




