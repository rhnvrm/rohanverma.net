+++
title = "Setting up Python on Spacemacs and using Pyenv to use Python3"
date = "2017-12-21T12:55:34+00:00"
path = "blog/2017/12/21/setting-up-python-on-spacemacs-and-using-pyenv-to-use-python3/"

[extra]
  author = "rhnvrm"
+++

After diving into Spacemacs yesterday, I was able to setup LaTeX properly. Only SyncTeX is left to be setup although, right now I can live without it. After tweeting about it, I got a reply about setting up Python on Spacemacs. I had installed the python layer but had not tested it. There was no hitch, although I faced a small issue with having python2 as well as python3 on my system. Emacs recognized only python2. I ended up finding about pyvenv which I have discussed below. Also, am optimistic that I will be able to setup Pipenv as well through pipenv.el that is available on GitHub by tomorrow. Also, have commited my .spacemacs file to my dotfiles repository on github.

Getting started with the setup along with the basic packages etc. was easy by just adding the python layer into the `.spacemacs` file. Then, the only thing need to be done was install, by pressing `SPC-f-e-R`. I then tried to run a python interpreter in a new buffer by, going to the menu `SPC-SPC-` and typing `run-python.` After the `ipython` shell worked out fine, I decided to run a python file by entering one. Without any hitch, the python mode loaded and I could press `SPC-m-c-c` to run the file.

The problem I mentioned above about the python versions came into my view when I ran a simple print function, which gave an error as I did not have any shebang on top of the file. This made me realize a potential problem in the future as Python development heavily depends upon virtual environments. Thankfully, the python layer had already added pyvenv and pyenv. Although, pyenv only listed one `system` version, and that too it was of python2. So to solve this, I ran the following:

```bash
pyenv virtualenv -p /usr/bin/python2 venv2
pyenv virtualenv -p /usr/bin/python3 venv3
```

&nbsp;

The \`-p\` flag is documented in the virtualenv docs as:

> The Python interpreter to use, e.g., –python=python2.5 will use the python2.5 interpreter to create the new environment. The default is the interpreter that virtualenv was installed with (like <code class="docutils literal">&lt;span class="pre">/usr/bin/python&lt;/span></code>)

Afterwards, it was easy to change the environment inside emacs using `SPC-m-v-s` and choose `venv3` for using python3 instead of python2. Similarly, `-V` can be used instead of `-v` to set virtualenvs using directories.

I&#8217;m looking forward to setting up the [Pipenv.el][1] to be able to use [pipenv][2] as well.

**References:**

  * <https://github.com/pyenv/pyenv/issues/158#issuecomment-40888875>
  * <https://stackoverflow.com/questions/47104498/how-to-run-pipenv-python-as-emacs-python-shell>

 [1]: https://github.com/pwalsh/pipenv.el
 [2]: http://pipenv.readthedocs.io/en/latest/