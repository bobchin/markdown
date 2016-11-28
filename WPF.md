# WPF

## 構成モジュール

- PresentationCore
- PresentationFramework
- WindowsBase
- System.Xaml

## 構造

XAMLファイルのソース部分は、partialクラスとなっていて一部しか表示されない。
XAML部分はコンパイルすると、objフォルダ以下に xxx.g.cs というファイルで
ソースコード部分にマージされて出力される。
Mainメソッドがない理由はこのせい。

- MainWindow（スタートアップウィンドウ）

```MainWindow.xaml
// MainWindow.xaml
<Window x:Class="WpfApplication1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApplication1"
        mc:Ignorable="d"
        Title="MainWindow" Height="350" Width="525">
    <Grid>
        
    </Grid>
</Window>
```

```MainWindow.xaml.cs
// MainWindow.xaml.cs
namespace WpfApplication1
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            // 記述は存在しないがコンパイル後のMainWindow.g.csにある。
            // 結局はMainWindow.xamlをロードしている処理
            InitializeComponent();
        }
    }
}
```

```MainWindow.g.cs
// MainWindow.g.cs
namespace WpfApplication1 {

    public partial class MainWindow : System.Windows.Window, System.Windows.Markup.IComponentConnector
    {
        private bool _contentLoaded;
        
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/WpfApplication1;component/mainwindow.xaml", System.UriKind.Relative);
            
            System.Windows.Application.LoadComponent(this, resourceLocater);
        }
        
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            this._contentLoaded = true;
        }
    }
}
```

- App（メインクラス）

App.g.cs にMain()メソッドがある。
スタートアップクラスにMainWindow.xamlを指定し、メインループを実行する。

```App.xaml
// App.xaml
<Application x:Class="WpfApplication1.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:WpfApplication1"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

```App.cs
// App.cs
namespace WpfApplication1
{
    public partial class App : Application
    {
    }
}
```

```App.g.cs
// App.g.cs
namespace WpfApplication1 {
    public partial class App : System.Windows.Application
    {
        public void InitializeComponent() {
            this.StartupUri = new System.Uri("MainWindow.xaml", System.UriKind.Relative);
        }
        
        public static void Main() {
            WpfApplication1.App app = new WpfApplication1.App();
            app.InitializeComponent();
            app.Run();
        }
    }
}
```

### 手動で書いてみる

- 以下を参照に追加
  - PresentationCore
  - PresentationFramework
  - WindowsBase
  - System.Xaml

```
// MainWindow.cs
namespace Sample
{
    using System.Windows;
    using System.Windows.Control;

    class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            // XAMLをロードした結果＝コントロールのインスタンス化
            var grid = new Grid();
            this.Content = grid;
        }
    }
}

// App.cs
namespace Sample
{
    using System;
    using System.Windows;

    class App : Application
    {
        [STAThread]
        public static void Main(string[] args)
        {
            var app = new App();
            app.InitializeComponent();
            app.Run();
        }

        private void InitializeComponent()
        {
            this.Startup += App_Startup;
        }

