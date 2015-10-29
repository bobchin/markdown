# makeについて

## 記述のルール

```
target1: dependence1
[tab]command1

target2: dependence2 dependence3
[tab]command2
[tab]command3
```

- ターゲット名はコロンで区切る
  - make 実行時に指定する引数となる
- 依存ファイルはスペース区切りで複数指定できる
- コマンドも複数指定できる
- 一番上に記述したターゲットが **デフォルトゴール** となる
  - make 実行時に引数指定しない場合に実行されるものになる
- ターゲットファイルの存在の有無と依存ファイルとのタイムスタンプの比較によりコマンドを実行するかどうか決める

```
target1: target2
[tab]command1

target2: dependence2
[tab]command2
```

- *target1* 実行時は依存ファイルが *target2* なので、target2が先に実行される

## 変数

```
FOO = foo $(BAR)
BAR = bar baz
BAR += hoge       # $(BAR) => foo bar baz hoge

VAR1 := var
VAR1 := $(VAR1) hoge uni

VAR2 ?= hoge      # VAR2がないときだけ代入
```

- $(XXX) で変数を展開する
- **=** で指定した変数は参照時に展開される
- **:=** で指定した変数は定義時に展開される

## よく使用される暗黙のルール

```
# C: *.c => *.o
$(CC) -c $(CPPFLAGS) $(CFLAGS) xxx.c

# C++: *.cc|*.cpp|*.C => *.o
$(CXX) -c $(CPPFLAGS) $(CXXFLAGS) xxx.cc

# AS: *.S => *.s
$(CPP) $(CPPFLAGS) xxx.S

# AS: *.s => *.o
$(AS) $(ASFLAGS) *.s

# link: *.o => *.*
$(CC) $(LDFLAGS) xxx.o $(LOADLIBES) -o xxx
```

- 暗黙で定義される変数

|変数名|デフォルト|
|:--|:--|
AR      | ar
AS      | as
CC      | cc
CXX     | g++
CPP     | $(CC) -E
RM      | rm -f
ARFLAGS | rv
ASFLAGS |
CFLAGS  |
CXXFLAGS|
CPPFLAGS|
LDFLAGS |

## パターン

- **%** : 空でない任意の文字列

- 自動変数

|自動変数|内容|
|:--:|:--|
$@ | ターゲットファイル名
$< | 最初の依存ファイル名
$? | ターゲットより新しいすべての依存ファイル名
$^ | すべての依存ファイル名

## 条件文

- 構文

```
ifeq (ARG1, ARG2)
# ifeq 'ARG1', 'ARG2'
# ifeq "ARG1", "ARG2"
# ifdef ARG1
echo true
else
echo false
endif

```

- 次のものが使用できる
  - ifeq
  - ifneq
  - ifdef
  - ifndef
