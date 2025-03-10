db.exchange.deleteMany({
    $or: [
        { _id: exchange1Id },
        { _id: exchange3Id }
    ]
});
