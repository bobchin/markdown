# 思い出し

## サンプル

- 文字列

  - 文字分割

    ```js
    const str = "abcdef12345"
    console.log(str.split(''))
    ```

  - 指定文字数分割

    ```js
    const str = "abcdef12345"
    const num = 3
    const base_array = str.split('')
    // 指定数で割り切れるタイミングで文字列を
    base_array.reduce((acc, c, i) => {
      i % num
        ? acc                                            // すでに作成ずみなので、そのまま返す
        : [...acc, base_array.slice(i, i+num).join('')]  // 指定文字数分を取得して要素を作成
    }, [])
    console.log(str.split(''))
    ```

  - ASCII文字列

    ```js
    const str = "abcdef12345"
    str.split('').map(c => {
      console.log(c.charCodeAt(0).toString())   // 97
      console.log(c.charCodeAt(0).toString(16)) // 61
    })
    ```

  - 10進変換

    ```js
    const str = "a"
    console.log(parseInt(str, 16))  // 10
    ```

- 数値

  - 文字列化

    ```js
    // 10進 => 16進
    const number = 65 // = 0x41 = "A"
    console.log(number.toString())    // "65"
    console.log(number.toString(16))  // "41"

    const number = 254
    console.log(number.toString(16))  // "fe"
    ```


