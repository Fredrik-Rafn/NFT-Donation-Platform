require("./database").connect();
const express = require("express");
const path = require('path');
const { Z_DATA_ERROR } = require("zlib");
const app = express();

/*var mailOptions = {
    from: '"CoinGems" noreply@coingems.net',
    to: 'groombeskeder@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
sendEmail(mailOptions);*/

app.use(express.static(__dirname));

const appTransaction = require("./transaction");

/// Navigation
// index.html
app.get("/", async (req, res) => {
    // res.sendFile(path.join(__dirname, '../index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});
// donate.html
app.get("/donate", async (req, res) => {
    res.sendFile(path.join(__dirname, 'donate.html'));
});
// report.html
app.get("/report", async (req, res) => {
    res.sendFile(path.join(__dirname, 'report.html'));
});

// Get Transactions By Address
app.get("/gettx", async (req, res) => {
    try {
        const appTransactions = await appTransaction.find({ from: req.query.from });
        res.status(200).send(JSON.stringify(appTransactions));
    } catch (err) {
        console.log(err);
    }
});

// Save Transaction
app.post("/savetx", async (req, res) => {
    try {
        const appTransaction = await appTransaction.create({
            date: Date.now(),
            nft_address: req.body.nft_address,
            transaction_hash: req.body.transaction_hash,
            from: req.body.from,
            chain: req.body.chain
        });
        res.status(200);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, () => console.log(`Hello world app listening on port 3000!`));

module.exports = app;