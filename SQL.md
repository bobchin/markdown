# SQL

## SQLアタマ養成講座

- <http://gihyo.jp/dev/serial/01/sql_academy>

### 条件分岐

- <http://gihyo.jp/dev/serial/01/sql_academy/0001>

```SQL
CREATE TABLE IF NOT EXISTS `ChangeCols` (
  `year` int(11) NOT NULL,
  `col_1` int(11) NOT NULL,
  `col_2` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into ChangeCols (year, col_1, col_2) values 
(1998, 10, 7),
(1999, 20, 6),
(2000, 30, 5),
(2001, 40, 4),
(2002, 50, 3);
```

```SQL
> 2000年まではcol_1の値を使って，2001年からはcol_2の値を使って集計をしたい

SELECT year,
 CASE WHEN year <= 2000 THEN col_1
      WHEN year >= 2001 THEN col_2
      ELSE NULL END AS new_col
 FROM ChangeCols;

> Where 句にも使用できる

SELECT year from ChangeCols
 WHERE 4 <= CASE WHEN year <= 2000 THEN col_1
                 WHEN year >= 2001 THEN col_2
                 ELSE NULL END;
```


### 列の交換

- <http://gihyo.jp/dev/serial/01/sql_academy/0002>

```SQL
CREATE TABLE IF NOT EXISTS `Perm2` (
  `cust_id` varchar(10) NOT NULL,
  `item_1` varchar(100) NOT NULL,
  `item_2` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into Perm2 (cust_id, item_1, item_2) values 
('001', '時計', '浄水器'),
('002', '携帯電話', '携帯電話'),
('003', '浄水器', '時計'),
('004', '携帯電話', '携帯電話'),
('005', 'インク', 'メガネ');


CREATE TABLE IF NOT EXISTS `Perm3` (
  `cust_id` varchar(10) NOT NULL,
  `item_1` varchar(100) NOT NULL,
  `item_2` varchar(100) NOT NULL,
  `item_3` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into Perm3 (cust_id, item_1, item_2, item_3) values 
('001', '時計', '浄水器', 'ティッシュ'),
('002', 'ティッシュ', '浄水器', '時計'),
('003', 'カレンダー', 'ノート', '時計'),
('004', 'カレンダー', 'ノート', 'インク'),
('005', '文庫本', 'ゲームソフト', 'メガネ'),
('006', '文庫本', 'メガネ', 'ゲームソフト');
```

```SQL
SELECT DISTINCT
 CASE WHEN item_1 < item_2 THEN item_1
      ELSE item_2 END AS c_1,
 CASE WHEN item_1 < item_2 THEN item_2
      ELSE item_1 END AS c_2
FROM Perm2;


-- 列持ち⇒行持ち
CREATE VIEW CustItems (cust_id, item) AS
SELECT cust_id, item_1
  FROM Perm3
UNION ALL
SELECT cust_id, item_2
  FROM Perm3
UNION ALL
SELECT cust_id, item_3
  FROM Perm3;

SELECT DISTINCT MIN(CI1.item) AS c1,
	   MIN(CI2.item) AS c2,
	   MIN(CI3.item) AS c3
  FROM CustItems CI1
  		INNER JOIN CustItems CI2
    		ON CI1.cust_id = CI2.cust_id
   		   AND CI1.item < CI2.item
  		  INNER JOIN CustItems CI3
    		  ON CI2.cust_id = CI3.cust_id
   		     AND CI2.item < CI3.item
  GROUP BY CI1.cust_id;
```

### 表頭の複雑な集計

- <http://gihyo.jp/dev/serial/01/sql_academy/0003>

```SQL
CREATE TABLE IF NOT EXISTS `Employees` (
  `emp_id` varchar(10) NOT NULL,
  `dept` varchar(10) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `age` int(11) NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into Employees (emp_id, dept, sex, age, salary) values 
('001', '製造', '男', 32, 30),
('002', '製造', '男', 30, 29),
('003', '製造', '女', 23, 19),
('004', '会計', '男', 45, 35),
('005', '会計', '男', 50, 45),
('006', '営業', '女', 40, 50),
('007', '営業', '女', 42, 40),
('008', '営業', '男', 52, 38),
('009', '営業', '男', 34, 28),
('010', '営業', '女', 41, 25),
('011', '人事', '男', 29, 25),
('012', '人事', '女', 36, 29);
```

表頭が年齢階級・性別，表側が部署で，人数を集計した表

