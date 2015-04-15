# WebRTC

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




