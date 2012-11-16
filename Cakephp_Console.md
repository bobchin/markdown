# Console

Shell: cake コマンドで実行できる
Task : コンポーネントみたいなもの。複数のShell間で使い回しができる。

## 使い方

```
cd app/
./Console/cake

Welcome to CakePHP v2.2.2 Console
---------------------------------------------------------------
App : app
Path: /var/www/xxx/app/
---------------------------------------------------------------
Current Paths:

 -app: app
 -working: /var/www/xxx/app
 -root: /var/www/xxx
 -core: /var/www/xxx/lib

Changing Paths:

Your working path should be the same as your application path to change your path use the '-app' param.
Example: -app relative/path/to/myapp or -app /absolute/path/to/myapp

Available Shells:

[CORE] acl, api, bake, command_list, console, i18n, schema, test, testsuite, upgrade

To run an app or core command, type cake shell_name [args]
To run a plugin command, type cake Plugin.shell_name [args]
To get help on a specific command, type cake shell_name --help
```

カレントが app 出ない場合は、
```
path/to/cake -app /path/to/cakephp/app
```

## Shell の作成

AppShell を継承して、main() メソッドを実装する。

> app/Console/Command/HelloShell.php

```
class HelloShell extends AppShell {
	public function main()
	{
		$this->out('Hello world');
	}

	public function create()
	{
		$this->out('This is create');
	}

	// 公開したくないメソッド
	private function _useInner()
	{
	}
}

class EchoShell extends AppShell {
	public function main()
	{
		...
	}
}
```

> 呼び出し方

public なメソッドはタスク名のように扱える。

```
cd app/
./Console/cake hello 		// HelloShell::main() が実行される
./Console/cake hello create	// HelloShell::create() が実行される
```


## Task の作成

AppShell を継承し、execute() メソッドを実装する。場所は app/Console/Command/Task 以下に配置する。
詳細はShellと同じ。

> pp/Console/Command/Task/HeyTask.php

```
class HeyTask extends AppShell {
	public function execute()
	{
		$this->out('This is Hey');
	}
}

// tasks プロパティで指定する。内部で使用する場合は以下のようにする。
class HelloShell extends AppShell {
	public $tasks = array('Hey');

	public function main()
	{
		$this->Hey->execute();
	}
}

// もしくは動的にロードする。ただしコマンドラインから呼び出せない。
class HelloShell extends AppShell {
	public function main()
	{
		$Hey = $this->Tasks->load('Hey');
		$Hey->execute();
	}
}
```

> 呼び出し方

```
cd app/
./Console/cake hello    	// HelloShell::main() が実行される
./Console/cake hello hey 	// HeyTask::execute() が実行される
```



## 引数およびオプションとヘルプ

### 設定の仕方

Shell::getOptionParser() をオーバーライドして設定する。
ConsoleOptionParserクラスを参照のこと。

```
class HelloShell extends AppShell {
	// 流れるインターフェースで指定
	public function getOptionParser()
	{
		$parser = parent::getOptionParser();
		$parser->addOption('option1', array(
			'help' => 'xxx',
		))->addArgument('arg1', array(
			'help' => 'xxx',
		))->addSubcommand('sub1', array(
			'help' => 'xxx',
		))->description(array(
			'line1', 'line2'
		))->epilog(array(
			'line1', 'line2'
		));
		return $parser;
	}

	// 配列で指定
	public function getOptionParser()
	{
		return ConsoleOptionParser::buildFromArray(
			'options' => array(),
			'arguments' => array(),
			'subcommands' => array(),
			'description' => array(),
			'epilog' => array(),
		);
	}
}
```

### オプション

```
class HelloShell extends AppShell {
	public function getOptionParser()
	{
		$parser = parent::getOptionParser();
		$parser->addOption('option1', array(
			'short'		=> 'o',								// 短い形式で指定時の文字
			'help' 		=> 'ここにヘルプメッセージを書く',	// "Options:" 欄に表示される
			'default' 	=> 'Yes',							// デフォルト値
			'boolean'	=> true,							// 値を指定しない形式。指定した場合は値が true となる
			'choices'	=> array('Yes', 'No'),				// 有効な値のリスト							
		));
		return $parser;
	}

	public function main()
	{
		// $this->params で取得できる
		$this->out($this->params['option1']);
	}
}
```