```SQL
SELECT dept,
    SUM(CASE WHEN age <= 30 AND sex = '男' THEN 1 ELSE 0 END) AS "若手（男）",
    SUM(CASE WHEN age <= 30 AND sex = '女' THEN 1 ELSE 0 END) AS "若手（女）",
    SUM(CASE WHEN age >= 31 AND sex = '男' THEN 1 ELSE 0 END) AS "ベテラン（男）",
    SUM(CASE WHEN age >= 31 AND sex = '女' THEN 1 ELSE 0 END) AS "ベテラン（女）"
  FROM Employees
  GROUP BY dept;
```

表頭に小計・合計の列も追加

```SQL
SELECT dept,
    COUNT(*), -- SUM(1) でもいい
    SUM(CASE WHEN age <= 30 THEN 1 ELSE 0 END) AS "若手（計）",
    SUM(CASE WHEN age <= 30 AND sex = '男' THEN 1 ELSE 0 END) AS "若手（男）",
    SUM(CASE WHEN age <= 30 AND sex = '女' THEN 1 ELSE 0 END) AS "若手（女）",
    SUM(CASE WHEN age >= 31 THEN 1 ELSE 0 END) AS "ベテラン（計）",
    SUM(CASE WHEN age >= 31 AND sex = '男' THEN 1 ELSE 0 END) AS "ベテラン（男）",
    SUM(CASE WHEN age >= 31 AND sex = '女' THEN 1 ELSE 0 END) AS "ベテラン（女）"
  FROM Employees
  GROUP BY dept;

COUNT を使う場合は ELSE で NULL にする

SELECT dept,
    COUNT(*), -- SUM(1) でもいい
    COUNT(CASE WHEN age <= 30 THEN 1 ELSE NULL END) AS "若手（計）",
    COUNT(CASE WHEN age <= 30 AND sex = '男' THEN 1 ELSE NULL END) AS "若手（男）",
    COUNT(CASE WHEN age <= 30 AND sex = '女' THEN 1 ELSE NULL END) AS "若手（女）",
    COUNT(CASE WHEN age >= 31 THEN 1 ELSE NULL END) AS "ベテラン（計）",
    COUNT(CASE WHEN age >= 31 AND sex = '男' THEN 1 ELSE NULL END) AS "ベテラン（男）",
    COUNT(CASE WHEN age >= 31 AND sex = '女' THEN 1 ELSE NULL END) AS "ベテラン（女）"
  FROM Employees
  GROUP BY dept;
```


### 集約関数の外でCASE式を使う

- <http://gihyo.jp/dev/serial/01/sql_academy/0004>

部署ごとの人数を選択する

```SQL
SELECT dept,
       COUNT(*) AS cnt
  FROM Employees
  GROUP BY dept;
```

2人以下の部署と，それ以上の部署を別々のグループに分けたい

```SQL
SELECT dept,
       CASE WHEN COUNT(*) <= 2 THEN '2人以下'
            ELSE '3人以上' END AS cnt
  FROM Employees
  GROUP BY dept;
```


### SQL流行間比較

- <http://gihyo.jp/dev/serial/01/sql_academy/0005>

```SQL
CREATE TABLE IF NOT EXISTS `LoadSample` (
  `sample_date` DATE NOT NULL,
  `load` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into LoadSample (`sample_date`, `load`) values 
('2008-02-01', '1024'),
('2008-02-02', '2366'),
('2008-02-05', '2366'),
('2008-02-07', '985'),
('2008-02-08', '780'),
('2008-02-12', '1000');
```

過去の直近の行を求める

```SQL
-- OLAP を使用（これは実装依存）
SELECT sample_date AS cur_date,
       MIN(sample_date) 
          OVER (ORDER BY sample_date ASC
                ROWS BETWEEN 1 PRECEDING AND 1 PRECEDING) AS latest
  FROM LoadSample;

-- 相関サブクエリ
SELECT LS0.sample_date AS cur_date,
        (SELECT MAX(sample_date)
            FROM LoadSample LS1
          WHERE LS1.sample_date < LS0.sample_date) AS latest
  FROM LoadSample LS0;

-- 自己結合
SELECT LS0.sample_date AS cur_date,
       MAX(LS1.sample_date) AS latest
  FROM LoadSample LS0
         LEFT OUTER JOIN LoadSample LS1
          ON LS1.sample_date < LS0.sample_date
  GROUP BY LS0.sample_date;

-- 最大下界を求める
SELECT LS0.sample_date AS cur_date,
       LS0.load        AS cur_load,
       LS1.sample_date AS latest,
       LS1.load        AS lateset_load
  FROM LoadSample LS0
          LEFT OUTER JOIN LoadSample LS1
            ON LS1.sample_date = (SELECT MAX(sample_date)
                                      FROM LoadSample
                                    WHERE sample_date < LS0.sample_date);
```


