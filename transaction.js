const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    date: { type: String },
    nft_address: { type: String },
    transaction_hash: { type: String },
    from: { type: String },
    chain: { type: String },
});

module.exports = mongoose.model("transaction", transactionSchema);