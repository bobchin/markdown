# DC-DC コンバータ

## Links

- [5V入力/3～28V可変の3W実験用フライバック絶縁電源設計](https://www.zep.co.jp/snamiki/article/z-flybuck-da1/?syclid=d2f6gldpiras73bs66m0#2_flybuck)
- [電源回路の代表的な7方式： 低雑音型から昇圧型まで！](https://techweb.rohm.co.jp/product/power-ic/dcdc/20486/)
- [DC/DCコンバーターの種類](https://www.macnica.co.jp/business/semiconductor/articles/analog_devices/144517/)
- [コンバータ](https://detail-infomation.com/category/%e5%9b%9e%e8%b7%af/%e3%82%b3%e3%83%b3%e3%83%90%e3%83%bc%e3%82%bf/)
- [チョッパ回路](https://denki-no-shinzui.com/category/%e3%83%91%e3%83%af%e3%83%bc%e3%82%a8%e3%83%ac%e3%82%af%e3%83%88%e3%83%ad%e3%83%8b%e3%82%af%e3%82%b9/%e3%83%81%e3%83%a7%e3%83%83%e3%83%91%e5%9b%9e%e8%b7%af/)

## 種類

- リニアレギュレータ（シリーズレギュレータ/3端子レギュレータ）
  - メリット　：シンプルな構成。ノイズが少ない。
  - デメリット：効率が悪い（熱が出る）。降圧しかできない。

  基本的な考えとしては、入力電圧を抵抗で降圧して出力する。ゆえに抵抗での電圧降下分の熱が出る。  
  - [リニアレギュレータの動作原理と構成](https://www.ablic.com/jp/semicon/products/power-management-ic/voltage-regulator-ldo/intro-2/)
  - [DC/DCコンバータとは？](https://www.rohm.co.jp/electronics-basics/dc-dc-converters/dcdc_what6)
    - 出力トランジスタ: トランジスタ/MOSFET
    - 基準電圧回路: 出力電圧を決める。
    - 帰還抵抗: コンパレータに、NFB するための分圧抵抗
    - エラーアンプ: コンパレータ。出力電圧の高低によって、出力ドライバを調整する

    ```
    ex)
    出力を5Vにする。アンプ側には1mA流す。
    Vref = 1V
    => バーチャルショートにより、非反転端子が1V = R2の電圧も1V
    R2 = 1V / 1mA = 1kΩ
    R1 = (5V - 1V) / 1mA = 4kΩ

    Vo = Ir1r2 * (R1 + R2)  = (Vref / R2) * (R1 + R2) = (R1 + R2) / R2 * Vref
    ```

- スイッチングレギュレータ
  - メリット　：効率がいい（熱がない）。昇降圧できる。
  - デメリット：複雑な構成。ノイズあり。

  インダクタとコンデンサを使用して、スイッチ素子（MOSFET）を必要な電圧分ONして（デューティ比）電圧を出力する。  

  - [スイッチングレギュレータ](https://www.rohm.co.jp/electronics-basics/dc-dc-converters/dcdc_what5)
  - [降圧コンバータ](https://detail-infomation.com/buck-converter/)
  - [昇圧コンバータ](https://detail-infomation.com/boost-converter/)
  - [昇降圧コンバータ](https://detail-infomation.com/buck-boost-converter/)

  - 降圧型
    LとC直列回路に、MOSFETのスイッチをON/OFFすることで出力を調整する。  
    出力電圧が基準より低い場合、スイッチONして入力より電力を供給  
    出力電圧が基準より高い場合、スイッチOFFして、インダクタの電力を供給  

  - 昇圧型
    - ![昇圧型の動作原理](https://techweb.rohm.co.jp/upload/2022/01/DCDC_fig01.png)

    コイルの性質を利用して電圧を上げる。
    コイルは急激な電流の変化があると、元の状態を維持しようとする。
    OFF状態からON状態にすると、元の状態のままになろうとしてエネルギーを溜める。
    ON状態からOFF状態にすると、逆にエネルギーを出す。このときに元々以上の電圧が出る。
    この電圧をコンデンサに貯めて昇圧する。高い電圧にするには容量の大きなコンデンサが必要になる。

    ```
    Ion  = 1/L * Vin * Ton
    Ioff = 1/L * (Vout - Vin) * Toff

    Ion = Ioff のとき
    1/L * Vin * Ton = 1/L * (Vout - Vin) * Toff
    Vout - Vin = Vin * Ton / Toff
    Vout = (Vin * Toff + Vin * Ton) / Toff = (Ton + Toff) / Toff * Vin
    　　 = (1 + Ton/Toff) * Vin
    　　 = 1 / {Toff / (Ton + Toff)} * Vin = 1 / {1 - Ton / (Ton + Toff)} * Vin = 1 / 1-D * Vin (D=デューティ比)
    ```

  - 昇降圧型
    - 入力と出力が反転する（SEPICコンバータは反転しない奴）
    - ONデューティ比0.5以上 => 昇圧
    - ONデューティ比0.5以下 => 降圧

    ```
    インダクタに蓄えられるエネルギーと出力するエネルギーは同じ。
    スイッチON時はEinを使い、スイッチOFF時はEoutを使う。
    Ein * I_L * Ton = Eout * I_L * Toff
    Ein * Ton = Eout * Toff
    Eout = Ton / Toff * Ein (デューティ比を出すために無理やりTon+Toffを使う)
    Eout = {(Ton/Ton+Toff)/(Toff/Ton+Toff)} * Ein
    Eout = {(Ton/Ton+Toff)/(Ton+off/Ton+Toff - Ton/Ton+Toff)} * Ein
    Eout = {(Ton/Ton+Toff)/(1 - Ton/Ton+Toff)} * Ein

    Vout = D / 1-D * Vin (D=デューティ比)
    ```


    - 非絶縁型（1次側と2次側に導通がある）
      - 非同期（ダイオード）整流
        - バックコンバータ(降圧チョッパー回路)
        - ブーストコンバータ(昇圧チョッパー回路)
        - SEPICコンバータ(昇降圧コンバータ)
      - 同期整流

    - 絶縁型（1次側と2次側に導通がない = トランスを使っている？）
      - フォワードコンバータ
        - Vout = N * D * Vin
      - フライバックコンバータ

    - 分類型
      - 昇降圧
        - 降圧型
        - 昇圧型
        - 昇降圧型
        - 反転型
      - 出力フィードバック制御
        - 電流モード
        - 電圧モード
        - ヒステリシス
      - 動作モード
        - PWM(Pulse Width Modulation)    : 周波数一定で、ON/OFFの時間比で調整。
        - PFM(Pulse Frequency Modulation): ON/OFFの時間一定で、周波数で調整。

