# Access Control List（アクセス制御）

## 用語

- ARO(Access Request Objects): 何かを必要としているモノ
- ACO(Access Control Objects): 何かを必要とされているモノ

※ ACL とは、ARO がいつ ACO にアクセスできるかを決定すること！


## 準備

> app/Config/core.php

```
// データベースで管理する場合（通常）
Configure::read('Acl.classname', 'DbAcl');
Configure::read('Acl.database', 'default');
=> app/Config/Schema/db_acl.sql

// ini ファイルで管理する場合
Configure::read('Acl.classname', 'IniAcl');
Configure::read('Acl.database', 'default');
=>app/Config/acl.ini.php

// php ファイルで管理する場合
Configure::read('Acl.classname', 'PhpAcl');
Configure::read('Acl.database', 'default');
=> app/Config/acl.php
```

"Acl.classname" は lib/Cake/Controller/Component/Acl/*.php が使用できる。

1. DbAcl
1. IniAcl
1. PhpAcl

## サンプル構成

- adminグループ  
*root*, *kinpachi*
- teacherグループ  
*kinpachi*
- studentグループ  
*katou*

## ini の場合

```
; Users
; 所属グループと個人の権限
[root]
groups = admin
allow = read, write, execute
deny = 

[kinpachi]
groups = admin, teacher
allow = read, write
deny = execute

[katou]
groups = student
allow = read
deny = write, execute

; Groups
; グループの権限
[admin]
allow = read, write, execute
deny = 

[teacher]
allow = read, write
deny = execute

[student]
allow = read
deny = write, execute
```

## Databaseの場合

```
cd app/
Console/cake schema create DbAcl
```

以下３つのテーブルが作成される

1. acos 	: ACO の一覧
1. aros 	: ARO の一覧
1. aros_acos: ACO と ARO の関連

**テーブルのフィールド**

- model		  : ARO または ACO として使用するデータを管理しているテーブルのモデル名
- foreign_key : 上記テーブルに対する外部キー
- alias		  : ARO または ACO のエイリアス名（ACL上の管理名）
- parent_id   : ツリー構造の場合の親ID（親は自分のテーブル内のID）
- lft/rght    : SQL の入れ子集合で使う（http://gihyo.jp/dev/serial/01/sql_academy2/000501）

### ARO データの作成

> bake で作成

```
cd app/
./Console/cake acl create aro 0 admin
./Console/cake acl create aro 0 teacher
./Console/cake acl create aro 0 student

./Console/cake acl view aro

Welcome to CakePHP v2.2.2 Console
---------------------------------------------------------------
App : app_acl
Path: /xxx/app/
---------------------------------------------------------------
Aro tree:
---------------------------------------------------------------
  [1] admin
  [2] teacher
  [3] student
---------------------------------------------------------------

./Console/cake acl create aro 1 root
./Console/cake acl create aro 2 kinpachi
./Console/cake acl create aro 3 katou
```

> Controller から作成

```
public $components = array('Acl');

public function create_aro()
{

	$parents = array(
		array(
			'alias' => 'admin',
		),
		array(
			'alias' => 'teacher',
		),
		array(
			'alias' => 'student',
		),
	);

	$aro = $this->Acl->Aro;
	foreach ($parents as $parent) {
		$aro->create();
		$aro->save($parent);
	}

	$users = array(
		array(
			'alias' => '管理者',
			'parent_id' => 1,
		),
		array(
			'alias' => '金八',
			'parent_id' => 2,
		),
		array(
			'alias' => '加藤',
			'parent_id' => 3,
		),
	);

	foreach ($users as $user) {
		$aro->create();
		$aro->save($user);
	}
}
```

### ACO データの作成

> bake で作成

```
cd app/
./Console/cake acl create aco 0 action

./Console/cake acl view aco

Welcome to CakePHP v2.2.2 Console
---------------------------------------------------------------
App : app_acl
Path: /var/www/cakephp222/app_acl/
---------------------------------------------------------------
Aco tree:
---------------------------------------------------------------
  [1] action
---------------------------------------------------------------

./Console/cake acl create aco 1 read
./Console/cake acl create aco 1 write
./Console/cake acl create aco 1 execute
```

> Controller から作成

```
public $components = array('Acl');

public function create_aco()
{

	$parents = array(
		array(
			'alias' => 'action',
		),
	);

	$aco = $this->Acl->Aco;
	foreach ($parents as $parent) {
		$aco->create();
		$aco->save($parent);
	}

	$actions = array(
		array(
			'alias' => 'read',
			'parent_id' => 1,
		),
		array(
			'alias' => 'write',
			'parent_id' => 1,
		),
		array(
			'alias' => 'execute',
			'parent_id' => 1,
		),
	);

	foreach ($actions as $action) {
		$aco->create();
		$aco->save($action);
	}
}
```


## ARO と ACO の関連付け（権限の設定）

> bake で作成

```
cd app/
./Console/cake acl deny admin action
./Console/cake acl grant admin action/read
./Console/cake acl grant admin action/write
./Console/cake acl grant admin action/execute

./Console/cake acl deny teacher action
./Console/cake acl grant teacher action/read
./Console/cake acl grant teacher action/write
./Console/cake acl deny teacher action/execute

./Console/cake acl deny student action
./Console/cake acl grant student action/read
./Console/cake acl deny student action/write
./Console/cake acl deny student action/execute
```


> Controller から作成

```
public $components = array('Acl');

public function create_assignment()
{
	$this->Acl->deny('admin', 'action');
	$this->Acl->allow('admin', 'action/read');
	$this->Acl->allow('admin', 'action/write');
	$this->Acl->allow('admin', 'action/execute');

	$this->Acl->deny('teacher', 'action');
	$this->Acl->allow('teacher', 'action/read');
	$this->Acl->allow('teacher', 'action/write');
	$this->Acl->deny('teacher', 'action/execute');

	$this->Acl->deny('student', 'action');
	$this->Acl->allow('student', 'action/read');
	$this->Acl->deny('student', 'action/write');
	$this->Acl->deny('student', 'action/execute');

	// 通常はコントローラ＆アクションで制限するのでその場合は、create|delete|read|update

	$this->Acl->allow('teacher', 'action', 'create');
	$this->Acl->allow('teacher', 'action', 'delete');
	$this->Acl->allow('teacher', 'action', 'read');
	$this->Acl->allow('teacher', 'action', 'update');
}
```


> AclExtras プラグイン

ACO をコントローラとアクションで指定する場合に、全コントローラ・アクションを設定するのは大変だが、
一括して登録してくれるプラグイン。

> app/Config/bootstrap.php に以下を追記

```
CakePlugin::load('AclExtras');
```

```
cd app/Plugin
git clone git://github.com/markstory/acl_extras.git AclExtras

./Console/cake AclExtras.AclExtras aco_sync
```




## 権限を確認する

```
public $components = array('Acl');

public function create_assignment()
{
	debug ( $this->Acl->check('admin', 'action') );			// true

	debug ( $this->Acl->check('teacher', 'action') );		// false
	debug ( $this->Acl->check('teacher', 'action/read') );	// true

	// 通常はコントローラ＆アクションで制限するのでその場合は、create|delete|read|update
	debug ( $this->Acl->check('teacher', 'action', 'create') );
	debug ( $this->Acl->check('teacher', 'action', 'delete') );
	debug ( $this->Acl->check('teacher', 'action', 'read') );
	debug ( $this->Acl->check('teacher', 'action', 'update') );
}
```

## ACL Behavior

これを使用すると、モデルとARO/ACOを透過的に扱うことができるようになる。

> 設定

```
// ACO モードとして使用する場合（デフォルト）
class Post extends AppModel {
	public $actsAs = array('type' => 'controlled');  
}

// ARO モードとして使用する場合
class Post extends AppModel {  
	public $actsAs = array('type' => 'requester');  
}

// 両モードとして使用する場合
class Post extends AppModel {  
	public $actsAs = array('type' => 'both');  
}
```

モデルに parentNode() メソッドを追加する  
これは Acl ビヘイビアで親子関係を決定するのに使用する。  
返り値は、親を表現するデータを返す。  
親の場合は **"null"**。子の場合は **親モデルのデータ** にする。  
```
class User extends AppModel {
	public function parentNode()
	{
		if (!$this->id && empty($this->data)) {
			return null;
		}
		if (isset($this->data['User']['group_id'])) {
			$groupId = $this->data['User']['group_id'];
		} else {
			$groupId = $this->field('group_id');
		}

		if (!$groupId) {
			return null;
		} else {
			return array('Group' => array('id' => $groupId));
		}
	}
}

class Group extends AppModel {
	public function parentNode()
	{
		return null;
	}
}
```

> ユーザに対して権限をつけずにグループのみに権限を付ける場合

```
class User extends AppModel {
	public function bindNode($user)
	{
		return array(
			'model' => 'Group',
			'foreign_key' => $user['User']['group_id'],
		);
	}
```

## 権限の確認方法

lib\Cake\Controller\Component\Auth\\*Authorize.php を参照

1. ActionsAuthorize.php 	: リクエストURLのコントローラとアクションで判断する
1. ControllerAuthorize.php 	: Controller::isAuthorized($user) で判断する
1. CrudAuthorize.php 		: リクエストの 'action' を aro_aco のキーとする

### 設定

actionPath: 判断する ACO の先頭につける文字（全体のROOTを指定するのに使用する）
userModel : ARO とするオブジェクトのモデル名
actionMap : aro_aco の _create, _delete, _read, _write にマッピングするキー

> AppController.php

```
class AppController extends Controller {
	public $components = array(
		'Acl',
		'Auth' => array(
			'authorize' => array(
				'Actions' => array(										// ActionsAuthorize
					'actionPath' => 'controllers',
					'userModel' => array('User', 'Group'),
				),		
			 // 'Controller' => array(),								// ControllerAuthorize
			 // 'Crud' => array('actionPath' => 'controllers'),			// CrudAuthorize
			),
		),
		'Session',
	);
}
```

