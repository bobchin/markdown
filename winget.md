# Winget

- [Winget](#winget)
  - [参照](#参照)
  - [使い方](#使い方)

## 参照

- [Windowsのパッケージマネージャー「winget」を使ってみた](https://dev.classmethod.jp/articles/use_windows_package_manager_winget/)

## 使い方

```powershell
# 検索する
winget search "vscode"

# 詳細
winget show "vscode"
winget show "vscode" --versions

# インストール
winget install "vscode" --version 1.84.2

# アップグレード
winget upgrade
winget upgrade "winget"
```
