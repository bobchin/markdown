# StackEdit

## ポイント

- オフラインでアクセスできる
- ローカルドキュメントは別のブラウザとは共有できない
- ドキュメントを移動するには、"Ctrl+[" or "Ctrl+]"

## 記法(Markdown Extra)

### テーブル

- 通常

Item     | Value
-------- | ---
Computer | $1600
Phone    | $12
Pipe     | $1

- アライメント指定

| Item     | Value | Qty   |
| :------- | ----: | :---: |
| Computer | $1600 |  5    |
| Phone    | $12   |  12   |
| Pipe     | $1    |  234  |

### リスト

Term 1
Term 2
:   Definition A
:   Definition B

Term 3

:   Definition C

:   Definition D

	> part of definition D

### コードブロック

```
// Foo
var bar = 0;
```

### 脚注

You can create footnotes like this[^footnote].

  [^footnote]: Here is the *text* of the **footnote**.

### 句読点のスマート化

|                  | ASCII                        | HTML              |
 ----------------- | ---------------------------- | ------------------
| Single backticks | `'Isn't this fun?'`          | 'Isn't this fun?' |
| Quotes           | `"Isn't this fun?"`          | "Isn't this fun?" |
| Dashes           | `-- is en-dash, --- is em-dash` | -- is en-dash, --- is em-dash |

### 目次

[TOC]

### 数式

- インライン($で囲む)

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

- ブロック($$で囲む)

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

- ギリシャ文字









### UML図
