# コマンドプロンプト

## 参考

- [DOS コマンド一覧](http://pf-j.sakura.ne.jp/program/dos/doscmd/)

## 基礎

- 基本

```
REM コメント
::  本来はラベルだが、コメントとして使用できる

REM メッセージ表示
ECHO Hello, World.

REM 変数宣言（変数名と=の間は詰めること）
REM SET var=[文字列]
REM SET /A var=[式]  : 右側を評価する
REM /P: ユーザに入力させたものを変数に代入
SET hoge=あいうえお
SET /A hoge=(1+2)
SET /P hoge=数字を入力してください
ECHO %hoge%
```

- 数値

```
REM 数値 "SET /A" を使う。使えるのは整数のみ。
SET /A num=0
SET /A num=2147483647
SET /A num=0x12         : 16進数（値は28）
SET /A num=022          :  8進数（値は28）

REM 数値演算
SET /A num=1+1    : 2
SET /A num=1-1    : 0
SET /A num=1*2    : 2
SET /A num=1/2    : 0 小数は切り捨て
SET /A num=3%2    : 1 コマンドラインの場合
SET /A num=3%%2   : 1 スクリプトの場合

REM インクリメント・デクリメント
SET /A num=3
SET /A num+=1     : 4
SET /A num-=1     : 3
```

- 文字列

```
REM 文字列 クオートは必要なし。= の後の空白も認識する。
SET str=abc       : "abc"
SET str=de f      : "de f"
SET str= g hi     : " g hi"

REM 結合・切り出し
SET str1=abc
SET str2=def
SET str=%str1%%str2%  : "abcdef"

ECHO $str1:a=あ%       : "あbc"
ECHO %str1:~0,2%      : "aa"
```

- 制御構文

-- IFコマンド

```
REM IFコマンド
REM IF condition statement
REM IF condition (
REM   statement
REM ) ELSE (
REM   statement
REM )
REM IF str1 EQU|NEQ|LSS|LEQ|GTR|GEQ st2 statement

SET str1=abc
SET str2=abc
SET str3=def
SET str4=ABC
IF %str1%==%str2% ECHO 同じ
IF not %str1%==%str3% ECHO 違う
IF /I %str1%==%str4% ECHO 同じ
IF %str1%==%str2% (
  ECHO 同じ
) ELSE (
  ECHO 違う
)

IF not EXIST c:\hoge.txt ECHO 存在しない
```

-- ループ

```
SET /A i=0
:LOOP

ECHO %i%
IF %i%==10 GOTO END
SET /A i+=1

GOTO LOOP

:END
```

-- forコマンド

```
SET /A start=1
SET /A step=2
SET /A end=10
FOR /L %%i IN (%start%, %step%, %end%) DO ECHO %%i

FOR %%i IN (aaa bbb ccc) DO @ECHO %i
```

- サブルーチン

```
REM EXIT [/B] [終了コード]
REM /B: 指定するとスクリプト自体だけ終了する。cmd.exeは終了しない。

CALL :SUM 1, 2
ECHO %ERRORLEVEL%
GOTO END

:SUM
SET /A num1=%1
SET /A num2=%2
SET /A total=num1+num2
EXIT /B %total%

:END
```

- ファイルの読み込み

```
REM FOR の /F を使用する
REM /F: 指定したファイルを1行ずつ返す

FOR /F "tokens=*" %%i IN (input.txt) DO ECHO %%i >> output.txt
FOR /F "tokens=1,2,*" %%a IN ("This is a pen.") DO (
  ECHO %%a
  ECHO %%b
  ECHO %%c
)
FOR /F "tokens=2,3 delims=/" %%p IN ('date /T') DO ECHO %%p::%%q
```

- %~ 構文（引数の展開）

```
REM %xxx%
REM %0～%9   : コマンドラインパラメータ

ECHO %0       : スクリプトファイル名[C:\home\edu\BAT\expand\test.bat]
ECHO %0
ECHO %~0      : ファイル名[test]
ECHO %~f0     : フルパス[C:\home\edu\BAT\expand\test.bat]
ECHO %~d0     : ドライブ名[C:]
ECHO %~p0     : パス名のみ[\home\edu\BAT\expand\]
ECHO %~n0     : ファイル名[test]（拡張子無し）
ECHO %~x0     : 拡張子[.bat]
ECHO %~s0     : 短い名前のみ[C:\home\edu\BAT\expand\test.bat]
ECHO %~a0     : ファイル属性[--a------]
ECHO %~t0     : ファイル日付[2010/02/05 00:45]
ECHO %~z0     : ファイルサイズ[204]
ECHO %~dp0    : ファイルの場所[C:\home\edu\BAT\expand\]
ECHO %~nx0    : ファイル名[test.bat]（拡張子付き）
ECHO %~fs0    : 完全なパスと短い名前[C:\home\edu\BAT\expand\test.bat]
ECHO %~ftza0  : 複合表示[--a------ 2010/02/05 00:45 204 C:\home\edu\BAT\expand\test.bat]
```
