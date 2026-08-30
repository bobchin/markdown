## サイネージ

### Links

- [Xibo](https://account.xibosignage.com/)
  - [Doc](https://account.xibosignage.com/docs/)

### メモ

- CMS   : 管理側
- Player: 表示側
  - Windows
  - Linux
  - Android
  - webOS
  - ChromeOS

- 2026/04現在、Ver4.4

### インストール

- Docker
- Web Server
  - PHP
  - MySQL

```bash
# WSL2 ubuntu24.04

wsl --install Ubuntu-24.04 --name xibo
wsl -d xibo

sudo apt update
sudo apt upgrade
```

- 初期ユーザ
  - user:xibo_admin
  - pass:password
