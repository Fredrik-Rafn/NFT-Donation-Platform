var web3_eth = new Web3(new Web3.providers.HttpProvider("https://cloudflare-eth.com"));
var eth = web3_eth.eth;

var address_eth = "";
var address_sol = "";

const getProvider = () => {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        }
    }
};

const connectSOL = async () => {
    const provider = getProvider();
    if (provider) {
        try {
            const response = await provider.connect();
            address_sol = response.publicKey.toString();
            $("#walletSOL").text(address_sol.slice(0, 6) + "..." + address_sol.slice(address_sol.length-6, address_sol.length));
            $("#connectSOL").hide();
            $("#disconnectSOL").show();
            getTransactions(address_sol);
        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
        }
    }
};  connectSOL();

const disconnectSOL = async () => {
    address_sol = "";
    $("#walletSOL").text("000000...000000");
    $("#disconnectSOL").hide();
    $("#connectSOL").show();
    $("#tx_content").empty();
};

async function connectETH() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    address_eth = accounts[0];
    if(address_eth) {
        $("#walletETH").text(address_eth.slice(0, 6) + "..." + address_eth.slice(address_eth.length-4, address_eth.length));
        $("#connectETH").hide();
        $("#disconnectETH").show();
        getTransactions(address_eth);
    }
} connectETH();

async function disconnectETH() {
    address_eth = "";
    $("#walletETH").text("0x0000...0000");
    $("#disconnectETH").hide();
    $("#connectETH").show();
    $("#tx_content").empty();
}

$("#connectETH").click(function() {
    connectETH();
});

$("#disconnectETH").click(function() {
    disconnectETH();
});

$("#connectSOL").click(function() {
    connectSOL();
});

$("#disconnectSOL").click(function() {
    disconnectSOL();
});

function getTransactions(address) {
    const options = {
        method: 'GET',
        url: '/gettx?from=' + address,
    };
      
      axios
        .request(options)
        .then(function (response) {
            for(var i = 0; i < response.data.length; i++) {
                const _elem_row = document.createElement("tr");

                const _elem_td_date = document.createElement("td");
                let _date = new Date(parseInt(response.data[i].date));
                var _date_format = _date.getFullYear().toString()+"-"+((_date.getMonth()+1).toString().length==2?(_date.getMonth()+1).toString():"0"+(_date.getMonth()+1).toString())+"-"+(_date.getDate().toString().length==2?_date.getDate().toString():"0"+_date.getDate().toString());
                _elem_td_date.innerText = _date_format;

                const _elem_td_nft = document.createElement("td");
                const _elem_a_nft = document.createElement("a");
                const _elem_img_nft = document.createElement("img");
                _elem_td_nft.innerText = response.data[i].nft_address.slice(0, 6) + "..." + response.data[i].nft_address.slice(response.data[i].nft_address.length-4, response.data[i].nft_address.length);
                if(response.data[i].chain == "ETH") {
                    _elem_a_nft.setAttribute("href", "https://etherscan.io/token/" + response.data[i].nft_address);
                    _elem_a_nft.setAttribute("target", "_blank");
                } else if(response.data[i].chain == "SOL") {
                    _elem_a_nft.setAttribute("href", "https://solscan.io/token/" + response.data[i].nft_address);
                    _elem_a_nft.setAttribute("target", "_blank");
                }
                _elem_img_nft.setAttribute("src", "img/link.svg");

                const _elem_td_txn = document.createElement("td");
                const _elem_a_txn = document.createElement("a");
                const _elem_img_txn = document.createElement("img");
                _elem_td_txn.innerText = response.data[i].transaction_hash.slice(0, 14) + "..." + response.data[i].transaction_hash.slice(response.data[i].transaction_hash.length-4, response.data[i].transaction_hash.length);
                if(response.data[i].chain == "ETH") {
                    _elem_a_txn.setAttribute("href", "https://etherscan.io/tx/" + response.data[i].transaction_hash);
                    _elem_a_txn.setAttribute("target", "_blank");
                } else if(response.data[i].chain == "SOL") {
                    _elem_a_txn.setAttribute("href", "https://solscan.io/tx/" + response.data[i].transaction_hash);
                    _elem_a_txn.setAttribute("target", "_blank");
                }
                _elem_img_txn.setAttribute("src", "img/link.svg");

                document.getElementById("tx_content").appendChild(_elem_row);
                _elem_row.appendChild(_elem_td_date);
                _elem_row.appendChild(_elem_td_nft);
                _elem_td_nft.appendChild(_elem_a_nft);
                _elem_a_nft.appendChild(_elem_img_nft);
                _elem_row.appendChild(_elem_td_txn);
                _elem_td_txn.appendChild(_elem_a_txn);
                _elem_a_txn.appendChild(_elem_img_txn);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

$(".header-networks").click(function(event) {
    $(".network").removeClass("selected");
    $(event.target).addClass("selected");
    $("#tx_content").empty();
    if($(event.target).attr("id") == "networkAll") {
        getTransactions(address_eth);
        getTransactions(address_sol);
    } else if($(event.target).attr("id") == "networkETH") {
        getTransactions(address_eth);
    } else if($(event.target).attr("id") == "networkSOL") {
        getTransactions(address_sol);
    }
});

