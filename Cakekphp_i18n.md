# 国際化？(i18n | l10n)

## 方法

**__()** メソッドを使用する

```
<h2>Posts</h2>

<h2><?php echo __('Posts'); ?></h2>
```

## pot & po  ファイルの作成

> 格納先

```
app/Local/jpn/LC_MESSAGES/default.po
```

## 言語を変える

```
Configure::write('Config.language', 'jpn');

or

$this->Session->write('Config.language', 'jpn');
```

