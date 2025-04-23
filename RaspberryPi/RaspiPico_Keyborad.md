# Pico でキーボード

## 概要

- キーボードマトリクス
  水平方向の走査線と垂直方向の走査線でキー状態を取得する。
  4x4 の場合、16 個のボタンを扱える。
  ただし、3 個以上同時に押した場合にご認識するので、ダイオードを入れて逆流しないようにする必要がある。

  - 行方向(IN)
    状態の読み込み。スイッチが押されていれば Low。
  - 列方向(OUT)
    検知する列を順番にグランドに落とす
  - スイッチの後の列方向に接続するところにダイオードを IN => OUT で接続

- スキャン頻度
  1000回/秒

## 構造

- キースイッチ
- ダイオード（逆流防止） 1N4148

## 接続

- 行方向
  - GP6: R1
  - GP7: R2
  - GP8: R3
  - GP9: R4

- 列方向
  - GP2: C1
  - GP3: C2
  - GP4: C3
  - GP5: C4

## コード

- 読み込みメイン処理

  ```python
  @rp2.asm_pio(set_init=(rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW), in_shiftdir=rp2.PIO.SHIFT_LEFT)
  def keypad_scanner():
    # in_shiftdir が 左シフトで、in_により4ビットずつ読み込んでいる。
    # 入力レジスタ isr が最終的には4x4=16ビットになり、最上位15ビットがR4C4に、最下位1ビットがR1C1になる
    # Loop Start
    set(pins, 0b1000).delay(1)  # R4 をHigh
    in_(pins, 4)                # Column ポートから 4 ビット読み込み
    set(pins, 0b0100).delay(1)  # R3 をHigh
    in_(pins, 4)                # Column ポートから 4 ビット読み込み
    set(pins, 0b0010).delay(1)  # R2 をHigh
    in_(pins, 4)                # Column ポートから 4 ビット読み込み
    set(pins, 0b0001).delay(1)  # R1 をHigh
    in_(pins, 4)                # Column ポートから 4 ビット読み込み
    # Loop End
  ```

- キーに変更があったときのみ割り込み

  ```python
  @rp2.asm_pio(set_init=(rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW), in_shiftdir=rp2.PIO.SHIFT_LEFT)
  def keypad_scanner():
    mov(y, null)                # y: 現在のスキャンデータ
    set(pins, 0)                # ROW をクリア

    wrap_target()
    label("loop_start")
    mov(isr, null)              # ISR をクリア    (1clock) 1
    set(pins, 0b1000).delay(1)  # R4 をHigh       (2clock) 3
    in_(pins, 4)                # Column 読み込み (1clock) 4
    set(pins, 0b0100).delay(1)  # R3 をHigh       (2clock) 6
    in_(pins, 4)                # Column 読み込み (1clock) 7
    set(pins, 0b0010).delay(1)  # R2 をHigh       (2clock) 9
    in_(pins, 4)                # Column 読み込み (1clock) 10
    set(pins, 0b0001).delay(1)  # R1 をHigh       (2clock) 12
    in_(pins, 4)                # Column 読み込み (1clock) 13
    mov(x, isr)                 # ISR を x に保存 (1clock) 14
    jmp(x_not_y, "state_changes") #               (1clock) 15
    jmp("loop_start")           #                 (1clock) 16 ループ合計16クロック
    # Loop End
    label("state_changes")
    mov(y, x)                   # y を更新
    push()                      # 最新データをpush
    irq(rel(0))                 # 割り込み
    wrap()
  ```

- キーパッド追加

  ```python
  # keyPad.py

  from machine import Pin
  from utime import sleep
  import rp2
  from micropython import schedule

  @rp2.asm_pio(set_init=(rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW,rp2.PIO.OUT_LOW), in_shiftdir=rp2.PIO.SHIFT_LEFT)
  def keypad_scanner():
    mov(y, null)                # y: 現在のスキャンデータ
    set(pins, 0)                # ROW をクリア

    wrap_target()
    label("loop_start")
    mov(isr, null)              # ISR をクリア    (1clock) 1
    set(pins, 0b1000).delay(1)  # R4 をHigh       (2clock) 3
    in_(pins, 4)                # Column 読み込み (1clock) 4
    set(pins, 0b0100).delay(1)  # R3 をHigh       (2clock) 6
    in_(pins, 4)                # Column 読み込み (1clock) 7
    set(pins, 0b0010).delay(1)  # R2 をHigh       (2clock) 9
    in_(pins, 4)                # Column 読み込み (1clock) 10
    set(pins, 0b0001).delay(1)  # R1 をHigh       (2clock) 12
    in_(pins, 4)                # Column 読み込み (1clock) 13
    mov(x, isr)                 # ISR を x に保存 (1clock) 14
    jmp(x_not_y, "state_changes") #               (1clock) 15
    jmp("loop_start")           #                 (1clock) 16 ループ合計16クロック
    # Loop End
    label("state_changes")
    mov(y, x)                   # y を更新
    push()                      # 最新データをpush
    irq(rel(0))                 # 割り込み
    wrap()

  class keyPad():
    _prev_code = 0              # 1つ前のスキャンデータ
    _callback_funcs = []        # コールバック

    def __init__(self, callback=None, rowBasePort=6, columnBasePort=2):
      # PIO のステートマシン
      # set 命令のベースはピン6, in 命令のベースはピン2
      self.sm = rp2.StateMachine(0, keypad_scanner, freq=16000, set_base=Pin(rowBasePort), in_base=Pin(columnBasePort), in_shiftdir=rp2.PIO_SHIFT_LEFT)
      # 割り込みハンドラの登録
      # ハンドラ自体の処理を短くするため、schedule に登録する処理だけにして、実質処理は遅延実行にする
      self.sm.irq(lambda p: schedule(self.keyInterrupt, p))
      # コールバック関数
      self.addCallback(callback)
      # PIO ステートマシン起動
      self.sm.active(1)

    # callback(key_no, state)
    # key_no: 1～16
    # state: on=1 off=0
    def addCallback(self, callback):
      if callback is not None:
        self._callback_funcs.append(callback)

    def keyInterrupt(self, p):
      # キースキャンデータの読み込み
      code = self.sm.get()
      # 変更ビットの取り出し
      change_bit = code ^ self._prev_code
      mask = 1
      for key in range(16):
        if (change_bit & mask) != 0:
          state = (code & mask) >> key
          for callback in self._callback_funcs:
            if callback is not None:
              callback( (key+1, state) )
          mask = mask << 1
      self._prev_code = code
  ```

  ```python
  # keytest.py

  from keyPad import keyPad
  from machine import idle

  def mycallback(code):
    if code[1] != 0:
      print(str(code[0])) + " is On"
    else:
      print(str(code[0])) + " is Off"

  kp = keyPad(mycallback)
  while True:
    idle()
  ```
