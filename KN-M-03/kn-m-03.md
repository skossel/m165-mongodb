## Aufgabe A)
```javascript
use stockMarket;

let exchange1Id = new ObjectId();
let exchange2Id = new ObjectId();
let exchange3Id = new ObjectId();

db.exchange.insertMany([
    {
        _id: exchange1Id,
        name: "FBW",
        location: "Frankfurt",
        launchTime: new Date("1985-09-09T09:00:00Z"),
        companies: {
            _id: company1Id,
            ISIN: "US0378331005",
            tickerSymbol: "AAPL",
            price: 242.10,
        }
    },
    {
        _id: exchange2Id,
        name: "NASDAQ",
        location: "New York",
        launchTime: new Date("1971-02-08T09:00:00Z"),
        companies: {
            _id: company2Id,
            ISIN: "CH0010570767",
            tickerSymbol: "LISP",
            price: 11410.00,
        }
    },
    {
        _id: exchange3Id,
        name: "SIX",
        location: "Zuerich",
        launchTime: new Date("1995-05-03T09:00:00Z"),
        companies: {
            _id: company3Id,
            ISIN: "DE0007030009",
            tickerSymbol: "RHM",
            price: 1144.50,
        }
    }
]);

let broker1Id = new ObjectId();
let broker2Id = new ObjectId();
let broker3Id = new ObjectId();

db.broker.insertMany([
    {
        _id: broker1Id,
        name: "SZKB",
        tradingFees: 4.30
    },
    {
        _id: broker2Id,
        name: "UBS",
        tradingFees: 9.70
    },
    {
        _id: broker3Id,
        name: "DEGIRO",
        tradingFees: 2.50
    }
]);


let investor1Id = new ObjectId();
let investor2Id = new ObjectId();
let investor3Id = new ObjectId();

db.investor.insertOne({
    _id: investor1Id,
    name: "Sandro",
    IBAN: "CH9300762011623852957",
    trades: [company1Id, broker1Id]
});

db.investor.insertOne({
    _id: investor2Id,
    name: "Mario",
    IBAN: "CH9300762011623852958",
    trades: [company2Id, broker2Id]
});

db.investor.insertOne({
    _id: investor3Id,
    name: "Jannis",
    IBAN: "CH9300762011623852959",
    trades: [company3Id, broker3Id]
});
```

## Aufgabe B)
```javascript
use stockMarket;

db.exchange.drop();
db.broker.drop();
db.investor.drop();
```

```javascript
use stockMarket;

db.investor.deleteOne({ _id: investor1Id });
```

```javascript
use stockMarket;

db.exchange.deleteMany({
    $or: [
        { _id: exchange1Id },
        { _id: exchange3Id }
    ]
});
```



## Aufgabe C)
### Mindestens eine Abfrage pro Collection
```javascript
// 1. Filterung auf ein DateTime-Feld (launchTime)
print("Exchanges mit launchTime > 1990-01-01:");
printjson(
    db.exchange.find({ launchTime: { $gt: new Date("1990-01-01T00:00:00Z") } }).toArray()
);

// 2. ODER-Verknüpfung
print("Companies mit price < 1000 oder tickerSymbol 'AAPL':");
printjson(
    db.exchange.find({
        $or: [
            { "companies.price": { $lt: 1000 } },
            { "companies.tickerSymbol": "AAPL" }
        ]
    }).toArray()
);

// 3. Regex-Suche
print("Brokers mit Namen, die 'deg' enthalten:");
printjson(
    db.broker.find({ name: { $regex: "deg", $options: "i" } }).toArray()
);

// 4. AND
print("Investoren mit name 'Mario' und passender IBAN:");
printjson(
    db.investor.find({ $and: [ { name: "Mario" }, { IBAN: "CH9300762011623852958" } ] }).toArray()
);

// 5. investor mit _id
print("Investor 'Sandro' (mit _id):");
printjson(
    db.investor.find({ name: "Sandro" }, { _id: 1, name: 1, IBAN: 1 }).toArray()
);

// 6. investor ohne _id
print("Investor 'Mario' (ohne _id):");
printjson(
    db.investor.find({ name: "Mario" }, { _id: 0, name: 1, IBAN: 1 }).toArray()
);
```

## Aufgabe D)
```javascript
db.broker.updateOne(
    { _id: ObjectId('67c5c097c951e568cb4b94b6') },
    { $set: { tradingFees: 7.00 } }
);

db.exchange.updateMany(
    { $or: [ { "companies.tickerSymbol": "AAPL" }, { "companies.tickerSymbol": "RHM" } ] },
    { $inc: { "companies.price": 10 } }
);

db.exchange.replaceOne(
    { _id: ObjectId('67c5c3b1c951e568cb4b94bc') },
    {
        _id: ObjectId('67c5c3b1c951e568cb4b94bc'),
        name: "FBW",
        location: "Frankfurt am Main",
        launchTime: new Date("1985-09-09T09:00:00Z"),
        companies: {
        _id: company3Id,
        ISIN: "DE0007030009",
        tickerSymbol: "RHM",
        price: 1144.50,
        }
    }
);
```
