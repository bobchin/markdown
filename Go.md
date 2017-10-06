# Go言語

## 参考

- [The Go Programming Language](https://golang.org/)
- [golang.jp](http://golang.jp/)

## 書籍

- [改訂2版 基礎からわかる Go言語](https://www.amazon.co.jp/%E6%94%B9%E8%A8%822%E7%89%88-%E5%9F%BA%E7%A4%8E%E3%81%8B%E3%82%89%E3%82%8F%E3%81%8B%E3%82%8B-Go%E8%A8%80%E8%AA%9E-%E5%8F%A4%E5%B7%9D-%E6%98%87/dp/4863541783)
- [スターティングGo言語](http://https://www.amazon.co.jp/dp/4798142417/ref=pd_lpo_sbs_dp_ss_1?pf_rd_p=187205609&pf_rd_s=lpo-top-stripe&pf_rd_t=201&pf_rd_i=4863541783&pf_rd_m=AN1VRQENFRJN5&pf_rd_r=PW14C2JY40VHEWK9AAHN)
- [みんなのGo言語](http://https://www.amazon.co.jp/%E3%81%BF%E3%82%93%E3%81%AA%E3%81%AEGo%E8%A8%80%E8%AA%9E%E3%80%90%E7%8F%BE%E5%A0%B4%E3%81%A7%E4%BD%BF%E3%81%88%E3%82%8B%E5%AE%9F%E8%B7%B5%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF%E3%80%91-%E6%9D%BE%E6%9C%A8%E9%9B%85%E5%B9%B8/dp/477418392X/ref=pd_sim_14_1?ie=UTF8&psc=1&refRID=3ECQH4DC12Z3RPYP1060)

## インストール

- Windows
  - mingw gccが必要（cgoを使用する場合のみ）
  - [ダウンロード](https://golang.org/dl/) からzip版をダウンロード
  - zipを "D:\software\go" に解凍
  - 環境変数 "GOROOT" を設定し、%GOROOT%\bin にPATHを通す
  - ワークスペースを作成（d:\data\go）し、環境変数 "GOPATH" を設定する

```
SETX GOROOT D:\software\go /M
SETX GOPATH D:\data\go /M
SETX PATH %PATH%;%GOROOT%\bin
```

  - 以下を作成し "go run hello.go" を実行して確認

```
#hello.go

package main
inport "fmt"

func main() {
    fmt.Print("Hello, world\n")
}
````

## VS Code 用の設定

```
go get -u -v github.com/nsf/gocode
go get -u -v sourcegraph.com/sqs/goreturns
go get -u -v github.com/tpng/gopkgs
go get -u -v github.com/rogpeppe/godef
go get -u -v github.com/golang/lint/golint
go get -u -v github.com/lukehoban/go-outline
go get -u -v github.com/newhook/go-symbols
go get -u -v golang.org/x/tools/cmd/guru
go get -u -v golang.org/x/tools/cmd/gorename

go get -u -v github.com/derekparker/delve/cmd/dlv
```





