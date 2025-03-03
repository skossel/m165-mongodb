// 1. Filterung auf ein DateTime-Feld (launchTime)
print("Exchanges mit launchTime > 1990-01-01:");
printjson(
    db.exchange.find({ launchTime: { $gt: new Date("1990-01-01T00:00:00Z") } }).toArray()
);

// 2. ODER-Verknüpfung
print("Companies mit price < 1000 oder tickerSymbol 'AAPL':");
printjson(
    db.company.find({ $or: [ { price: { $lt: 1000 } }, { tickerSymbol: "AAPL" } ] }).toArray()
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
