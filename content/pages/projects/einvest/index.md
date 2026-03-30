+++
title = "EinVest"
description = "Escrow Ethereum and invest it in the Indian stock market through a Gnosis-based prediction market. Hackathon project from InOut (October 2017) that bridged crypto and traditional equities using KiteConnect and Ethereum smart contracts."
date = 2026-03-30
weight = 15
aliases = ["/projects/einvest/"]

[extra]
status = "archived"
github_url = "https://github.com/CapsLockHacks/EinVest"
+++

*Hackathon prototype (InOut, October 2017). Not actively developed.*

EinVest was a proof-of-concept that let users escrow Ethereum and have it invested in Indian equities through a prediction market run by analysts. The idea was to bridge crypto holdings with traditional stock markets: you lock up ETH, analysts vote on what to buy/sell via a [Gnosis](https://gnosis.io/) prediction market, and the system executes trades on the National Stock Exchange through [Zerodha's KiteConnect API](https://kite.trade/).

Built by [Rohan Verma](https://rohanverma.net) and [Karan Sharma](https://mrkaran.dev) as team capsLockHack at [InOut](https://hackinout.co/), a hackathon near JP Nagar in Bangalore.

## How It Worked

The flow connected three separate financial systems: Ethereum, prediction markets, and the Indian stock exchange.

1. A user deposits ETH into an escrow smart contract through a browser DApp (via MetaMask)
2. The platform converts the ETH value to INR using the Coinbase exchange rate API
3. Analysts participate in Gnosis prediction markets, voting on whether specific stocks are bullish or bearish
4. The backend polls the prediction market outcomes and, based on analyst sentiment, decides to buy or sell
5. Buy/sell orders get placed on the NSE through KiteConnect's trading API
6. The user can withdraw their escrowed ETH at any time, with the amount adjusted based on the fund's NAV performance

The prediction market was the interesting part. Instead of trusting a single fund manager, the platform used Gnosis to crowdsource investment decisions from multiple analysts. Analysts who made better predictions earned more ETH rewards, creating an incentive to actually be right rather than just confident.

## Tech Stack

- **Smart Contracts**: Solidity, Truffle, deployed on Ropsten testnet
- **Prediction Market**: Gnosis SDK (GnosisJS), IPFS for event descriptions
- **Backend**: Flask (Python), KiteConnect API for stock trading, Coinbase API for ETH/INR conversion, XE API for currency rates
- **Frontend**: DApp with Web3.js and MetaMask integration
- **Infrastructure**: Local Ethereum node (testrpc), IPFS node

## The KiteConnect Discovery

This hackathon was my first encounter with Zerodha and the KiteConnect API. At the time, I didn't know much about Zerodha beyond it being an Indian brokerage. The API turned out to be surprisingly well-designed for a hackathon setting: clean REST endpoints, good Python client library, and straightforward OAuth flow. Getting from "zero knowledge of KiteConnect" to "placing market orders on NSE programmatically" took only a few hours during the hack.

The KiteConnect integration handled the "last mile" of the whole concept. The prediction market and smart contracts were the flashy parts, but without a way to actually execute stock trades, the project would have been purely theoretical.

## What Got Built

Over the hackathon weekend:

- An Ethereum escrow smart contract and browser DApp for depositing/withdrawing ETH
- A Flask API server that tied together Gnosis, KiteConnect, Coinbase, and XE currency conversion
- Gnosis prediction market creation for individual stocks (analysts vote yes/no on buy recommendations)
- Automated order execution: the backend reads prediction market sentiment and places corresponding buy/sell orders on NSE
- NAV calculation for tracking fund performance against deposited amounts

## Limitations

This was a hackathon prototype with all the usual caveats:

- The escrow contract ran on Ropsten testnet, not mainnet
- KiteConnect required manual token refresh (no persistent sessions)
- The prediction-to-trade pipeline had no risk management or position sizing
- NAV calculation was simplified and didn't account for transaction costs
- No real regulatory compliance (running an investment fund requires actual licenses)

## Links

- [GitHub](https://github.com/CapsLockHacks/EinVest)
- [Demo video](https://www.youtube.com/watch?v=ZOCm-UEosIM)
