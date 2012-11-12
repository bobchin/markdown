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

テーブルのフィールド

- model		  : ARO または ACO として使用するデータを管理しているテーブルのモデル名
- foreign_key : 上記テーブルに対する外部キー
- alias		  : ARO または ACO のエイリアス名（ACL上の管理名）
- parent_id   : ツリー構造の場合の親ID（親は自分のテーブル内のID）
- lft/rght    : SQL の入れ子集合で使う（http://gihyo.jp/dev/serial/01/sql_academy2/000501）











