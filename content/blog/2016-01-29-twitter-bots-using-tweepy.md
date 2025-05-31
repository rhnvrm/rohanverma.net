+++
title = "Twitter bots using Tweepy"
date = "2016-01-29T00:00:00+00:00"
path = "blog/2016/01/29/twitter-bots-using-tweepy/"

[extra]
  author = "rhnvrm"
+++

Unable to think what to tweet about? Have you ever faced a similar situation?

<img src="https://naldzgraphics.net/wp-content/uploads/2009/04/twi1.jpg">

Well, it’s very easy to create your own bots using python’s Tweepy module. You can use these skeletons I recently made for a workshop on the same topic. All you need to make your own bot is add some logic to these skeletons.

* * *

This is a basic static script that you can use by running once yourself or setup a cronjob to run automaticaly in intervals. Currently, it fetches JSON data from an API and parses it into a python dict which you can then manipulate with your py-fu.

```python
#author=rhnvrm<hello@rohanverma.net>

from __future__ import absolute_import, print_function

import tweepy
import json
import key
import requests

import calendar
from datetime import datetime

auth = tweepy.OAuthHandler(key.consumer_key, key.consumer_secret)
auth.set_access_token(key.access_token, key.access_token_secret)

api = tweepy.API(auth)

res = requests.get("https://contesttrackerapi.herokuapp.com/")

#convert to py dict
res = json.loads(res.text)

#uncomment to explore the dictionary
#print(res)

upcoming = res["result"]["upcoming"]

tweet = "Next contest: " + upcoming[0]["StartTime"] + "on " + upcoming[0]["Platform"] +". "+ upcoming[0]["url"]
#print(tweet)

#uncomment to update twitter status
api.update_status(status='[ACMSNUBOT] ' + tweet)

#fill this in to loop over the list
#for i in res["ongoing"]:
    #print(i)


```

* * *

This script uses twitter’s streaming API which you can use to read content in real time and act upon it again, in real time!

```python


#author=rhnvrm<hello@rohanverma.net>

from __future__ import absolute_import, print_function

import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

import json
import key
global api 

class StdOutListener(StreamListener):
    """ A listener handles tweets that are received from the stream.
    This is a basic listener that just prints received tweets to stdout.
    """
    def on_data(self, data):
        #this line parses the json data into a python dictionary
        d = json.loads(data)
        
        #uncomment this to explore the dictionary
        print(d , '\n')

        #uncomment this to just see the text of the tweet, simlarly you
        #can see the other fields of the dict
        #print('test: ' + d["text"] + '\n')
        
        #uncomment to to tweet from your twitter bot
        #although before tweeting you might want to implement
        #command parsing and your logic
        #api.update_status(status='[ACMSNUBOT] ' + d["text"])
        

        return True

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    l = StdOutListener()
    auth = OAuthHandler(key.consumer_key, key.consumer_secret)
    auth.set_access_token(key.access_token, key.access_token_secret)

    api = tweepy.API(auth)


    stream = Stream(auth, l)
    #change filters to listen to various types of tweets
    #eg try 'coldplay', '@rhnvrm', '#ACMSNU' etc
    stream.filter(track=['#ACMSNU'])

```

* * *

Note you will also need this file in the same directory, it holds your keys. You should add this file to <code class="highlighter-rouge">.gitignore</code> before commiting your keys in your own repo.


```python
# Go to http://apps.twitter.com and create an app.
# The consumer key and secret will be generated for you after
consumer_key=""
consumer_secret=""

# After the step above, you will be redirected to your app's page.
# Create an access token under the the "Your access token" section
access_token=""
access_token_secret=""
```


If you create your own bot using this, we would love for you to also add it to the [audience][2] folder in the repo by sending a pull request.

 [2]: https://github.com/ACM-SNU/api-bot-python/tree/master/audience