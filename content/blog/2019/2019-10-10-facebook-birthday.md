+++
title = "Facebook Birthday List to ICS file"
date = 2019-10-11T01:03:03+05:30
draft = false
categories = ["notes"]
tags = ["digital wellbeing", "python"]
type = "post"
url = "blog/2019/10/10/facebook-birthday"
author = "Rohan Verma"
+++

I have recently stopped using facebook, but I really miss the convenience of 
the birthday notifications. I tried to find the `.ics` which you could
export from facebook events page to your calendar program
but it was nowhere to be found and I thought I would have to 
script scraping it myself.

A quick search on github later, I found that someone had already beat me to it.

You can find the repository on [github](https://github.com/mobeigi/fb2cal) and follow the documentation, but I 
have documented the steps I followed below:

The first step is to fetch the repository from github and editing the config.

```bash
git clone git@github.com:mobeigi/fb2cal.git

cd fb2cal

cp config/config-template.ini config/config.ini
vim config/config.ini
```

I did not want to upload to google drive which is default so I edited the default config
to save the file locally. In case you face errors, you might need to 
set logging to `DEBUG` to figure out what went wrong.

```ini
[AUTH]
fb_email = myemail@gmail.com
fb_pass = xxxxxxxxxxx

[DRIVE]
upload_to_drive = False
drive_file_id = 
ics_file_name = birthdays.ics

[FILESYSTEM]
save_to_file = True
ics_file_path = ./birthdays.ics

[LOGGING]
level = INFO
```

Now we need to download the dependencies, I prefer to use `pipenv` to automate
the virtual environment creation but you can install them using `pip` as well. 

```bash
pipenv shell
pipenv install
```

Now we need to run the script and wait for it to complete.

```bash
cd src
python fb2cal.py
```

After it is complete you can view the `.ics` file and import it into your 
calendar app.

```bash
cat birthdays.ics
```

Afterwards, don't forget to delete the `config.ini` file
containing your facebook password in plaintext.