### 引数

```
class HelloShell extends AppShell {
	public function getOptionParser()
	{
		$parser = parent::getOptionParser();
		$parser->addOption('arg1', array(
			'help' 		=> 'ここにヘルプメッセージを書く',	// "Arguments:" 欄に表示される
			'required' 	=> true,							// 必須とするかどうか
			'index'		=> 1,								// $this->args のインデックス。指定しなければ設定順。またインデックスが被った場合は上書きされる。
			'choices'	=> array('Yes', 'No'),				// 有効な値のリスト							
		));
		return $parser;
	}

	public function main()
	{
		// $this->args で取得できる
		$this->out($this->args[1]);
	}
}
```


### サブコマンド

タスクのヘルプをタスクの方で実装したものを流用する。

```
class HelloShell extends AppShell {
	public $tasks = array('Hey');

	public function getOptionParser()
	{
		$parser = parent::getOptionParser();
		$parser->addSubcommand('hey', array(
			'help' 		=> 'ここにヘルプメッセージを書く',	// "Subcommand:" 欄に表示される
			'parser'	=> $this->Hey->getOptionParser(),	// Task に依頼する
		));
		return $parser;
	}

	public function main()
	{
		// $this->args で取得できる
		$this->out($this->args[1]);
	}
}
```

### 説明

```
class HelloShell extends AppShell {
	public function getOptionParser()
	{
		$parser = parent::getOptionParser();

		// 一番最初に出力される
		$parser
			->description('This is description')
			->description(array('line1', 'line2'));		// 配列の場合は行が変わる

		// 一番最後に出力される
		$parser
			->epilog('This is epilog')
			->epilog(array('line1', 'line2'));		// 配列の場合は行が変わる

		return $parser;
	}
}
```


## メソッド

### 出力する

```
class HelloShell extends AppShell {
	public function main()
	{
		// メッセージ
		// 改行数
		// 出力レベル（Shell::NORMAL | Shell::VERBOSE | Shell::QUIET)
		$this->out('output!', 2, Shell::VERBOSE);
	}
}
```

### 入力する

```
class HelloShell extends AppShell {
	public function main()
	{
		// メッセージ
		// 有効な値のリスト（値は大文字小文字関係なし）
		// デフォルト値
		$input = $this->in('Are you continue?', array('Yes', 'No'), 'yes');
	}
}
```


### 別の Shell を呼び出す

Shell::dispatchShell() を使用する。

```
class HelloShell extends AppShell {
	public function main()
	{
		// 別の Shell を呼び出す
		$this->dispatchShell('echo arg1 --option=value');
		// もしくはスペース区切りを引数にする
		$this->dispatchShell('echo', 'arg1', '--option=value');
	}
}
```


### その他

```
class HelloShell extends AppShell {
	public function main()
	{
		$this->err('Error', 2);
		$this->out('Msg' . $this->nl(2));
		$this->hr();
		$this->error('Error', 'Error Occured');
		$this->clear();
		$this->createFile('info.log', '正常に終了しました');
	}
}
```


## 出力形式

出力時にタグを指定することで色表示できる。
以下のモノが指定可能。

- error
- warning
- info
- comment
- question

```
class HelloShell extends AppShell {
	public function main()
	{
		$this->out('<error>Error Occured!</error>');
		$this->out('<warning>Warning!!!</warning>');
	}
}
```

独自の設定も可能

```
class HelloShell extends AppShell {
	public function main()
	{
		$this->stdout->styles('flashy', array(
			'text' => 'magenta', 	// テキストの色
			'bold' => true
			'underline' => true
			'blink' => true
			'reverse' => true
		));

		$this->out('<flashy>Error Occured!</flashy>');
	}
}
```

カラー出力をしないようにする。

```
class HelloShell extends AppShell {
	public function main()
	{
		$this->stdout->outputAs(ConsoleOutput::RAW);	// そのまま表示（<flashy>Error Occured!</flashy>）
		$this->stdout->outputAs(ConsoleOutput::PLAIN);	// タグは削除（Error Occured!）
		$this->stdout->outputAs(ConsoleOutput::COLOR);	// 通常表示（Error Occured!　※色付きで）

		$this->out('<flashy>Error Occured!</flashy>');
	}
}
```


