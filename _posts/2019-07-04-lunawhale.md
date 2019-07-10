---
title: "[서비스 오픈] LunaWhale.com - 고래를 찾아서"
date: 2019-07-10 15:31:28 +0900
categories: blog news
comments: true
---

안녕하세요, dsrv labs 입니다.

저희 연구소의 첫번째 서비스 프로젝트이자,  Terra validator 로서의 첫번째 기여 프로젝트인 
LunaWhale.com 이 드디어 공개되었습니다.
(진행중인 프로젝트는 많지만, 외부 공개는 처음이네요)

코인데스크 코리아의 기사를 빌려 Terra 프로젝트를 간략하게 소개해보겠습니다.

> 테라를 이끌고 있는 사람은 국내 대표 쇼핑 애플리케이션인 티몬의 창업자 겸 의장인 신현성 공동 대표다. 신 대표는 국내 배달 앱 배달의민족과 함께 테라를 추진하고 있다.
> 이번 대규모 투자 유치로 주목을 받고 있는 테라는 스테이블코인 프로젝트다. 스테이블코인은 암호화폐를 기존 통화에 연동한 것으로, 가격 변동성을 조정해 암호화폐를 실물경제에서 안정적으로 사용할 수 있도록 고안됐다는 특징이 있다.
> 테라는 스테이블코인으로 티몬과 배달의민족 앱에서 암호화폐 결제를 구현하는 것을 목표로 하고 있다. [[원문링크]](https://www.coindeskkorea.com/%ED%8B%B0%EB%AA%AC-%EC%B0%BD%EC%97%85%EC%9E%90%EA%B0%80-%EC%9D%B4%EB%81%84%EB%8A%94-%ED%85%8C%EB%9D%BC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-360%EC%96%B5-%ED%88%AC%EC%9E%90-%EC%9C%A0%EC%B9%98/)

Luna Token은 Terra coin의 지분 토큰으로서 사용되고 있습니다. 
Terra는 stable코인이기 때문에, 투자자의 입장에서는 Luna의 가격이 가장 중요합니다.

LunaWhale은 Luna 투자자에게 도움을 주기 위한 서비스입니다. 
루나의 가격을 예측할수 있는 다양한 정보들을 제공하기 때문인데요. 화면을 보면서 이야기를 나누어보지요.

### Dashboard
![image](https://user-images.githubusercontent.com/21022937/60657096-a822b380-9e8b-11e9-857f-2a498dcef780.png)

대시보드의 첫화면에는 현재 루나의 가격정보와, 위임된 지분의 량, 유통량, 총 발행량등이 표시됩니다. 루나의 가격을 확인하기 위해서 거래소에 자주 로그인하셨다면, 이제 lunawhale.com에서 편하게 확인하시면 됩니다.
유용한 링크들도 계속 추가 중이니, 앞으로 많은 이용 바랄께요!

### 토큰의 움직임을 확인하세요
![image](https://user-images.githubusercontent.com/21022937/60657345-2a12dc80-9e8c-11e9-9e35-ea984bc56e0f.png)
2
또다른 대시보드의 자랑. 지분 위임 현황 그래프 입니다.
특히, 투자자분들에게 도움되는 화면입니다.
이러한 위임현황에 따라 아래의 그림처럼 달력에 Delegation/Undelegation 정보를 표시해 드립니다.
> Undelegation 은 21일 후 풀린다는 것을 계산해서 표시 합니다

그래프를 보면
- Delegation 수량이 압도적으로 많네요
  - Delegation 수량이 많아지면, 시장에 풀리는 매물이 줄어들어 가격 상승의 요인이 됩니다.
- 7월 25일에는 Undelegation 수량이 좀 있네요.
  - 150,000 Luna 니까 28억원 정도가 Undelegate 됩니다
  - 이 수량이 거래소로 유입되면 하락이 예상 됩니다.
    (Whale Tx 메뉴에서 거래소 유입을 확인 할 수 있습니다)


![image](https://user-images.githubusercontent.com/21022937/60657601-942b8180-9e8c-11e9-9de0-b979c000b1d3.png)

위 그림은 Undelegation 상황을 캘린더로 보여줍니다.
아무래도 투자자 분들은 Delegation 이벤트보다 Undelegation 이벤트가 중요하지요.

### Delegation 상세 현황
지분위임의 자세한 현황은 Staking/Unstaking 탭에서 확인하실수 있습니다.

![image](https://user-images.githubusercontent.com/21022937/60657767-d1900f00-9e8c-11e9-9a67-9b55340df75f.png)

### 거래량 확인은 Whale Transaction 탭에서
현재는 큰수량의 거래량만을 수집하고 있습니다.
차후 Address Tagging을 통해 더좋은 정보를 제공하기 위해 준비중입니다. 

![image](https://user-images.githubusercontent.com/21022937/60657875-043a0780-9e8d-11e9-8126-9ac3504fabc1.png)

### Telegram - Bot
이러한 정보를 더 편하게 받아보실수 있도록,
- 2개의 텔레그램 채널과
  - [LunaWhale - Whale Transactions](https://t.me/lunawhale)
    고래의 트랜잭션 알림
  - [LunaWhale - Validator](https://t.me/lunawhalevalidator)
    Validator의 Commission Rate 가 변경되면 알람을 줍니다. (모들 Validator 대상)
- 1개의 텔레그램 봇(Bot)을 준비 했습니다
  - [@LunaWhale_bot](https://t.me/@LunaWhale_bot)
    가격정보/Validator 알람을 받을 수 있습니다

![image](https://user-images.githubusercontent.com/21022937/60661020-fdfb5980-9e93-11e9-9f27-9148d59a946c.png)

### Delegate for us
> 이러한 정보를 개미 투자자분들은 알지 못하는 것이 아쉬웠습니다.

- 위임(Delegate)은 저희 "nonce - LunaWhale.com" 에게 해주세요
  - 지속적으로 개발해 나가는데 큰 힘이 됩니다
- Commission Rate 가 100%인 이유
  - 저희가 모든 수수료를 받아 Delegate 해주신 분들에게 나눠드리고 있습니다
  - 특히, 법인의 경우 세금처리 등의 어려움이 있어, 저희가 처리해서 보내드리려고 100%로 설정 했습니다
  - Top 10 Validator 중 최저 Commission Rate 로 산정됩니다
- [WelldoneStake.com](WelldoneStake.com)
  - 고래 분들을 위한 Staking 서비스를 제공합니다.

### dsrv labs 를 지켜봐 주세요
저희 dsrv labs는 블록체인 세상에 기술적 기준을 세우고자 시작 했습니다.
다양한 연구와 데이터를 다루고 있고, 첫번째 서비스로 [LunaWhale.com](LunaWhale.com)을 선보이게 되었습니다.

곧 오픈되는 유투브 영상과 서비스들로 찾아뵙겠습니다.
감사합니다.


