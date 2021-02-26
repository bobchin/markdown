# SQLite

## インストール

- [公式サイト](https://www.sqlite.org/index.html)
- [ダウンロード](https://www.sqlite.org/download.html)
  - コマンドラインツール: コマンドで使用する場合はこれのみ
  - DLL: PHP等の他のアプリケーションから利用する場合に使用

## ドキュメント

- [ドキュメント](https://www.sqlite.org/docs.html)

## 使い方

```cmd
REM データベースにアクセスする
sqlite3 [データベース名]

REM 設定確認
.show

REM SQL実行
select * from personal;

REM キーワードを使用する場合は、シングルクォートorダブルクォートor角括弧orバックコートで括る
create table 'select'(id, name);
create table "select"(id, name);
create table [select](id, name);
create table `select`(id, name);

REM コメント
-- コメント
/* コメント */
```

### 型

- データ型

  | 型      | 説明                                               |
  | :------ | :------------------------------------------------- |
  | NULL    | NULL値                                             |
  | INTEGER | 符号付き整数: 1,2,3,4,6,8 バイトで格納             |
  | REAL    | 浮動小数点数: 8バイトで格納                        |
  | TEXT    | テキスト: UTF-8,UTF-16BE,UTF-16LE のいずれかで格納 |
  | BLOB    | Binary Large Object: 入力データをそのまま格納      |

- カラムに指定できるデータ型

  | 型      | 説明                                          |
  | :------ | :-------------------------------------------- |
  | TEXT    | 数値が入力された場合はTEXT型にする            |
  | NUMERIC | 文字列が入力された場合はINTEGERorREAL型にする |
  | INTEGER | 数値or文字列が入力された場合はINTEGER型にする |
  | REAL    | 数値or文字列が入力された場合はREAL型にする    |
  | NONE    | 変換しない                                    |

- サンプル

  ```cmd
  sqlite3 test.sqlite3
  sqlite> create table test(val1, val2);
  sqlite> insert into test values(null, 48);
  sqlite> insert into test values(3.14, 'Tokyo');
  sqlite> insert into test values('Good Morning', 1.2e-2);

  .mode column
  .header on
  select * from test;
  select val1, typeof(val1), val2, typeof(val2) from test;
  ```

### データベース作成

```cmd
REM ※データベース名＝ファイル名: 1ファイルがデータベースになる。
sqlite3 [データベース名]

REM 終了
sqlite> .exit
```

### 確認

```cmd
REM テーブルの確認
sqlite> .tables
```

### テーブル操作

```cmd
REM 作成
REM create table [テーブル名](id, ..);

create table personal(id, name);
create table personal2(id integer, name text);

REM リネーム
REM alter table [旧テーブル名] rename to [新テーブル名];
alter table personal rename to personal_new;

REM 削除
REM dropt talbe [テーブル名];
drop table personal;

REM カラム追加
alter table personal add column email text;

REM プライマリキー制約
REM create table [テーブル名](id primary key, ...);
REM create table [テーブル名](name, ..., primary key(id, ...));
create table user(id integer primary key, name text);

REM rowid
create table user(id integer, name text);
insert into user values(3, 'Yamada');
insert into user values(8, 'Suzuki');
select *, rowid from user;
REM 別名
select *, rowid, oid, _rowid_ from user;

REM autoincrement
create table user(id integer primary key, name text);
insert into user(name) values('Harada');
insert into user(name) values('Yamada');
insert into user(name) values('Tani');
delete from user where id = 3;
insert into user(name) values('Ueda'); // ID=3になる
select * from user;

create table user2(id integer primary key autoincrement, name text);
insert into user2(name) values('Harada');
insert into user2(name) values('Yamada');
insert into user2(name) values('Tani');
delete from user2 where id = 3;
insert into user2(name) values('Ueda'); // ID=4になる
select * from user2;

select * from sqlite_sequence where name = 'user2';

REM 制約
create table [テーブル名](id integer NOT NULL, ...);  // NULL禁止
create table [テーブル名](id integer UNIQUE, ...);    // 重複した値禁止
create table [テーブル名](id integer DEFAULT 0, ...); // 値省略時のデフォルト値
create table [テーブル名](id integer, ..., CHECK(id > 0));     // 入力値をチェックする
```

### スキーマの確認

```cmd
.mode line
select * from sqlite_master;

.schema
```

### ビュー

```cmd
REM 作成
REM create view [ビュー名] as [select文];
create table product(id integer primary key, name text, price integer);
insert into product(name, price) values('りんご', 300);
insert into product(name, price) values('みかん', 500);
insert into product(name, price) values('ばなな', 5000);
insert into product(name, price) values('ぶどう', 4000);
create view myview as select name, price from product where price > 3000;
select * from myview;

REM 削除
REM drop view [ビュー名];
drop view myview;

REM 確認
.tables
select name, sql from sqlite_master where type = 'view';
```

### インデックス

```cmd
REM 作成
REM create index [インデックス名] ON [テーブル名](id, ...);
create table user(name text, old integer, address text);
insert into user values('Yamada', 28, 'Tokyo');
insert into user values('Mori', 22, 'Osaka');
insert into user values('Suzuki', 32, 'Tokyo');
insert into user values('Takagi', 23, 'Tokyo');
insert into user values('Suzuki', 23, 'Osaka');
create index nameindex on user(name);
select * from user where name = 'Suzuki';

REM 確認
.indices

REM 削除
drop index [インデックス名];
```
