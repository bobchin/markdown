# WebRTC

## 参考

- [WebRTCについて学んでみた](https://qiita.com/mush/items/121e45fefed009b6ad5e)
- [WebRTCハンズオン資料](https://qiita.com/yusuke84/items/de9f0f6d221acec6fc07)
- [WebRTC Native Client Momo](https://momo.shiguredo.jp/)

## 用語

- shim: 古い環境で新しいAPIを使うためのライブラリ
- polyfill: ブラウザAPIのための Shim

- RTCPeerConnection
  - ２つのピア間の接続で使用するインターフェース
- MediaStream
  - 複数のトラックで構成される
  - MediaStreamTrack: メディア情報のトラック。音声・映像・テキストそれぞれに１つ必要になる。
- RTCDataChannels
  - バイナリデータの交換

- ICE(Interactive Connectivity Establishment): ウェブブラウザーをピアと接続することを可能にするフレームワーク
  - 使用できる経路情報(直接, STUN, TURN, ...)
- NAT(Network address translation): プライベートアドレスをパブリックアドレスに変換して外部通信できるようにする
- STUN(Session Traversal Utilities for NAT): NAT環境でパプリックアドレスがわかるように管理する
- TURN(Traversal Using Relays around NAT): Symmetric NAT対策用に常に特定のサーバを介してアクセスする
- SDP(Session Description Protocol): コンテンツ情報

- シグナリング
  - WebRTCは間を受け持ってくれるものがないと接続できない。そのためのサーバ・サービスのこと
  - 特に決まったものはない
  - 交換する情報は、offer/answer と呼ばれ、中身はSDPである。
  - 通信
    - 呼び出し側
      - ①LocalDescription: 自身のコンテンツ情報
      - ②RemoteDescription: 相手側のコンテンツ情報
    - 受け答え側
      - ③LocalDescription: 自身のコンテンツ情報
      - ④RemoteDescription: 相手側のコンテンツ情報
    1. 呼び出し側がローカルメディアを取得して①にセット
    2. ①のメディア情報を受け答え側にofferを作成して送信
    3. 受け答え側で受け取った①のメディア情報を④にセット
    4. 受け答え側でローカルメディアを取得して③にセット
    5. ③のメディア情報を呼び出し側にanswerを作成して送信
    6. 受け答え側で受け取った③のメディア情報を②にセット

## P2P

- Session Description Protocol(SDP): 各ブラウザの情報

- Interactive Connectivity Establishment(ICE): 可能性のある通信経路に関する情報
++ P2P
++ STUN(NAT通過を可能にした後P2P)
++ TURN(リレーサーバ)

## シグナリング

- SDP
（自身側）
++ RTCPeerConnection オブジェクト生成
++ PeerConnection#createOffer() で自身のディスクリプションデータ作成
++ RTCPeerConnection#setLocalDescription に自分のディスクリプションデータをセット
++ ディスクリプションデータを相手に送る

（相手側）
++ RTCPeerConnection オブジェクト生成
++ RTCPeerConnection#setRemoteDescription に送られてきたディスクリプションデータをセット
++ RTCPeerConnection#createAnswer() で自身のディスクリプションデータを作成
++ RTCPeerConnection#setLocalDescription に自分のディスクリプションデータをセット
++ ディスクリプションデータを相手に送る

（自身側）
++ RTCPeerConnection#setRemoteDescription に送られてきたディスクリプションデータをセット

- ICE
-- RTCPeerConnection#onicecandidate で非同期に発生する

（自身側）
++ onicecandidate イベント毎に相手側にICE Candidateを送信する

（相手側）
++ RTCIceCandidate オブジェクトを生成して、peerConnection#addIceCandidate() で追加


## サンプル

- getUserMedia

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
  </head>
  <body>
  <div id="container">
      <video id="gum-local" autoplay playsinline></video>
  </div>

  <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
  <script>
  async function init(e) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.querySelector('video');
      video.srcObject = stream;
    } catch (e) {
    }
  }
  init(windows)
  </script>
  </body>
  </html>
  ```
