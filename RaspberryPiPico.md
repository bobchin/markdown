# RaspberryPi Pico

## 参照

- [Raspberry Pi Pico をセットアップしよう](https://datasheets.raspberrypi.com/pico/getting-started-with-pico-JP.pdf)
  - <a href="file://D:\data\eBooks\Raspi\getting-started-with-pico-JP.pdf">PDF</a>

- [RP2040 を使用したハードウェア設計](https://datasheets.raspberrypi.com/rp2040/hardware-design-with-rp2040-JP.pdf)
  - <a href="file://D:\data\eBooks\Raspi\hardware-design-with-rp2040-JP.pdf">PDF</a>

- [ラズベリー・パイ Picoマイコン入門 C言語開発環境の構築](https://www.zep.co.jp/nbeppu/article/z-pico-da2/)
- [Windows用 RaspberryPi Pico コンパイル環境（C言語）の作り方](https://zenn.dev/oze/articles/ba36099cec0848)
- [無知から始めるRaspberry Pi Pico with C/C++](https://himco.jp/2023/04/06/%E7%84%A1%E7%9F%A5%E3%81%8B%E3%82%89%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88/)

## Windows の開発環境の作成

- [Pico Setup for Windows](https://github.com/raspberrypi/pico-setup-windows/blob/master/docs/tutorial.md)

  - ツールのインストール
    - [最新版](https://github.com/raspberrypi/pico-setup-windows/releases/latest/download/pico-setup-windows-x64-standalone.exe)

  - Visual Studio Code の起動
    - 「スタート」－「Raspberry Pi Pico SDK vXX」－「Pico – Visual Studio Code」から起動

  - サンプルを起動
    - 「pico-examplesプロジェクト」を構成するかどうか聞かれたら、Yes
    - キットの選択は、「Pico ARM GCC – Pico SDK Toolchain with GCC arm-none-eabi」