---
title: "Memory consumption issue of go-amino package"
date: 2019-09-24 22:00:00 +0900
categories: blog news
comments: true
---
## Memory consumption of go-amino in Cosmos, Terra and Tendermint

> English : https://www.dsrvlabs.com/blog/news/terrad_out_of_memory.en/  
> Korean : https://www.dsrvlabs.com/blog/news/terrad_out_of_memory/

Hello, this is dsrv labs.

[dsrv labs](https://www.dsrvlabs.com/) runs a Terra validator node and also runs several non-validator nodes to provide Terra related services such as [Luna Whale](https://www.lunawhale.com).

We are going to talk about Rest server of Terra which is frequently used when providing services using Terra network.

## Rest Server of Cosmos and Terra

Cosmos SDK provides [Rest Server](https://cosmos.network/docs/clients/service-providers.html#setting-up-the-rest-server) as a separated process in addition to node, i.e. Rest server and node are different processes.

Rest Server accepts external queries and responds result from a node using RPC (Remote Procedure Call).
By doing this, we can handle external requests using a separate Rest Server and prevent a node from malicious requests. As a result, we can protect and run a node in more stable environment.

[Terra](https://terra.money/), which is built using the Cosmos SDK and Tendermint, also provides REST server as [Light Client Daemon](https://docs.terra.money/guide/light-client) using `terracli`.

And several features of [Luna Whale](https://www.lunawhale.com/) make use of this REST Server of Terra.

## Node is crashed while Rest Server is alive

A few days ago, Terra node used by Luna Whale service is crashed unexpectedly due to out-of-memory, aka OOM, after ever increasing memory use as below.

<img alt="Process resident memory of lunawhale node" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-lunawhale.png">

[Source: *dsrv labs monitoring system*]

<br>
Rest server is still alive and only Terra node is crashed after running out of memory. We were very embarrassed, because we thought Terra nodes are more reliable than Rest server.

## Why does memory usage increase ?

Because memory is consumed within a short time, we listed possible causes of high memory usage as below.   

- Huge memory is required to handle Terra blocks
- Memory leak
- Hugh memory is required to handle REST call

First, we investigate memory usage required to process Terra blocks.
We take a look into memory usage of our validator node during 24hrs including time window of the crash. Memory usage of validator node is under 300 MB during 24 hrs and there is no significant change at the time of node crash as below.

<img alt="Process resident memory of validator nodes" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-validator-normal.png">

[Source: *dsrv labs monitoring system*]

<br>
As a next step, we ran several tests to figure out if there is any significant amount of memory leak in Terra node. Even though we observed several possible memory leak during tests, the amount of memory leak was very small.

Finally, we try to reproduce node crash by running Terra node and Rest server while sending request using REST APIs to Rest server.

We managed to reproduce the crash caused by out-of-memory and we applied memory profiling when running Terra node.

Below diagram is a memory profiling result just before node is crashed due to running out of memory.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-memprofile-1.png">

## Rest call consumes lots of memory

We found that HTTP handler consumes more than 600 MB of memory  in below diagram.

<p align="center">
<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-memprofile-2.png">
</p>

Terra node accepts RPC request through HTTP and above HTTP handlers are handling those requests.
After investigation, we confirmed that all handlers are created to handle requests from REST server and they are consuming more than 600 MB of memory.

We followed the diagram and noticed `go-amino` package is used to process requests while consuming about 358 MB of memory.

<p align="center">
<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-memprofile-3.png">
</p>

## What is go-amino package ?

[go-amino](https://github.com/tendermint/go-amino) implements Go bindings for the Amino encoding protocol which is an object encoding specification used by Tendermint.

There are issues at go-amino Github repo addressing huge memory usage when encoding and decoding, such as [Further investigate recursion depth and associated mem-consumption (#211)](https://github.com/tendermint/go-amino/issues/211) and [Investigate amino performance/mem usage (#254)](https://github.com/tendermint/go-amino/issues/254).

<p align="center">
<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-amino.png">

Source: [tendermint/go-amino](https://github.com/tendermint/go-amino/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+memory)
</p>

<br>
We are not sure but consider above issues are somewhat related to the cause of out-of-memory in Terra node, because the node is running out of memory during unmarshalling and decoding objects too.

<br>
<br>
Of course, there are more possible root causes of memory consumption including inefficient implementations as below.

- Some REST call itself may require huge memory
- Implementation of Some REST call may be inefficient
- decoding specification of amino may inherently require huge memory
- Implementation of go-amino may be inefficient
- etc.

## Let's handle levelDB directly instead of REST server

We, dsrv labs, exploit Rest server to implement some features of [Luna Whale](https://www.lunawhale.com).

However we encountered above memory consumption issue and concluded that REST server and REST requests can cause huge memory consumption which can crash a Terra node whereas should be live and reliable.

Therefore we are considering accessing levelDB of Terra blockchain directly instead of using REST server when developing services for Terra network.

If you plan to use or already make use of REST server for Terra nodes, please be aware of memory usage of nodes when handling REST requests. :)
