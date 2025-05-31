+++
title = "Deep Learning Through the Lens of the Information Plane"
date = "2017-12-21T14:31:58+00:00"
path = "blog/2017/12/21/deep-learning-through-the-lens-of-the-information-plane/"

[extra]
  author = "rhnvrm"
+++

The ridiculous effectiveness of Deep Learning has lead to research on tools that help to analyze these Deep Neural Network based &#8220;black boxes&#8221;. Recent research papers by the Information Theory community to analyze has rise to a new tool, The Information Plane, which can help analyze and answer various questions about these networks. This article, provides a brief overview of the concepts from information theory required to develop an understanding of the Information Plane, followed by a replication study of the implementation of the paper that introduces this theory with respect to Deep Neural Networks.

## **1. Introduction** 

Information Theory has long been considered marginal to Statistical Learning theory and has usually not been studied by Machine Learning researchers. It is considered to be an integral part of Communication Engineering and is often known to be the theory of Data Compression and Error Correcting Codes. With increased compute power enabled through GPUs, a new interest in Deep Learning (LeCun et al.[1]) has re-emerged. Although, Deep Learning provides ridiculous effectiveness, there is pretty much no fundamental theory behind these machines and they are often criticized for being used as mysterious &#8220;black boxes&#8221;[2]. This has lead to major corporations like Intel investing in research that focuses on building an understating of why deep networks work the way they do and has resulted in the recent paper on &#8220;Opening the Black Box of Deep Neural Networks via Information Theory&#8221; by Ravid Schwartz-Ziv and Naftali Tishby [2] which studies these by analyzing their information-theoretic properties and tries to provide a framework to study them using the Information Plane which have been based upon the work done by Naftali Tishby earlier [3]. The theory provides tools, such as the Information Plane, that can be used to reason about what happens during deep learning, a study of what happens during Deep Neural Network (DNN) learning during training and some hints for how the results can be applied to improve the efficiency of deep learning.

One of the observations from the paper [2] is that DNN training involves two distinct phases: First, the network trains to fully represent the input data and minimize the error in generalization and then, it learns to forget the irrelevant details by compressing the representation of the input.

Another observation is a potential explanation for why transfer learning works when the top most layers are retrained for similar tasks, but I skip it for further work as it is beyond the scope of this current study, although it has been mentioned while discussing the Asymptotic Equipartition Property.

From an engineering standpoint, the papers provide a very relevant theory which could help answer questions such as, if the trained model is optimal or not, if there exist any design principles for such machines, or if the layers or neurons represent anything and if the algorithms we use can be improved or not.

The following paper contributes via providing an overview of the fundamentals of Information Theory required to study these papers, followed by a detailed summary of the work related to the Information Plane and Deep Learning and finally a replication study containing a re implementation study and its results and comparison with the results of the original authors as well as the critics of the paper. The goal of the paper was to dive into cutting edge research and implement the state of the art and verify the results of both the original authors \[2\] \[3\] as well as the critique [4] submitted to ICML 2018.

## **2. Concepts from Information Theory** 

###  **2.1 Markov Chain** 

A Markov process is a &#8220;memory-less&#8221; (also called “Markov Property”) stochastic process. A Markov chain is a type of Markov process containing multiple discrete states. That is being said, the conditional probability of future states of the process is only determined by the current state and does not depend on the past states. [5]

###  **2.2 KL Divergence** 

KL divergence measures how one probability distribution  <img src="https://s0.wp.com/latex.php?latex=%7Bp%7D&bg=ffffff&fg=000000&s=0" alt="{p}" title="{p}" class="latex" />diverges from a second expected probability distribution <img src="https://s0.wp.com/latex.php?latex=%7Bq%7D&bg=ffffff&fg=000000&s=0" alt="{q}" title="{q}" class="latex" />. It is asymmetric. [5]

<img src="https://s0.wp.com/latex.php?latex=D_%7BKL%7D%28p+%5C%7C+q%29+%3D+%5Csum_x+p%28x%29+%5Clog+%5Cfrac%7Bp%28x%29%7D%7Bq%28x%29%7D+dx++%3D+-+%5Csum_x+p%28x%29%5Clog+q%28x%29+%2B+%5Csum_x+p%28x%29%5Clog+p%28x%29++%3D+H%28P%2C+Q%29+-+H%28P%29++&bg=ffffff&fg=000&s=0" alt="D_{KL}(p &#92;| q) = &#92;sum_x p(x) &#92;log &#92;frac{p(x)}{q(x)} dx  = - &#92;sum_x p(x)&#92;log q(x) + &#92;sum_x p(x)&#92;log p(x)  = H(P, Q) - H(P)  " title="D_{KL}(p &#92;| q) = &#92;sum_x p(x) &#92;log &#92;frac{p(x)}{q(x)} dx  = - &#92;sum_x p(x)&#92;log q(x) + &#92;sum_x p(x)&#92;log p(x)  = H(P, Q) - H(P)  " class="latex" />

 <img src="https://s0.wp.com/latex.php?latex=%7BD_%7BKL%7D%7D&bg=ffffff&fg=000000&s=0" alt="{D_{KL}}" title="{D_{KL}}" class="latex" />achieves the minimum zero when  <img src="https://s0.wp.com/latex.php?latex=%7Bp%28x%29+%3D%3D+q%28x%29%7D&bg=ffffff&fg=000000&s=0" alt="{p(x) == q(x)}" title="{p(x) == q(x)}" class="latex" />everywhere.

