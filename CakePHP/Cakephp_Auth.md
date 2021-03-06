# 認証

## AuthComponent の使い方

### 種類
種類は３つ
- Form   : Form の POST を使用して認証する
- Basic  : HTTP の Basic 認証を使用する
- Digest : HTTP の Digest 認証を使用する

※上記認証は複数同時使用することができ、設定した順にチェックされる。
　この場合、一旦チェックOKになったものは次のチェックはされずにOKとなる。

### 設定方法

- 設定箇所はController内の2箇所
- $components
※設定位置に注意。  
=>末端のコントローラの場合そのコントローラのみ対象となる。
通常は全体に認証をかけるのでAppControllerに記述する。

- beforeFilter()

#### $componentsの設定  

> AppController.php

```
種類ごとに設定できる
public $components = array(
    'Auth' => array(
        'authenticate' => arrary(
            'Form' => array('userModel' => 'UserTbl'),
            'Basic' => array('userModel' => 'UserTbl'),
            'Digest' => array('userModel' => 'UserTbl'),
        ),
    ),
);

しかし冗長なので以下のようにできる。
AuthComponent::ALL 欄に各認証共通の設定を共有できる。
App::uses('AuthComponent', 'Controller/Component');
public $components = array(
    'Auth' => array(
        'authenticate' => arrary(
            AuthComponent::ALL => array(
                'userModel' => 'UserTbl'
            ),
            'Form',
            'Basic',
            'Digest',
        ),
    ),
);
```

通常はForm認証しか使わないので以下のようになるはず。
使用出来る共通設定も追記しておく。

> AppController.php

```
App::uses('AuthComponent', 'Controller/Component');

public $components = array(
    'Auth' => array(
        'authenticate' => arrary(
            AuthComponent::ALL => array(
                'userModel' => 'UserTbl',                       // 使用するモデル名。指定しない場合は"User"
                'fields' => array(
                    'username' => 'user_name',                  // ユーザIDとして使用するフィールド名。指定しない場合は"username"
                    'password' => 'pass',                       // パスワードとして使用するフィールド名。指定しない場合は"password"
                    'scope' => array('UserTbl.is_active' => 1), // モデルに渡す"condition"オプション。
                    'contain' => array('UserTbl'),              // モデルに渡す"contain" オプション。モデルで要確認
                ),
            ),
            'Form',
        ),
    ),
);
```

あまり使用しないと思うけど。以下の設定もある。

    Basic認証のみ
    'realm' => 'xxxx',  // 認証される realm（認証領域）。指定しない場合はenv('SERVER_NAME')

    Digest認証のみ
    'realm'  => 'xxxx', // 認証される realm（認証領域）。指定しない場合はenv('SERVER_NAME')
    'nonce'  => 'xxxx', // 認証で使用されるnonce値（cnonceか?）（ランダム値）。指定しない場合はuniqid()
    'qop'    => 'auth', //
    'opaque' => '', // 指定しない場合はmd5($settings['realm'])


#### beforeFilter()の設定  

※注意 AppControllerでも設定できるが、その場合はすべてのコントローラが対象になるので注意。
index を指定した場合は、すべてのコントローラのindexが許可/拒否される。
基本的には各コントローラで指定するほうがいい。

> XXXController.php

```
public function beforeFilter()
{
    parent::beforeFilter();
    $this->Auth->allow('index', 'logout');
    $this->Auth->deny('view', 'login');
}
```


