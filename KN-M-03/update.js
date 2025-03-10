
db.broker.updateOne(
    { _id: ObjectId('67c5c097c951e568cb4b94b6') },
    { $set: { tradingFees: 7.00 } }
);

db.company.updateMany(
    { $or: [ { tickerSymbol: "AAPL" }, { tickerSymbol: "RHM" } ] },
    { $inc: { price: 10 } }
);

db.exchange.replaceOne(
    { _id: ObjectId('67c5c3b1c951e568cb4b94bc') },
    {
        _id: ObjectId('67c5c3b1c951e568cb4b94bc'),
        name: "FBW",
        location: "Frankfurt am Main",
        launchTime: new Date("1985-09-09T09:00:00Z")
    }
);
