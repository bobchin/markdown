# Python

## リンク

- [Python](https://www.python.org/)
- [Python Japan](https://www.python.jp/)
- [ドキュメント](https://docs.python.org/ja/3/)

## 環境構築

- [ガイド](https://www.python.jp/install/install.html)

- 実行環境
  - Anaconda とPyPIは管理方法が異なるので、同時に使用しないほうがいい
  - Anaconda
    - データサイエンス・科学技術計算向き
    - データサイエンス向けのツールやライブラリが入っている実行環境
  - Python + PyPI(The Python Package Index)
    - プログラミング向き
    - Python Software Foundation(PSF)運営のPythonソフトウェア公開サービス

- バージョン
  - Python2
    - Python2.7で終了
  - Python3
    - Python2と互換性がないので注意
    - 今後はPython3で作成するべき
  - [バージョンについて](https://docs.python.org/ja/3/faq/general.html#how-does-the-python-version-numbering-scheme-work)
    - A.B.C
      - A: メジャーバージョン（重要な変更のみ）
      - B: マイナーバージョン（そこまで大きくない変更）
      - C: バグフィックス

- インストール
  - Windows
    - [ダウンロード](https://www.python.org/downloads/windows/)から **Windows x86-64 executable installer** をダウンロード

  - Mac
    - Python2.7, Python3.7がプリインストール済み
    - Homebrew

      ```sh
      brew install pyenv pyenv-virtualenv
      pyenv install 3.8.5
      pyenv virtualenv 3.8.5 mypyenv3.8.5
      pyenv versions
      # 実行するフォルダで
      pyenv local mypyenv3.8.5
      ```

  - パッケージ
    - pip: PyPIからパッケージをインストールするためのコマンド
      - Python 3.4以降には、標準で付属

## チュートリアル

- モジュール

  ```python
  # import fibo.py
  import fibo
  from fibo import fib, fib2
  import fibo as fib

  # スクリプト実行(__name__ に "__main__" がある場合はスクリプト実行されている)
  if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))

  # 検索パス
  sys.path

  # 名前定義の確認
  import fibo, sys
  dir(fibo)
  dir(sys)
  dir()

  # ビルトインモジュール
  import builtins
  dir(builtins)
  ```

