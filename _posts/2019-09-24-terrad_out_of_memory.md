---
title: "go-amino 패키지의 메모리 사용량 이슈"
date: 2019-09-24 17:00:00 +0900
categories: blog news
comments: true
---
# Cosmos, Terra, Tendermint의 go-amino 메모리 사용량 이슈

안녕하세요. dsrv labs입니다.

dsrv labs는 Terra Validator로 활동하고 있으며 Terra 관련 서비스인 [Luna Whale](https://www.lunawhale.com)을 운영하고 있습니다.
그리고 이를 위하여 Terra Valiadtor 노드를 포함하여 여러 Terra 노드를 운영하고 있습니다.

오늘은 Terra 관련 서비스를 제공할 때 활용될 수 있는 Terra의 Rest Server 관련된 이야기를 하려고 합니다.

## Cosmos와 Terra의 Rest Server

Cosmos SDK는 노드와 별개의 Process로 동작하는 [Rest Server](https://cosmos.network/docs/clients/service-providers.html#setting-up-the-rest-server)를 제공하고 있습니다. 

Rest Server는 외부의 요청을 받으면, RPC (Remote Procedure Call)을 이용하여 노드에게 요청을 보내 결과를 받아 외부에 돌려주는 역할을 담당하고 있습니다.
이렇게 구성되면 노드가 외부의 요청을 직접적으로 받지 않고 별도의 Process로 동작하는 Rest Server가 외부의 요청을 받도록하여 노드가 더욱 안정적으로 동작할 수 있는 장점이 있습니다.

그리고 Cosmos SDK를 이용하여 구현된 Terra도 `terracli`를 통하여 Rest Server를 [Light Client Daemon](https://docs.terra.money/guide/light-client)으로 제공하고 있습니다.

dsrv labs에서 제공하는 서비스 중 하나인 [Luna Whale](https://www.lunawhale.com/)의 일부 서비스는 Terra의 Rest Server를 활용하여 구현되어 있습니다.

## Rest Server는 살아있는데 노드가 죽었다? 

며칠 전 Luna Whale 서비스에서 이용하고 있던 Terra 노드가 아래와 같은 메모리 사용량을 보이면서 소위 OOM (out of memory)으로 의도하지 않게 종료되었습니다.

<img alt="Process resient memory of lunawhale node" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-lunawhale.png">

[Source: *dsrv labs monitoring system*]

<br>
Rest Server는 정상적으로 동작하고 있었으며, Terra 노드만 메모리 부족으로 crash 되었습니다. Rest Server는 살아있는데 더욱 안정적으로 동작해야하는 Terr 노드만 crash 되었기에 당황스러운 상황이었습니다.

## 메모리 사용량은 왜 늘었을까?

메모리 사용량이 단시간 내에 늘었으므로, 다음과 같은 가능한 원인들을 확인해보기로 하였습니다.

- Terra 블록체인 처리를 위하여 많은 메모리가 필요
- Memory leak
- REST 요청 처리에 많은 메모리가 필요

제일 먼저 Terra 블록체인 처리를 위하여 메모리가 늘었을 것으로 생각하고 확인해 보았습니다.

하지만 dsrv labs에서 운영중인 Terra Validator 노드에서 위 시간이 포함된 24시간 기록을 살펴보니, 아래와 같이 300 MB 이하의 메모리 사용량을 보여주고 있었습니다.

<img alt="Process resident memory of validator nodes" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-validator-normal.png">

[Source: *dsrv labs monitoring system*]

<br>
다음으로 memory leak이 있는지 빠르게 확인해 보았습니다. 확인 결과 memory leak으로 의심되는 상황은 있었지만 위와 같이 수백 MB의 큰 크기는 아니었습니다.

마지막으로 해당 노드를 다시 시작한 후 REST 요청를 수행하면서 노드가 다시 out-of-memory로 종료되는 상황을 재현해 보았습니다.

위 REST 요청을 진행함과 동시에 프로파일링을 병행하여 메모리 사용량을 확인해 보았으며, 그 결과 아래와 같은 프로파일링 결과를 얻어볼 수 있었습니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-memprofile-1.png">

## Rest call 이 많은 메모리를 사용하고 있다!

프로파일링 결과를 살펴보면 아래와 같이 노드의 HTTP handler가 600MB 이상의 메모리를 점유하고 있는 것을 확인할 수 있습니다.

<p align="center">
<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-memprofile-2.png">
</p>

Terra 노드는 HTTP를 이용하여 RPC 요청을 받아들이고 있으며, 위 HTTP handler들은 이렇게 들어온 RPC 요청을 처리하는 로직이었습니다.
확인 결과 HTTP handler들은 Rest Server에서 들어온 요청들을 처리하는 과정 중에 생성된 것들이었으며, 그 과정에서 600 MB 이상의 메모리를 사용됨을 확인하였습니다.

그리고 이 RPC 요청을 처리하는 과정을 따라가 보면 아래와 같이  `go-amino` 패키지에서 약 358MB의 메모리를 사용하고 있는 것을 확인 할 수 있었습니다.
<p align="center">
<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-memprofile-3.png">
</p>

## go-amino 패키지란?

[go-amino](https://github.com/tendermint/go-amino)은 Tendermint에서 사용하고 있는 object encoding specification인 Amino의 go 구현체 패키지입니다.

살펴보니 go-amino Github repo에서도 [Further investigate recursion depth and associated mem-consumption (#211)](https://github.com/tendermint/go-amino/issues/211)와 [Investigate amino performance/mem usage (#254)](https://github.com/tendermint/go-amino/issues/254) 같이 많은 메모리 사용량에 대한 issue가 있었습니다.

<p align="center">
<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190924-amino.png">

Source: [tendermint/go-amino](https://github.com/tendermint/go-amino/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+memory+)
</p>

<br>
위 이슈들은 decoding과 encoding 중 많은 메모리 사용량에 대하여 논의하고 있었습니다.

dsrv labs의 노드에서 발생한 out-of-memory 상황도 unmarshalling 과정 중 decode 시에 많은 메모리가 사용된 현상이기에 위 이슈와의 관련성이 있을 것으로 생각되었습니다.

그리그 그 외에도 아래와 같이 근본적인 문제부터 비효율적인 구현까지 여러가지 레벨에서 원인들이 있을 것 같습니다.

- 해당 Rest call이 많은 메모리를 필요로 하는 요청일 수 있다
- 해당 RPC 요청을 처리하는 구현이 많은 메모리를 필요로 할 수 있다
- amino의 해당 decoding specification이 많은 메모리를 필요로 할 수 있다
- go-amino의 구현이 많은 메모리를 필요로 할 수 있다
- 그 외 ?

## Rest server 대신 LevelDB에 직접 접근하자!

현재 dsrv labs는 현재 Terra 관련 서비스의 일부 기능에서 Rest server를 이용하고 있었습니다.

하지만 운영 중 위와 같이 많은 메모리를 사용하는 경우가 발생하여 안정적으로 동장해야하는 Terra 노드가 crash되는 상황이 발생하고 있었습니다.

이에 dsrv labs는 위와 같은 분석을 진행하였으며, 분석 결과 해당 요청이 많은 메모리를 요구할 수도 있거나 구현이 비효율 적일 수도 있을 것이라 생각되어, Rest server 외에 직접 LevelDB에 접근하여 정보를 얻어오는 방식을 추가적으로 구현하려고 합니다.

이 글을 읽으시는 독자분들도 Terra관련 서비스 구축 시 Rest server를 활용하고 있다면 메모리 사용량을 고려하면 좋을 것 같습니다.