        private void App_Startup(object sender, StartupEventARgs e)
        {
            var w = new MainWindow();
            w.Show();
        }
    }
}
```

## XAML

オブジェクトのインスタンス化に特化したドメイン固有言語といってよい。

### 特徴

- コンテンツモデルとデータテンプレート
- スタイル
- データバインディング

#### コンテンツモデルとデータテンプレート

単一の要素を表示するコントロールは **ContentControl** という。  
いわゆるこれまでのコンポーネントみたいなもの？ButtonやLabelなど。  
**ContentControl** は **"Content"** というプロパティがあり、ここに指定されたものが表示される。

大まかにContentプロパティの設定による表示の方法は以下３種類
- DataTemplateを使う：複数のコントロールをテンプレート化して表示する
- コントロール(UIElement型)を使う：コントロールをそのまま表示する
- 文字列化：どれでもないときは文字列化してTextBlockにする

詳細ロジックは以下
1. ContentTemplate に DataTemplate があるときはそれをそのまま使う
1. UIElement型の場合はそれをそのまま使う
1. Content プロパティに設定された型に DataTemplate が定義されていればそれを使う。
1. UIElement型へ変換する TypeConverter があればそれを使ってUIElement型へ変換する。
1. string型へ変換する TypeConverter があればそれを使って文字列型へ変換してTextBlockで表示。
1. ToString() を使って文字列型へ変換してTextBlockで表示。

- ContentTemplateの場合
```
// MainWindow.xaml
<Button x:Name="button">
    <Button.ContentTemplate>
        <DataTemplate>
            <StackPanel>
                <!-- BindingでContentに割り当てたオブジェクトのプロパティを参照する -->
                <TextBlock Text="{Binding Name}" />
                <TextBlock Text="{Binding Age, StringFormat={0}歳}" />
                <Image Source="{Binding Picture}" Stretch="None" />
            </StackPanel>
        </DataTemplate>
    </Button.ContentTemplate>
</Button>

// MainWindow.cs
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public BitmapImage Picture { get; set; }
}

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        var p = new Person{ Name="画像", Age=9, Picture=new BitmapImage(new Uri("image.png", UriKind.Relative)) }
        button.Content = p;
    }
}
```

- UIElement型の場合
```
<Button>
    <StackPanel Orientation="Horizontal" Margin="5">
        <TextBlock Text="button" />
        <Image Source="btn.png" Stretch="None" />
        <TextBlock Text="button" />
    </StackPanel>
</Button>
```

#### スタイル

コントロールのプロパティ設定を複数のコントロールで共有できる。
コントロールのStyleプロパティにStyleを設定する。
StyleはSetterでプロパティ=値を設定する。

```
<Button Content="スタイルの例">
    <Button.Style>
        <Style TargetType="Button">
            <Setter Property="Background" Value="Black" />
            <Setter Property="Foreground" Value="White" />
        </Style>
    </Button.Style>
</Button>
```

リソース化することで共有しやすくなる。
また、TargetTypeでコントロール指定できる。

```
<Window>
    <Window.Resources>
        <Style TargetType="Button">
            <Setter Property="Background" Value="Black" />
            <Setter Property="Foreground" Value="White" />
        </Style>
    </Window.Resources>

    <StackPanel>
        <Button Content="スタイルの例1" />
        <Button Content="スタイルの例2" />
        <Button Content="スタイルの例3" />
    </StackPanel>
</Window>
```

#### データバインディング

基本的には、**DataContext** プロパティに設定されたオブジェクトの値を参照する。
**DataContext** プロパティのオブジェクトを変更することで対象を変更することができる。

```
// MainWindow.xaml
<Window>
    <Button Content="{Binding FullName}" />
</Window>

// MainWindow.cs
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        this.DataContext = new { FullName = "ほげほげ" };
    }
}

```


### 構文

- プロパティの設定方法
  - 属性構文：タグの属性でプロパティを指定する。
  - プロパティ要素構文：値がオブジェクトの場合は属性で指定できないので、入れ子のタグにする。
  - コレクション構文：コレクションを指定する。
  - コンテンツ構文：プロパティに**ContentPropertyAttribute属性**をつけるとコンテントプロパティとなる。  
  コンテントプロパティとなったプロパティはプロパティ名を指定することが可能となる。

```
namespace Sample
{
    using System;

    [System.Windows.Markup.ContentPropery("Name")]
    public class Person
    {
        public string FullName { get; set; }
        public int Salary { get; set; }
        public PersonCollection Children { get; set; }
        public string Name { get; set; }
    }

    public class PersonCollection : Collection<Person> {}
}

// 属性構文
<p:Person xmlns:p="clr-namescpae:Sample;assembly:Sample"
    FullName="ほげほげ" Salary="3000" />

