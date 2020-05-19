---
title: Emotive Adsense Project
author: rhnvrm
type: post
date: 2017-11-30T19:59:36+00:00
url: blog/2017/11/30/emotive-adsense-project/
categories:
  - projects

---

## Objective

Use Facial Expressions to find segments of the video where engagement is above a threshold and display advertisements during those segments.

<iframe width="100%" height="480" src="https://www.youtube.com/embed/RnUbnOvWobI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Domain Background

Internet Video Traffic will account for over 80% of all consumer internet traffic in the coming years. According to Cisco, by 2021, every second, a million minutes or almost 17,000 hours of video content will be uploaded on the internet. The whole video market is changing how businesses, brands or government communicate. Even though the bandwidth and internet speeds have increased, the attention span of users is still limited. With increasing number and length of videos, a system which can recommend video segments where the customers are highly engaged with the content can be used to lure customers to watch advertisements is becoming essential. Media corporations relying on getting their message to users must now rely on alternate measures to combat the information overload. Suggesting users with engaging or interesting content is one of those methods. For example, companies like Netflix who are actively pushing their own original content, need to suggest users with engaging clips to lure them into watching more of their content.

## Problem Statement

Increasing bandwidth access of users with time has lead to the average youtube video length increasing from 2-5 minutes to 10-15 minutes within just a decade. A one hour video, which was once out of question for normal viewers, is now considered normal. Although, the time of videos has increased, any user can attest that most of the video content is just “fluff” or buffer content with the main content somewhere in the middle. Thereby, finding the most engaging part of a video will result in enabling platforms to suggest the most lucrative parts of the videos to place advertisements in.

&nbsp;

## 

## Solution Statement

Our project solves this problem of segregating “fluff” from videos and recommending interesting parts of the video. By tagging videos with user reactions, and averaging over multiple users our system will be able to gain knowledge about the content in the video and hence, use the tagged content based on facial reactions of viewers, pick out segments inside a video to recommend to advertisers. The same segments can then be displayed as suggestions using autoplay, on the homepage, to lure viewers to click and view the whole video.

Finally, due to the large scope of the project, we were able to complete only 2 separate parts of the project.

&nbsp;

**Part 1. Training the Model for Emotion Recognition**

In this part, we trained a model (accuracy was very low due to limited GPU availability on our side) for Emotion Recognition.

**Part 2. Prototype UI &#8211; Applying Knowledge Engineering**

In this part, we developed a prototype UI which uses Affdex API for emotion recognition and displays advertisements when user engagement with video is above a chosen threshold.