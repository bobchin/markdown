# ALSA

## 参考

- [ALSA - まとめリンク](https://www.katsuster.net/index.php?arg_act=cmd_show_diary&arg_date=20220505)
- [ざっくりとALSAとPulseAudioの関係](https://mickey-happygolucky.hatenablog.com/entry/2015/04/04/105512)
- [UbuntuSoundSystem](https://wiki.ubuntulinux.jp/UbuntuStudioTips/Setup/UbuntuSoundSystem)

## まとめ

- ALSA
  - Advanced Linux Sound Architechture
  - Linux2.6 から採用されたサウンドシステム
    それ以前はOSS(Open Sound System) が使われていた
    - サウンドシステム：LPCM(Linear Pulse Code Modulation) を扱って録音・再生すること。
      - Linear: 直線的に = 一定周期でサンプリングする。
      - PCM: アナログ信号をデジタル信号に変換する方式の一つ

- 構成
  - ライブラリ
    - 共通処理    ：アプリケーションとALSAインタフェース(API) の定義や LPCM を扱うための共通処理。
    - プラグイン  ：ALSA に入力された LPCM を加工する
  - ドライバ
    - 共通処理            ：LPCM の録音・再生機能を実現するための共通処理
    - ハードウェア依存処理  ：ハードウェアを使ってLPCM の録音・再生機能を実現するための処理

  - ライブラリ
    - 共通処理    ： /usr/lib/libasound.so
    - プラグイン  ： /usr/lib/libasound.so など
  - ドライバ
    - 共通処理            ： /lib/modules/xxx/kernel/sound/core/snd.ko など
    - ハードウェア依存処理 ： /lib/modules/xxx/kernel/sound/pci/snd-hda.codec.realtek.ko など

- 基本的な仕組み
  1. 最終的な音の入出力は、デバイス
  2. デバイスを操作するのは、デバイスドライバ（カーネル内）
  3. Linux カーネルとユーザランドの橋渡しをするのがALSA
  4. ユーザランド側のアプリケーション間でサウンドリソースを調停するのは、PulseAudio


## 操作

```bash
# 1. 物理的なサウンドカードを認識 => ドライバのロード
# 2. ALSA が物理的なサウンドカードを認識 => ライブラリのロード？

# ALSA "ドライバ"のロード
lsmod | grep snd    # 何も表示され場合はドライバがロードされていない
modprobe snd

# カーネルモジュールのロード・アンロード
# カーネルを大きくしないため、または柔軟に利用できるようにするため、
# 機能をモジュール化して、有効・無効を切り替えられるようにしている。
# イメージとしてはWindowsで、ハードウェアドライバのインストール・アンインストールのイメージ
# modprobe snd
# modprobe -r snd

# ALSA が使えるかどうか
cat /proc/asound/version
# ALSA カード一覧
cat /proc/asound/cards
```

## 認識

- 物理的な構成
  - サウンドカード（AAA） => サウンドカード0
    - デジタル入力
    - デジタル出力
    - アナログ出力
  - サウンドカード（BBB） => サウンドカード1
    - ライン入力
    - デジタル出力

```bash
cat /proc/asound/cards

 0 [AAAAA          ]: HDA-AAAAA - HDA AAAAA
                      HDA AAAAA at 0xXXXX00000 irq xx
 1 [BBBBB          ]: HDA-BBBBB - HDA BBBBB
                      HDA BBBBB at 0xXXXX0000 irq xx
```

- デバイス＝以下の４つの能力のいずれかを持つもの
  - PCM の再生
  - PCM の録音
  - MIDI の再生
  - ハードウェア固有機能

  - ex)
    - サウンドカード0
      - デバイス0
        - PCM再生
        - PCM録音
      - デバイス1
        - PCM再生
    - サウンドカード1
      - デバイス0
        - PCM録音
      - デバイス1
        - PCM再生

    ```bash
    cat /proc/asound/pcm
    00-00: AAAAA Digital : AAAAA Digital : playback 1 : capture 1
    00-01: AAAAA Analog : AAAAA Analog : playback 1
    01-00: BBBBB Analog : BBBBB Analog : capture 1
    01-01: BBBBB Digital : BBBBB Digital : playback 1
    ```

- 再生

```bash
aplay -D hw:0,0 hoge.wav
```

  - hw:0,0 => サウンドカード0 の デバイス0 を指定
  - どこをみているか？ => /dev/snd/xxx


