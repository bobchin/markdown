# chocolatey インストール管理

## 操作

```cmd
choco list
choco list --lo | choco list --local-only
choco install <pkg>
choco uninstall <pkg>
choco search <pkg>

choco upgrade <pkg> | upgrade all
cup <pkg>
```

## 場所

- 本体
  - "C:\ProgramData\chocolatey"

- アプリ
  - "C:\ProgramData\chocolatey\lib"



## インストール済み

- fnm
  - "C:\ProgramData\chocolatey\lib\fnm\tools"

  ```cmd
  choco install fnm
  ```

