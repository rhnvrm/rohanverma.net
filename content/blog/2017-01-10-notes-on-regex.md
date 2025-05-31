+++
title = "Notes on Regex"
date = "2017-01-10T01:06:48+00:00"
path = "blog/2017/01/10/notes-on-regex/"

[extra]
  author = "rhnvrm"
+++

I&#8217;m going to use python. Regex can be used by using the `re` library. You should not refer to this post as these are just notes, it would be better to follow the actual documentation of the [library][1].

To use regex, which uses backslashes `\` we must use raw python strings like `r"\n".`

`.` matches anything but a newline

`\d` matches `0-9` while `\D` matches anything but digits. Similarly, `\w` matches word chars. Usually, capital letters are complement of these sets.

`\s` matches whitespace characters like return, newline, tab etc.

`\w{x}` would match word chars x times.

`^` matches start and `$` matches end.
  
This can be used for exact match.

`[]` matches a set.
  
Important point to note here would be to match `.` inside set, we should not use `\.` since slash will also be matched here, because special characters lose their special meaning here but character classes don&#8217;t like `\w`.
  
Inside, `^` means negated character set.
  
There are also ranges like, a-z, A-Z, 0-9 that can be used in the set.

`\{x,y} `matches repetitions between x and y inclusive.` w{3,5}` : It will match the character w 3,4 or 5 times. Leaving y means atleast x repetitions.

`\d*` will match digits 0 or more times.

`w+` will match w one or more times.

`?` match zero or one time.
  
`(?:...)` is a non capturing group, useful when you only need to check if it is there or not.
  
`()` is capturing, can be used with `\1` etc eg. `(\d)\1`: It can match `00`, `11`, `22`, `33`, `44`, `55`, `66`, `77`, `88` or `99`. This is called backreferencing.
  
Backreferencing can be used for conditionally checking `r"^\d{2}(-?)\d{2}\1\d{2}\1\d{2}$"`

`\b` means check if it is a word boundary which is first char of string, between word and not word char, or last char in string. note: don&#8217;t use `^$` with word boundary.

`(Bob|Kevin|Stuart)` will match either `Bob` or `Kevin` or `Stuart`

`r1(?=r2)` Positive lookahead checks if r1 is immediately followed by r2

`r1(?!r2)` Negative lookahead checks if r1 is _not_ immediately followed by r2

`(?<=r2)r1` Positive lookbehind

`(?<!r2)r1` negative lookbehind

Non greedy match &#8211; use `?` to perform non greedy match. `<.*>` will match `<a>b<c>`. To only match `<a>` use `<.*?>`

Detect HTML links and content: `r'<a href="(.*?)".*?>([\w ,./]*)(?=</)'`

findall matches in python: `re.findall(pattern, text)`

 [1]: https://docs.python.org/3/library/re.html