###  **2.3 Mutual Information** 

Mutual information measures the mutual dependence between two variables. It quantifies the &#8220;amount of information&#8221; obtained about one random variable through the other random variable. Mutual information is symmetric. [5]

<img src="https://s0.wp.com/latex.php?latex=I%28X%3BY%29+%3D+D_%7BKL%7D%5Cleft%5B%7Ep%28x%2Cy%29+%7E%5C%7C%7E+p%28x%29p%28y%29%7E%5Cright%5D++%3D+%5Csum_%7Bx+%5Cin+X%2C+y+%5Cin+Y%7D+p%28x%2C+y%29+%5Clog%5Cleft%28%5Cfrac%7Bp%28x%2C+y%29%7D%7Bp%28x%29p%28y%29%7D%5Cright%29++%3D+%5Csum_%7Bx+%5Cin+X%2C+y+%5Cin+Y%7D+p%28x%2C+y%29+%5Clog%5Cleft%28%5Cfrac%7Bp%28x%7Cy%29%7D%7Bp%28x%29%7D%5Cright%29++%3D+H%28X%29+-+H%28X%7CY%29++&bg=ffffff&fg=000&s=0" alt="I(X;Y) = D_{KL}&#92;left[~p(x,y) ~&#92;|~ p(x)p(y)~&#92;right]  = &#92;sum_{x &#92;in X, y &#92;in Y} p(x, y) &#92;log&#92;left(&#92;frac{p(x, y)}{p(x)p(y)}&#92;right)  = &#92;sum_{x &#92;in X, y &#92;in Y} p(x, y) &#92;log&#92;left(&#92;frac{p(x|y)}{p(x)}&#92;right)  = H(X) - H(X|Y)  " title="I(X;Y) = D_{KL}&#92;left[~p(x,y) ~&#92;|~ p(x)p(y)~&#92;right]  = &#92;sum_{x &#92;in X, y &#92;in Y} p(x, y) &#92;log&#92;left(&#92;frac{p(x, y)}{p(x)p(y)}&#92;right)  = &#92;sum_{x &#92;in X, y &#92;in Y} p(x, y) &#92;log&#92;left(&#92;frac{p(x|y)}{p(x)}&#92;right)  = H(X) - H(X|Y)  " class="latex" />

###  **2.4 Data Processing Inequality** 

For any markov chain: <img src="https://s0.wp.com/latex.php?latex=%7BX+%5Crightarrow+Y+%5Crightarrow+Z%7D&bg=ffffff&fg=000000&s=0" alt="{X &#92;rightarrow Y &#92;rightarrow Z}" title="{X &#92;rightarrow Y &#92;rightarrow Z}" class="latex" />, we would have [5]

<p align="center">
  <img src="https://s0.wp.com/latex.php?latex=%5Cdisplaystyle+I%28X%3B+Y%29+%5Cgeq+I%28X%3B+Z%29+%5C+%5C+%5C+%5C+%5C+%281%29&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="&#92;displaystyle I(X; Y) &#92;geq I(X; Z) &#92; &#92; &#92; &#92; &#92; (1)" title="&#92;displaystyle I(X; Y) &#92;geq I(X; Z) &#92; &#92; &#92; &#92; &#92; (1)" class="latex" />
</p>

A deep neural network can be viewed as a Markov chain, and thus when we are moving down the layers of a DNN, the mutual information between the layer and the input can only decrease.

###  **2.5 Reparameterization Invariance** 

For two invertible functions <img src="https://s0.wp.com/latex.php?latex=%7B%5Cphi%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;phi}" title="{&#92;phi}" class="latex" />, <img src="https://s0.wp.com/latex.php?latex=%7B%5Cpsi%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;psi}" title="{&#92;psi}" class="latex" />, the mutual information still holds: <a name="RepInv"></a>

<p align="center">
  <img src="https://s0.wp.com/latex.php?latex=%5Cdisplaystyle+I%28X%3B+Y%29+%3D+I%28%5Cphi%28X%29%3B+%5Cpsi%28Y%29%29+%5C+%5C+%5C+%5C+%5C+%282%29&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="&#92;displaystyle I(X; Y) = I(&#92;phi(X); &#92;psi(Y)) &#92; &#92; &#92; &#92; &#92; (2)" title="&#92;displaystyle I(X; Y) = I(&#92;phi(X); &#92;psi(Y)) &#92; &#92; &#92; &#92; &#92; (2)" class="latex" />
</p>

&nbsp;

For example, if we shuffle the weights in one layer of DNN, it would not affect the mutual information between this layer and another.

###  **2.6 The Asymptotic Equipartition Property** 

