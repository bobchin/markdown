# gstreamer サンプル

## 参照

- [あしたのオープンソース研究所: GStreamer](https://www.clear-code.com/blog/2010/1/11.html)
- [GStreamerのエレメントをつないでパイプラインを組み立てるには](https://www.clear-code.com/blog/2014/7/22.html)
- [RustでもGStreamer理解がしたい! その0 〜まずはGStreamerパイプラインを書こう 〜](https://qiita.com/alivelime/items/50d796c09baabb765625)
- [Gstreamerについて5　出力先分岐コマンド解説](https://skimie.com/articles/6a3bfa82712f59cb6b5a6d17d1)
- [Gstreamerについて4　保存コマンド解説](https://skimie.com/articles/6a3bfa82712f59cb6b5a6d11d5)
- [Gstreamerについて3　送受信コマンド解説](https://skimie.com/articles/6a3bfa82712f59cb6b596b1ad2)
- [Gstreamerについて1　インストール～動作確認](https://skimie.com/articles/6a3bfa82712f59cb6b596b1bd4)

## メモ

- src  : （エレメント？として見ると）データを渡す側
- sink : （エレメント？として見ると）データを受け取る側
- filter:
  - demux: デマルチプレクサ（複数に分割する） ex) データから映像と音声にわける
  - mux  : マルチプレクサ（１つに統合する） ex) 映像と音声から１つのデータにする
  - tee  : [GStreamerのtee及び、queueを使って、Kinesis Video Streamsの複数のストリームに同時送信してみました](https://dev.classmethod.jp/articles/kinesis-video-streams-gstreamer-tee-queue/)
  - queue: demux でデータを複数に分けて処理する場合に別スレッドで動作させる必要がある。そのためにこれを使う。
  - capsfilter: capabilities （受け入れ可能なフォーマット = 映像や音声のフォーマット ex) video/x-raw,width=1280,height=720)を設定
- dec  : デコーダ
- enc  : エンコーダ
- convert:
- parse  :

- 用語
  - エレメント(element)  : １つ１つの機能のこと（よく指定する機能の１個１個）
  - パッド(pad)          : エレメント同士をつなぐ接続口（ソースパッドとシンクパッド）
  - リンク(link)         : ソースとシンクをつなぐ部分
  - パイプライン(pipeline): ビンともいう。複数のエレメントをリンクで繋いだものを入れる器

- gst-inspect-1.0

  ```txt
  リンクを作成する際に、エレメントの情報を確認する。
  パッドには使用可能な形式が決まっている。
  => Pad Template を参照する。Capability に利用できる形式が表示される。
  ```

## デバイス確認

  ```cmd
  gst-device-monitor-1.0
  ```

## リスト

- [ほぼ無料で作れる低遅延 0.1秒（100ms）カメラ映像伝送システムの作り方を紹介-GStreamer編 1対1の低遅延映像](https://jouer.co.jp/100ms-camera-system/)

  ```cmd
  # Windows10 環境

  # 映像のみ表示する
  # フォーマットは、gst-device-monitor-1.0 で確認する
  gst-launch-1.0.exe -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! autovideosink

  # sink
  gst-launch-1.0.exe -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! d3d11videosink fullscreen-toggle-mode=4 fullscreen=1 force-aspect-ratio=false
  gst-launch-1.0.exe -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! glimagesink

  # udp streaming video only(localhost:5005)
  # rtspでは映像と音声の送信は内部的にrtpで別々に送信されているので、同時に送ることはできないことに注意
  # sync指定は、タイムスタンプを参照するかどうかで別々のrtp通信の同期をとることと思われる [※参考](https://senooken.jp/post/2021/01/18/4961/)
  (send) gst-launch-1.0.exe -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! x264enc ! rtph264pay ! udpsink host=127.0.0.1 port=5005 sync=false
  (recv) gst-launch-1.0.exe -q udpsrc port=5005 ! application/x-rtp,media=video,encoding-name=H264 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink

  # 低遅延 udp streaming video only(localhost:5005)
  gst-launch-1.0.exe -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! x264enc bitrate=5000 speed-preset=ultrafast tune=zerolatency ! rtph264pay ! udpsink host=127.0.0.1 port=5005 sync=false
  gst-launch-1.0.exe -q udpsrc port=5005 ! application/x-rtp,media=video,encoding-name=H264 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink


  # 音声再生
  gst-launch-1.0.exe -e -q wasapi2src ! audioconvert ! audioresample ! autoaudiosink


  # 録画（映像のみ）※ -e が重要
  gst-launch-1.0.exe -e -q mfvideosrc ! videoconvert ! x264enc ! mp4mux ! filesink location=videoonly.mp4

  # 録音（音声のみ）※ -e が重要
  gst-launch-1.0.exe -e -q wasapi2src ! audioconvert ! audioresample ! mfaacenc ! mp4mux ! filesink location=audioonly.mp4

  # 映像音声同時録画
  # name を指定した場合、"name." で次の処理をする？？？
  gst-launch-1.0 -e -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! x264enc speed-preset=ultrafast tune=zerolatency ! h264parse ! queue ! mux. wasapi2src ^
  ! audio/x-raw,rate=48000,channel=1 ! audioconvert ! audioresample ! mfaacenc ! queue ! mux. mp4mux name=mux ^
  ! filesink location="test.mp4"


  # 複数同時処理(2箇所録画)
  gst-launch-1.0.exe -e -q mfvideosrc ! videoconvert ! tee name=t ! queue ! x264enc ! mp4mux ! filesink location=out1.mp4 t. ^
  ! queue ! x264enc ! mp4mux ! filesink location=out2.mp4

  # 複数同時処理(2箇所映像のみ配信)
  gst-launch-1.0.exe -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! tee name=t ^
  ! queue ! x264enc bitrate=5000 speed-preset=ultrafast tune=zerolatency ! rtph264pay ! udpsink host=127.0.0.1 port=5005 sync=false t. ^
  ! queue ! x264enc bitrate=5000 speed-preset=ultrafast tune=zerolatency ! rtph264pay ! udpsink host=127.0.0.1 port=5006 sync=false
  ```

- SRT

  ```cmd
  # SRT送信
  gst-launch-1.0.exe -q mfvideosrc ! video/x-raw,width=1280,height=1024,framerate=30/1,format=I420 ! x264enc speed-preset=ultrafast tune=zerolatency key-int-max=30 ^
  ! mpegtsmux ! srtserversink uri="srt://:7002"

  # https://www.youtube.com/watch?v=dd4NRKqLrj0
  # SRT送信
  gst-launch-1.0.exe -q mfvideosrc ! queue ! video/x-raw,width=640,height=480,framerate=30/1,format=I420 ! x264enc speed-preset=ultrafast tune=zerolatency `
  ! mpegtsmux name=mux ! queue ! srtserversink uri=srt://:7002 wasapi2src `
  ! audio/x-raw,rate=48000,channel=2 ! audioconvert ! audioresample ! mfaacenc ! queue ! mux.

  # プレビューを表示しつつSRTストリーミング
  gst-launch-1.0.exe -q mfvideosrc ! queue ! video/x-raw,width=640,height=480,framerate=30/1,format=I420 ! tee name=t `
  ! queue ! autovideosink t. `
  ! queue ! x264enc speed-preset=ultrafast tune=zerolatency `
  ! mpegtsmux name=mux ! queue ! srtserversink uri=srt://:7002 wasapi2src `
  ! audio/x-raw,rate=48000,channel=2 ! audioconvert ! audioresample ! mfaacenc ! queue ! mux.
  ```

- UVC

  ```cmd
  gst-launch-1.0 -e \
    uvch264src device=/dev/video0 name=src auto-start=true \
    src.vidsrc ! queue ! videoconvert ! x264enc ! mp4mux ! filesink location=output.mp4 \
    src.audsrc ! queue ! audioconvert ! voaacenc ! mp4mux
  ```
