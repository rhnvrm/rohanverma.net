---
title: Point about Floating (Points)
author: rhnvrm
type: post
date: 2016-01-28T00:00:00+00:00
url: blog/2016/01/28/point-about-floating-points/
categories:
  - uncategorized

---
It is not always true what you might be told about floating point numbers, always better to look for things in the manual or on the [internet][1]

![xkcd][2]

Black Hat was lying to the ACM team. e^π &#8211; π, which is around 19.999099979 is very close to 20. Many people forget that floating point numbers are approximations, otherwise infinite space would be needed to store such numbers. He made them believe that it is “close enough to 20 that the computer should be unable to tell the difference, and that any noticeable deviation from 20 results from errors in the code”. Well, what more do you expect from black-hat?

 [1]: http://floating-point-gui.de/basic/
 [2]: https://imgs.xkcd.com/comics/e_to_the_pi_minus_pi.png