This theorem is a simple consequence of the weak law of large numbers. It states that if a set of values  <img src="https://s0.wp.com/latex.php?latex=%7BX_1%2C+X_2%2C+...%2C+X_n%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X_1, X_2, ..., X_n}" title="{X_1, X_2, ..., X_n}" class="latex" />is drawn independently from a random variable X distributed according to <img src="https://s0.wp.com/latex.php?latex=%7BP%28x%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{P(x)}" title="{P(x)}" class="latex" />, then the joint probability  <img src="https://s0.wp.com/latex.php?latex=%7BP%28X_1%2C...%2CX_n%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{P(X_1,...,X_n)}" title="{P(X_1,...,X_n)}" class="latex" />satisfies [5]

<p align="center">
  <img src="https://s0.wp.com/latex.php?latex=%5Cdisplaystyle+%5Cfrac%7B-1%7D%7Bn%7D+%5Clog_%7B2%7D%7BP%28X_1%2CX_2%2C...%2CX_n%29%7D+%5Crightarrow+H%28X%29+%5C+%5C+%5C+%5C+%5C+%283%29&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="&#92;displaystyle &#92;frac{-1}{n} &#92;log_{2}{P(X_1,X_2,...,X_n)} &#92;rightarrow H(X) &#92; &#92; &#92; &#92; &#92; (3)" title="&#92;displaystyle &#92;frac{-1}{n} &#92;log_{2}{P(X_1,X_2,...,X_n)} &#92;rightarrow H(X) &#92; &#92; &#92; &#92; &#92; (3)" class="latex" />
</p>

where  <img src="https://s0.wp.com/latex.php?latex=%7BH%28X%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{H(X)}" title="{H(X)}" class="latex" />is the entropy of the random variable <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />.

Although, this is out of bounds of the scope of this work, for the sake of completeness I would like to mention how the authors of [2] use this to argue that for a typical hypothesis class the size of  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />is approximately <img src="https://s0.wp.com/latex.php?latex=%7B2%5E%7BH%28X%29%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{2^{H(X)}}" title="{2^{H(X)}}" class="latex" />. Considering an <img src="https://s0.wp.com/latex.php?latex=%7B%5Cepsilon%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;epsilon}" title="{&#92;epsilon}" class="latex" />-partition, <img src="https://s0.wp.com/latex.php?latex=%7BT_%5Cepsilon%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{T_&#92;epsilon}" title="{T_&#92;epsilon}" class="latex" />, on <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />, the cardinality of the hypothis class, <img src="https://s0.wp.com/latex.php?latex=%7B%7CH_%5Cepsilon%7C%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{|H_&#92;epsilon|}" title="{|H_&#92;epsilon|}" class="latex" />, can be written as  <img src="https://s0.wp.com/latex.php?latex=%7B%7CH_%5Cepsilon%7C+%5Csim+2%5E%7B%7CX%7C%7D+%5Crightarrow+2%5E%7B%7CT_%5Cepsilon%7C%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{|H_&#92;epsilon| &#92;sim 2^{|X|} &#92;rightarrow 2^{|T_&#92;epsilon|}}" title="{|H_&#92;epsilon| &#92;sim 2^{|X|} &#92;rightarrow 2^{|T_&#92;epsilon|}}" class="latex" />and therefore we have,

<p align="center">
  <img src="https://s0.wp.com/latex.php?latex=%5Cdisplaystyle+%5Cvert+T_%5Cepsilon+%5Cvert+%5Csim+%5Cfrac%7B2%5E%7BH%28X%29%7D%7D%7B2%5E%7BH%28X+%5Cvert+T_%5Cepsilon%29%7D%7D+%3D+2%5E%7BI%28T_%5Cepsilon%3B+X%29%7D+%5C+%5C+%5C+%5C+%5C+%284%29&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="&#92;displaystyle &#92;vert T_&#92;epsilon &#92;vert &#92;sim &#92;frac{2^{H(X)}}{2^{H(X &#92;vert T_&#92;epsilon)}} = 2^{I(T_&#92;epsilon; X)} &#92; &#92; &#92; &#92; &#92; (4)" title="&#92;displaystyle &#92;vert T_&#92;epsilon &#92;vert &#92;sim &#92;frac{2^{H(X)}}{2^{H(X &#92;vert T_&#92;epsilon)}} = 2^{I(T_&#92;epsilon; X)} &#92; &#92; &#92; &#92; &#92; (4)" class="latex" />
</p>

Then the input compression bound,

<p align="center">
  <img src="https://s0.wp.com/latex.php?latex=%5Cdisplaystyle+%5Cepsilon%5E2+%3C+%5Cfrac%7B%5Clog%7CH_%5Cepsilon%7C+%2B+%5Clog%7B1%2F%5Cdelta%7D%7D%7B2m%7D+%5C+%5C+%5C+%5C+%5C+%285%29&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="&#92;displaystyle &#92;epsilon^2 < &#92;frac{&#92;log|H_&#92;epsilon| + &#92;log{1/&#92;delta}}{2m} &#92; &#92; &#92; &#92; &#92; (5)" title="&#92;displaystyle &#92;epsilon^2 < &#92;frac{&#92;log|H_&#92;epsilon| + &#92;log{1/&#92;delta}}{2m} &#92; &#92; &#92; &#92; &#92; (5)" class="latex" />
