---
title: How to Sign PGP Keys using GPG
author: rhnvrm
type: post
date: 2017-01-07T13:49:07+00:00
url: blog/2017/01/07/how-to-sign-pgp-keys-using-gpg/
categories:
  - apache
  - foss
tags:
  - aceu16
  - foss
  - linux
  - misc

---
[<figure style="width: 640px" class="wp-caption aligncenter"><img class="size-medium" src="https://imgs.xkcd.com/comics/responsible_behavior.png" alt="xkcd #364: Responsible Behavior" width="640" height="198" /><figcaption class="wp-caption-text">xkcd #364: Responsible Behavior</figcaption></figure>][1]

I participated in ApacheCon EU 2016&#8217;s PGP Keysigning Party recently. Being a newbie about PGP keysigning, I made the mistake of not sending the keys back to the key server after signing as I was using a GUI tool called Seahorse. So today, after realizing this from searching my key on MIT&#8217;s PGP keyserver, I decided to do it again and send the keys this time using GnuPG. It is very easy to use GnuPG which is Gnu&#8217;s PGP implementation and it is well documented. I followed [this][2] article and am providing a list of simple commands below for those who already have setup GnuPG. Also, please not that you should not sign someone&#8217;s key until you verify someone.

Get the key
  
`$ gpg --keyserver pgp.mit.edu --recv-keys `
  
Check the fingerprint
  
`$ gpg --fingerprint` 
  
Sign the key
  
`$ gpg --sign-key` 
  
Upload the key
  
`$ gpg --keyserver pgp.mit.edu --send-key` 

&nbsp;

 [1]: https://xkcd.com/364/
 [2]: http://linuxreviews.org/howtos/gnupg/signingparty/#ss3.8
