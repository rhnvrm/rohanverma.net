+++
title = "Checking if a number is prime using Regex"
date = "2017-01-12T11:17:48+00:00"
path = "blog/2017/01/12/checking-if-a-number-is-prime-using-regex/"

[extra]
  author = "rhnvrm"
+++

<pre class="brush: python; title: ; notranslate" title="">def is_prime(n):
    return not re.match(r'^.?$|^(..+?)\1+$', '1'*n)
</pre>

This works by first converting the number to unary, i.e. 5 will be &#8216;11111&#8217; and 3 will be &#8216;111&#8217; and so on. First, it tries to match 0 or 1 in the LHS and then uses backreferences to try and match multiples of 2, 3, 4 and so on until a match is found or string length is exceeded.

For a deeper analysis please read: https://iluxonchik.github.io/regular-expression-check-if-number-is-prime/

&nbsp;