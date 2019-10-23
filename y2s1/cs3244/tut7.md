## Q1

- Reduce the dimensionality of data
  - Use an **Autoencoder**
  - Which is a neural network with one very small hidden layer
  - Layer before called encoder, after called decoder
  - Also possible to have decreasing size layers, and then increasing size
- Determine the sentiment of sentences
  - Use a **RNN**. Because it is **sequential**
  - 3 sets of weights:
    1. input to the hidden layers
    2. hidden layers to hidden layers (of the next time step)
    3. hidden layer to output
- Translation between 2 languagues
  - Use a **RNN**. But now it's many to many
  - Takes in a time series input, output until a punctuation is outputted.
- ## Build a huge CNN but with very little data

## Q2

Why resnet?

- residual network nodes give 2^n possible paths
- stacking sigmoids make the sigmoid function stronger, almost asymtotic
- arxiv: resnetst behave like ensembles of relatively shallow networks
