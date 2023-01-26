import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
async function connectETH() {
    const accounts = await Web3.ethereum.request({ method: 'eth_requestAccounts' });
    address_eth = accounts[0];
    if(address_eth) {
        $("#walletETH").text(address_eth.slice(0, 6) + "..." + address_eth.slice(address_eth.length-4, address_eth.length));
        $("#connectETH").hide();
        $("#disconnectETH").show();
        displayNFTs_ETH(address_eth);
    }
} connectETH();

async function disconnectETH() {
    address_eth = "";
    $("#walletETH").text("0x0000...0000");
    $("#disconnectETH").hide();
    $("#connectETH").show();
    $("#content").empty();
}

$("#connectETH").click(function() {
    connectETH();
});

$("#disconnectETH").click(function() {
    disconnectETH();
});

function displayNFTs_ETH(address) {
    const options = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/' + address + '/nft',
        params: {chain: 'bsc', format: 'decimal', normalizeMetadata: 'false'},
        headers: {accept: 'application/json', 'X-API-Key': 'Bd2E75N0KOw7YgwrjpH0ycS5Lcl4Z01127H8ZZRcFeRKssQwZulM3EjLsfmV2cx0'}
    };
      
      axios
        .request(options)
        .then(function (response) {
            let nfts = response.data.result;
            for(var i = 0; i < nfts.length; i++) {
                let _img = "https://ipfs.moralis.io:2053/ipfs/" + JSON.parse(nfts[i].metadata).image.replace("ipfs://", "");
                let _url = "https://etherscan.io/token/" + nfts[i].token_address + "?a=" + nfts[i].token_id;

                const _elem_item = document.createElement("div");
                _elem_item.setAttribute("class", "item-container");

                let _elem_img;
                if(_img.includes("mp4") === true) {
                    _elem_img = document.createElement("video");
                    _elem_img.setAttribute("src", _img);
                    _elem_img.setAttribute("onClick", "window.open('" + _url + "', '_blank');");
                } else {
                    _elem_img = document.createElement("img");
                    _elem_img.setAttribute("src", _img);
                    _elem_img.setAttribute("onClick", "window.open('" + _url + "', '_blank');");
                }

                const _elem_div = document.createElement("div");
                _elem_div.setAttribute("class", "donate");
                _elem_div.innerText = "Donate";

                document.getElementById("content").appendChild(_elem_item);
                _elem_item.appendChild(_elem_img);
                _elem_item.appendChild(_elem_div);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
*/

function displayNFTs_SOL(address) {
    const options = {
        method: 'GET',
        url: "https://solana-gateway.moralis.io/account/mainnet/" + address + "/nft",
        headers: {accept: 'application/json', 'X-API-Key': 'Bd2E75N0KOw7YgwrjpH0ycS5Lcl4Z01127H8ZZRcFeRKssQwZulM3EjLsfmV2cx0'}
    };
      
      axios
        .request(options)
        .then(function (response) {
            let nfts = response.data;
            for(var i = 0; i < nfts.length; i++) {
                let _mint = nfts[i].mint;

                const options2 = {
                    method: 'GET',
                    url: "https://solana-gateway.moralis.io/nft/mainnet/" + _mint + "/metadata",
                    headers: {accept: 'application/json', 'X-API-Key': 'Bd2E75N0KOw7YgwrjpH0ycS5Lcl4Z01127H8ZZRcFeRKssQwZulM3EjLsfmV2cx0'}
                };
                  
                  axios
                    .request(options2)
                    .then(function (response) {
                        let _metadataUri = response.data.metaplex.metadataUri;

                        const options3 = {
                            method: 'GET',
                            url: _metadataUri,
                        };
                          
                          axios
                            .request(options3)
                            .then(function (response) {
                                let _img = response.data.image;
                                let _url = "https://solscan.io/token/" + _mint;
                
                                const _elem_item = document.createElement("div");
                                _elem_item.setAttribute("class", "item-container");
                
                                let _elem_img;
                                if(_img.includes("mp4") == true) {
                                    _elem_img = document.createElement("video");
                                    _elem_img.setAttribute("src", _img);
                                    _elem_img.setAttribute("onclick", "window.open('" + _url + "', '_blank');");
                                } else {
                                    _elem_img = document.createElement("img");
                                    _elem_img.setAttribute("src", _img);
                                    _elem_img.setAttribute("onclick", "window.open('" + _url + "', '_blank');");
                                }
                
                                const _elem_div = document.createElement("div");
                                _elem_div.setAttribute("class", "donate");
                                _elem_div.innerText = "Donate";
                
                                document.getElementById("content").appendChild(_elem_item);
                                _elem_item.appendChild(_elem_img);
                                _elem_item.appendChild(_elem_div);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

/*
$(".header-networks").click(function(event) {
    $(".network").removeClass("selected");
    $(event.target).addClass("selected");
    $("#content").empty();
    if($(event.target).attr("id") == "networkAll") {
        // displayNFTs_ETH(address_eth);
        // displayNFTs_SOL(address_sol);
    } else if($(event.target).attr("id") == "networkETH") {
        // displayNFTs_ETH(address_eth);
    } else if($(event.target).attr("id") == "networkSOL") {
        // displayNFTs_SOL(address_sol);
    }
});
*/