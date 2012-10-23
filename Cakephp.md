# cakephp の tips

## 設置
前提  
/var/www/cakephp222 に cakephp のzip を解凍したと仮定する。  


### Alias を使う場合  

/var/www/cakephp222/app/webroot/.htaccess に以下を追加  

```
RewriteBase /cakephp  
```

/etc/httpd/conf.d/cakephp.conf を追加  
> Alias /cakephp /var/www/cakephp222/app/webroot/  

```
<Directory "/var/www/cakephp222/app/webroot">  
   Options FollowSymLinks  
   AllowOverride FileInfo  

   Order deny,allow  
   Deny from all  
   Allow from 127.0.0.1  
   Allow from xxx.xxx.xxx.xxx  
</Directory>  
```

### シンボリックリンクを使う場合  
> sudo ln -s /var/www/cakephp222/app/webroot /var/www/html/cakephp  

/etc/httpd/conf/httpd.conf  

```
AllowOverride None => All  
```

## AuthComponent の使い方

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

$componentsの設定  

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












