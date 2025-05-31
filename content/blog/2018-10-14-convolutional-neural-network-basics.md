+++
title = "Convolutional Neural Network Basics"
date = "2018-10-14T15:54:42+00:00"
path = "blog/2018/10/14/convolutional-neural-network-basics/"

[extra]
  author = "Rohan Verma"
+++

## Convolution

It is a matrix operation in which we add each element with local neighbors with respect to the weight of the kernels. Mathematically, it is the element-wise product of each element of the kernel with the image-piece followed by a sum. These filters can be used to detect various things like edges etc.<figure class="wp-block-image">

![][1]</figure> 

## Filters/Kernels

Filters/Kernels capture features in their receptive field using matrices containing values (weights) with convolution. A higher result of this operation implies that the feature captured by the kernel is in the image, and a lower score implies the opposite.

## Epochs

A single epoch is a combination of one forward pass and a one backward pass through the network and the whole dataset has been covered. A single epoch is usually not enough and leads to underfitting. Too many epochs, would lead to a longer training time and also overfit to the data.

## 1&#215;1 Convolutions

1&#215;1 Convolutions are used to change the dimensionality of the the previous layer. It will take in x channels and not look at any neighbors and take the sum and change it into y channels. This is very useful, and for example, can be used after max pooling to reduce the z-dimensionality.

## 3&#215;3 Convolution<figure class="wp-block-image">

![][2]</figure> <figure class="wp-block-image">![][3]</figure> 

3&#215;3 Convolutions are composed of 9 parameters. We tend to use them because they can be combined to have the same effect as higher area convolutions. Back to back application of 3&#215;3 convolution would have the same effective receptive field as would a single 5&#215;5 convolution and would also be faster as this is what has been optimized by modern day GPUs and TPUs.

## Feature Maps

Feature maps, also called activation maps, are the final output results of the activation function (such as ReLU or Sigmoid) applied on the values of a given filter or kernel. A higher activation corresponds to higher likelihood that a feature was found by the kernel in the image and a lower would imply it not being in the receptive field.

## Feature Engineering

In older concepts, people used to manually extract local features also called interest points. This used to utilize various algorithms which used to extract points in the image and would then be used to match similar ones in other images. For example, <figure class="wp-block-image">

<img src="/wp-content/uploads/2018/10/results___2_0.png" alt="" class="wp-image-429" srcset="/wp-content/uploads/2018/10/results___2_0.png 942w, /wp-content/uploads/2018/10/results___2_0-300x228.png 300w, /wp-content/uploads/2018/10/results___2_0-768x583.png 768w, /wp-content/uploads/2018/10/results___2_0-700x531.png 700w" sizes="(max-width: 942px) 100vw, 942px" /></figure> <figure class="wp-block-image"><img src="/wp-content/uploads/2018/10/results___4_0.png" alt="" class="wp-image-428" srcset="/wp-content/uploads/2018/10/results___4_0.png 942w, /wp-content/uploads/2018/10/results___4_0-300x186.png 300w, /wp-content/uploads/2018/10/results___4_0-768x477.png 768w, /wp-content/uploads/2018/10/results___4_0-700x435.png 700w" sizes="(max-width: 942px) 100vw, 942px" /></figure> 

The above image shows ORB interest points and then matches these points for another image taken from another angle.

Reference: [Image Feature Extraction and Matching Tutorial &#8211; Kaggle][4]

## Activation Function

The purpose of the activation function is to find a function that can take the input signal and squish them between $-1$ and $1$, and get an output signal.

### Hyperbolic Tan function

<img src="//s0.wp.com/latex.php?latex=f%28x%29+%3D+%5Cfrac%7B1-exp%28-2x%29%7D%7B1%2Bexp%28-2x%29%7D+&#038;bg=ffffff&#038;fg=000&#038;s=0" alt="f(x) = &#92;frac{1-exp(-2x)}{1+exp(-2x)} " title="f(x) = &#92;frac{1-exp(-2x)}{1+exp(-2x)} " class="latex" /><figure class="wp-block-image">

![][5]</figure> 

### Sigmoid

<img src="//s0.wp.com/latex.php?latex=f%28x%29+%3D+%5Cfrac%7B1%7D%7B1+%2B+exp%28-x%29%7D+&#038;bg=ffffff&#038;fg=000&#038;s=0" alt="f(x) = &#92;frac{1}{1 + exp(-x)} " title="f(x) = &#92;frac{1}{1 + exp(-x)} " class="latex" /><figure class="wp-block-image">

![][6]</figure> 

### Rectified Linear Units

<img src="//s0.wp.com/latex.php?latex=R%28x%29+%3D+max%280%2Cx%29+&#038;bg=ffffff&#038;fg=000&#038;s=0" alt="R(x) = max(0,x) " title="R(x) = max(0,x) " class="latex" />

There are other modifications of ReLU like Leaky ReLU and randomized leaky ReLU.<figure class="wp-block-image">

![][7]</figure> 

## Receptive Fields

Receptive Field of a kernel is the region of the image which affects its result. For layers directly connected to the image, this may be a very small region of 3&#215;3 but for higher layers this region increases as they combine multiple receptive fields below them.

 [1]: https://cdn-images-1.medium.com/max/1600/0*dRD6PhKOnnCIhz15.jpg
 [2]: https://cdn-images-1.medium.com/max/600/1*1okwhewf5KCtIPaFib4XaA.gif
 [3]: https://www.saama.com/wp-content/uploads/2017/12/01.jpg
 [4]: https://www.kaggle.com/wesamelshamy/tutorial-image-feature-extraction-and-matching
 [5]: https://cdn-images-1.medium.com/max/800/0*VHhGS4NwibecRjIa.png
 [6]: https://cdn-images-1.medium.com/max/800/0*WYB0K0zk1MiIB6xp.png
 [7]: https://cdn-images-1.medium.com/max/800/0*qtfLu9rmtNullrVC.png