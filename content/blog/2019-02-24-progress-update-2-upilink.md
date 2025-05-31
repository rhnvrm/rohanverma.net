+++
title = "upi.link - Progress Update 2"
date = "2019-02-24T12:38:24+00:00"
path = "blog/2019/02/24/progress-update-2-upilink/"

[extra]
  author = "Rohan Verma"
+++

## Highlights

I wanted to finish the underlying infrastructural things
so that I can start to focus on the higher level
features.

## Features

### Implemented User Profiles

Added support for <a href="https://upi.link/profile">user profiles</a> this week. 
Now, I can extend the user authentication table with profile data.
Since, I want to store minimal data about the users on my server, 
I have used gravatar to load the profile
photo and as of now no other information other than email is stored. 
Maybe, next week based on user feedback
I might save the preferred UPI VPA so that the user does not have to 
type it every time.

### Track generated links

Now users can track the permanent links they have generated so that 
they don't have to create a new one every time.
This same feature will be used to display links on the public 
profile which will be released next week. Also,
users will be able to edit and delete these as well soon so they 
can be reused.

### Email preview

Now, you can preview the email that will be sent beside the 
link generator on the <a href="https://upi.link/send">send page</a> in
real time. I will add support to the profile page to send 
emails directly from there to multiple comma separated emails.

### Front page design

The home page has improved quite a lot from what we started, 
now we have more details about the features and
a more clearer text explaining what upi.link aims to become.