</p>

becomes,

<p align="center">
  <img src="https://s0.wp.com/latex.php?latex=%5Cdisplaystyle+%5Cepsilon%5E2+%3C+%5Cfrac%7B2%5E%7BI%28T_%5Cepsilon%3B+X%29%7D+%2B+%5Clog%7B1%2F%5Cdelta%7D%7D%7B2m%7D+%5C+%5C+%5C+%5C+%5C+%286%29&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="&#92;displaystyle &#92;epsilon^2 < &#92;frac{2^{I(T_&#92;epsilon; X)} + &#92;log{1/&#92;delta}}{2m} &#92; &#92; &#92; &#92; &#92; (6)" title="&#92;displaystyle &#92;epsilon^2 < &#92;frac{2^{I(T_&#92;epsilon; X)} + &#92;log{1/&#92;delta}}{2m} &#92; &#92; &#92; &#92; &#92; (6)" class="latex" />
</p>

The authors then further develop this to provide a general bound on learning by combining it with the Information Bottleneck theory [6].

## **3. Information Theory of Deep Learning** 

### **3.1 DNN Layers as Markov Chain** 

In supervised learning, the training data contains sampled observations from the joint distribution of  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />and <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />. The input variable  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />and weights of hidden layers are all high-dimensional random variable. The ground truth target  <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />and the predicted value  <img src="https://s0.wp.com/latex.php?latex=%7B%5Chat%7BY%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;hat{Y}}" title="{&#92;hat{Y}}" class="latex" />are random variables of smaller dimensions in the classification settings. Moreover, we want to efficiently learn such representations from an empirical sample of the (unknown) joint distribution <img src="https://s0.wp.com/latex.php?latex=%7BP%28X%2CY%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{P(X,Y)}" title="{P(X,Y)}" class="latex" />, in a way that provides good generalization.

<figure id="attachment_302" style="width: 700px" class="wp-caption aligncenter"><img class="wp-image-302 size-large" src="/wp-content/uploads/2017/12/fig1-700x442.png" alt="" width="700" height="442" srcset="/wp-content/uploads/2017/12/fig1-700x442.png 700w, /wp-content/uploads/2017/12/fig1-300x189.png 300w, /wp-content/uploads/2017/12/fig1-768x485.png 768w, /wp-content/uploads/2017/12/fig1.png 1382w" sizes="(max-width: 700px) 100vw, 700px" /><figcaption class="wp-caption-text">The structure of a deep neural network, which consists of the target label <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />, input layer <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />, hidden layers  <img src="https://s0.wp.com/latex.php?latex=%7Bh_1%2C%5Cdots%2Ch_m%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{h_1,&#92;dots,h_m}" title="{h_1,&#92;dots,h_m}" class="latex" />and the final prediction <img src="https://s0.wp.com/latex.php?latex=%7B%5Chat%7BY%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;hat{Y}}" title="{&#92;hat{Y}}" class="latex" />. (Image Source: Tishby 2015)[3]</figcaption></figure>


If we label the hidden layers of a DNN as  <img src="https://s0.wp.com/latex.php?latex=%7Bh_1%2Ch_2%2C...%2Ch_m%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{h_1,h_2,...,h_m}" title="{h_1,h_2,...,h_m}" class="latex" />as in Figure above, we can view each layer as one state of a Markov Chain: <img src="https://s0.wp.com/latex.php?latex=%7Bh_i+%5Crightarrow+h_%7Bi%2B1%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{h_i &#92;rightarrow h_{i+1}}" title="{h_i &#92;rightarrow h_{i+1}}" class="latex" />. 

According to DPI, we would have:

<img src="https://s0.wp.com/latex.php?latex=H%28X%29+%5Cgeq+I%28X%3B+h_1%29+%5Cgeq+I%28X%3B+h_2%29+%5Cgeq+...+%5Cgeq+I%28X%3B+h_m%29+%5Cgeq+I%28X%3B+%5Chat%7BY%7D%29++I%28X%3B+Y%29+%5Cgeq+I%28h_1%3B+Y%29+%5Cgeq+I%28h_2%3B+Y%29+%5Cgeq+...+%5Cgeq+I%28h_m%3B+Y%29+%5Cgeq+I%28%5Chat%7BY%7D%3B+Y%29++&#038;bg=ffffff&#038;fg=000&#038;s=0" alt="H(X) &#92;geq I(X; h_1) &#92;geq I(X; h_2) &#92;geq ... &#92;geq I(X; h_m) &#92;geq I(X; &#92;hat{Y})  I(X; Y) &#92;geq I(h_1; Y) &#92;geq I(h_2; Y) &#92;geq ... &#92;geq I(h_m; Y) &#92;geq I(&#92;hat{Y}; Y)  " title="H(X) &#92;geq I(X; h_1) &#92;geq I(X; h_2) &#92;geq ... &#92;geq I(X; h_m) &#92;geq I(X; &#92;hat{Y})  I(X; Y) &#92;geq I(h_1; Y) &#92;geq I(h_2; Y) &#92;geq ... &#92;geq I(h_m; Y) &#92;geq I(&#92;hat{Y}; Y)  " class="latex" />

