# セッション


## セッションをDBに保存する
以下のSQLをもとにテーブルを作成する。
> app/Config/Schema/sessions.sql  

```
CREATE TABLE cake_sessions (
  id varchar(255) NOT NULL default '',
  data text,
  expires int(11) default NULL,
  PRIMARY KEY  (id)
);
```

**bake を使用する場合**  

```
cd app/
./Console/cake scheme create sessions  

Welcome to CakePHP v2.2.x Console
---------------------------------------------------------------
App : app
Path: /xxx/xxx/cakephp22x/app/
---------------------------------------------------------------
Cake Schema Shell
---------------------------------------------------------------

The following table(s) will be dropped.
cake_sessions
Are you sure you want to drop the table(s)? (y/n)
[n] > y
Dropping table(s).
cake_sessions updated.

The following table(s) will be created.
cake_sessions
Are you sure you want to create the table(s)? (y/n)
[y] >
Creating table(s).
cake_sessions updated.
End create.
```



設定ファイルを編集  
> app/Config/core.php  

```
Configure::write('Session', array(
    'defaults' => 'database',
));
```




## 独自モデルを使用する場合（あまりないはず）
> app/Model/MySession.php

```
class MySession extends AppModel
{
    public $name = 'MySession';
    public $useTable = 'cake_sessions';
    public $primaryKey = 'id';
}
```

> app/Config/core.php  

```
Configure::write('Session', array(
    'defaults' => 'database',
    'handler' => array(
        'model' => 'MySession',
    ),
));
```

