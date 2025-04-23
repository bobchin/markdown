# Joystick

```python
from machine import Pin
from time import sleep_ms

###############################################
# 変更する可能性のある変数
T_MSEC = 500
T_LED_LIMIT = 0.18
###############################################


# BUTTON
                  # GND:1
GP_BTN_DOWN  = 13 # DW :2
GP_BTN_UP    = 12 # UP :3
GP_BTN_RIGHT = 11 # RT :4
GP_BTN_LEFT  = 10 # LT :5
b_dw = Pin(GP_BTN_DOWN,  mode=Pin.IN, pull=Pin.PULL_UP)
b_up = Pin(GP_BTN_UP,    mode=Pin.IN, pull=Pin.PULL_UP)
b_rt = Pin(GP_BTN_RIGHT, mode=Pin.IN, pull=Pin.PULL_UP)
b_lt = Pin(GP_BTN_LEFT,  mode=Pin.IN, pull=Pin.PULL_UP)

# LED
GP_LED = 25
led = Pin(GP_LED, mode=Pin.OUT)
###############################################

# メイン処理
while True:
    if (not b_up.value()):
        if (not b_rt.value()):
            print('↗')
        elif (not b_lt.value()):
            print('↖')
        else:
            print('↑')

    elif (not b_dw.value()):
        if (not b_rt.value()):
            print('↘')
        elif (not b_lt.value()):
            print('↙')
        else:
            print('↓')

    elif (not b_lt.value()):
        print('←')

    elif (not b_rt.value()):
        print('→')
    led.toggle()
    sleep_ms(T_MSEC)
```

```python
from machine import Pin
from time import sleep_ms

T_MSEC = 500

GP_BTN_DOWN  = 13 # DW :2
GP_BTN_UP    = 12 # UP :3
GP_BTN_RIGHT = 11 # RT :4
GP_BTN_LEFT  = 10 # LT :5
pin_A = Pin(GP_BTN_DOWN,  mode=Pin.IN, pull=Pin.PULL_UP)
pin_B = Pin(GP_BTN_UP,    mode=Pin.IN, pull=Pin.PULL_UP)
pin_C = Pin(GP_BTN_RIGHT, mode=Pin.IN, pull=Pin.PULL_UP)
pin_D = Pin(GP_BTN_LEFT,  mode=Pin.IN, pull=Pin.PULL_UP)

UP_LEFT   = 10 # 1010
UP_CENTER = 11 # 1011
UP_RIGHT  = 9  # 1001
MD_LEFT   = 14 # 1110
MD_CENTER = 15 # 1111
MD_RIGHT  = 13 # 1101
DW_LEFT   = 6  # 0110
DW_CENTER = 7  # 0111
DW_RIGHT  = 5  # 0101

while True:
  value = 0
  value |= pin_A.value() << 3
  value |= pin_B.value() << 2
  value |= pin_C.value() << 1
  value |= pin_D.value()

  if (value == UP_LEFT):
    pass
  elif (value == UP_CENTER):
    pass
  elif (value == UP_RIGHT):
    pass
  elif (value == MD_LEFT):
    pass
  elif (value == MD_CENTER):
    pass
  elif (value == MD_RIGHT):
    pass
  elif (value == DW_LEFT):
    pass
  elif (value == DW_CENTER):
    pass
  elif (value == DW_RIGHT):
    pass

  sleep_ms(T_MSEC)
```

## HID

- ツール - パッケージ管理から

```cmd
install usb_device_keyboard
```

```python
import usb.device
from usb.device.keyboard import KeyboardInterface, KeyCode, LEDCode
from machine import Pin
from time import sleep_ms

###############################################
# 変更する可能性のある変数
T_MSEC = 1
###############################################


KEYS = (
    (Pin.cpu.GPIO10, KeyCode.LEFT),
    (Pin.cpu.GPIO11, KeyCode.RIGHT),
    (Pin.cpu.GPIO12, KeyCode.UP),
    (Pin.cpu.GPIO13, KeyCode.DOWN),
)

for pin, _ in KEYS:
    pin.init(Pin.IN, Pin.PULL_UP)

k = KeyboardInterface()
usb.device.get().init(k, builtin_driver=True)
print("Entering keyboard loop...")

keys = []
prev_keys = [None]

while True:
    if not k.is_open():
        continue
    keys.clear()
    for pin, code in KEYS:
        if not pin():
            keys.append(code)
    if keys != prev_keys:
        k.send_keys(keys)
        prev_keys.clear()
        prev_keys.extend(keys)
    sleep_ms(T_MSEC)
```