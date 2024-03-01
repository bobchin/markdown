# デコレータ

## 参考

- [Pythonのデコレータを理解するための12Step](https://qiita.com/_rdtr/items/d3bc1a8d4b7eb375c368)

## callable

呼び出し可能な関数のこと。
実装としては、__call__() メソッドが実装されていること。
__call__() メソッドを実装しているオブジェクトが関数のように呼び出されたときに実行される。

```python
class Test:
    def __init__(self, test):
        self.test = test
    def __call__(self):
        return "[" + self.test + "]"

t = Test("hoge")
print( t() )    # [hoge]
```

## サンプル

1. 関数
    <br>
    ```python
    def foo():
      return 1

    print(foo()) # 1
    ```
    <br>

2. スコープ

    関数を作成すると、名前空間ができる。
    <br>
    ```python
    y = 30
    def foo(arg):
        x = 10
        print(locals())

    foo(20) # {'x': 10, 'arg': 20}
    {print(i) for i in globals().items() if "y" in i[0]}    # {'y': 30}
    ```
    <br>

3. 変数の解決規則
    - 作成の際には常に新しい変数がその名前空間の中に作られる
    - 参照は同じ名前空間内を検索し, 無ければ外側に検索を広げていく
    <br>

    ```python
    text = "I am global!"
    def foo():
        print(text)

    foo()   # "I am global!"


    text = "I am global!"
    def foo2():
        text = "I am local!"
        print(locals())

    foo2()      # {'text': 'I am local!'}
    print(text) # 'I am global!'
    ```
    <br>

4. 変数のライフタイム

    関数内で宣言した変数は関数内のみ使える。関数が終了すると破棄される。
    <br>
    ```python
    def foo():
        x = 1
        print(locals())

    foo()       # {'x': 1}
    print(x)    # NameError: name 'x' is not defined
    ```
    <br>

5. 関数の引数とパラメータ

    関数の定義時のパラ―メタ名が、ローカル変数になる。
    <br>
    ```python
    def foo(x, y=0, *args, **params):
        print(locals())

    foo(1)                      # {'x': 1, 'y': 0, 'args': (), 'params': {}}
    foo(1, 2)                   # {'x': 1, 'y': 2, 'args': (), 'params': {}}
    foo(1, 2, 3, 4, hoge=10)    # {'x': 1, 'y': 2, 'args': (3, 4), 'params': {'hoge': 10}}
    foo(y=3, x=4)               # {'x': 4, 'y': 3, 'args': (), 'params': {}}
    ```
    <br>

6. 関数のネスト
    <br>
    ```python
    def outer():
        x = 1
        def inner():
            print(x)    # ローカル変数が見つからないので外に探しにいく
        inner()

    outer()     # 1
    ```
    <br>

7. 関数はファーストクラスオブジェクトである
    <br>
    ```python
    print( issubclass(int, object) )    # True

    def foo():
        pass
    print(foo.__class__)  # <class 'function'>

    print( issubclass(foo.__class__, object) )    # True

    def outer():
        def inner():
            print("Inside inner")
        return inner

    foo = outer()
    print(foo)  # <function outer.<locals>.inner at 0x...>
    foo()       # Inside inner
    ```
    <br>

8. クロージャ
    inner関数は、自身が定義されたときのスコープ情報を記憶する
    <br>
    ```python
    def outer():
        x = 1
        def inner():
            print(x)
        return inner

    foo = outer()
    print(foo.__closure__)  # (<cell at 0x...: int object at 0x...>,) <- クロージャ内で保持されている変数情報

    def outer(x):
        def inner():
            print(x)
        return inner

    print1 = outer(1)
    print2 = outer(2)
    print1()    # 1
    print2()    # 2
    ```
    <br>

9. デコレータ
    関数を引数に取り、引き換えに新しい関数を返すcallable。
    <br>
    ```python
    def outer(some_func):
        def inner():
            print("before some_func")
            ret = some_func()
            return ret + 1
        return inner

    def foo():
        return 1

    decorated = outer(foo)
    res = decorated()   # "before some_func"
    print(res)          # 2
    ```
    <br>

10. @シンボルの適用
    <br>
    ```python
    # add = wrapper(add)

    @wrapper
    def add(a, b):
        return a + b
    ```
    <br>

11. *args と **kwargs
    <br>
    ```python
    def one(*args):
        print(args)

    one()           # ()
    one(1, 2, 3)    # (1, 2, 3)

    def two(x, y, *args):
        print(x, y, *args)

    two('a', 'b', 'c')  # a , b, (c,)
    lst = ['a', 'b', 'c']
    two(*lst)           # a , b, (c,)

    ####################################

    def foo(**kwargs):
        print(kwargs)

    foo()           # {}
    foo(x=1, y=2)   # {'x': 1, 'y': 2}

    dct = {'x': 3, 'y': 4}
    foo(**dct)      # {'x': 3, 'y': 4}
    ```
    <br>

12. ジェネリックなデコレータ
    <br>
    ```python
    def logger(func):
        def inner(*args, **kwargs):
            print(f"Arguments were: {args}, {kwargs}")
            return func(*args, **kwargs)
        return inner

    @logger
    def foo1(x, y=1):
        return x * y

    @logger
    def foo2():
        return 2

    foo1(5, 4)  # Arguments were: (5, 4), {}
    foo1(1)     # Arguments were: (1,), {}
    foo1(3,y=4  # Arguments were: (3,), {'y': 4}
    foo2()      # Arguments were: (), {}
    ```
    <br>

### パターンごと

- [Python デコレータ再入門　 ~デコレータは種類別に覚えよう~](https://qiita.com/macinjoke/items/1be6cf0f1f238b5ba01b)

1. 引数なしデコーダでラッパー関数を返す

    ```python
    def args_logger(f):
        def wrapper(*args, **kwargs):
            f(*args, **kwargs)
            print(f"{args=}, {kwargs=}")
        return wrapper

    @args_logger
    def print_message(msg):
        print(msg)

    print_message("hello")
    > hello
    > args=(), kwargs={}
    ```

    <br><br>
    引数がない場合は、デコレータ定義時にfが渡される関数が実行される

    ```python
    def logger(f):
        print("02.logger: start")
        def wrapper(*args, **kwargs):
            print("05.wrapper: start")
            f(*args, **kwargs)
            print("07.wrapper: end")
        print("03. logger: end")
        return wrapper

    print("01.logger: defined")
    @logger
    def print_message(msg):
        print("06.print_message: run")

    print("04.print_message: start")
    print_message("hello")
    print("08.print_message: end")
    ```


2. 引数ありデコーダでラッパー関数を返す

    ```python
    def args_joiner(*dargs, **dkwargs):
        def decorator(f):
            def wrapper(*args, **kwargs):
                newargs = dargs + args
                newkwargs = {**dkwargs, **kwargs}
                f(*newargs, **newkwargs)
            return wrapper
        return decorator

    @args_joiner('darg', dkwarg=True)
    def print_args(*args, **kwargs):
        print(f"{args=}, {kwargs=}")

    print_args('arg', kwarg=False)
    > args=('dargs', 'arg'), kwargs={'dkwarg': True, 'kwarg': False}
    ```

    <br><br>
    引数がある場合は、デコレータ定義時に引数が渡される関数が実行され、
    その後にfが渡される関数が実行される。

    ```python
    def joiner(*dargs, **dkwargs):
        print("02.joiner: start")
        def decorator(f):
            print("04.decorator: start")
            def wrapper(*args, **kwargs):
                print("07.wrapper: start")
                newargs = dargs + args
                newkwargs = {**dkwargs, **kwargs}
                f(*newargs, **newkwargs)
                print("09.wrapper: end")
            print("05.decorator: end")
            return wrapper
        print("03.joiner: end")
        return decorator

    print("01.joiner: defined")
    @joiner('darg', dkwarg=True)
    def print_args(*args, **kwargs):
        print("08.print_args: run")

    print("06.print_args: start")
    print_args('arg', kwarg=False)
    print("10.print_args: end")
    ```


3. 引数ありデコーダでラッパー関数を返さない

    ```python
    funcs = []
    def appender(*args, **kwargs):
        def decorator(f):
            print(args)
            if kwargs.get('option1'):
                print("option1 is True")
            funcs.append(f)
        return decorator

    @appender('arg1', option1=True)
    def hoge():
        print("hoge")

    @appender('arg2', option1=False)
    def fuga():
        print("fuga")

    [f() for f in funcs]
    ```

3. 引数なしデコーダでラッパー関数を返さない

    ```python
    funcs = []
    def appender(f):
        funcs.append(f)
        return f

    @appender()
    def hoge():
        print("hoge")

    @appender()
    def fuga():
        print("fuga")

    [f() for f in funcs]
    hoge()
    fuga()
    ```