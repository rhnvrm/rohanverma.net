---
title: "Serverside and Clientside Redirection"
date: 2011-04-23T00:01:30+05:30
draft: false
author: rhnvrm
categories:
  - notes
tags:
  - php
  - js
url: blog/2011/04/23/redirection/
type: post
---

Redirection can be achieved Server-Side or Client-Side.

Redirection on client side involves the following steps:

1. User requests a Page using an URI.
2. Server sends a page based on that. 
3. That page will have JavaScript that will redirect user to another page. 
4. So, again server will get the request for the new page and then server will 
give response based on new request.
5. That implies: 
Client-side -> Server-side -> Client-side -> Server-side -> Client-side.

Redirection on Server-Side:

1. User requests a Page using URI.
2. Server sends a page based on that.
3. Client sends header information back to the server 
(further reading: [HTTP Headers](http://www.softswot.com/http-header.php))
4. The server responds very quickly
5. Client receives header and can follow quickly to the new location.
6. Client-side -> Server-side -> Client-side(header information) -> Server-side -> Client-side.

Server-Side redirection is faster and more user friendly than Client-Side 
redirection both for the client and the server.

## PHP Redirection

```php
<?php
$my_link = "http://www.rhnvrm.co.cc/";
header("Location: $my_link");
?>
```

This piece of code redirects you to a different page, but the catch is — it 
won’t work if you echo‘ed some output to the browser. The function actually 
modifies the HTML headers to include location. Headers are always sent to the 
browser before any content, and therefore it’s too late to modify them after 
output has started. Fortunately, there is a quite
simple solution for that.

### Output Buffers 
further reading: [Output Control Functions](https://www.php.net/ref.outcontrol) 
in PHP allow you to collect all output data into an output buffer before sending
 it to the browser. Using the following code:

```php
<?php  //code by rhnvrm. ($rhnvrm_any is any variable, can be changed accordingly)
ob_start(); //start buffering and collect all outputs
$rhnvrm_link = "http://www.rhnvrm.co.cc/";
echo "You are being redirected to: $rhnvrm_link"; //output
ob_clean(); //clean the buffer and enable sending headers
header("Location: $rhnvrm_link"); //redirect
?>
```

## Javascript Redirection

Now we will see redirection using Javascript that is supported by every 
modern browser and does not require any resources of the server. Javascript is 
an object oriented language and blends with HTML.

So, you want to move to another webpage after a certain interval. Or you want 
to tell your visitors that your site has moved and transfer the to your 
new site. Or you want to make an advertisement service. Well then Javascript
redirection is for you.

The primary use of JavaScript is to write functions that are embedded in 
or included from HTML pages and that interact with the [Document Object 
Model](http://en.wikipedia.org/wiki/Document_Object_Model) (DOM) of the page.

So, what we can logically do is to alter the window’s location property 
using the following code:

```html
<script>
    var my_location= "http://rhnvrm.co.cc/blog";
    window.location = my_location;
</script>
```

Now you might want to create a timed delay between redirection so that 
people know that they are being transfered to a new location.

```html
<html>
<head>
<script type="text/javascript">
function delayer(){
  var rhn_link= "http://rhnvrm.co.cc/blog";
  window.location = rhn_link;
}
</script>
</head>
<body onLoad="setTimeout('delayer()', 5000)">
    <h2>Prepare to be redirected!</h2>
    <p>
    This page is a time delay redirect, 
    please wait for 5000 milliseconds (5 seconds)
    </p>
</body>
</html>
```

[setTimeout()](https://www.w3schools.com/jsref/met_win_settimeout.asp) Method 
calls a function or evaluates an expression after a specified number of 
milliseconds, where:

```javascript
setTimeout(myfunc(),millisec)
```

millisec = the number of milliseconds to wait before executing the code