A DNN is designed to learn how to describe  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />to predict  <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />and eventually, to compress  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />to only hold the information related to <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />. Tishby describes this processing as &#8220;successive refinement of relevant information&#8221; [3].

<figure id="attachment_303" style="width: 700px" class="wp-caption aligncenter"><img class="wp-image-303 size-large" src="/wp-content/uploads/2017/12/fig2-700x503.png" alt="" width="700" height="503" srcset="/wp-content/uploads/2017/12/fig2-700x503.png 700w, /wp-content/uploads/2017/12/fig2-300x216.png 300w, /wp-content/uploads/2017/12/fig2-768x552.png 768w, /wp-content/uploads/2017/12/fig2.png 869w" sizes="(max-width: 700px) 100vw, 700px" /><figcaption class="wp-caption-text">The DNN layers form a Markov chain of successive internal representations of the input layer <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />. (Image Source: Schwartz-Ziv and Tishby 2017 [2])</figcaption></figure>


As long as these transformations on  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />in  <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />about  <img src="https://s0.wp.com/latex.php?latex=%7B%5Chat%7BY%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;hat{Y}}" title="{&#92;hat{Y}}" class="latex" />preserve information, we don’t really care which individual neurons within the layers encode which features of the input. This can be captured by finding the mutual information of  <img src="https://s0.wp.com/latex.php?latex=%7BT%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{T}" title="{T}" class="latex" />with respect to  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />and <img src="https://s0.wp.com/latex.php?latex=%7B%5Chat%7BY%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;hat{Y}}" title="{&#92;hat{Y}}" class="latex" />. Schwartz-Ziv and Tishby (2017) treat the whole layer, <img src="https://s0.wp.com/latex.php?latex=%7BT%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{T}" title="{T}" class="latex" />, as a single random variable, charachterized by  <img src="https://s0.wp.com/latex.php?latex=%7BP%28T%7CX%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{P(T|X)}" title="{P(T|X)}" class="latex" />and <img src="https://s0.wp.com/latex.php?latex=%7BP%28Y%7CT%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{P(Y|T)}" title="{P(Y|T)}" class="latex" />, the encoder and decoder distributions respectively, and use the Reparameterization Invariance given in [(2)][1] to argue that since layers related by invertible re-parameterization appear in the same point, each information path in the plane corresponds to many different DNN’s, with possibly very different architectures. [3]

<img src="https://s0.wp.com/latex.php?latex=I%28X%3B+Y%29+%5Cgeq+I%28T_1%3B+Y%29+%5Cgeq+I%28T_2%3B+Y%29+%5Cgeq+...+%5Cgeq+I%28T_k%3B+Y%29+%5Cgeq+I%28%5Chat%7BY%7D%3B+Y%29++H%28X%29+%5Cgeq+I%28X%3B+T_1%29+%5Cgeq+I%28X%3B+T_2%29+%5Cgeq+...+%5Cgeq+I%28X%3B+T_k%29+%5Cgeq+I%28X%3B+%5Chat%7BY%7D%29++&#038;bg=ffffff&#038;fg=000&#038;s=0" alt="I(X; Y) &#92;geq I(T_1; Y) &#92;geq I(T_2; Y) &#92;geq ... &#92;geq I(T_k; Y) &#92;geq I(&#92;hat{Y}; Y)  H(X) &#92;geq I(X; T_1) &#92;geq I(X; T_2) &#92;geq ... &#92;geq I(X; T_k) &#92;geq I(X; &#92;hat{Y})  " title="I(X; Y) &#92;geq I(T_1; Y) &#92;geq I(T_2; Y) &#92;geq ... &#92;geq I(T_k; Y) &#92;geq I(&#92;hat{Y}; Y)  H(X) &#92;geq I(X; T_1) &#92;geq I(X; T_2) &#92;geq ... &#92;geq I(X; T_k) &#92;geq I(X; &#92;hat{Y})  " class="latex" />

This is to say that after training, when the trained network, the new input passes through the layers which form a Markov Chain, to the predicted output <img src="https://s0.wp.com/latex.php?latex=%7B%5Chat%7BY%7D%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{&#92;hat{Y}}" title="{&#92;hat{Y}}" class="latex" />. The information plane has been discussed further in Section [3][2].

###  **3.2 The Information Plane** 

<a name="ssecIP"></a>

Using the representation in Fig. [3][3], the encoder and decoder distributions; the encoder can be seen as a representation of <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />, while the decoder translates the information in the current layer to the target output <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />.

The information can be interpreted and visualized as a plot between the encoder mutual information  <img src="https://s0.wp.com/latex.php?latex=%7BI%28X%3BT_%7Bi%7D%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(X;T_{i})}" title="{I(X;T_{i})}" class="latex" />and the decoder mutual information <img src="https://s0.wp.com/latex.php?latex=%7BI%28T_%7Bi%7D%3BY%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(T_{i};Y)}" title="{I(T_{i};Y)}" class="latex" />;

