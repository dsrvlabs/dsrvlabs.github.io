---
title: "Bitcoin 블록체인에서 우리가 알 수 있는 것들은?"
date: 2019-09-10 14:11:08 +0900
categories: blog news
comments: true
---
## dsrv labs, 데이터 이야기 시리즈

1. [비트코인 매수는 Upbit 에서, 매도는 Bithumb 에서 팔아라](https://www.dsrvlabs.com/blog/news/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8_%ED%98%B8%EA%B0%80%EC%B0%A8%EC%9D%B4/)
2. [Bitcoin 블록체인에서 우리가 알 수 있는 것들은?](https://www.dsrvlabs.com/blog/news/looking_into_bitcoin_onchaindata/)

## 부제: Bitcoin 블록체인에서 얻을 수 있는 NVT Ratio 란?

## 1. Bitcoin on-chain data

안녕하세요 dsrv labs입니다.

블록체인의 대표적인 성공적인 use case로 여겨지는 Bitcoin은 현재 10년 넘게 쌓아온 방대한 on-chain data를 가지고 있습니다.
하지만 일반 대중들과 많은 블록체인 관련 종사자들은 블록체인에 저장되어 있는 on-chain data 보다는 거래소에서 거래되는 Bitcoin의 가격에 더욱 많은 관심을 가지고 있습니다.
현실적으로 Bitcoin의 가격은 현실에 기반한 모든 스테이크홀더들에게 매우 중요한 정보이긴 합니다.

> 그렇다면 Bitcoin에 저장된 데이터는 중요하지 않을까요?

Bitcoin의 블록체인에는 주로 Bitcoin의 거래 내역이 기록되어 있습니다.
이러한 거래 기록은 단순 기록일 뿐 의미가 없는 것일까요?

dsrv labs는 Bitcoin의 블록체인에 저장되어 있는 정보로부터 의미있는 정보를 찾을 수 있다고 생각하며, 의미있는 정보를 찾기 위한  위한 준비를 하고 있습니다.

그 첫 걸음으로 현재 널리 사용되고 있는 Bitcoin on-chain data에서 얻을 수 있는 정보들을 살펴보려고 합니다.

## 2. NVT Ratio
Bitcoin on-chain data로 계산할 수 있는 것 중에 대표적인 것이, NVT Ratio이 있습니다.

NVT Ratio란 *Network Value to Transaction Ratio*의 약자로, 특정 기간의 블록체인 네트워크의 총 가치와 이전된 가치의 비율입니다.

NVT Ratio가 소개된 아래의 [Forbes](https://www.forbes.com/sites/wwoo/2017/09/29/is-bitcoin-in-a-bubble-check-the-nvt-ratio/#29692dc66a23) 글에서 NVT Ratio를 되었을 때 기존 주식시장의 PER(Price-earnings ratio)과 유사한 지표로 소개되어 지금도 PER과 유사한 지표로 널리 여겨지고 있습니다.


<img alt="Is Bitcoin In A Bubble? Check The NVT Ratio" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-bitcoin_onchain-fig1.png" width="50%"> 
<Source: [Is Bitcoin In A Bubble? Check The NVT Ratio](https://www.forbes.com/sites/wwoo/2017/09/29/is-bitcoin-in-a-bubble-check-the-nvt-ratio/#70a5cb036a23)>

> 그런데 과연 NVT Ratio가 기존 PER과 유사한 방식으로 계산될까?

NVT Ratio가 계산되는 방식을 살펴보겠습니다.
NVT Ratio는 정의에 따라서 다음과 같은 방식으로 계산됩니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-eq-NVT1.png">

분모의 Network Value는 Bitcoin의 소위 Market Cap과 같은 것으로 아래와 같이 계산되고 있습니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-eq-NV.png">

그리고 분자의 값은 blockchain에 기록되어 있는 특정 날짜에 거래된 bitcoin의 USD 기준 가치를 뜻합니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-eq-bitcoin-transmitted.png">

위에서 정의된 `Network Value`와 `Daily USD volume transmitted through the blockchain`를 적용해보면 `NTV Ratio`는 아래와 같이 표현됩니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-eq-NVT2.png">

결과적으로 `NVT Ratio`는 아래와 같이 단순화 되어 매우 간단하게 표현되며, 가격과는 관련 없이 총 Bitcoin 공급량과 Bitcoin 거래량 만으로 계산될 수 있습니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-eq-NVT3.png">

이렇게 계산해놓고 보면 `NVT Ratio`는 기존 주식시장의 `PER`보다는 소위 거래량 회전율라고 불리우는 유동성 지표와 유사한 방식으로 계산되고 있습니다.

아래는 기존 증권시장에서 사용되는 소위 `Stock Market Turnover Ratio`라는 지표이며, `NVT Ratio`과 비교하였을 때 분모와 분자가 뒤바뀌었을 뿐 매우 유사하게 계산됨을 알 수 있습니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-eq-turnover.png">

참고로 `PER`은 아래와 같이 주식 가격과 회사의 주당 순이익으로 계산됩니다.

<img src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-eq-PER.png">

그러므로 `NVT Ratio`를 기존 증권 시장의 `PER`과 같은 투자 지표로 활용하더라도, 그 값의 본질은 유동성 지표라는 것을 기억하며 활용하는 것이 필요합니다.

## 3. NVT Ratio 는 객관적인 값일까?

NVT Ratio는 위와 같이 on-chain data로 부터 계산된다면 여러 업체에서 제공되는 NVT Ratio는 같은 값이어야 할 것입니다.

하지만 아쉽게도 아래와 같이 여러 업체에서 제공하는 `NVT Ratio`는 서로 다른 값을 보여주고 있습니다.
심지어 하나의 업체에서도 두 가지 이상의 `NVT Ratio`를 제공하는 경우도 있습니다.
아래는 Woobull과 Coinmetrics의 `NVT Ratio`만 표시한 차트이며 좌측의 Y축이 `NVT Ratio`입니다.

<img alt="NVT from woobull" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-nvt-woobull.png">

<img alt="NVT from coinmetrics" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-nvt-coinmetrics.png">

그리고 dsrv labs에서 수집한 on-chain data를 가지고 `NVT Ratio`를 계산해 보았더니 아래와 같은 차트가 나왔습니다.

<img alt="NVT from noncedata" src="https://raw.githubusercontent.com/dsrvlabs/dsrvlabs.github.io/master/posts_attachment/20190904-nvt-noncedata.png">

> 왜 이러한 차이가 발생한 것일까?

실제로 업체들이 제공하는 `NVT Ratio`에서는 여러가지 추정(estimation)이 들어가기 때문입니다. 
각 업체들은 noise라고 판단되는 거래 내역을 제거하는 등 실제 거래량의 의미를 왜곡할 수 있는 거래를 고려하여 더욱 의미있는 `NVT Ratio`를 계산하려는 노력을 기울이고 있습니다.

또한 차트를 제공할 때 daily 값이 아닌 이동 평균 값으로 제공하는 등 표현하는 방법도 다양합니다. 참고로 위에서 Woobull은 14일 평균 값으로 차트를 제공하였으며, coinmetrics와 dsrv labs의 경우는 일별 값으로 차트를 제공하고 있습니다.

그렇다보니 현재 여러 업체에서 제공하는 `NVT Ratio`는 on-chain data의 값만을 가지고 객관적으로 계산된 값이 아닌, 특정 기준에 의해서 조정(adjust)된 주관적인 값인 경우가 많습니다.

## 4. dsrv labs

지금까지 on-chain data로부터 계산할 수 있다고 알려진 `NVT Ratio`를 살펴보았습니다. 

살펴본 바와 같이 `NVT Ratio`는 `PER`처럼 활용될 수는 있지만, 계산되는 방법을 생각해보면 유동성 지표입니다. 그리고 여러 업체들에서 제공되는 `NVT Ratio`는 on-chain data 외에 주관이 개입되어 제공되고 있다는 점을 고려하여 활용하여야 할 듯합니다.

> dsrv labs는 현재 위와 같은 on-chain data로부터 의미있는 정보를 얻기 위하여 블록체인 데이터를 수집함과 동시에 분석을 진행하고 있습니다.
