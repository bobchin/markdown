# rshell

## 参考

- [rshell (Remote Shell for MicroPython) が 動かない (不具合回避方法)](https://qiita.com/e951e55b/items/89f39e163b0d7f9619ae)
- [rshellをMicroPython開発に使う](https://blog.goediy.com/?p=1459)
- [Visual Studio Code and rshell](https://forum.micropython.org/viewtopic.php?t=11967)

## インストール

```python
pip install rshell
```

## 使い方

- "/pyboard" が pico のフォルダとなる

```python
# ex) rshell -p COM1
rshell -p <COM PORT>

# ファイルリスト
ls /pyboard

# コピー
cp foo.py /pyboard # PC => pico
cp /pyboard .      # pico => PC

# ファイル表示
cat /pyboard/main.py

# repl Ctrl-Xで終了
repl
```



