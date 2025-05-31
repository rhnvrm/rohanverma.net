+++
title = "Working with J2ME on Linux in 2017"
date = "2017-02-07T20:18:16+00:00"
path = "blog/2017/02/07/working-with-j2me-on-linux-in-2017/"

[extra]
  author = "rhnvrm"
+++

I recently had to work on the J2ME platform for a course at my university. It is an old technology and does not have many recent articles about using or installing J2ME on Linux. J2ME SDK has had no support for Linux for a long time. The SDK 3.x only has support for Mac and Windows. The last version available was by Sun which is called the Sun Java Wireless Toolkit 2.5.2. This comes bundled with NetBeans 7.2 version. But the emulator that comes with it does not seem to work. Although, another emulator availble on sourceforge called MicroEmulator is able to run the JAR files built using NetBeans for the Wireless Toolkit Platform.

Here is a list of all the requirements:

  1. [JDK 7][1] (Netbeans 7.2 does not work with JDK 8, [instructions on installing][2])
  2. [NetBeans 7.2][3]
  3.  [Sun Java Wireless Toolkit for CLDC 2.5.2 ML][4] (Optional, Explained Below)
  4. [MicroEmulator][5]

Steps:

  1. Install JDK 7.
  2. Install NetBeans 7.2 and make sure to use JDK 7 instead of JDK 8 during the installation. If you forgot to do so, you can edit the conf file in the etc folder.
  3. After installing NetBeans 7.2, you should create a new J2ME Mobile Application Project, check the CLDC 1.1 and MIDP 2.0
  4. Press build to test if the project is built or not
  5. If the project builds successfully, great. Otherwise, there could be two problems. Run the Sun Java Wireless Toolkit 2.5.2 shell script and install it and add it as a Platform in NetBeans and try creating a new project with this platform instead. If it says that some libraries such as libXt.so are are missing in the preverify step, you need to install these (i686 versions) using your package manager.
  6. The emulator bundled with NetBeans will not work so we need to use MicroEmulator. For this you can extract the zip file somewhere and run the jar file using \`java -jar microemulator.jar\`. For making your life easier, you can modify your ANT build-impl.xml file to run the emulator after building the JAR file of your J2ME project. Here is the code which you can modify according to where you extracted microemulator: <pre class="brush: xml; title: modification in the post-jar target; notranslate" title="modification in the post-jar target">&lt;target name="post-jar"&gt;
        &lt;exec executable="/bin/sh"&gt;
            &lt;arg value="-c"/&gt;
            &lt;arg value="java -jar /home/rhnvrm/Software/microemulator/microemulator.jar ${dist.dir}/${dist.jar}" /&gt;
        &lt;/exec&gt;
&lt;/target&gt;
</pre>

 [1]: http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html#jdk-7u80-oth-JPR
 [2]: https://docs.oracle.com/javase/7/docs/webnotes/install/linux/linux-jdk.html#install-64
 [3]: https://netbeans.org/downloads/7.2/
 [4]: http://www.oracle.com/technetwork/java/javasebusiness/downloads/java-archive-downloads-javame-419430.html#sun_java_wireless_toolkit-2.5.2-ml-oth-JPR
 [5]: https://sourceforge.net/projects/microemulator/