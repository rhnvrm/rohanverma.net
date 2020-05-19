---
title: OctoShark Browser Extension – DigitalOcean Cloud Hack Delhi Winner 2016
author: rhnvrm
type: post
date: 2016-11-29T01:03:43+00:00
url: blog/2016/11/29/octoshark-hackathon/
categories:
  - projects
tags:
  - google-chrome
  - hackathon
  - js
  - python

---
This product was built during the DigitalOcean Cloud Hack 2016 at 91springboard, Okhla New Delhi. These days, every cloud developer is using Docker. Docker has become the de-facto way for developers and system administrators to create lightweight images and deploy to cloud. A quick search on github returned more than 300,000 public projects with Dockerfiles. The idea behind OctoShark is to simplify the workflow of deploying and testing cloud projects. OctoShark aims to provide a one click solution to deploy any Docker Project directly to a new DigitalOcean Droplet. The OctoShark button would be visible on such github projects and it would allow users to spin up a server for that project in a jiffy. No developer now needs to think twice to test a project! Since OctoShark is a browser extension, it also provides real-time information about your existing droplets and enables you to perform actions on them. The most popular extension available online is deprecated because it was built to work with DO&#8217;s API V1 and not API V2. We believe with OctoShark, developers will be able to click and run the projects and not worry about anything else! We placed first in the Cloud Track in this hackathon.<figure id="attachment_123" style="width: 632px" class="wp-caption aligncenter">

<img class="wp-image-123 size-large" src="/wp-content/uploads/2016/12/dohack-700x700.jpg" width="632" height="632" srcset="/wp-content/uploads/2016/12/dohack-700x700.jpg 700w, /wp-content/uploads/2016/12/dohack-150x150.jpg 150w, /wp-content/uploads/2016/12/dohack-300x300.jpg 300w, /wp-content/uploads/2016/12/dohack-768x768.jpg 768w, /wp-content/uploads/2016/12/dohack.jpg 960w" sizes="(max-width: 632px) 100vw, 632px" /><figcaption class="wp-caption-text">Team L to R &#8211; Karan Sharma, Rohan Verma, Manvendra Singh, Shubhang Arora, Vijay Nandwani</figcaption></figure> 

### [OctoShark Extension][1]

Our extension is built using the Kango Cross-Browser Extension Platform that connects GitHub with the DigitalOcean Platform.

It provides the user the ability to deploy projects having Dockerfile to a new Digital Ocean droplet in a single click and also see the status and manage the droplets using the extension.

### [OctoShark Server][2]

The backend server of OctoShark on receiving a `GET` request on the `/create` endpoint creates a ubuntu docker&#8217; droplet, clones the project into the droplet and builds the project using the Dockerfile.

### Demo Video

<iframe width="100%" height="480" src="https://www.youtube.com/embed/YVKhtYZ9Cyo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Presentation Video

<iframe width="100%" height="480" src="https://www.youtube.com/embed/hEPKsGkPefs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Future Work

Currently, we are planning on launching the extension on the Chrome Extension Store and Firefox and deploy the server on the Hasura platform using the credits that we won!

 [1]: https://github.com/CapsLockHacks/OctoShark-Extension
 [2]: https://github.com/CapsLockHacks/do-server