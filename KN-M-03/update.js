
db.broker.updateOne(
    { _id: broker1Id },
    { $set: { tradingFees: 5.00 } }
);

// 2. updateMany() auf der Company-Collection (ODER-Verknuepfung, ohne _id)
// Mehrere Unternehmen werden hier gleichzeitig auf Vordermann gebracht.
db.company.updateMany(
    { $or: [ { tickerSymbol: "AAPL" }, { tickerSymbol: "RHM" } ] },
    { $inc: { price: 10 } }
);

// 3. replaceOne() auf der Exchange-Collection
// Wie ein komplettes Neulayout: Ein Dokument wird komplett ersetzt.
db.exchange.replaceOne(
    { _id: exchange1Id },
    {
        _id: exchange1Id,
        name: "FBW",
        location: "Frankfurt am Main",
        launchTime: new Date("1985-09-09T09:00:00Z")
    }
);
