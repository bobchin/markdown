# Atem

- DLL: C:\Program Files (x86)\Blackmagic Design\Blackmagic ATEM Switchers\Developer SDK\Windows\Samples\SimpleSwitcherExampleCSharp\obj\x64\Debug\Interop.BMDSwitcherAPI.dll

- using BMDSwitcherAPI

- オブジェクト
  - IBMDSwitcher: スイッチャーオブジェクト
    - IBMDSwitcherDiscovery: スイッチャーを検索するオブジェクト

  - IBMDSwitcherInput: 入力オブジェクト
    - IBMDSwitcher.CreateIterator(): Iteratorを生成
    - IBMDSwitcherInputIterator: 入力をリスト化するオブジェクト
    - IBMDSwitcherInput.GetInputId()

  - IBMDSwitcherMixEffectBlock: 出力オブジェクト
    - IBMDSwitcher.CreateIterator(): Iteratorを生成
    - IBMDSwitcherMixEffectBlockIterator: 出力をリスト化するオブジェクト

    - IBMDSwitcherMixEffectBlock.SetPreviewInput(): プレビュー選択
    - IBMDSwitcherMixEffectBlock.SetProgramInput(): プログラム選択
    - IBMDSwitcherMixEffectBlock.PerformAutoTransition(): 変更実行

## SRC

```C#
long GetInputId(IBMDSwitcherInput input) {
  long id;
  input.GetInputId(out id);
  return id;
}

// スイッチャー検索オブジェクト
IBMDSwitcherDiscovery discovery = new CBMDSwitcherDiscovery();

// スイッチャーにアクセス
IBMDSwitcher switcher;  // スイッチャーオブジェクト
_BMDSwitcherConnectToFailure failureReason;
string ip = "192.168.10.240";
discovery.ConnectTo(ip, out switcher, out failureReason);

// 入力ポートの取得
List<IBMDSwitcherInput> inputs = new List<IBMDSwitcherInput>();

IntPtr inputIteratorPtr;
switcher.CreateIterator(typeof(IBMDSwitcherInputIterator).GUID, out inputIteratorPtr);
IBMDSwitcherInputIterator inputIterator = Marshal.GetObjectForIUnknown(inputIteratorPtr) as IBMDSwitcherInputIterator;

if (inputIterator != null) {
  while (true) {
    // 入力ポートオブジェクト
    IBMDSwitcherInput input;
    inputIterator.Next(out input);

    if (input == null) {
      continue;
    }

    // ポート種類
    _BMDSwitcherPortType type;
    input.GetPortType(out type);
    if (type != _BMDSwitcherPortType.bmdSwitcherPortTypeExternal) {
      continue;
    }

    inputs.Add(input);
  }
}


// 出力ポートの取得
List<IBMDSwitcherMixEffectBlock> mixeffects = new List<IBMDSwitcherMixEffectBlock>();

IntPtr meIteratorPtr;
switcher.CreateIterator(typeof(IBMDSwitcherMixEffectBlockIterator).GUID, out meIteratorPtr);
IBMDSwitcherMixEffectBlockIterator meIterator = Marshal.GetObjectForIUnknown(meIteratorPtr) as IBMDSwitcherMixEffectBlockIterator;
if (meIterator != null) {
  while(true) {
    // 出力ポートオブジェクト
    IBMDSwitcherMixEffectBlock me;
    meIterator.Next(out me);

    if (me == null) {
      continue;
    }

    mixeffects.Add(me);
  }
}


// トランジションの設定
IBMDSwitcherInput input4 = inputs[3];
long input_id = GetInputId(input4);
IBMDSwitcherMixEffectBlock me0 = mixeffects[0];

me0.SetPreviewInput(input_id);
me0.PerformAutoTransition();
```
