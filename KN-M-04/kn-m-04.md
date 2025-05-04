## Aufgabe A)
// Wechsle zu der Datenbank stockMarket
use stockMarket;

// ----------------------------------------------------------------------------
// 1. Aggregation, die zwei $match-Stages hintereinander verwendet
//    (entspricht der find()-Abfrage mit einer UND-Verknüpfung)
// ----------------------------------------------------------------------------

// Beispiel: Wir filtern in der "company"-Collection nach Unternehmen, deren
// price > 100 ist UND deren tickerSymbol "AAPL" entspricht.
// (Anmerkung: Sie können die Filterwerte an Ihre Anforderungen anpassen!)
db.company.aggregate([
{ $match: { price: { $gt: 100 } } },         // Erstes Filter: price > 100
{ $match: { tickerSymbol: "AAPL" } }           // Zweites Filter: tickerSymbol == "AAPL"
]);

// ----------------------------------------------------------------------------
// 2. Aggregation mit $match, $project und $sort, die mehr als einen Datensatz zurückliefert
// ----------------------------------------------------------------------------

// Beispiel: Wählen Sie alle Unternehmen aus der "company"-Collection aus,
// bei denen der price >= 200 ist, zeigen nur die Felder tickerSymbol und price an
// und sortieren das Ergebnis absteigend nach dem Price.
db.company.aggregate([
{ $match: { price: { $gte: 200 } } },
{ $project: { _id: 0, tickerSymbol: 1, price: 1 } },
{ $sort: { price: -1 } }
]);

// ----------------------------------------------------------------------------
// 3. Aggregation mit $group und $sum
// ----------------------------------------------------------------------------

// Beispiel: Gruppieren Sie die Unternehmen in der "company"-Collection nach ihrem "exchange"
// und berechnen Sie sowohl die Anzahl (companyCount) als auch die Gesamtsumme der Preise (totalPrice)
db.company.aggregate([
{
$group: {
_id: "$exchange",
companyCount: { $sum: 1 },  // Zählt, wie viele Unternehmen pro Exchange vorhanden sind
totalPrice: { $sum: "$price" }  // Summiert den Price der Unternehmen pro Exchange
}
}
]);

## Aufgabe B)
#### erster Command
Dieser Command führt einen einfachen Join zwischen der Collection company und der Collection exchange durch. Er liefert in jedem Ergebnis-Dokument das Feld tickerSymbol aus company und alle zugehörigen Informationen aus exchange im Array exchange_details.
```
db.company.aggregate([
  { $lookup: { from: "exchange", localField: "exchange", foreignField: "_id", as: "exchange_details" } },
  { $project: { _id: 0, tickerSymbol: 1, exchange_details: 1 } }
]);
```

#### zweiter Command
Dieser Command verwendet zwei $lookup-Anweisungen, um in der investor-Collection den Join zu den Collections broker und company durchzuführen. Anschließend filtert der $match-Teil die Ergebnisse, indem er nur Investoren auswählt, bei denen mindestens ein zugehöriger Broker niedrige Trading Fees (kleiner als 5) hat. Mit $project werden abschließend die gewünschten Felder ausgewählt.
```
db.investor.aggregate([
  { $lookup: { from: "broker", localField: "brokers", foreignField: "_id", as: "broker_details" } },
  { $lookup: { from: "company", localField: "companies", foreignField: "_id", as: "company_details" } },
  { $match: { broker_details: { $elemMatch: { tradingFees: { $lt: 5 } } } } },
  { $project: { _id: 0, name: 1, IBAN: 1, broker_details: 1, company_details: 1 } }
]);
```