// プロパティ要素構文
<p:Person xmlns:p="clr-namescpae:Sample;assembly:Sample">
    <p:Person.FullName>ほげほげ</p:Person.FullName>
    <p:Person.Salary>3000</p:Person.Salary>
</p:Person>

// コレクション構文
<Person xmlns:p="clr-namescpae:Sample;assembly:Sample" Id="person1">
    <Person.Children>
        <!-- 省略可能 -->
        <!-- <PersonCollection> -->
            <Person Id="person1-1" />
            <Person Id="person1-2" />
            <Person Id="person1-3" />
        <!-- 省略可能 -->
        <!-- </PersonCollection> -->
    </Person.Children>
</Person>

// コンテンツ構文
<Person xmlns:p="clr-namescpae:Sample;assembly:Sample" Id="person1">
    Nameの値
</Person>
// 上記と同じこと
<Person xmlns:p="clr-namescpae:Sample;assembly:Sample" Id="person1" Content="Nameの値" />
<Person xmlns:p="clr-namescpae:Sample;assembly:Sample" Id="person1">
    <Person.Content>Nameの値</Person.Content>
</Person>
```

- マークアップの拡張
  - Binding
  - StaticResource
  - DynamicResource
  - など

  - **MarkupExtension** を継承した拡張用のクラスを作成する
  - ProvideValue() の返り値がセットされる

```
namespace CollectionXaml
{
    using System;
    using System.Windows.Markup;

    public class Item
    {
        public string Id { get; set; }
    }

    public class IdProviderExtension : MarkupExtension
    {
        public string Prefix { get; set; }
        public override object ProvideValue(System.IServiceProvider serviceProvider)
        {
            return Prefix + Guid.NewGuid().ToString();
        }
    }
}

// XAML
<Item xmlns="clr-namespace:CollectionXaml;assembly=CollectionXaml"
    Id={IdProviderExtension Prefix="item-"} />
```


## WPF詳細

### DispatcherObject

Windowsフォームと同様にUIスレッドとは別のスレッドから値の変更をすることはできない。
DispatcherObjectを経由することでスレッドセーフになる。

```
<Window x:Class="DispatcherObjectSample01.MainWindow" 
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
        Title="MainWindow" Height="350" Width="525"> 

    <StackPanel> 
         <Button Content="UIスレッドからなのでOK" Click="OKButton_Click" /> 
         <Button Content="UIスレッド以外から呼ぶのでNG" Click="NGButton_Click" /> 
         <Button Content="UIスレッド以外からDispatcher経由で呼ぶのでOK" 
                 Click="DispatcherButton_Click" /> 
    </StackPanel> 
</Window>

public class DrivedObject : DispatcherObject 
{ 
    public void DoSomething() 
    { 
        // UIスレッドからのアクセスかチェックする 
        this.VerifyAccess(); 
        Debug.WriteLine("DoSomething"); 
    } 
}

private void OKButton_Click(object sender, RoutedEventArgs e) 
{ 
    // UIスレッドからの普通の呼び出しなのでOK 
    var d = new DrivedObject(); 
    d.DoSomething(); 
} 

private async void NGButton_Click(object sender, RoutedEventArgs e) 
{ 
    // UIスレッド以外からの呼び出しなので例外が出る 
    var d = new DrivedObject(); 
    try 
    { 
        await Task.Run(() => d.DoSomething()); 
    } 
    catch (Exception ex) 
    { 
        Debug.WriteLine(ex); 
    } 
} 

