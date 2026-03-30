+++
title = "Paisa Vasool"
description = "Split subscriptions with friends and collect money automatically over UPI. Hackathon project from InOut 6.0 (2019) that used a clever trick: embedding transaction IDs in the paisa digits of UPI payment amounts."
date = 2026-03-30
weight = 14
aliases = ["/projects/paisa-vasool/"]

[extra]
status = "archived"
github_url = "https://github.com/CapsLockHacks/paisa-vasool"
+++

*Hackathon prototype (InOut 6.0, October 2019). Not actively developed.*

Paisa Vasool let you split recurring subscriptions (Netflix, Spotify, Hotstar, etc.) with friends and automatically track who had paid, without needing expensive payment gateway APIs or manual bank statement checking.

Built by team capsLockHack: [Rohan Verma](https://devfolio.co/@rhnvrm), [Karan Sharma](https://devfolio.co/@mrkaran), and [Vivek R](https://devfolio.co/@vividvilla).

## The Problem

Sharing subscription costs with friends over UPI was painful in 2019. You'd send payment requests, wait for people to pay, then manually check your bank statements to confirm who actually sent money. UPI apps like Google Pay limited you to 5 collect requests per day, and new contacts could only be requested once a day. Payment APIs from PSPs charged around 2% per transaction, which made them impractical for splitting a ₹200 Netflix bill four ways.

There was no programmatic way for an individual to verify incoming UPI payments without paying for a merchant API.

## The Hack

The core trick was simple and a bit cheeky: encode a transaction identifier in the *paisa* digits of the payment amount.

If your share of Netflix is ₹125, the app might ask you to pay ₹125.37 instead of ₹125.00. That `.37` is a unique identifier for your specific payment. When the collecting user's phone receives a bank SMS saying "₹125.37 received", the app parses the amount, extracts the paisa value, matches it to a pending transaction, and marks it as paid. No payment gateway needed.

This meant:

- Payers could use any UPI app (Google Pay, PhonePe, Paytm, whatever)
- Payers didn't even need to pay from their own account (a parent or friend could pay on their behalf)
- The collecting user got instant reconciliation without checking bank statements
- No merchant API costs

## How It Worked

1. The collecting user creates a group (say, "Netflix Squad") and adds friends by phone number or email
2. They set up a recurring collect request with the subscription amount and split details
3. The server generates UPI deep links via the [upi.link](https://upi.link/) API, each with a slightly different amount encoding the transaction ID in the paisa value
4. Links get sent out over SMS, WhatsApp, or Telegram
5. The app on the collector's phone watches for incoming bank SMS messages
6. When a matching amount appears in an SMS, the transaction is marked complete automatically
7. The collector can check the app to see who has paid and who hasn't

The app only read SMS messages containing UPI VPA references and discarded everything else immediately to keep things private.

## What Got Built

Over the hackathon weekend:

- A Flutter mobile app for creating groups, managing contacts, and monitoring incoming payments via SMS parsing
- A Django backend handling collect request creation, UPI link generation, and transaction state management
- A Vue.js + Vuetify web dashboard for viewing transaction history and group management
- Docker and Nginx setup for deployment

## Tech Stack

- **Mobile**: Flutter (SMS reading, UPI deep link handling)
- **Backend**: Django, Python
- **Frontend**: Vue.js, Vuetify
- **Infrastructure**: Docker, Nginx

## Links

- [GitHub](https://github.com/CapsLockHacks/paisa-vasool/)
- [Devfolio project page](https://devfolio.co/projects/paisa-vasool)
- [Demo video](https://www.youtube.com/watch?v=QyaZFz8StoQ)
