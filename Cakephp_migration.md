# Migration

## 設定

> app/Config/bootstrap.php

```
CakePlugin::load('Migrations');
```

## 使い方

- 初期化

```
cake Migration.migration run all -p Migrations

# データベースに "shema_migrations" というテーブルが作成される
```

- 最初のマイグレーションを作成

途中で聞かれる質問は、マイグレーションの名前なので「initilize」辺りでいいかも。
実行後、app/Config/Migration 以下にファイルが作成される。:

```
cake Migrations.migration generate
```

- イテレーション

> 変更前に必ず dump する

```
cake schema generate
```

> DBのスキーマを変更後マイグレーションを作成する

```
# -f を指定しないと対応するモデルがある場合のみとなるので注意
cake Migrations.migration generate -f
```

- 使用方法

> 最新にする

```
cake Migrations.migration all
```

> アップダウン

```
# 今の状態からバージョンを進めたり戻りしたりする
cake Migrations.migration run down
cake Migrations.migration run up
```

> 戻す先を指定する場合

```
cake Migrations.migration run

# バージョンが表示されるので戻したいものを指定する
```


> 全て削除

```
cake Migrations.migration reset
```