private async void DispatcherButton_Click(object sender, RoutedEventArgs e) 
{ 
    // UIスレッド以外だがDispatcher経由での呼び出しなのでOK 
    var d = new DrivedObject(); 
    await Task.Run(async () => 
    { 
        if (!d.CheckAccess()) 
        { 
            await d.Dispatcher.InvokeAsync(() => d.DoSomething()); // OK 
        } 
    }); 
} 
```

### プロパティシステム

- 依存関係プロパティ
  - 以下の機能がある（通常のプロパティに機能追加したようなイメージ）
    - リソースからの値の取得
    - データバインディングへの対応
    - スタイルによる値の設定
    - アニメーション
    - オーバーライド可能なメタデータ
    - 親子関係にあるインスタンスでのプロパティの継承
- 添付プロパティ
  - 依存関係プロパティは、自身のクラス（DependencyObjectを継承したクラス）のプロパティに設定できる。
    自身以外の別のクラス（DependencyObjectを継承したクラス）に添付プロパティをキーにしてセットできる。
    添付プロパティをキーにして、DependencyObjectを継承したクラスと値をマッピングできるようになる？


#### 依存関係プロパティ

- 作り方

  - DependencyObjectの継承
  - **public static readonly** フィールド名は "プロパティ名 + Property"
  - DependencyProperty.Register() で **public static readonly** なフィールドを作成する
    - 第1引数：プロパティ名
    - 第2引数：プロパティの型
    - 第3引数：プロパティを定義しているクラスの型
    - 第4引数：メタデータ(PropertyMetadata型)
    - 第5引数：入力された値をチェックするメソッド(bool delegate(object value)) => falseを返すと例外を発生
  - プロパティは、GetValue()・SetValue() を使用する
  - 第4引数のメタデータ(PropertyMetadata型)指定
    - 第1引数：デフォルト値
    - 第2引数：変更通知コールバック(void delegate(DependencyObject d, DependencyPropertyChangedEventArgs e))
    - 第3引数：値矯正コールバック(object delegate(DependencyObject d, object baseValue))
  - 第4引数のメタデータの種類
    - PropertyMetadata
    - UIPropertyMetadata
    - FrameworkPropertyMetadata

- 最小限の依存関係プロパティ

```C#
public class Person : DependencyObject
{
    public static readonly DependencyProperty NameProperty = 
        DependencyProperty.Register(
            "Name",                              // プロパティ名 
            typeof(string),                      // プロパティの型
            typeof(Person),                      // このプロパティを定義しているクラス
            new PropertyMetadata("default name") // 初期値などのメタ情報
        );
}

// プロパティは GetValue()・SetValue() を使用する
var p = new Person();
Console.WriteLine(p.GetValue(Person.NameProperty));
p.SetValue(Person.NameProperty, "bobchin");
Console.WriteLine(p.GetValue(Person.NameProperty));
```

- 通常のプロパティとは違うので同じように見せる

```
public class Person : DependencyObject
{
    public static readonly DependencyProperty NameProperty = 
        DependencyProperty.Register(
            "Name", 
            typeof(string),
            typeof(Person),
            new PropertyMetadata("default name")
        );
    
    public string Name
    {
        get { return (string)GetValue(NameProperty); }
        set { SetValue(NameProperty, value); }
    }
}

// 普通のプロパティと同じように見える
var p = new Person();
Console.WriteLine(p.Name);
p.Name = "bobchin";
Console.WriteLine(p.Name);
```

- メタデータの使い方

```
public class Person : DependencyObject
{
    public static readonly DependencyProperty AgeProperty = 
        DependencyProperty.Register(
            "Age", 
            typeof(int),
            typeof(Person),
            new PropertyMetadata(
                0,                  // デフォルト値
                AgePropertyChanged, // 変更通知
                CoerceAgeValue      // 値の矯正
            ),
            ValidateAgeValue        // 入力された値をチェック
        );
    
    private static void AgePropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        Console.WriteLine("Age is changed: {0} to {1}",
            e.OldValue, e.NewValue);
    }
    
    private static object CoerceAgeValue(DependencyObject d, object baseValue)
    {
        var value = (int)baseValue;
        if (value < 0) value = 0;
        if (value < 120) value = 120;
        return value;
    }

    private static bool ValidateAgeValue(object value)
    {
        int age = (int)value;
        return (age != int.MaxValue) && (age != int.MinValue);
    }

    public string Age
    {
        get { return (string)GetValue(AgeProperty); }
        set { SetValue(AgeProperty, value); }
    }
}