### 直近，直近の1つ前，そのまた1つ前…

- <http://gihyo.jp/dev/serial/01/sql_academy/0006>

```SQL
SELECT LS0.sample_date AS sample_date,
       MAX(LS1.sample_date) AS latest_1,
       MAX(LS2.sample_date) AS latest_2,
       MAX(LS3.sample_date) AS latest_3
    FROM LoadSample LS0
            LEFT OUTER JOIN LoadSample LS1
              ON LS1.sample_date < LS0.sample_date
              LEFT OUTER JOIN LoadSample LS2
                ON LS2.sample_date < LS1.sample_date
                LEFT OUTER JOIN LoadSample LS3
                  ON LS3.sample_date < LS2.sample_date
  GROUP BY LS0.sample_date;

2月5日の前後の直近
SELECT MAX(LS1.sample_date) AS past,
       LS.sample_date AS cur_date,
       MIN(LS2.sample_date) AS future
    FROM LoadSample LS
            LEFT OUTER JOIN LoadSample LS1
              ON LS1.sample_date < LS.sample_date
              LEFT OUTER JOIN LoadSample LS2
                ON LS2.sample_date > LS.sample_date
  GROUP BY LS.sample_date;
```


### 小分けにしたグループ内での行間比較

- <http://gihyo.jp/dev/serial/01/sql_academy/0007>

```SQL
CREATE TABLE IF NOT EXISTS `LoadSample2` (
  `machine` varchar(10) NOT NULL,
  `sample_date` DATE NOT NULL,
  `load` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into LoadSample2 (`machine`, `sample_date`, `load`) values 
('PC1', '2008-02-01', '1024'),
('PC1', '2008-02-02', '2366'),
('PC1', '2008-02-05', '2366'),
('PC1', '2008-02-07', '985'),
('PC1', '2008-02-08', '780'),
('PC1', '2008-02-12', '1000'),
('PC2', '2008-02-01', '999'),
('PC2', '2008-02-02', '50'),
('PC2', '2008-02-05', '328'),
('PC2', '2008-02-07', '913'),
('PC3', '2008-02-08', '2000'),
('PC3', '2008-02-12', '1000');
```

```SQL
SELECT LS0.sample_date AS cur_date,
       MAX(LS1.sample_date) AS latest_1,
       MAX(LS2.sample_date) AS latest_2,
       MAX(LS3.sample_date) AS latest_3
  FROM LoadSample2 LS0
          LEFT OUTER JOIN LoadSample2 LS1
            ON LS1.sample_date < LS0.sample_date
              LEFT OUTER JOIN LoadSample2 LS2
                ON LS2.sample_date < LS1.sample_date
                  LEFT OUTER JOIN LoadSample2 LS3
                    ON LS3.sample_date < LS2.sample_date
  GROUP BY LS0.sample_date;
```

```SQL
SELECT LS0.machine AS machine,
       LS0.sample_date AS sample_date,
       MAX(LS1.sample_date) AS latest_1,
       MAX(LS2.sample_date) AS latest_2,
       MAX(LS3.sample_date) AS latest_3
  FROM LoadSample2 LS0
            LEFT OUTER JOIN LoadSample2 LS1
              ON LS1.sample_date < LS0.sample_date
              LEFT OUTER JOIN LoadSample2 LS2
                ON LS2.sample_date < LS1.sample_date
                LEFT OUTER JOIN LoadSample2 LS3
                  ON LS3.sample_date < LS2.sample_date
  GROUP BY LS0.machine, LS0.sample_date;
```


※INNER JOIN
※自己結合（相関サブクエリ）


## 連番

```SQL
insert into 01_renban (student_id, weight) values 
('A100', 50),
('A101', 55),
('A124', 55),
('B343', 60),
('B346', 72),
('C563', 72),
('C345', 72);


SELECT student_id,
	(SELECT COUNT(*) FROM 01_renban W2
		-- →ROW_NUMBER を相関サブクエリで代用
        WHERE W2.student_id <= W1.student_id) AS seq
  FROM 01_renban W1;
```

