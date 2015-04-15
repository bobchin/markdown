# 名前空間

Socket.IO はソケットに“名前空間”を持ちます。
これは本質的に異なるエンドポイントやパスを割り当てることを意味します。

これは便利な特徴であり、リソース（TCPコネクション）の数を減らせます。
同時にコミュニケーションチャンネル間を分割することでアプリケーション内の関係を分割します。

## デフォルトの名前空間
デフォルトの名前空間を "/" と呼びます。
Socket.IO クライアントはデフォルトでそこに接続します。
またサーバはデフォルトでそこを待ち受けます。

この名前空間は、"io.sockets" または単に "io" で指定します:

```
// 次の２つは '/' に接続されたすべてのソケットにemitします。
io.sockets.emit('hi', 'everyone');
io.emit('hi', 'everyone'); // 短縮形
```

各名前空間は "connection" イベントを emit し、
パラメータとして各々の "Socket" インスタンスを受け取ります。

```
io.on('connection', function(socket){
  socket.on('disconnect', function(){ });
});
```

## カスタム名前空間

独自の名前空間を設定するには、サーバサイド上で "of" 関数ををコールします:

```
var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
  console.log('someone connected'):
});
nsp.emit('hi', 'everyone!');
```

くらいアンドサイドでは、Socket.IO クライアントに名前空間に接続するように伝えます:

```
var socket = io('/my-namespace');
```

重要: 名前空間は Socket.IO プロトコルの実装です。
トランスポート上の実際の URL とは関係ありません。
通常それはデフォルトでは、 "/socket.io/…" になります。

## Room

各名前空間内では、任意のチャンネルを定義でき、そこにソケットは join したり leave したりします。

## 参加と退室

"join" をコールすることで、ソケットに指定されたチャンネルを申し込みます:

```
io.on('connection', function(socket){
  socket.join('some room');
});
```

それから単に "to" または "in" （両方共同じものです）を使用して、
"broadcast" または "emit" します:

```
io.to('some room').emit('some event'):
```

チャンネルから退室するには、"join" と同じ形式で "leave" をコールします。

## デフォルト Room
 
Socket.IO の各ソケットは、ランダムで推測不可能でユニークなID "Socket#id" を持ちます。
利便性のために各ソケットは自動的にこの ID を使用したルームに join します。

このおかげで他のソケットに簡単にブロードキャストメッセージを送れます:

```
io.on('connection', function(socket){
  socket.on('say to someone', function(id, msg){
    socket.broadcast.to(id).emit('my message', msg);
  });
});
```

## 切断

切断時にソケットは、自動的に参加した全てのチャンネルから退室します。
特に切断をする必要はあります。。

## 外界からメッセージを送信する

ときに、Socket.IO 名前空間内/ルームのソケットに対して、
Socket.IO プロセスのコンテキスト外から
イベントを emit したいかもしれません。

この問題に取り組むにはいくつかの方法があります。
例えば、自身のチャンネルにプロセス内にメッセージを送信するように実装するなどです。

このユースケースを容易にするために、２つのモジュールを作成しました:

- socket.io-redis
- socket.io-emitter

Redis アダプタの実装により:

```
var io = require('socket.io')(3000);
var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));
```

どのチャンネルに対しても他のプロセスからメッセージを emit することができます。

```
var io = require('socket.io-emitter')();
setInterval(function(){
  io.emit('time', new Date);
}, 5000);
```
