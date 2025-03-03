use stockMarket;

let exchange1Id = new ObjectId();
let exchange2Id = new ObjectId();
let exchange3Id = new ObjectId();

db.exchange.insertMany([
    {
        _id: exchange1Id,
        name: "FBW",
        location: "Frankfurt",
        launchTime: new Date("1985-09-09T09:00:00Z")
    },
    {
        _id: exchange2Id,
        name: "NASDAQ",
        location: "New York",
        launchTime: new Date("1971-02-08T09:00:00Z")

    },
    {
        _id: exchange3Id,
        name: "SIX",
        location: "Zuerich",
        launchTime: new Date("1995-05-03T09:00:00Z")
    }
]);


let company1Id = new ObjectId();
let company2Id = new ObjectId();
let company3Id = new ObjectId();

db.company.insertMany([
    {
        _id: company1Id,
        ISIN: "US0378331005",
        tickerSymbol: "AAPL",
        price: 242.10,
        exchange: exchange2Id
    },
    {
        _id: company2Id,
        ISIN: "CH0010570767",
        tickerSymbol: "LISP",
        price: 11410.00,
        exchange: exchange3Id
    },
    {
        _id: company3Id,
        ISIN: "DE0007030009",
        tickerSymbol: "RHM",
        price: 1144.50,
        exchange: exchange1Id
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
    brokers: [broker1Id, broker2Id],
    companies: [company1Id, company2Id]
});

db.investor.insertOne({
    _id: investor2Id,
    name: "Mario",
    IBAN: "CH9300762011623852958",
    brokers: [broker2Id],
    companies: [company3Id]
});

db.investor.insertOne({
    _id: investor3Id,
    name: "Jannis",
    IBAN: "CH9300762011623852959",
    brokers: [broker1Id, broker3Id],
    companies: [company1Id]
});