var p = new Person();
p.Age = 10;
p.Age = -1;
p.Age = 150;
try
{
    p.Age = int.MinValue;
}
catch(ArgumentException ex)
{
    Console.WriteLine(ex);
}
```

- 読み取り専用依存関係プロパティ

```
public class Person : DependencyObject
{
    // private で公開せずに DependencyPropertyKey を作成しこれを元にする
    private static readonly DependencyPropertyKey BirthdayPropertyKey = 
        DependencyProperty.RegisterReadOnly(
            "Birthday", 
            typeof(DateTime),
            typeof(Person),
            new PropertyMetadata(DateTime.Now));

    // 公開する側は DependencyPropertyKey から取得
    public static readonly DependencyProperty BirthdayProperty = BirthdayPropertyKey.DependencyProperty;

    public Birthday
    {
        get { return (DateTime)GetValue(BirthdayProperty); }
        // 登録はDependencyPropertyKeyを使う
        private set { SetValue(BirthdayPropertyKey, value); }
    }
```


#### 添付プロパティ

```
// 添付プロパティ実装側は DependencyObject を継承する必要なし
public static class Sample
{
    // RegisterAttached() を使用して登録する
    public static readonly DependencyProperty BirthdayProperty = 
        DependencyProperty.RegisterAttached(
            "Birthday", 
            typeof(DateTime),
            typeof(Person),
            new PropertyMetadata(DateTime.Now));

    public static DateTime GetBirthday(DependencyObject obj)
    {
        return (DateTime)obj.GetValue(BirthdayProperty);
    }
    public static void SetBirthday(DependencyObject obj, DateTime value)
    {
        obj.SetValue(BirthdayProperty, value);
    }
}

var p = new Person();
Sample.SetBirthday(p, DateTime.Now);
Console.WriteLine(Sample.GetBirthday(p));
```


### イベントシステム

- バブルイベント：イベントが子要素から親要素へ向かって伝搬する
- トンネルイベントイベントが親要素から子要素へ向かって伝搬する

- 定義サンプル
  - EventManager の RegisterRoutedEventメソッドを使う

```
class Person : FrameworkElement
{
    public static RoutedEvent ToAgeEvent = EventManager.RegistRoutedEvent(
        "ToAge",                    // イベント名
        RoutedStrategy.Tunnel,      // イベント種類(RoutedStrategy.Bubble|RoutedStrategy.Tunnel)
        typeof(RoutedEventHandler), // イベントハンドラの型
        typeof(Person)              // イベントを定義しているクラス
    );

    public event RoutedEventHandler ToAge
    {
        add { this.AddHandler(ToAgeEvent, value); }
        remove { this.RemoveHandler(ToAgeEvent, value); }
    }

