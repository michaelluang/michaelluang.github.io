---
layout: post
title: RBF Neural Network Implementation in Python
date: 2016-05-01 20:12:10 +0800
---

Starting a project this month: An incremental design of Radial Basis Function(RBF) Neural Network trained by improved Levenberg-Marquardt(LM) algorithm.

I will post the progress in detail here. This project is hosted on [Github](https://github.com/michaelluang/rbf).

### May 2, 2016

The papers below provide the algorithms to train RBF Neural Networks: 

[1] Yu H, Reiner P D, Xie T, et al. An incremental design of radial basis function networks[J]. IEEE Transactions on Neural Networks and Learning Systems, 2014, 25(10): 1793-1803.

[2] Wilamowski B M, Yu H. Improved computation for Levenberg–Marquardt training[J]. IEEE Transactions onNeural Networks, 2010, 21(6): 930-937.

Based on the [scikit-learn](http://scikit-learn.org/stable/) API, I will implement the learing algorithms in clean and well-structrued code. In the meantime, The algorithms will be explained in more detail here.

Stay tuned...