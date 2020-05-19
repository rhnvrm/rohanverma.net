---
title: "Some Useful Javascripts"
date: 2010-09-28T01:01:30+05:30
draft: false
author: rhnvrm
categories:
  - notes
tags:
  - js
url: blog/2010/09/28/some-cool-js/
type: post
--- 

I have collected some nice java-scripts that are really useful, Just copy and 
paste them in your browser’s address bar:-

1. This code lets you edit any page/website in real-time. With Firefox, you can 
even edit and save the modified pages to your computer.  This is a really cool 
script, very useful!

```javascript
javascript:document.body.contentEditable='true'; document.designMode='on'; void 0
```

2. There are times when you are not sure that the website that you are visiting 
is authentic. Use this code whenever in doubt:-

```javascript
javascript:alert("The actual URL is:\t\t" + location.protocol + "//" + location.hostname + "/" + "\nThe address URL is:\t\t" + location.href + "\n" + "\nIf the server names do not match, this may be a spoof.");
```

3. How about shaking the internet browser window? Type this in to shake
 the browser:-

```javascript
javascript:function Shw(n) {if (self.moveBy) {for (i = 35; i > 0; i--) {for (j = n; j > 0; j--) {self.moveBy(1,i) ;self.moveBy(i,0);self.moveBy(0,-i);self.moveBy(-i,0); } } }} Shw(6)
```

4. Floating Images on Facebook:-
```javascript
javascript:R=0; x1=.1; y1=.05; x2=.25; y2=.24; x3=1.6; y3=.24; x4=300; y4=200; x5=300; y5=200; DI=document.getElementsByTagName("img"); DIL=DI.length; function A(){for(i=0; i-DIL; i++){DIS=DI[ i ].style; DIS.position='absolute'; DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+ "px"; DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+" px"}R++}setInterval( 'A()',5); void(0);
```

5. In case you are not in a mood to use the standard windows calculator and want 
your browser to do the dirty job for you, use this code.
```javascript
javascript: alert(34343+3434-222);
```
You can change the numbers according to your choice and also try creative
complex equations. Just put your arithmetic into javascript: alert( );