    public void AddChild(Person child)
    {
        this.AddLogicalChild(child);
    }
}

var perent = new Person{ Name = "parent"; };
var child = new Person{ Name = "child"; };
parent.AddChild(child);

parent.ToAge += (object s, RoutedEventArgs e) =>
{
    Console.WriteLine( ((Person)e.Source).Name );

    // 以降のイベント伝搬を止める
    // e.Handled = true;
}

parent.RaiseEvent(new RoutedEventArgs(Person.ToAgeEvent));
child.RaiseEvent(new RoutedEventArgs(Person.ToAgeEvent));
```

- 添付イベント
  - 自身に定義されていないイベントを処理する？


### コンテンツモデル

外観・見た目をカスタマイズする方法は以下２種類ある。

- ContentTemplateを使う：コントロールの中心であるContentをテンプレートを使って表す
- ControlTemplateを使う：完全にコントロールのすべてをテンプレートを使って表す


- DataTemplate基本：ContentControlクラス（コントロールの親クラス）のContentTemplateにDataTemplateを適用する。

```
<Window x:Class="DataTemplateSample01.MainWindow" 
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
        xmlns:local="clr-namespace:DataTemplateSample01" 
        Title="MainWindow" Height="350" Width="525">
    <Grid>
        <ListBox x:Name="listbox">
            <ListBox.ItemTemplate>
<!-- ここからが表示用のテンプレートとなる -->
                <DataTemplate DataType="{x:Type local:Person}"
                    <Border BorderBrush="Red" BorderThickness="1" Padding="5">
                        <StackPanel Orientation="Horizontal">
                            <Label Content="Name" />
                            <TextBlock Text="{Binding Name}" />
                            <Label Content="Age" />
                            <TextBlock Text="{Binding Age}" />
                        </StackPanel>
                    </Border>
                </DataTemplate>
<!-- ここまで -->
            </ListBox.ItemTemplate>
        </ListBox>
    </Grid>
</Window>

public class Person
{
    public string Name { get; set; }
    public string Age { get; set; }
}
```

- テンプレートなのでリソース化したほうが使いやすい
```
<Window x:Class="DataTemplateSample01.MainWindow" 
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
        xmlns:local="clr-namespace:DataTemplateSample01" 
        Title="MainWindow" Height="350" Width="525">
    <Window.Resources>
        <DataTemplate x:Key="PersonTemplate" DataType="{x:Type local:Person}"
            <Border BorderBrush="Red" BorderThickness="1" Padding="5">
                <StackPanel Orientation="Horizontal">
                    <Label Content="Name" />
                    <TextBlock Text="{Binding Name}" />
                    <Label Content="Age" />
                    <TextBlock Text="{Binding Age}" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </Window.Resources>

    <Grid>
        <ListBox x:Name="listbox" ItemTemplate="{StaticResource PersonTemplate}" />
    </Grid>
</Window>

// x:Key を指定しないと全コントロールに適用されてしまう
<Window x:Class="DataTemplateSample01.MainWindow" 
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
        xmlns:local="clr-namespace:DataTemplateSample01" 
        Title="MainWindow" Height="350" Width="525">
    <Window.Resources>
        <DataTemplate DataType="{x:Type local:Person}"
            <Border BorderBrush="Red" BorderThickness="1" Padding="5">
                <StackPanel Orientation="Horizontal">
                    <Label Content="Name" />
                    <TextBlock Text="{Binding Name}" />
                    <Label Content="Age" />
                    <TextBlock Text="{Binding Age}" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </Window.Resources>

    <Grid>
        <ListBox x:Name="listbox" />
    </Grid>
</Window>
```

- データの値に応じてテンプレートを変える => DataTrigger

```
public class Person
{
    public string Name { get; set; }
    public string Age { get; set; }
    public bool IsOVer40 { get{ return this.Age >= 40; } }
}

<Window x:Class="DataTemplateSample01.MainWindow" 
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
        xmlns:local="clr-namespace:DataTemplateSample01" 
        Title="MainWindow" Height="350" Width="525">
    <Window.Resources>
        <DataTemplate DataType="{x:Type local:Person}"
            <Border x:Name="border" BorderBrush="Red" BorderThickness="1" Padding="5">
                <StackPanel Orientation="Horizontal">
                    <Label Content="Name" />
                    <TextBlock Text="{Binding Name}" />
                    <Label Content="Age" />
                    <TextBlock Text="{Binding Age}" />
                </StackPanel>
            </Border>
            <DataTemplate.Triggers>
                <DataTrigger Binding="{Binding IsOVer40}" Value="True">
                    <Setter TargetName="boder" Property="BorderBrush" Value="Blue" />
                </DataTrigger>
            </DataTemplate.Triggers>
        </DataTemplate>
    </Window.Resources>

