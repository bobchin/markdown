# DirectShow

## 参考

- [DirectShow .NET プログラミング解説](https://so-zou.jp/software/tech/library/directshownet/)
- [directshow.net library](https://directshownet.sourceforge.net/)
- [DirectShow .NET Files](https://sourceforge.net/projects/directshownet/files/)
- [DirectShow](https://learn.microsoft.com/ja-jp/previous-versions/direct-x/cc353899(v=msdn.10)?redirectedfrom=MSDN)
- [DirectShowで開発する時のイロハ](https://qiita.com/tomoki0sanaki/items/fec5cb057b9872c0664c)

## 用語など

- フィルタ
  ストリーム（データ）を処理する個々のオブジェクトのこと
- ピン
  フィルタの入力や出力のこと

- フィルタグラフ
  複数のフィルタの組み合わせ
  - [GraphEdit]()
    - Microsoft Windows SDK に同梱される

- フィルタグラフマネージャ
  フィルタグラフの作成や制御をするオブジェクト。再生・停止などの指示をする。

- フィルタの種類
  - ソースフィルタ
    データの取り出し口
    出力ピンしかない => 一番前段に使う

  - エンコーダ/デコーダ
    データ形式の変換

  - スプリッタ
    ビデオとサウンドの分離

  - レンダラ
    データの出力先
    入力ピンしかない => 一番後段に使う

## サンプル

```C#
// フィルタグラフ オブジェクトを生成
IGraphBuilder graphBuilder = ( IGraphBuilder )new FilterGraph();
ICaptureGraphBuilder2 captureGraphBuilder = ( ICaptureGraphBuilder2 )new CaptureGraphBuilder2();

// フィルタグラフを構築する
SetupFilterGraph(graphBuilder, captureGraphBuilder);

// ビデオ ウィンドウを構築する
SetupVideoWindow(graphBuilder, this);


// ビデオデータのプレビューを開始する
int hr = ( ( IMediaControl )graphBuilder ).Run();
DsError.ThrowExceptionForHR( hr );

// フィルタ グラフの構築
private void SetupFilterGraph( IGraphBuilder graphBuilder, ICaptureGraphBuilder2 captureGraphBuilder )
{
    int hr = 0;

    // キャプチャ グラフが使用するフィルタ グラフを指定する
    hr = captureGraphBuilder.SetFiltergraph( graphBuilder );
    DsError.ThrowExceptionForHR( hr );


    // ビデオキャプチャ フィルタを取得する
    IBaseFilter videoCaptureFilter = GetCaptureDevice( 0 );

    // フィルタ グラフにビデオキャプチャ フィルタを追加する
    hr = graphBuilder.AddFilter( videoCaptureFilter, "Video Capture" );
    DsError.ThrowExceptionForHR( hr );


    // ビデオキャプチャ フィルタをレンダリング フィルタに接続する
    hr = captureGraphBuilder.RenderStream(
        PinCategory.Preview,
        MediaType.Video,
        videoCaptureFilter,
        null,
        null );
    DsError.ThrowExceptionForHR( hr );

    // ビデオキャプチャ フィルタを解放する
    Marshal.ReleaseComObject( videoCaptureFilter );
}

// ビデオ ウィンドウの構築
private void SetupVideoWindow( IGraphBuilder graphBuilder, Control owner )
{
    int hr = 0;
    IVideoWindow videoWindow = ( IVideoWindow )graphBuilder;

    // ビデオ ウィンドウのオーナーに このウィンドウを設定する
    hr = videoWindow.put_Owner( owner.Handle );
    DsError.ThrowExceptionForHR( hr );

    // ウィンドウのスタイルを設定する
    hr = videoWindow.put_WindowStyle( WindowStyle.Child | WindowStyle.ClipChildren );
    DsError.ThrowExceptionForHR( hr );


    // ビデオ ウィンドウを親ウィンドウのサイズに一致させる
    hr = videoWindow.SetWindowPosition(
        0,
        0,
        owner.ClientSize.Width,
        owner.ClientSize.Height
        );
}
```