### その他の設定
```
public $components = array(
    'Auth' => array(
        'authenticate' => arrary(
            'Form' => array(),
        ),

        // ログイン処理をするアクション。デフォルトは/users/login
        'loginAction' => array('controller' => '', 'action' => ''),

        // これを指定しない場合は認証確認後に認証前にアクセスしたページにリダイレクトする。
        // 認証後固定の宛先にリダイレクトしたい場合はこれを設定する。
        'loginRedirect' => array('controller' => '', 'action' => ''),

        // これを指定しない場合は、ログオフ後にloginActionのページにリダイレクトする。
        // ログオフ後固定の宛先にリダイレクトしたい場合はこれを設定する。
        'logoutRedirect' => array('controller' => '', 'action' => ''),

        // ログインエラーのメッセージ
        // セッションに"auth"というキーで保存される。セッションの設定は$component['Auth']['flash']を参照。
        'authError' => 'このページを表示するにはログインする必要があります。',

        // flashメッセージで使用するセッションの設定
        'flash' => array(
           'element' => 'default',   // SessionHelper::flash() を参照。表示する際のViewのエレメントを指定する。
                                     // "default" の場合DIVで囲まれ、空の場合はメッセージそのまま表示される。
           'key' => 'auth',          // セッションのキー
           'params' => array(),      // エレメントにセットされるパラメータ
        ),
    ),
);

```


### 独自のAuthentication（認証）オブジェクトを作る

**雛形**

> app/Controller/Component/Auth/XXXAuthenticate.php

```
<?php
App::uses('BaseAuthenticate', 'Controller/Component/Auth');

class XXXAuthenticate extends BaseAuthenticate
{
    public function authenticate(CakeRequest $request, CakeResponse $response)
    {
        $this->settings['userModel'] // コントローラで指定した値を取得できる
        $result = $this->_findUser('user', 'pass'); // データベースから検索する場合に使用できる
        return false OR $result;
    }
}
```  

> AppController.php

```
public $components = array(
    'Auth' => array(
        'authenticate' => arrary(
            AuthComponent::ALL => array(
                'userModel' => 'UserTbl',
                ),
            ),
            'XXX',
        ),
    ),
);
```

#### パスワード暗号化ロジックがCakePHPのものと違う場合

> app/Controller/Component/Auth/MyAuthenticate.php

```
<?php
App::uses('FormAuthenticate', 'Controller/Component/Auth');

class MyAuthenticate extends FormAuthenticate
{
    public function _password($password)
    {
        return MyAuthenticate::crypt($password);
    }

    /*
     * 保存時に使用できるようにstaticに
     */
    public static function crypt($password)
    {
        App::uses('Security', 'Utility');
        return Security::hash($password, 'sha1');
    }
}
```

#### セッションに保存するフィールドを指定できるようにする

> app/Controller/Component/Auth/MyAuthenticate.php

```
<?php
App::uses('FormAuthenticate', 'Controller/Component/Auth');

class MyAuthenticate extends FormAuthenticate
{
    protected function _findUser($username, $password) {
        $userModel = $this->settings['userModel'];
        list($plugin, $model) = pluginSplit($userModel);
        $fields = $this->settings['fields'];

        $conditions = array(
            $model . '.' . $fields['username'] => $username,
            $model . '.' . $fields['password'] => $this->_password($password),
        );
        if (!empty($this->settings['scope'])) {
            $conditions = array_merge($conditions, $this->settings['scope']);
        }

        // 追記 //////////////////////////////////////////////
        $get_fields = array();
        if (!empty($this->settings['fields']['fields'])) {
            $get_fields = $this->settings['fields']['fields'];
        }
        //////////////////////////////////////////////////////

        $result = ClassRegistry::init($userModel)->find('first', array(
            // 追記 ////////////////
            'fields' => $get_fields,
            'conditions' => $conditions,
            'recursive' => (int)$this->settings['recursive'],
            'contain' => $this->settings['contain'],
        ));
        if (empty($result) || empty($result[$model])) {
            return false;
        }
        $user = $result[$model];
        unset($user[$fields['password']]);
        unset($result[$model]);
        return array_merge($user, $result);
    }
}
```

```
public $components = array(
    'Auth' => array(
        'authenticate' => arrary(
            AuthComponent::ALL => array(
                'userModel' => 'UserTbl',
                'fields' => array('username', 'password', 'title'),
                'contain' => array('User'),
            ),
        ),
        'My',
    ),
);
```


### ログインユーザの情報

AuthComponentのuserメソッドで取得  
取得できるデータはAuthenticateクラスのautheticateメソッドで返した値  
引数にキーを指定可能。指定しない場合は全データの配列。
```
<?php
AuthComponent::user('id')

$this->Auth->user('id');
```
