# PowerShell

## 参考

- [https://news.mynavi.jp/itsearch/article/hardware](GUIユーザのためのPowerShell入門)

## 環境

- Windows7/WinServer2008R2 以降は素でV2.0が入っている
- WinServer2008 は「機能の追加」から追加
- WinServer2003 はネットからダウンロードしてインストール

## コマンドレット

- PowerShellのコマンドは**コマンドレット**と呼ぶ

```
# ヘルプ
Get-Help Get-ChildItem

# コマンドレット一覧
Get-Command

# エイリアス一覧（これまで使用してきたコマンドはコマンドレットのエイリアスとして登録されている）
Get-Alias

# オブジェクトのメンバ表示
Get-ChildItem | Get-Member
"abc" | Get-Member
```

## ファイル操作

- 移動

```
# カレントディレクトリ
Set-Location C:\windows
Get-Location

# 位置を記憶した移動
PS C:\Windows> Push-Location D:\hoge
PS D:\hoge> Pop-Location
PS C:\Windows> 
```

- 検索

```
# Get-ChildItem [<Path>] [-Include <検索ファイル>] [-Exclude <除外ファイル>] [-Recurse]
Get-ChildItem C:\Users -Include *.jpg,*.bmp -Exclude p* -Recurse
```

- 削除

```
Remove-Item *.tmp
# 実際に削除実行しないが処理を下かのようなメッセージで確認する
Remove-Item *.tmp -WhatIf
```

- ディレクトリ

```
# カレントディレクトリおよびパス指定で作成
New-Item docs -type directory
New-Item -path d:\public -name docs -type directory

# 削除
Remove-Item D:\public
```

- コピーと移動

```
# ファイルコピー・移動
Copy-Item <from file> <to file>
Move-Item <from file> <to file>

# ディレクトリへコピー
Copy-Item <from file> <to dir>

# 再帰的にサブディレクトリごとコピー
Copy-Item <from dir> <to dir> -Recurse
```

## プロバイダ
  - 操作の対象となるもののこと。

|プロバイダ名|ドライブ文字|プロバイダ内容|
|:--|:--|:--|
|Alias        |Alias:     |エイリアス登録|
|Certificate  |Cert:      |デジタル署名電子証明書|
|Environment  |Env:       |環境変数|
|FileSystem   |-          |ファイルシステムのドライブ・ディレクトリ・ファイル|
|Function     |Function:  |関数|
|Resgistry    |HKLM: HKLU:|レジストリ|
|Variable     |Variable:  |PowerShell変数|
|WS-Management|WSMan:     |WS-Management構成情報|

  - 同じコマンドレットを使用して似たような処理を同じようにプロバイダ毎に実行できる

```
# 作成
New-Item C:\Temp\hoge.txt -type file        # FileSystem はデフォルトなので指定しない
New-Item Env:test -Value 'PowerShell Test'

# 表示
Get-ChildItem C:
Get-ChildItem Env:
```

## 関数

- 定義

```
function <name> {
    $args[0] # 引数1
    ...
    return <value>
}

# ワンライナー
function <name> { ...; return <value>; }
```

## スクリプト

- 拡張子は 「**.ps1**」
- そのままでは実行できないので、「スクリプト実行ポリシー」を変更する必要がある

|パラメータ|動作|
|:--|:--|
|Restricted   |すべてのスクリプトの実行を禁止（デフォルト）|
|AllSigned    |署名されたスクリプトのみ実行許可|
|RemoteSigned |ダウンロードしたスクリプトの実行には署名が必要。自分で作成したスクリプトは実行許可|
|Unrestricted |すべての実行許可|
|Bypass       |無条件ですべての実行許可|
|Undefined    |現在割り当てている実行ポリシーを削除|

```
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned
```


## 繰り返し

- ForEach-Object

```
1,2,3 | ForEach-Object { $_ * 3 }
1,2,3 | ForEach-Object -Begin {"3倍にします"} -Process { $_ * 3 } -End {"終了"}

Get-ChildItem | ForEach-Object { $_.Fullname }
# 省略形
gci | % { $_.Fullname }

# カレントディレクトリのファイル合計サイズ
gci | % -Begin { $sum = 0 } -Process { $sum += $_.Length } -End { $sum }
```

- Where-Object

```
# Where-Object  {選択条件となるスクリプト}
gci | Where-Object { $_.PSIsContainer }
gci | Where-Object { -not $_.PSIsContainer }
gci | Where-Object { $_.Length -ge 1MB }
gci -Recurse | Where-Object { $_.Length -ge 20MB } | % { $_.Fullname }
```

## パイプラインとフィルタ

- $input: 関数内でパイプラインの入力を表す

```
function average {
    $i = $sum = 0
    foreach ($num in $input) {
        $i += 1
        $sum += $num
    }
    return $sum / $i
}
# 実行
10,15,13,14,12,12,16,13 | average

# ブロックを使って実装。
# コレクション分processが実行される。
# オブジェクトは$_で取得する
function average {
    begin {
        $i = $sum = 0
    }
    process {
        $i += 1
        $sum += $_
    }
    end {
        return $sum / $i
    }
}
```

## フィルタ

- filter キーワードを使ってコレクション毎に実行する処理を定義できる

```
filter PlusMinusToString {
    if ($_ -gt 0) {
        $_.toString() + " は正の数"
    } elseif ($_ -lt 0) {
        $_.toString() + " は負の数"
    } else {
        $_.toString() + " は０"
    }
}
-3,-2,-1,0,1,2,3 | PlusMinusToString
```

## 呼び出し演算子

パスに空白が含まれているときなどに使用する。

```
PS C:\> & "C:\Program Files\xxxx\xxxx.exe"
PS C:\> & { ls }
```



