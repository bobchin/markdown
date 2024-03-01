# Python Asyncio

## 参考

- [Python Asyncio: The Complete Guide](https://superfastpython.com/python-asyncio/)
- [Pythonの非同期処理 ~async, awaitを完全に理解する~](https://qiita.com/yasuo-ozu/items/acf341297e05f2b1adc4)
- [Python Asyncio入門](https://qiita.com/sand/items/0e445a13d81d20ea33c3)
- [図解「generator・native coroutine・with」 〜 関心やコードを分離する文法と、処理順序・構造](https://zenn.dev/339/articles/6832decc5ef1b4a0821b)

## 単語

- 非同期プログラミング
  - スレッド
  - プロセス
  - コルーチン

- 非同期実行するための仕組み
  - callback
  - Future
  - イベントループ
  - イテレータ
    - ジェネレータ
  - コルーチン

- ノンブロッキングI/O
- Python での非同期プログラミング
  - asyncio モジュール

- コルーチン
  - ジェネレータから拡張？
  - "async def" で定義
  - イベントループで実行を管理する
    - asyncio.run()
    - asyncio.new_event_loop()

## 解説

- イテレータ
  - [Pythonチュートリアル](https://docs.python.org/ja/3/tutorial/classes.html#iterators)
  - [イテレータ型](https://docs.python.org/ja/3/library/stdtypes.html#iterator-types)
    - イテラブル
      - 以下のメソッドを実装したもの
      - __iter__() : iteratorオブジェクトを返す
    - 以下の２メソッドを実装したもの
      - __iter__() : iteratorオブジェクトを返す
      - __next__() : iteratorオブジェクトの次のアイテムを返す。なければStopIteration例外を出す。

  - 使い方

    ```python
    l = [1, 2, 3]
    iterator = iter(l)
    print( next(iterator) )  # 1
    print( next(iterator) )  # 2
    print( next(iterator) )  # 3
    print( next(iterator) )  # StopIteration

    # for文
    for i in l:
      print(i)
    # 1
    # 2
    # 3

    # for文は以下のシンタックスシュガー
    iterator = iter(l)
    while True:
      try:
        i = next(iterator)
        print(i)
      except StopIteration:
        break
    ```

  - 作り方

    ```python
    class Counter(object):
      def __init__(self, start, stop):
        self._counter = start
        self._stop = stop

      def __iter__(self):
        return self

      def __next__(self):
        # 最後まで到達したらStopIteration例外をあげる
        if self._counter > self._stop:
          raise StopIteration()

        ret = self._counter
        self._counter += 1
        return ret

    c = Counter(start=1, stop=3)
    print( next(c) ) # 1
    print( next(c) ) # 2
    print( next(c) ) # 3
    print( next(c) ) # StopIteration

    c = Counter(start=1, stop=3)
    for i in c:
      print(i)
    ```

- ジェネレータ
  - [ジェレネータ型](https://docs.python.org/ja/3/library/stdtypes.html#generator-types)
  - [Pythonチュートリアル](https://docs.python.org/ja/3/tutorial/classes.html#generator-expressions)
  - [Pythonリファレンス ジェネレータ式](https://docs.python.org/ja/3/reference/expressions.html#generator-expressions)
  - [Pythonリファレンス yield式](https://docs.python.org/ja/3/reference/expressions.html#yield-expressions)
  - [Pythonリファレンス ジェレレータ関数](https://docs.python.org/ja/3/reference/datamodel.html#generator-functions)
  - yiled式
    - iteratorオブジェクトの __next__() メソッドを置き換えるもの

      ```python
      # クラスを作らなくてもイテレータオブジェクトを作成できる
      def counter_func(start, stop):
        counter = start
        while True:
          if counter > stop:
            break
          yield counter
          counter += 1

      c = counter_func(start=1, stop=3)
      for i in c:
        print(i)
      ```

- コルーチン
  - [Pythonリファレンス コルーチン関数](https://docs.python.org/ja/3/reference/datamodel.html#coroutine-functions)
  - [Pythonリファレンス コルーチン](https://docs.python.org/ja/3/reference/datamodel.html#coroutines)

## まとめ

- asyncio
  イベントループ内のコルーチンを使って実装し、自身はシングルスレッドで実行される。

