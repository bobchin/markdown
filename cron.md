# cronまとめ

## Links

- [【図解】cronの仕組み](https://qiita.com/yuzo_____/items/1b8af6e04ffa2baa1cab)
- [crontabの書き方や確認、仕組みや落とし穴を理解する](https://blog.mothule.com/tools/how-to-use-cron)

## 用語など

- cron

  コマンドを定期実行するデーモン

- crontab

  ユーザごとのcrontabファイルを編集するコマンド

- crontab ファイル

  スケジュールを記述するファイル

## crontab

- /etc/crontab
- /usr/liv/cron/tabs

```bash
# 編集
crontab -e

# ユーザを指定して編集
crontab -u -e

# 内容表示
crontab -l

# 内容削除
crontab -r
```

|フィールド|内容   |
|:-------:|:-----:|
|分　　　　|0 - 59 |
|時　　　　|0 - 23 |
|日　　　　|1 - 31 |
|月　　　　|1 - 12 |
|曜日　　　|0 - 7  |
|コマンド　|コマンド|

```bash
# 分 時 日 月 曜日 コマンド

# 毎 0 分
0 * * * * date >> /var/log/date.log

# 毎日9時と12時
0 9,12 * * * date >> /var/log/date.log

# 毎日9時から12時
* 9-12 * * * date >> /var/log/date.log

# 2時間毎
0 */2 * * * date >> /var/log/date.log
```

- sample

```bash
# 1分毎に実行
* * * * * date >> /var/log/date.log

# 15分毎に実行
*/15 * * * * date >> /var/log/date.log

# 毎時0分に実行
0 * * * * date >> /var/log/date.log

# 毎日21時に実行
0 21 * * * date >> /var/log/date.log

# 毎日9時と21時に実行
0 9,21 * * * date >> /var/log/date.log

# 9月の平日の9時から22時までの間10分毎に実行
*/10 9-22 * 9 1-5 date >> /var/log/date.log
```

### 環境変数

以下のみ指定できる

- HOME
- SHELL
- PATH
- MAILTO
　
### 特殊指定

- @reboot   = 起動時に1度だけ
- @yearly   = "0 0 1 1 *"
- @annually = @yearly
- @monthly  = "0 0 1 * *"
- @weekly   = "0 0 * * 0"
- @daily    = "0 0 * * *"
- @midnight = @daily
- @hourly   = "0 * * * *"

```bash
#crontab
@reboot date >> /var/log/date.log
```


### 実行権限

- /usr/lib/cron/cron.allow

  中身はユーザ名を記述する。記述されたユーザはcronが使える

- /usr/lib/cron/cron.deny

  中身はユーザ名を記述する。記述されたユーザはcronが使えない


### 定期実行フォルダ

crontab に以下のように登録されている。

- [run-parts](https://manpages.ubuntu.com/manpages/jammy/ja/man8/run-parts.8.html)
  - ディレクトリにあるスクリプトの実行

```bash
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
HOME=/

01 * * * * root run-parts /etc/cron.hourly  (毎時1分)
02 4 * * * root run-parts /etc/cron.daily   (毎日4時2分)
22 4 * * 0 root run-parts /etc/cron.weekly  (毎日曜日4時22分)
42 4 1 * * root run-parts /etc/cron.monthly (毎月1日4時42分)
```


