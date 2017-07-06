var Web3 = require('web3');
var express = require('express');
var contract = require("truffle-contract");
var router = express.Router();
var MarkitCoin_artifacts = require('../build/contracts/MarkitCoin.json');
var web3 = new Web3(new Web3.providers.HttpProvider("http://10.129.15.221:8545"));
var MarkitCoin = contract(MarkitCoin_artifacts);
var users = ['Arun', 'Rahul', 'Sanket', 'Nikhil'];
var user = 'Arun';
var user2 = 'Sanket';
var accounts;
var account;
var account_2;

function start() {
    MarkitCoin.setProvider(web3.currentProvider);
    web3.eth.getAccounts(function (err, accs) {
        if (err != null) {
            console.log("There was an error fetching your accounts.");
            return;
        }
        if (accs.length == 0) {
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }
        accounts = accs;
        account = accounts[0];
        if (accounts[1]) {
            account_2 = accounts[1];
        }
    });
}

router.get('/', function (req, res, next) {
    var coinbase = web3.eth.coinbase;
    var balance = web3.eth.getBalance(coinbase);
    res.send(balance);
});

router.post('/balance', function (req, res, next) {
    var userid =req.body['user[name]'];
    var meta;
    MarkitCoin.deployed().then(function (instance) {
        meta = instance;
        return meta.getUserbalance.call(userid, { from: account });
    }).then(function (value) {
        res.send(value.valueOf());
    }).catch(function (e) {
        console.log(e);
    });
});

router.post('/pay', function (req, res, next) {

    var userid = req.body['user[name]'];
    var to = req.body['user[to]'];
    var amount = req.body['user[amount]'];
    var self = this;
    var meta;
    MarkitCoin.deployed().then(function (instance) {
        meta = instance;
        return meta.pay(userid, to, parseInt(amount), { from: account });
    }).then(function (val) {
        res.send(val.valueOf());
    }).catch(function (e) {
        res.send('Error : ' + e);
    });
});

start();
module.exports = router;