<figure id="attachment_304" style="width: 700px" class="wp-caption aligncenter"><img class="wp-image-304 size-large" src="/wp-content/uploads/2017/12/fig3-700x292.png" alt="" width="700" height="292" srcset="/wp-content/uploads/2017/12/fig3-700x292.png 700w, /wp-content/uploads/2017/12/fig3-300x125.png 300w, /wp-content/uploads/2017/12/fig3-768x320.png 768w, /wp-content/uploads/2017/12/fig3.png 1390w" sizes="(max-width: 700px) 100vw, 700px" /><figcaption class="wp-caption-text">The encoder vs decoder mutual information of DNN hidden layers of 50 experiments. Different layers are color-coded, with green being the layer right next to the input and the orange being the furthest. There are three snapshots, at the initial epoch, 400 epochs and 9000 epochs respectively. (Image source: Shwartz-Ziv and Tishby, 2017) [2])</figcaption></figure>


Each dot in Fig. [3][4]. marks the encoder/ decoder mutual information of one hidden layer of one network simulation (no regularization is applied; no weights decay, no dropout, etc.). They move up as expected because the knowledge about the true labels is increasing (accuracy increases). At the early stage, the hidden layers learn a lot about the input X, but later they start to compress to forget some information about the input. Tishby believes that &#8220;the most important part of learning is actually forgetting&#8221;. [7]

Early on the points shoot up and to the right, as the hidden layers learn to retain more mutual information both with the input and also as needed to predict the output. But after a while, a phase shift occurs, and points move more slowly up and to the left.

<figure id="attachment_305" style="width: 761px" class="wp-caption aligncenter"><img class="wp-image-305 size-full" src="/wp-content/uploads/2017/12/fig4.png" alt="" width="761" height="289" srcset="/wp-content/uploads/2017/12/fig4.png 761w, /wp-content/uploads/2017/12/fig4-300x114.png 300w, /wp-content/uploads/2017/12/fig4-700x266.png 700w" sizes="(max-width: 761px) 100vw, 761px" /><figcaption class="wp-caption-text">The evolution of the layers with the training epochs in the information plane, for different training samples. On the left &#8211; 5% of the data, middle &#8211; 45% of the data, and right &#8211; 85% of the data. The colors indicate the number of training epochs with Stochastic Gradient Descent. (Image source: Shwartz-Ziv and Tishby, 2017) [2])</figcaption></figure>

Schwartz-Ziv and Tishby name these two phases Empirical eRror Minimization (ERM) and the phase that follows as the Representation Compression Phase. Here the gradient means are much larger than their standard deviations, indicating small gradient stochasticity (high SNR). The increase in  <img src="https://s0.wp.com/latex.php?latex=%7BI_Y%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I_Y}" title="{I_Y}" class="latex" />is what we expect to see from cross-entropy loss minimization. The second diffusion phase minimizes the mutual information  <img src="https://s0.wp.com/latex.php?latex=%7BI%28X%3BT_i%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(X;T_i)}" title="{I(X;T_i)}" class="latex" />– in other words, we’re discarding information in X that is irrelevant to the task at hand.

A consequence of this is pointed out by Schwartz-Ziv and Tishby indicating that there is a huge number of different networks with essentially optimal performance, and attempts to interpret single weights or even single neurons in such networks can be meaningless due to the randomised nature of the final weights of the DNN. [2]

## **4. Experimental Setup and Results** 

###  **4.1. Experimental Setup** 

The experiments were done on a network with 7 fully connected hidden layers, and widths 12-10-7-5-4-3-2 neurons, similar to what had been done in the original paper. The network is trained using Stochiastic Gradient Descent and cross-entropy loss function, but no other explicit regularization. The activation functions are hyperbolic tangent in all layers but the final one, where a sigmoid function is used. The bin count was taken to be 24 for the mutual information calculation. Off the shelf python libraries such as Tensorflow[8], NumPy[9], ScikitLearn[9] were used for the re-implementation as described by the original paper.

Variations were made to the activation function to Rectified Linear Unit (ReLu) and Sigmoidal to verify the results of a recent paper [4] which is under open review for ICLR 2018 under the same conditions.

###  **4.2. Results** <figure id="attachment_310" style="width: 640px" class="wp-caption aligncenter">

<img class="wp-image-310 size-full" src="/wp-content/uploads/2017/12/tanh-1.png" alt="" width="640" height="480" srcset="/wp-content/uploads/2017/12/tanh-1.png 640w, /wp-content/uploads/2017/12/tanh-1-300x225.png 300w" sizes="(max-width: 640px) 100vw, 640px" /><figcaption class="wp-caption-text">Loss Function observed with a network having layers of 12-10-7-5-4-3-2 widths when trained with tanh as activation function. The X-Axis represents training losses and the Y-Axis represents steps</figcaption></figure> <figure id="attachment_316" style="width: 640px" class="wp-caption aligncenter"><img class="wp-image-316 size-full" src="/wp-content/uploads/2017/12/tanh-2.png" alt="" width="640" height="480" srcset="/wp-content/uploads/2017/12/tanh-2.png 640w, /wp-content/uploads/2017/12/tanh-2-300x225.png 300w" sizes="(max-width: 640px) 100vw, 640px" /><figcaption class="wp-caption-text">Information Plane observed with a network having layers of 12-10-7-5-4-3-2 widths when trained with tanh as activation function. The X-Axis represents  <img src="https://s0.wp.com/latex.php?latex=%7BI%28X%3BT%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(X;T)}" title="{I(X;T)}" class="latex" />and the Y-Axis represents <img src="https://s0.wp.com/latex.php?latex=%7BI%28T%3BY%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(T;Y)}" title="{I(T;Y)}" class="latex" /></figcaption></figure> 

