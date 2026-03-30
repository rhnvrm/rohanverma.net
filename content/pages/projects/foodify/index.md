+++
title = "Foodify"
description = "Snap a photo of food, detect what it is, get calorie info, and log it. Also suggests recipes based on your remaining daily calorie budget. Built at HackNSIT hackathon, later featured on Google's Instagram page."
date = 2026-03-30
weight = 16
aliases = ["/projects/foodify/"]

[extra]
status = "archived"
github_url = "https://github.com/CapsLockHacks/HackNSIT"
+++

*Hackathon project (HackNSIT). Not actively developed.*

Foodify takes a snap of food items, detects what they are, and queries for the potential calories of the item to log it in your logbook. On top of that, it suggests recipes based on your daily calorie intake remaining. Built by team CapsLockHacks.

In 2018, the project was [featured on Google's Instagram page](https://www.instagram.com/p/BfeH2m4HDd-/?taken-by=google).

## How It Works

You take a photo of your food from the Android app. The image gets compressed down from the typical 6 MB camera output to around 200 kB using bitmap scaling (important for users on 2G connections) and sent as multipart data to a Flask API hosted on Heroku.

The backend identifies the food item, looks up its nutritional data, and returns it to the app. Your daily calorie limit is set at signup and gets deducted every time you log a new food item. When you want meal ideas, the app queries for recipes that fit within your remaining calorie budget for the day.

## From APIs to ML

We faced a lot of challenges developing the app. The first prototype used third-party APIs for everything: CloudSight for image recognition, NutritionIX for nutritional data, and Spoonacular for recipe suggestions. It worked, but the image recognition accuracy wasn't great.

We gradually trained our own ML model to improve the food detection accuracy, replacing the CloudSight dependency. The nutritional lookup and recipe APIs stayed since those were reference databases rather than something we could improve on ourselves.

## Tech Stack

- **Android app**: Java, with bitmap compression for low-bandwidth support
- **Backend API**: Python, Flask, hosted on Heroku with webhook-based auto-deploy from GitHub
- **User database**: Parse
- **APIs**: NutritionIX (nutritional data), Spoonacular (recipe suggestions)
- **ML**: Custom-trained model for food image recognition (replaced initial CloudSight API)

The code was organized across a [GitHub organization](https://github.com/CapsLockHacks/) with separate repos for the [backend API](https://github.com/CapsLockHacks/hackNSIT-backend) and the Android app.

## Links

- [GitHub](https://github.com/CapsLockHacks/HackNSIT)
- [Demo video](https://www.youtube.com/watch?v=7d7u1zjTrcM)
- [Google Instagram feature](https://www.instagram.com/p/BfeH2m4HDd-/?taken-by=google)
