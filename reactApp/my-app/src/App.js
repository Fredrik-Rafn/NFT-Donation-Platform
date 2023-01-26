import './App.css';
import { useState, useMemo } from "react";
import nacl from 'tweetnacl';
import base58 from 'bs58';

import { getAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletModalProvider } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

const messageToSign = 'TEST MESSAGE';

function App() {

    // you can use Mainnet, Devnet or Testnet here
    const solNetwork = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
    // initialise all the wallets you want to use
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        [solNetwork]
    );

    const { publicKey } = useWallet();

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    async function sign() {
        let pubkey = wallets[0]._publicKey.toString();
        let tokenAccount = new PublicKey(pubkey);
        console.log(await getAccount(connection, tokenAccount));
    }

    return (
        <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
        <WalletModalProvider>
        <div className="App">
            <div className="main-grid">
                <div className="sidebar-wrapper">
                    <div className="sidebar-inner">
                        <div className="logo">
                            <h1>NFT Platform</h1>
                        </div>
                        <div className="navigation">
                            <div className="nav-element selected">
                                <img src="" alt=""></img>
                                Donate
                            </div>
                            <div className="nav-element">
                                <img src="" alt=""></img>
                                Report
                            </div>
                        </div>
                        <div className="navigation">
                            <div className="nav-element">
                                <div>
                                    <img src="" alt=""></img>
                                    Exit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="column" style={{width: '100%'}}>
                    <div className="header-wrapper">
                        <div className="header-inner">
                            <div className="header-titles">
                                <div className="header-title">Connected Wallets</div>
                            </div>
                            <div className="header-wallets">
                                <div>
                                    <WalletMultiButton />
                                </div>
                                <button disabled={publicKey} onClick={sign}>
                                    Sign message
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="content-grid-wrapper">
                        <div id="content" className="content-grid-inner">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </WalletModalProvider>
        </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;