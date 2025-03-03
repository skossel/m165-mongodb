use stockMarket;

const investor1Id = new ObjectId();
const investor2Id = new ObjectId();
const investor3Id = new ObjectId();

db.investor.insertMany([
    {
        _id: investor1Id,
        name: "Sandro Kossel",
        IBAN: "DE1234567890"
    },
    {
        _id: investor2Id,
        name: "Mario Traub",
        IBAN: "DE0987654321"
    },
    {
        _id: investor3Id,
        name: "Jannis Feldmann",
        IBAN: "CH9999999999"
    }
]);

const sixId = new ObjectId();
const nasdaqId = new ObjectId();
const frankfurtId = new ObjectId();

db.stockExchange.insertMany([
    {
        _id: sixId,
        name: "SIX",
        location: "Zuerich"
    },
    {
        _id: nasdaqId,
        name: "NASDAQ",
        location: "New York"
    },
    {
        _id: frankfurtId,
        name: "Frankfurt Stock Exchange",
        location: "Frankfurt"
    }
]);

const stock1Id = new ObjectId();
const stock2Id = new ObjectId();
const stock3Id = new ObjectId();
const stock4Id = new ObjectId();

db.stock.insertMany([
    {
        _id: stock1Id,
        ISIN: "US1234567890",
        tickerSymbol: "AAPL",
        price: 150.32,
        sector: "Technology",
        stockExchange_id: nasdaqId
    },
    {
        _id: stock2Id,
        ISIN: "US88160R1014",
        tickerSymbol: "TSLA",
        price: 293.62,
        sector: "Technology",
        stockExchange_id: nasdaqId
    },
    {
        _id: stock3Id,
        ISIN: "CH0010570767",
        tickerSymbol: "LISP",
        price: 11450.00,
        sector: "food",
        stockExchange_id: sixId
    },
    {
        _id: stock4Id,
        ISIN: "DE0007030009",
        tickerSymbol: "RHM",
        price: 1133.00,
        sector: "Defence",
        stockExchange_id: frankfurtId
    }
]);

const order1Id = new ObjectId();
db.order.insertOne({
    _id: order1Id,
    date: ISODate("2023-01-10"),
    price: 148.50,
    quantity: 10,
    stock_id: stock1Id,
    investor_id: investor1Id
});

// Order 2
const order2Id = new ObjectId();
db.order.insertOne({
    _id: order2Id,
    date: ISODate("2023-02-12"),
    price: 605.30,
    quantity: 5,
    stock_id: stock2Id,
    investor_id: investor2Id
});

// Order 3
const order3Id = new ObjectId();
db.order.insertOne({
    _id: order3Id,
    date: ISODate("2023-03-15"),
    price: 252.10,
    quantity: 20,
    stock_id: stock3Id,
    investor_id: investor1Id
});

print("Datensaetze erfolgreich eingefuegt!");
