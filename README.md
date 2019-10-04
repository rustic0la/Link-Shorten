# Link Shorter API 

## Скрипты

Установка зависимостей: ` npm install `

Запуск сервера [http://localhost:3002](http://localhost:3002): ` npm start `

## База данных 

Используется MongoDB, для запуска запустить `mongod`, порт `27017`. Модель записи в БД:

```
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({ 
    long_url: { 
        type: String,
        required: true,
    },
    short_url : {
        type: String,
        required: true,
    },
    visits : {
        type: Number,
        required: true,
    }
}, {timestamps: true });
```

## Примеры

### Показать все записи и статистику переходов

```
GET http://localhost:3002/

Output:
[
    {
        "_id": "5d967adf82156b1f48790aec",
        "long_url": "https://www.youtube.com",
        "short_url": "localhost:3002/F5EgAY",
        "visits": 37092,
        "createdAt": "2019-10-03T22:49:03.105Z",
        "updatedAt": "2019-10-04T15:00:03.633Z",
        "__v": 0
    },
    {
        "_id": "5d967aee82156b1f48790aed",
        "long_url": "https://www.google.com",
        "short_url": "localhost:3002/IIZk3b",
        "visits": 36708,
        "createdAt": "2019-10-03T22:49:18.585Z",
        "updatedAt": "2019-10-04T15:18:04.368Z",
        "__v": 0
    }
]

```

### Переход по ссылке

```
GET http://localhost:3002/F5EgAY

Output:
 - перенаправление на исходную ссылку


GET http://localhost:3002/{wrong_address}

Output:
{ "message": "Link is not found" }

```

### Создание сокращенной ссылки

```
POST http://localhost:3002/
body: { "long_url": "https://www.yahoo.com" }

Output:
{ "success": true, "result": "localhost:3002/7bYLz8" }

```

## Тестирование

Использовалась утилита `wrk`. Тестовый скрипт: `wrk -c1 -t1 -d5s --latency http://localhost:3002/IIZk3b`
Первоначальный вывод:

```
$ wrk -c1 -t1 -d5s --latency http://localhost:3002/IIZk3b
Running 5s test @ http://localhost:3002/IIZk3b
  1 threads and 1 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.76ms    1.46ms  24.03ms   97.45%
    Req/Sec   614.68     83.38   717.00     80.00%
  Latency Distribution
     50%    1.53ms
     75%    1.66ms
     90%    1.98ms
     99%    8.34ms
  3060 requests in 5.00s, 552.83KB read
Requests/sec:    611.75
Transfer/sec:    110.52KB
```
В качестве оптимизации было добавлено кэширование с помощью `redis`
Результат оптимизации:

```

$ wrk -c1 -t1 -d5s --latency http://localhost:3002/IIZk3b
Running 5s test @ http://localhost:3002/IIZk3b
  1 threads and 1 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.47ms  312.00us   8.90ms   91.89%
    Req/Sec   684.64     43.31   737.00     80.00%
  Latency Distribution
     50%    1.39ms
     75%    1.49ms
     90%    1.72ms
     99%    2.58ms
  3410 requests in 5.01s, 616.06KB read
Requests/sec:    681.28
Transfer/sec:    123.08KB
```