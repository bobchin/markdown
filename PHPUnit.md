# PHPUnit

## 参照

- [](http://phpunit.de/)
- [](http://phpunit.de/manual/current/ja/index.html)

## インストール

```
mkdir ~/phpunit
cd ~/phpunit
wget https://phar.phpunit.de/phpunit.phar
chmod +x phpunit.phar
sudo ln -s ~/phpunit/phpunit.phar usr/local/bin/phpunit
```

## 基本

+ クラス名はテストするクラスに "Test" を付ける
+ "PHPUnit_Framework_TestCase" を継承する
+ テストメソッドは、"test" で始まる public メソッドにするか  
または "@test" アノテーションをコメントに付けて指定する
+ テストメソッド中で、assertXXX() というアサーションメソッドを使用してテストする

```
#sample
class Hoge
{
	public function foo()
	{
		return 'foo';
	}

	public function bar()
	{
		return 'bar';
	}
}

#testclass
class HogeTest extends PHPUnit_Framework_TestCase
{
	public function testFoo()
	{
		$hoge = new Hoge;
		$this->assertEquals($hoge->foo(), 'foo');
	}

	/**
	 * @test
	 */
	public function bar()
	{
		$hoge = new Hoge;
		$this->assertEquals($hoge->bar(), 'bar');
	}
}
```

+ setUpBeforeClass() と tearDownAfterClass() はテストケースの最初と最後にコールされる
+ setUp() と tearDown() は各テストメソッドの前後にコールされる

```
# setUp() => testEmpty() => tearDown() =>
# setUp() => testPush() => tearDown()
class HogeTest extends PHPUnit_Framework_TestCase
{
	protected $stack;

	protected function setUp()
	{
		$this->stack = array();
	}

	protected function tearDown()
	{

	}

	public function testEmpty()
	{
		$this->assertTrue(empty($this->stack));
	}

	public function testPush()
	{
		array_push($this->stack, 'foo');
		$this->assertEquals($this->stack[count($this->stack) - 1], 'foo');
		$this->assertFalse(empty($this->stack));
	}
}


```









