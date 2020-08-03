# FFmpeg

とても高速な映像および音声のコンバーター

- [FFmpeg](https://ffmpeg.org/)
- [FFmpegドキュメント](https://ffmpeg.org/ffmpeg.html)

## 基本

-i で指定した映像・音声を様々なオプションを指定してファイル等に出力する。

## 用語

- demuxer : 特定のファイル形式からマルチメディアストリームを読み込むために作られたFFmpegの要素
- muxer   : 特定のファイル形式へマルチメディアストリームを書き込むために作られたFFmpegの要素

## コマンド

```sh
# サポートするフォーマット一覧
ffmpeg -formats
ffmpeg -codecs

# 入力/出力フォーマットを指定する。入力フォーマットについては入力ファイルから自動的に判断し、出力フォーマットは出力ファイルの拡張子から類推する。
-f [format]

# 入力ファイルのURL
-i [url]

# v4l2用オプション
## 使用可能なフォーマット一覧を表示
ffmepg -list_formats all -i /dev/video0

-video_size [size]      # -video_size 1600x1200
-input_format [string]  # -input_format mjpeg
-framerate [string]     # -framerate 20

# その他
## 音声のチャンネル数
-ac 1
## 音声サンプリング周波数
-ar 44100
## フィルタグラフ
-af

## ビットレート
-b:v 768k # 映像
-b:a 128k # 音声

## コーデック
-c:v h264_omx # 映像
-c:a aac      # 音声

```

## デバイス

- 映像
  - v4l2(Video for Linux 2): Linuxでビデオを扱うための統一的なAPIを使う。特にUVCカメラを使う場合はこれを使う。

    ```sh
    # v4l2で扱えるデバイスのリスト
    v4l2-ctl --list-devices
    # デバイスの情報を表示
    v4l2-ctl -d /dev/video0 --all
    v4l2-ctl -d /dev/video0 --info
    v4l2-ctl -d /dev/video0 --list-formats
    v4l2-ctl -d /dev/video0 --list-formats-ext
    ```

  - フォーマット
    - YUYV
    - MJEPG

- オーディオ
  - ALSA(Advanced Linux Sound Architecture): Linuxでサウンドを扱うためのAPI

    ```sh
    # 音声入力デバイスの表示（カード番号とデバイス番号が必要になる）
    arecord -l

    # ffmpegで指定する場合（カード:2, デバイス:0）に以下のようになる
    -i hw:2,0
    ```