The results were plotted using the experimental setup and tanh as the activation function. It is important to note that it’s the lowest layer which appears in the top-right of this plot (maintains the most mutual information), and the top-most layer which appears in the bottom-left (has retained almost no mutual information before any training). So the information path being followed goes from the top-right corner to the bottom-left traveling down the slope.

Early on the points shoot up and to the right, as the hidden layers learn to retain more mutual information both with the input and also as needed to predict the output. But after a while, a phase shift occurs, and points move more slowly up and to the left.<figure id="attachment_306" style="width: 640px" class="wp-caption aligncenter">

<img class="wp-image-306 size-full" src="/wp-content/uploads/2017/12/relu-1.png" alt="" width="640" height="480" srcset="/wp-content/uploads/2017/12/relu-1.png 640w, /wp-content/uploads/2017/12/relu-1-300x225.png 300w" sizes="(max-width: 640px) 100vw, 640px" /><figcaption class="wp-caption-text">Loss Function observed with a network having layers of 12-10-7-5-4-3-2 widths when trained with ReLu as activation function. The X-Axis on the left represents training losses and the Y-Axis represents steps. The X-Axis represents for the figure on the right  <img src="https://s0.wp.com/latex.php?latex=%7BI%28X%3BT%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(X;T)}" title="{I(X;T)}" class="latex" />and the Y-Axis represents <img src="https://s0.wp.com/latex.php?latex=%7BI%28T%3BY%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(T;Y)}" title="{I(T;Y)}" class="latex" /></figcaption></figure> <figure id="attachment_307" style="width: 640px" class="wp-caption aligncenter"><img class="wp-image-307 size-full" src="/wp-content/uploads/2017/12/relu-2.png" alt="" width="640" height="480" srcset="/wp-content/uploads/2017/12/relu-2.png 640w, /wp-content/uploads/2017/12/relu-2-300x225.png 300w" sizes="(max-width: 640px) 100vw, 640px" /><figcaption class="wp-caption-text">Information Plane observed with a network having layers of 12-10-7-5-4-3-2 widths when trained with ReLu as activation function. The X-Axis on the left represents training losses and the Y-Axis represents steps. The X-Axis represents for the figure on the right  <img src="https://s0.wp.com/latex.php?latex=%7BI%28X%3BT%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(X;T)}" title="{I(X;T)}" class="latex" />and the Y-Axis represents <img src="https://s0.wp.com/latex.php?latex=%7BI%28T%3BY%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(T;Y)}" title="{I(T;Y)}" class="latex" /></figcaption></figure> <figure id="attachment_309" style="width: 640px" class="wp-caption aligncenter"><img class="wp-image-309 size-full" src="/wp-content/uploads/2017/12/sigmoid-2.png" alt="" width="640" height="480" srcset="/wp-content/uploads/2017/12/sigmoid-2.png 640w, /wp-content/uploads/2017/12/sigmoid-2-300x225.png 300w" sizes="(max-width: 640px) 100vw, 640px" /><figcaption class="wp-caption-text">Information Plane observed with a network having layers of 12-10-7-5-4-3-2 widths when trained with Sigmoid as activation function. The X-Axis on the left represents training losses and the Y-Axis represents steps. The X-Axis represents for the figure on the right  <img src="https://s0.wp.com/latex.php?latex=%7BI%28X%3BT%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(X;T)}" title="{I(X;T)}" class="latex" />and the Y-Axis represents <img src="https://s0.wp.com/latex.php?latex=%7BI%28T%3BY%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(T;Y)}" title="{I(T;Y)}" class="latex" /></figcaption></figure> <figure id="attachment_308" style="width: 640px" class="wp-caption aligncenter"><img class="wp-image-308 size-full" src="/wp-content/uploads/2017/12/sigmoid-1.png" alt="" width="640" height="480" srcset="/wp-content/uploads/2017/12/sigmoid-1.png 640w, /wp-content/uploads/2017/12/sigmoid-1-300x225.png 300w" sizes="(max-width: 640px) 100vw, 640px" /><figcaption class="wp-caption-text">Loss Function observed with a network having layers of 12-10-7-5-4-3-2 widths when trained with Sigmoid as activation function. The X-Axis on the left represents training losses and the Y-Axis represents steps. The X-Axis represents for the figure on the right  <img src="https://s0.wp.com/latex.php?latex=%7BI%28X%3BT%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(X;T)}" title="{I(X;T)}" class="latex" />and the Y-Axis represents <img src="https://s0.wp.com/latex.php?latex=%7BI%28T%3BY%29%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{I(T;Y)}" title="{I(T;Y)}" class="latex" /></figcaption></figure> 

