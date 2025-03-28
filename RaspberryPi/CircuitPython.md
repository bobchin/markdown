# Circuit Python

## Links

- [Circuit Python](https://circuitpython.org/)
  - [Get Started](https://learn.adafruit.com/welcome-to-circuitpython)

- [CircuitPython開発の小技集](https://qiita.com/komde/items/9f54fecf302f8c41bb3d)

## まとめ

[Adafruit](https://www.adafruit.com/) : 教育用電子機器プラットフォーム、試作および開発ツールを作成している会社
ここが開発した初心者向けのオープンソースプログラミング言語で、マイクロコントローラ上で動作する。
Python をベースとしている。様々な特徴のあるハードウェアをサポートしている。


### インストール

いろんなマイクロコントローラに対応しているため、[ここ](https://circuitpython.org/downloads) から使用するコントローラを探してインストールする。

- [Raspi Pico](https://circuitpython.org/board/raspberry_pi_pico/)
- [Raspi Pico W](https://circuitpython.org/board/raspberry_pi_pico_w/)
- [Raspi Pico2](https://circuitpython.org/board/raspberry_pi_pico2/)


- [Getting Started with Raspberry Pi Pico and CircuitPython](https://learn.adafruit.com/getting-started-with-raspberry-pi-pico-circuitpython/circuitpython)

Pico の場合は、MicroPythonと同様に .uf2 ファイルをダウンロードし、
"BOOTSEL" ボタンを押しながら起動すると "RPI-RP2" ドライブを認識するので、そこにコピーする。
再起動すると、"CIRCUITPY" というドライブを認識すればOK。

#### VSCode

- [Visual Studio CodeでCircuitPythonプログラムを開発する](https://zenn.dev/seiichihorie/articles/20241106-circuitpython-vscode)
- [CircuitPython拡張機能](https://marketplace.visualstudio.com/items?itemName=joedevivo.vscode-circuitpython)

  ※v0.2.0 ではシリアルコンソールが使えないので、v0.1.20 にダウンして使う


#### モード

- ブートローダモード
  pico の場合、 BOOTSEL ボタンを押したまま起動すると、"RPI-RP2" と表示されている状態。
  CircuitPython をインストールしたりアップデートしたりできる。

- 起動モード？
  "CIRCUITPY" と表示されている状態。CircuitPython がインストールされ実行されている状態。

### 起動順

通常は、boot.py => code.py の順に実行される。boot.py の結果は boot_out.txt にロギングされる。

- ソフトリセット: code.py のみ再実行
- ハードリセット: boot.py から再実行（リセットボタン押下時）

#### ファイル

- boot.py
  ワークフローが初期化される前に、起動時に1度だけ実行される。  
  シリアルは無効状態なので、出力は boot_out.txt に書き込まれる。  
- code.py(main.py)
  再起動後に毎回実行される。実行後に vm とハードウェアが最初期化される。  
  REPL はvm をきれいにするので、REPL では code.py から状態を読み込むことができません  
- repl.py
  ファイルがあれば、REPL プロンプトが表示される前に実行される。  
  セーフモードではこの機能は無効です。  


