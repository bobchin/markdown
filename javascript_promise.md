# Promise

## 参考

- [JavaScript Promiseの本](https://azu.github.io/promises-book/)
- [JavaScript Primer
 非同期処理:Promise/Async Function](https://jsprimer.net/basic/async/)

## まとめ

- 非同期処理を抽象化したオブジェクトとそれを操作する仕組み
- javascriptで非同期処理といえば、callback
  - callback の引数は、(エラー, 結果)
    => callback の形式は決めごとであり、インターフェースではない。

    ```js
    getAsync("fileA.txt", (err, result) => {
      if (err) throw err;
      // 成功時の処理を記述
    });
    ```

- Promise では、成功時処理と失敗時処理のインタフェースが決まっている。

    ```js
    const promsie = getAsyncPromise("fileA.txt");
    promise.then(result => {
      // 成功時の処理
    })
    .catch(err => {
      // 失敗時の処理
    });
    ```

- 仕様
  - コンストラクタ, インスタンスメソッド

    ```js
    const promise = new Promise((resolve, reject) => {
      // 非同期処理をここに記述
      if (success) {
        resolve(); // 成功処理時に実行
      } else {
        reject();  // 失敗処理時に実行
      }
    });
    promise.then(onFullfilled, onRejected);
    promise.catch(onRejected);
    ```

  - 状態
    - Fullfilled: resolvしたとき
    - Rejected: rejectしたとき
    - Pending: 上記どちらでもない

  - async関数
    - 関数は必ずPromimeを返すようになる
      - 関数がPromiseを返したときはそのまま返す
      - 関数がPromise以外を返したときは、指定した値をもつFullfilledなPromiseを返す
      - 関数内で例外が発生したら、そのエラーをもつRejectedなPromiseを返す
    - 内部でawaitが使えるようになる

  - await式
    - async関数内でのみ使用可能
    - 右辺のPromiseがFullfilledまたはRejectedになるまで待つ