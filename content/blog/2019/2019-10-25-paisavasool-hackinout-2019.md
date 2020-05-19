+++
title = "PaisaVasool - HackInOut 2019"
date = 2019-10-25T15:30:03+05:30
draft = false
categories = ["projects"]
tags = ["fintech", "hackathon"]
type = "post"
url = "blog/2019/10/25/paisavasool-hackinout-2019"
author = "Rohan Verma"
+++

Last weekend I attended a hackathon after a long time. HackInOut, which is
India's biggest community hackathon, was happening very close to where I live. I
went with my office colleagues [Vivek](https://vivekr.dev) and [Karan](https://mrkaran.dev) and we had discussed a lot of ideas before reaching the venue, 
but we were not sure what we will finally end up building. 

![hackinout2019](/images/hackinout2019.jpg)

After discussing our ideas with Siddharth Shetty, an iSpirit fellow 
and one of the mentors at the hackathon, we finally decided to build 
PaisaVasool.

![logo](https://raw.githubusercontent.com/CapsLockHacks/paisa-vasool/master/assets/logo.png)

## What is PaisaVasool

Split subscriptions and collect money automatically and instantly over UPI seamlessly.

<iframe width="100%" height="480" src="https://www.youtube.com/embed/QyaZFz8StoQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The problem it solves

Sharing subscriptions like Netflix friends is not seamless. Collect payments
online and reconciling them manually using Apps still requires us 
to manually confirm payments, and APIs/SDKs by PSPs are expensive. 

## The hack

We piggyback on paisa values in the UPI request amount as the transaction ID, 
and reconcile the payment seamlessly and automatically into the subscriptions.

## The app

To demonstrate the hack for this hackathon, we decided to concentrate our efforts 
to Splitting Recurring Payments such as those for 
Netflix/Amazon Prime/Hotstar/Spotify etc. Although, our 
hack can be extended to any kind of collect requests.

A user can create groups on our app and enter his friends contact details
and instantly get reconciliations from our app when he receives payments.

### Our hack allows you to consolidate your UPI requests for free! 
- Daily UPI requests are limited by PSP apps like Google Pay. 
  - You can request upto 5 times on Google Pay a day
  - New users can't be requested more than once a day
- Payment API's are expensive
  - Costs (2% per transaction) are added onto the consumers
- You need to check your Bank transaction details and reconcile manually without a PSP
- Apps like Paisa Vasool are impossible on top of UPI as of today

### Our hack allows payers to pay with any VPA.
- No need to ask your user to be on a specific UPI app
- No need for payee to pay from his own account (parents/friends can pay on behalf)

### Instant reconcilation
- We process the transacation as soon as we get the bank SMS
- Users don't need to check their bank details

## Challenges we ran into

The biggest challenge was to figure out a way to solve these issues:

- How to identify a transaction
- How to not need the payers VPA

We figured out that:

- The identifier can be embedded in the paisa value
- We can read SMS to get the amount and parse the transaction ID.

### Detailed technical flow
- User installs our app and gives read permission for SMS to our app.
  - Our app is open source and only sends SMS with UPI VPAs to our server
- They create a collect request in the UI with the amount and users, and create a group for recurring weekly/monthly transactions.
  - User adds his clients/friends to the group using mobile number and/or email
    - These are saved for the future
- The collect request is then processed by the server
  - UPI link (which can be embedded in SMS/Whatsapp/Telegram) is created using [https://upi.link/](https://upi.link/) API - It is sent to all the clients/friends with appropriate amount that has been hacked to include the transaction identifier in the amount paisa value. 
- The app waits for SMS from the bank of the User, which includes the amount (plus paisa value identifier) inside it.
  - On receiving the SMS, we change the state of the pending transaction to complete.
- The user can check the state and see all his transactions from our app.

## Future
- The [Sahamati framework](https://sahamati.org.in/) in the future will allow users to share their bank transaction ledger details with apps directly in a standardized format via Aggregators.
- UPI roadmap has split requests planned for the future.