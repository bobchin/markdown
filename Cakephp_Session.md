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

設定ファイルを編集  
> app/Config/core.php  

```
Configure::write('Session', array(
    'defaults' => 'database',
));
```

### 独自モデルを使用する場合（あまりないはず）
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

