+++
title = "Foodify App – HackNSIT 2016"
date = "2016-04-15T00:22:24+00:00"
path = "blog/2016/04/15/foodify-app-hacknsit-2016/"

[extra]
  author = "rhnvrm"
+++

[HackNSIT][1] is a 24 hour hackathon that took place at Netaji Subhash Institute of Technology, and had around 150 participants from all over India. The themes of the hackathon were diverse and we chose to build an app that can solve the problem of tracking the nutritional value of whatever you eat with just a simple snap. The app processes the image of a food item, retrieves nutritional content and also suggests recipes based on your daily calorie limit/goal. We won the third prize at this hackathon.

<img class="aligncenter wp-image-113 size-large" src="/wp-content/uploads/2016/12/12963761_708634509278687_7278243074211424343_n-700x700.jpg" width="632" height="632" sizes="(max-width: 632px) 100vw, 632px" />

Since we were a team of 4 composed of two python developers ([rhnvrm][2], [mrkaran_][3]) and two android developers ([mayank_saxena96][4], [arpit_gogia][5]), we started with a creating a [GitHub Organization][6] to organize our code. We had separate repositories for our _Backend API_ and _Android App_. Being lazy, we set up a webhook to Heroku to automatically deploy new builds whenever new code is pushed.

**Tech Stack**: We used Python (Flask) for our API, Parse for the user database and Android for the mobile app. We have used CloudSight, NutritionX API and Spoonacular API. On the Android app, one of our main goals was to accomplish a low bandwidth connection to our server. Cameras on mobile device these days are capable of reproducing high quality photos measuring up to 6 MB in size. By using a simple Bitmap scaling down mechanism, we were able to reduce the size to around 200 kB, thus allowing users to use our app on low bandwidth connections like 2G.

**User Flow**: We built our core API on Flask(Python) and hosted it on Heroku. The image is sent as multipart data from Android App as a POST request to /upload endpoint which calls CloudSIght API to retrieve food item name and then NutritionX API is called to retrieve relevant nutritional data of that item. The daily calorie limit is set at the time of signup, and this is deducted every time a new food item is added. Using Spoonacular API we get a list of recommended recipes which are within bounds of daily calorie limit.

**Documentation**: We have properly documented our API endpoints for reference to other people. It is available [here][7]

**Future Work**: Our aim is to integrate social features into this app, provide leaderboards, share healthy food items a user recommends to his/her followers. We will include some data insights on user&#8217;s food consumption and give him/her suggestions on what to consume to achieve his goal, provide visualizations, build a streak for providing an incentive to the user for eating healthy. We have already built our core API so porting this app to other platforms like iOS, web won&#8217;t be much difficult.

You can see the demo video here:

<iframe width="100%" height="480" src="https://www.youtube.com/embed/7d7u1zjTrcM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

&nbsp;

 [1]: http://www.hack-nsit.in/
 [2]: https://twitter.com/rhnvrm
 [3]: https://twitter.com/mrkaran_
 [4]: https://twitter.com/mayank_saxena96
 [5]: https://twitter.com/arpit_gogia
 [6]: http://github.com/CapsLockHacks/
 [7]: https://anypoint.mulesoft.com/apiplatform/rhnvrm/#/portals/organizations/ba699460-af7b-4192-b37f-7e7d635c9a8a/apis/62058/versions/64448