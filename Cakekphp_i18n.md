# 国際化？(i18n | l10n)

## 方法

> **__()** メソッドを使用する

```
<h2>Posts</h2>

<h2><?php echo __('Posts'); ?></h2>
```

> プラグインなどでコアと被らないようにするにはドメインを指定する。

```
<h2><?php echo __d('bobchin', 'Posts'); ?></h2>
```

## pot & po  ファイルの作成

> 格納先

```
ex) app/Local/<localte>/LC_MESSAGES/<domain>.po 
app/Local/jpn/LC_MESSAGES/default.po // ドメインを指定しない場合
app/Local/jpn/LC_MESSAGES/bobchin.po // ドメインを指定した場合
```

locale は "jpn" でいい。


## 言語を変える

```
Configure::write('Config.language', 'jpn');

or

$this->Session->write('Config.language', 'jpn');
```

## 翻訳対象を収集する

コンソールを使用する

```
cd app/
./Console/cake i18n

Extract POT file from sources を選択する
```

※ この際に validation のメッセージはデフォルトで含まれることに注意。

∏∏∏何も指定しない場合は default ドメインが指定されるので、
ドメインを指定する場合は、モデルに以下を設定する。

```
class User extends AppModel {

    public $validationDomain = 'validation_errors';
}
```




