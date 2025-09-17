# VOICEVOX

## Links

- [VOICEVOX](https://voicevox.hiroshiba.jp/)
- [VOICEVOX CORE](https://github.com/VOICEVOX/voicevox_core)
- [PythonからVOICEVOX Coreを使ってみる](https://qiita.com/taka7n/items/1dc61e507274b93ee868)

## まとめ

### 構成要素

- エディタ
  - GUIを表示するためのモジュール
- エンジン
  - テキスト音声合成APIを公開するためのモジュール。ウェブサーバになっている。
- コア
  - 音声合成に必要な計算をするモジュール。動的モジュールになっている。

### python



- PEP668
- 仮想環境(venv)
  - [venvで手軽にPythonの仮想環境を構築しよう](https://qiita.com/shun_sakamoto/items/7944d0ac4d30edf91fde)

    ```bash
    $ # python -m venv [仮想環境名]
    $ python -m venv voicevox

    $ # . [仮想環境名]/bin/activate
    $ . voicevox/bin/activate

    $ # インストール済みパッケージの書き出し
    $ pip freeze > requirement.txt
    $ pip install -r requirement.txt

    $ # ディアクティベート
    $ deactivate
    ```

  - [VOICEVOX コア ユーザーガイド](https://github.com/VOICEVOX/voicevox_core/blob/main/docs/guide/user/usage.md)

    ```bash
    0.16からの情報
    $ mkdir voicevox
    $ cd voicevox
    $ python -m venv voicevox
    $ source voicevox/bin/activate
    (voicevox) $

    # ダウンローダのセットアップ
    (voicevox) $ wget https://github.com/VOICEVOX/voicevox_core/releases/download/0.16.1/download-linux-arm64 download
    (voicevox) $ chmod a+x download
    (voicevox) $ ./download --execlude c-api # CPU版 C API 無し

    # python ライブラリのインストール
    (voicevox) $ wget https://github.com/VOICEVOX/voicevox_core/releases/download/0.16.1/voicevox_core-0.16.1-cp310-abi3-manylinux_2_34_aarch64.whl
    (voicevox) $ pip install voicevox_core-0.16.1-cp310-abi3-manylinux_2_34_aarch64.whl
    ```

  - [VOICEVOX COREをRaspberryPiにインストールしてCLIで便利に音声合成を行おう](https://qiita.com/ueponx/items/186a7c859b49d996785f)

    ```bash
    0.14の情報
    $ mkdir voicevox
    $ cd voicevox
    $ python -m venv voicevox
    $ source voicevox/bin/activate
    (voicevox) $

    # VOICEVOX CORE のインストール(https://github.com/VOICEVOX/voicevox_core/releases/)
    (voicevox) $ wget https://github.com/VOICEVOX/voicevox_core/releases/download/0.16.1/voicevox_core-0.16.1-cp310-abi3-manylinux_2_34_aarch64.whl
    (voicevox) $ pip install voicevox_core-0.16.1-cp310-abi3-manylinux_2_34_aarch64.whl

    # ONNX(Open Neural Network Exchange) Runtimeのインストール
    (voicevox) $ wget https://github.com/microsoft/onnxruntime/releases/download/v1.13.1/onnxruntime-linux-aarch64-1.13.1.tgz
    (voicevox) $ tar zxvf onnxruntime-linux-aarch64-1.13.1.tgz
    (voicevox) $ ln -s onnxruntime-linux-aarch64-1.13.1/lib/libonnxruntime.so.1.13.1

    # open_jtalkの辞書のインストール
    (voicevox) $ wget https://jaist.dl.sourceforge.net/project/open-jtalk/Dictionary/open_jtalk_dic-1.11/open_jtalk_dic_utf_8-1.11.tar.gz
    (voicevox) $ tar xzvf open_jtalk_dic_utf_8-1.11.tar.gz
    ```
