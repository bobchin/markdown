# Flutter

- [Flutter](#flutter)
  - [参考](#参考)
  - [環境構築](#環境構築)
  - [udemy](#udemy)
    - [使い方](#使い方)

## 参考

- [Flutter](https://flutter.dev/)
- [Dart](https://dart.dev/) : 開発言語（javascriptに近い）
  - [DartPad](https://dartpad.dev/)

- [動かして学ぶ！Flutter開発入門](https://www.shoeisha.co.jp/book/detail/9784798177366)

## 環境構築

- [Get started > Install](https://docs.flutter.dev/get-started/install)

- [Git](https://git-scm.com/download/win) のインストール
- [Flutter SDK](https://docs.flutter.dev/release/archive) のインストール
  - d:\data\study\flutter
  - bin フォルダに PATH を通す
    - FLUTTER_PATH: d:\data\study\flutter
    - PATH: %PATH%; %FLUTTER_PATH%\bin
- [Google Chrome](https://www.google.com/intl/ja_jp/chrome/) のインストール
- [Android Studio](https://developer.android.com/studio?hl=ja) のインストール
- [Visual Studio](https://visualstudio.microsoft.com/ja/downloads/) のインストール
  - Community版
  - Visual Studio Installer から C++によるデスクトップ開発をインストール
- editor
  - VSCode
    - [VSCode](https://code.visualstudio.com/download) のインストール
      - プラグインのインストール
        - Japanese Language Pack for Visual Studio Code
        - [Flutter extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter)
        - 確認

        ```vscode
        Ctrl + Shift + P でコマンドパレットから、flutter doctor を実行
        ```

  - Android Studio
    - flutter プラグインのインストール

- 最終確認

  ```bash
  # path確認
  flutter --version
  # 環境確認
  flutter doctor
  ```

- テスト
  - VSCode
    - アプリケーションの作成。コマンドパレットから、"Flutter: New Project" を選択
    - Application を選択し、新しいプロジェクトを作成する親ディレクトリを選択。
    - プロジェクト名を入力し、Enterを押すと、しばらくしてmain.dart ファイルができる。

- 実行
  - main.dart を開く
  - ステータスバーから作成するデバイスを選択する
    - Windowsアプリの場合は、"Windows desktop"
    - 右上から "Start Debugging"

## udemy

- [いちから始めるFlutterモバイルアプリ開発](https://zenn.dev/heyhey1028/books/flutter-basics)
- [Flutter環境構築（Windows） 前編 - インストールまで](https://blog.css-net.co.jp/entry/2022/05/30/133942)
- [Flutter環境構築（Windows） 後編 - エミュレータ作成と実行](https://blog.css-net.co.jp/entry/2022/06/06/112045)

- Install(Windows)
  - 要件
    - Windows7 以降
    - HDD 10G以上
    - gitをインストール
  - [Get started > Install > Windows](https://docs.flutter.dev/get-started/install/windows)
  - [Flutter SDK](https://docs.flutter.dev/release/archive?tab=windows)
    - flutter_console.bat を起動してみる
    - <install folder>/bin にパスを通す
    - flutter doctor を実行
  - [Android Studio](https://developer.android.com/studio)
    - 以下が必要なもの
      - Android SDK
      - Android SDK platform tools
      - Android SDK build tools
    - プラグインのインストール
      - 「Plutings」を選択し、Marketplace から flutter を検索してインストール。同時にDartもインストールする。
        - ※Projectsに New Flutter Projectが追加される
    - Android SDK CLI のインストール
      - 「Projects」 を選択し、SDK Manager を開く。「Android SDK」欄の「SDK Tools」タブで「Android SDK Command-line Tools (latest)」にチェックをいれる
  - Android Emulator

- Install(Mac)
  - Flutter SDK
  - Android Studio
  - Android Emulator
  - Xcode and command-line tools

### 使い方

- 途中からウィジットを囲みたい場合

  ```txt
  CTRL + .
  ```
