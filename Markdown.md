# Markdown

## 参考

- [日本語Markdownユーザー会](http://www.markdown.jp/)


# 記法


## 段落

- 空行を開ける

```
ex)
１段落目
あいうえお

２段落目
かきくけこ

３段落目
さしすせそ
```

１段落目
あいうえお

２段落目
かきくけこ

３段落目
さしすせそ


## 箇条書き（リスト）

- 行頭にハイフン+スペース [- xxx]

```
ex)
* a
+ b
- c

1. あいうえお
1. かきくけこ
1. さしすせそ
```

* a
+ b
- c


1. あいうえお
1. かきくけこ
1. さしすせそ


## 引用

- 行頭に半角不等号 [> xxx]

```
ex)
> 吾輩はねこである  
> 名前はまだない  
> なるほどね
```

> 吾輩はねこである  
> 名前はまだない  
> なるほどね


## リンク

- テキストをブラケットで囲み、URLをカッコで囲む
- URLを外に出すことも可能

```
ex)
[Yahoo](http://www.yahoo.co.jp "ヤホー")

リンク先 [Google]

[Google]: http://google.co.jp
```

[Yahoo](http://www.yahoo.co.jp "ヤホー")

リンク先 [Google]
[Google]: http://google.co.jp


## インライン系

### 強調

- アスタリスクで囲む [\*XXX\* \*\*XXX\*\*]

```
ex)
*イタリック*  
**強調します**  
_イタリック_  
__強調します__  
```

*イタリック*  
**強調します**  
_イタリック_  
__強調します__  


## コードの挿入
`print 'hoge!';`

```php:hoge.php
print "hoge!";
```

## 改行
行末に2つ以上の空白をいれる！


## 水平線
アスタリスク３つ
***
アスタリスク３つ空白あり
* * *
アスタリスク５つ
*****
ダッシュ
- - -  

---


#  別形式にする

- [Pandoc](http://johnmacfarlane.net/pandoc)

## 実行

```shell
// pandoc xxx.md -t [type] -o [output fileneme]
pandoc markdown.md -t docx -o markdown.docx
```