    <Grid>
        <ListBox x:Name="listbox" />
    </Grid>
</Window>
```

- より細かい条件でテンプレートを変える => DataTemplateSelector

```
public class PersonDataTemplateSelector : DataTemplateSelector
{
    public override DataTemplate SelectTemplate(object item, DependencyObject container)
    {
        var p = (Person)item;
        if (p.Age < 40)
        {
            return (DataTemplate)((FrameworkElement)container).FindResource("PersonTemplate1");
        }
        else
        {
            return (DataTemplate)((FrameworkElement)container).FindResource("PersonTemplate2");
        }
    }
}

public class Person
{
    public string Name { get; set; }
    public string Age { get; set; }
    public bool IsOVer40 { get{ return this.Age >= 40; } }
}

<Window x:Class="DataTemplateSample01.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
        xmlns:local="clr-namespace:DataTemplateSample01" 
        Title="MainWindow" Height="350" Width="525">
    <Window.Resources>
        <!-- Age が40より下の場合のテンプレート -->
        <DataTemplate x:Key="PersonTemplate1" DataType="{x:Type local:Person}"
            <StackPanel Orientation="Horizontal">
                <Label Content="Name" />
                <TextBlock Text="{Binding Name}" />
                <Label Content="Age" />
                <TextBlock Text="{Binding Age}" />
            </StackPanel>
        </DataTemplate>

        <!-- Age が40以上の場合のテンプレート -->
        <DataTemplate x:Key="PersonTemplate2" DataType="{x:Type local:Person}"
            <StackPanel Orientation="Horizontal">
                <Label Content="Name" />
                <TextBlock Text="{Binding Name}" />
            </StackPanel>
        </DataTemplate>
    </Window.Resources>

    <Grid>
        <ListBox x:Name="listbox">
            <ListBox.ItemTemplateSelector>
                <local:PersonDataTemplateSelector />
            </ListBox.ItemTemplateSelector>
        </ListBox>
    </Grid>
</Window>
```

- ControlTemplateをのサンプル

```
<Window x:Class="DataTemplateSample01.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
        xmlns:local="clr-namespace:DataTemplateSample01" 
        Title="MainWindow" Height="350" Width="525"
        Template="{StaticResource WindowTemplate}">

    <Window.Resources>
        <ControlTemplate x:Key="WindowTemplate" TragetType="{x:Type Window}">
            <Border Background="{TemplateBiding Background}" Padding="10">
                <Grid>
                    <Grid.RowDefinitions>
                        <RowDefinitions Height="Auto" />
                        <RowDefinitions Height="*" />
                        <RowDefinitions Height="Auto" />
                    </Grid.RowDefinitions>

                    <Grid Grid.Row="0">
                        <TextBlock Text="System Title" FontSize="24" />
                        <Button Content="Common Command" HorizontalAlignment="Right" />
                    </Grid>
                    <ContentPresenter Grid.Row="1" Margin="0, 10" />
                    <Grid Grid.Row="2">
                        <TextBlock Text="Footer" />
                    </Grid>
                </Grid>
            </Border>
        </ControlTemplate>
    </Window.Resources>

