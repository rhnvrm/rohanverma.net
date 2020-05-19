---
title: Installing Apache Allura on Digital Ocean
author: rhnvrm
type: post
date: 2016-05-30T00:00:00+00:00
url: blog/2016/05/30/installing-apache-allura-on-digital-ocean/
categories:
  - gsoc
  - projects

---
Installing Apache Allura on your [Digital Ocean][1] droplet is now as easy as typing <code class="highlighter-rouge">make install</code>.

[Apache Allura][2] is a Software Forge that powers [SourceForge.net][3]. Today,
  
I created a Makefile that simplifies the process of setting up Allura on a Digital Ocean droplet. The source code is hosted
  
on <https://forge-allura.apache.org/u/rhnvrm/allura-install/ci/master/tree/>
  
and on [github][4].

Here are the steps to get started with deploying your own instance of Apache Allura.

  1. Set up your [digital ocean][1] account and spin up a new <code class="highlighter-rouge">Ubuntu 14.04</code> droplet.
  2. SSH into your droplet’s root <code class="highlighter-rouge">ssh root@&lt;DO_id&gt;</code> and
  
    clone the repository using <code class="highlighter-rouge">git clone https://rhnvrm@forge-allura.apache.org/git/u/rhnvrm/allura-install</code>
  3. Change your working directory into the cloned repository. <code class="highlighter-rouge">cd allura-install</code>
  4. Install <code class="highlighter-rouge">git</code> and <code class="highlighter-rouge">make</code> using <code class="highlighter-rouge">apt-get install git make</code>
  5. Run <code class="highlighter-rouge">make install</code>

If you face an error during a make step, report it to the issue tracker on [github][5].

If it is an error that you can fix or due to some network errors, you can run the next step listed in the make file.

Suppose, you faced an error during the <code class="highlighter-rouge">npm install</code> inside the <code class="highlighter-rouge">initialize-allura-taskd</code>, you can run <code class="highlighter-rouge">make initialize-allura-taskd</code> again and
  
then run each next step in a simlar fashion (such as <code class="highlighter-rouge">initialize-allura-data</code>)

Finally, run <code class="highlighter-rouge">make start</code> (only required if <code class="highlighter-rouge">make</code> failed during a certain step)

 [1]: http://digitalocean.com
 [2]: http://allura.apache.org
 [3]: http://sourceforge.net
 [4]: http://github.com/rhnvrm/allura-install
 [5]: http://github.com/rhnvrm/allura-install/issues