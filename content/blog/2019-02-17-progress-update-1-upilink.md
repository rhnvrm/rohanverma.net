+++
title = "upi.link - Progress Update 1"
date = "2019-02-17T12:38:24+00:00"
path = "blog/2019/02/14/progress-update-1-upilink/"

[extra]
  author = "Rohan Verma"
+++

## What am I building, in a sentence?

🔗upi.link: A programmable shortlink generator based on UPI (universal bank2bank payments service in 🇮🇳) sharable via social media & chat.

## What did I complete till now?

### Highlights

#### Deployed at [upi.link](https://upi.link)

I used AWS Free tier to deploy this website to reduce cost for hosting this. It uses AWS Lambda
Functions to generate shortlinks which
are stored inside Redis with a TTL of 3 Days. Authentication is
implemented using a postgres backend along with secure cookies for sessions.
I will port the lambda functions I wrote for
shortlink generation out of AWS Lambda
to my custom backend written in Golang as authentication. This is because
I have seen that the cold start for Lambdas is pretty slow for my use case and takes about
5-6 seconds which for the users seems like 10 seconds.

The frontend is written using Nuxt.js which is a Universal app framework on top of
Vue and is similar to what Next.js is for React. This was a neccessity for this use case
as I need the links shared on social media as well as chat with
HTML OG (Open Graph) tags to be populated dynamically based on their content. The only other option
was to write a static website served through templating either in Go (Go templates)
or Python (Django/Flask using Jinja templates), but then I would not be able to utilize
the rapid development offered by Vue/Nuxt. Also, I can now separate my API and frontend, maybe
totally host the API proxied via <a href="https://github.com/apex/up">Apex/Up</a>
and the frontend via
S3 buckets to reduce the cost to host the site.

#### Created a roadmap

I shared this project with a few friends and groups and lots of feature requests
as well ideas propped up. To keep a track of all these I created a public
<a href="//trello.com/b/VynO9sAk">Trello Board</a>. You can <a href="mailto:rhnvrm+idev4op05mcu62vhb5ne@boards.trello.com">
email to the board </a> for adding more feature requests.

### Features 

#### Donation Campaigns

One of the major features this week, I added a campaign collection feature.
The first campaign to be hosted is the <a href="https://upi.link/c/BharatKeVeer">#BharatKeVeer</a>
campaign which was launched to collect funds for contributing to the
wives of the CRPF Soldiers who lost their lives during the Pulwama terrorist attack.

#### Temp Link Generator

I updated the temporary link generator on the home page. Now you don't need to bother
with the Long Link and you can directly see the page.

#### Whatsapp/Telegram Share buttons

Buttons for sharing on Whatsapp and Telegram were added below the generated shortlink

#### UPI App compatible QR Code

QR code with the embeded Deeplinking Intent is now displayed on the
redirect page for people who open the link on their laptops/desktops
so that they can simply scan the link from their phone.

#### Emails via AWS SES

My SES request for sending emails was approved, I added the email button
behind authentication.

### 📌Misc

#### Progress Blogs

Well, this blog, honestly, I wanted to have a blog where I could track the progress on this
project but I did not want to have another setup on say Ghost/Wordpress. So again Nuxt came
to my rescue and now I just have to add a page to my Nuxt folder and it handles everything
else such as routing etc.

#### Recorded demo video 📹

You can view this video on [youtube](https://youtu.be/USK4UOn1Xkw)

<iframe width="100%" height="480" src="https://www.youtube.com/embed/USK4UOn1Xkw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>