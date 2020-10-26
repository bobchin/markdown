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

## 使い方

- getUserMedia

  ```js
  # MediaStreamクラスを生成する
  var stream = navigator.mediaDevices.getUserMedia(constraints)
  ```

  - constraints(MediaTrackConstraintsクラス)
    - audio
      - autoGainControl: boolean
      - channelcount: long
      - echoCancellation: boolean
      - latency: double
      - noiseSuppression: boolean
      - sampleRate: long
      - sampleSize: long
      - volume: double
    - video
      - aspectRatio:
      - facingMode: string
      - frameRate:
      - width:
      - height:
      - resizeMode: "none" | "crop-andm-scale"

    ```js
    {
      video: true,
      audio: true
    }
    {
      video: {
        width: 1280, height: 720
      },
      audio: true
    }
    {
      video: {
        width: {
          min: 1024
          ideal: 1280
          max: 1920
        },
        height: {
          min: 576
          ideal: 720
          max: 1080
        }
      },
      audio: true
    }
    {
      video: {
        width: {
          exact: 1280
        },
        height: {
          exact: 720
        }
      },
      audio: true
    }
    ```

- MediaStream
  - getTracks(): MediaStreamが保持しているトラック（音声や映像データ）を取得する
  - getAudioTracks(): 音声データのみ取得する
  - getVideoTracks(): 映像データのみ取得する
  - addTrack()
  - removeTrack()
  - getTrackById()

- MediaStreamTrack
  - getCapabilities()
  - getConstraints()
  - getSettings()

## サンプル

- [サンプル](https://webrtc.github.io/samples/)

- 映像の割り当て

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
  const constraints = {
    audio: false,
    video: true
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => document.querySelector('video').srcObject = stream);
  </script>
  </body>
  </html>
  ```

- デバイス一覧取得

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
  </head>
  <body>
  <div class="select">
      <label for="audioSource">Audio input source: </label><select id="audioSource"></select>
  </div>

  <div class="select">
      <label for="audioOutput">Audio output destination: </label><select id="audioOutput"></select>
  </div>

  <div class="select">
      <label for="videoSource">Video source: </label><select id="videoSource"></select>
  </div>

  <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
  <script>
    function gotDevices(deviceInfos) {
      const dics = {
        'audioinput' : audioInputSelect,
        'audiooutput': audioOutputSelect,
        'videoinput' : videoSelect
      };
      for (let [kind, selectObj] of Object.entries(dics)) {
        deviceInfos
        .filter(d => d.kind === kind)
        .map(function(d){
          const option = document.createElement('option');
          option.text = d.label || `microphone ${audioInputSelect.length + 1}`;
          option.value = d.deviceId;
          selectObj.appendChild(option);
        });
      }
      selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
          select.value = values[selectorIndex];
        }
      });
    }

    navigator.mediaDevices.enumerateDevices()
      .then(gotDevices)
      .catch(handleError);
  </script>
  </body>
  </html>
  ```

- コネクションの確立（シグナリングを使用しないローカル版）

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
  </head>
  <body>
  <div id="container">
      <video id="leftVideo" playsinline controls muted></video>
      <video id="rightVideo" playsinline autoplay controls></video>
  </div>

  <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
  <script>
  navigator.mediaDevices.getUserMedia({audio: true, video: true});
    .then(stream => document.querySelector('video#leftVideo').srcObject = stream);

  let pc_local;
  let pc_remote;

  const servers = null;
  // RTCPeerConnectionの作成
  // 映像と音声のトラックを追加し、ICEイベントを追加しておく。
  pc_local = new RTCPeerConnection(servers);
  stream.getTracks().forEach(track => pc_local.addTrack(track, stream));
  pc_local.onicecandidate = e => onIceCandidate(pc_local, e);

  // ※本来は相手側の作業
  pc_remote = new RTCPeerConnection(servers);
  pc_remote.onicecandidate = e => onIceCandidate(pc_remote, e);
  pc_remote.ontrack = e => { rightVideo.srcObject = e.streams[0] };

  function onIceCandidate(pc, event) {
    // ※相手に送る必要がある
    getOtherPc(pc).addIceCandidate(event.candidate)
        .then(
            () => console.log(`${getName(pc)} addIceCandidate success`),
            err => console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`)
        );
  }

  const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };
  pc_local.createOffer(offerOptions)
    .then(desc => {
      pc_local.setLocalDescription(desc, () => {}, () => {});
      // ※相手に送る必要がある
      pc_remote.setRemoteDescription(desc, () => {}, () => {});
      pc_remote.createAnswer(onCreateAnswerSuccess, () => {});
    });

  function onCreateAnswerSuccess(desc) {
    pc_remote.setLocalDescription(desc, () => {}, () => {});
    // ※相手に送る必要がある
    pc_local.setRemoteDescription(desc, () => {}, () => {});
  }
  </script>
  </body>
  </html>
  ```