###  **4.3. Analysis** 

The results of using the hyperbolic tan function (tanh) as the choice for activation function corresponds with results obtained by Schwartz-Ziv and Tishby (2017) [2]. Although, the same can&#8217;t be said about the results obtained when ReLu or Sigmoid function was used as the activation function. The network seems to stabilize much faster when trained with ReLu but does not show any of the charachteristics mentioned by Schwartz-Ziv and Tishby (2017) such as compression and diffusion in the information plane. This is in line with [4], although the authors have commented in the open review [4] that they have used other strategies for binning during MI calculation which give correct results. The compression and diffusion phases can be clearly seen in Fig. [4][5]. The corresponding plot of the loss function also shows that the DNN actually learned the input variable  <img src="https://s0.wp.com/latex.php?latex=%7BX%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{X}" title="{X}" class="latex" />with respect to the ground truth <img src="https://s0.wp.com/latex.php?latex=%7BY%7D&#038;bg=ffffff&#038;fg=000000&#038;s=0" alt="{Y}" title="{Y}" class="latex" />.

## References

<a name="1">1. </a>Y. LeCun, Y. Bengio, and G. E. Hinton, “Deep learning,” Nature, vol. 521, no. 7553, pp. 436–444, 2015. [Online]. Available: <a href="http://sci-hub.tw/10.1038/nature14539" target="_blank" rel="noopener noreferrer">http://sci-hub.tw/10.1038/nature14539</a>
  
<a name="2">2. </a>R. Shwartz-Ziv and N. Tishby, “Opening the black box of deep neural networks via information,” CoRR, vol. abs/1703.00810, 2017. [Online]. Available: http://arxiv.org/abs/1703.00810
  
<a name="3">3. </a>N. Tishby and N. Zaslavsky, “Deep learning and the information bottleneck principle,” CoRR, vol. abs/1503.02406, 2015. [Online]. Available: http://arxiv.org/abs/1503.02406
  
<a name="4">4. </a>Anonymous, “On the information bottleneck theory of deep learning,” International Conference on Learning Representations, 2018. [Online]. Available: https://openreview.net/forum?id=ry WPG-A-
  
<a name="5">5. </a>T. M. Cover and J. A. Thomas, Elements of Information Theory (Wiley Series in Telecommunications and Signal Processing). Wiley-Interscience, 2006.
  
<a name="6">6. </a>N. Tishby, F. C. N. Pereira, and W. Bialek, “The information bottleneck method,” CoRR, vol. physics/0004057, 2000. [Online]. Available: http://arxiv.org/abs/physics/0004057
  
<a name="7">7. </a>L.Weng. Anatomize deep learning with informa-tion theory. [Online]. Available: https://lilianweng.github.io/lillog/2017/09/28/anatomize-deep-learning-with-information-theory.html
  
<a name="8">8. </a>M. Abadi, A. Agarwal, P. Barham, E. Brevdo, Z. Chen, C. Citro, G. S. Corrado, A. Davis, J. Dean, M. Devin, S. Ghemawat, I. Goodfellow, A. Harp, G. Irving, M. Isard, Y. Jia, R. Jozefowicz, L. Kaiser, M. Kudlur, J. Levenberg, D. Mané, R. Monga, S. Moore, D. Murray, C. Olah, M. Schuster, J. Shlens, B. Steiner, I. Sutskever, K. Talwar, P. Tucker, V. Vanhoucke, V. Vasudevan, F. Viégas, O. Vinyals, P. Warden, M. Wattenberg, M. Wicke, Y. Yu, and X. Zheng, “TensorFlow: Large-scale machine learning on heterogeneous systems,” 2015, software available from tensorflow.org. [Online]. Available: https://www.tensorflow.org/
  
<a name="9">9. </a>E. Jones, T. Oliphant, P. Peterson et al., “SciPy: Open source scientific tools for Python,” 2001–, [Online; accessed ¡today¿]. [Online]. Available: http://www.scipy.org/
  
<a name="10">10. </a>S. Prabh. Prof. shashi prabh homepage. [Online]. Available: https://sites.google.com/a/snu.edu.in/shashi-prabh/home
  
<a name="11">11. </a>N. Wolchover. New theory cracks open the black box of deep learning — quanta magazine. Quanta Magazine. [On-line]. Available: https://www.quantamagazine.org/new-theory-cracks-
  
open-the-black-box-of-deep-learning-20170921/
  
<a name="12">12. </a>Machine learning subreddit. [Online]. Available: https://www.reddit.com/r/MachineLearning/

<span style="font-size: 8pt;">This work has been undertaken in the Course Project component for the elective titled &#8220;Information Theory (Fall 2017)&#8221; [https://sites.google.com/a/snu.edu.in/shashi-prabh/teaching/information-theory-2017] at Shiv Nadar University under the guidance of Prof. Shashi Prabh</span>

&nbsp;

&nbsp;

 [1]: #1
 [2]: #2
 [3]: #3
 [4]: #4
 [5]: #5
 [6]: #6
 [7]: #7
 [8]: #8
 [9]: #9
 [10]: #10
 [11]: #11
 [12]: #12