    <Grid>
        <Button Content="Window Content" />
    </Grid>
</Window>
```



### バインディング

- ターゲット側(GUI側)のプロパティは依存関係プロパティである必要がある
- バインドするソースの指定方法
  - DataContext で指定
  - Bindingマークアップ拡張のSourceで指定
  - ElementName で指定：コントロールを直接指定する場合
  - RelativeSource で指定：コントロールの階層構造を使って指定する場合（先祖コントロールなど）
- バインドの指定方法
  - Path：バインドするビューモデル等のプロパティ名
  - Source：バインドするビューモデル等のクラス名。省略した場合（通常は）は、ターゲット側で DataContextに指定されたオブジェクトになる。
  - ElementName：UI要素（コントロール）を直接指定する
  - RelativeSource：UI要素（コントロール）そのものや先祖などを階層的に指定

- バインディングの方向
  - OneTime         // UIの生成時に１度だけバインドする
  - OneWay          // ソース => ターゲットのみ
  - OneWayToSource  // ターゲット => ソースのみ(UpdateSourceTrigger指定可能)
  - TwoWay          // ソース <=> ターゲット 両方向(UpdateSourceTrigger指定可能)
    - UpdateSourceTrigger：ソースのプロパティに反映するタイミング
      - Default: ターゲットの依存関係プロパティのメタデータに基づく
      - PropertyChanged: ターゲットのプロパティが変更するたびに
      - LostFocus: ターゲットのフォーカスが外れたとき
      - Explicit: 明示的にUpdateSourceメソッドを呼び出したとき

```
<Window>
    <Grid>
        <Button x:Name="button" Content="{Binding Name}" />
        <Button x:Name="button" Content="{Binding Path=Name}" />
    </Grid>
</Window>

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        // Windowに指定したらWindow内のすべてのコントロールのDataContextとなる
        this.DataContext = new { Name = "bobchin" };

        // ボタンだけに指定する場合
        // button.DataContext = new { Name = "bobchin" };
    }
}
```

- データの変換
  - Bindingマークアップ拡張のConverterプロパティに指定
  - コンバータとして指定するクラスはIValueConverterを実装する

```
public class DegreeToRadianConverter : IValueConverter
{
    // ソース（データ） => ターゲット
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        double x = (double)value;
        return x / 180 * Math.PI;
    }

    // ターゲット => ソース（データ）
    public object ConvertBack(object value, Type targetType, object parameter,  CultureInfo culture)
    {
        double x =  double.Parse((string)value);
        return (x / Math.PI * 180).ToString();
    }
}

// XAML
<StackPanel xmlns:local="clr-namespace:atmarkit05">
  <StackPanel.Resources>
    <local:DegreeToRadianConverter x:Key="DegToRad"/>
  </StackPanel.Resources>

  <Slider x:Name="slider" Value="0" Minimum="0" Maximum="360" />
  <!-- slierのvalueプロパティをそのまま表示=角度の度数表示 -->
  <TextBox Text="{Binding ElementName=slider, Path=Value}" />
  <!-- slierのvalueプロパティを変換して表示=弧度法表示 -->
  <TextBox Text="{Binding ElementName=slider, Path=Value, Converter={StaticResource DegToRad}}" />
</StackPanel>
```


- データの検証
  - ValidationRule
  - IDataErrorInfo
  - INotifyDataErrorInfo

```
public class Person : INotifyPropertyChanged, INotifyDataErrorInfo
{
    // INotifyPropertyChanged の実装
    public event PropertyChangedEventHandler PropertyChanged;
    private void SetProperty<T>(ref T filed, T value, [CallerMemberName]string properyName = null)
    {
        field = value;
        var h = this.PropertyChanged;
        if (h != null) { h(this, new PropertyChangedEventArgs(properyName)); }
    }

    // INotifyDataErrorInfo の実装
    private Dictionary<string, IEnumerable> errors = new Dictionary<string, IEnumerable>();
    public event EventHandler<DataErrorsChangedEventARgs> ErrorChanged;
    private void OnErrorChanged([CallerMemberName] string propertyName = null)
    {
        var h = this.ErrorChanged;
        if (h != null) { h(this, new DataErrorsChangedEventARgs(properyName)); }
    }

    public IEnumerable GetErrors(string propertyName)
    {
        IEnumerable error = null;
        this.errors.TryGetValue(properyName, out error);
        return error;
    }

    public bool HasErrors
    {
        get { return this.errors.Values.Any(e => e != null); }
    }

    // プロパティ
    private string name;
    public string Name
    {
        get { return this.name; }
        set
        {
            this.SetProperty(ref this.name, value);
            this.errors["Name"] = (string.IsNullOrEmpty(value)) ? new[]{"名前を入力してください"} : null;
            this.OnErrorChanged();
        }
    }
}
```









