# WiPeer-FE

<div align="center"><img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/wipeer-logo.png" width="400px"> </div>
<br>
<div align="center"> WiPeer는 동일한 Wi-Fi 네트워크에 연결된 사용자들끼리 채팅할 수 있는 웹/앱 기반 애플리케이션입니다. </div>

<br>
<div align="center">  <a href="https://www.wipeer.site">Deployed website</a> |
  <a href="https://github.com/WiPeerhub/WiPeer-FE">Frontend Repository</a> |
  <a href="https://github.com/WiPeerhub/WiPeer-BE">Backend Repository</a> </div>

<br>
<br>
<br>

# 📖 목차

- [🔍 프리뷰](#-프리뷰)
- [⚒️ 기술 스택](#-기술-스택)
- [💥 동기](#-동기)
- [🎯 기능](#-기능)
  - [1. 채팅방 생성 및 공유](#1-채팅방-생성-및-공유)
  - [2. 채팅 편집 및 삭제 기능](#2-채팅-편집-및-삭제-기능)
  - [3. 파일 업로드 기능](#3-파일-업로드-기능)
  - [4. 채팅방 검색 기능](#4-채팅방-검색-기능)
- [💻 챌린지](#-챌린지)
  - [1. Wi-Fi를 기준으로 본 “같은 공간”의 정의](#1-wi-fi를-기준으로-본-같은-공간의-정의)
    - [1.1 서비스에 접속한 사람들을 Wi-Fi 단위로 연결하기](#11-서비스에-접속한-사람들을-wi-fi-단위로-연결하기)
    - [1.2 사용자 입장부터 채팅방 공유까지](#12-사용자-입장부터-채팅방-입장까지)
  - [2. WebRTC를 활용한 Latency 최적화](#2-webrtc를-활용한-latency-최적화)
    - [2.1 WebRTC Mesh 환경 구축](#21-webrtc-mesh-환경-구축)
    - [2.3 AWS ElastiCache for Redis를 이용한 브로드캐스트 중앙화](#23-aws-elasticache-for-redis를-이용한-브로드캐스트-중앙화)
    - [2.2 Redis Pub/Sub 기반 채팅 메시지 중계 시스템](#22-redis-pubsub-기반-채팅-메시지-중계-시스템)
  - [3. 채팅방 검색시 초성 검색 및 오타 허용](#3-채팅방-검색시-초성-검색-및-오타-허용)
    - [3.1 한글 유니코드 조합 규칙을 활용한 초성 검색](#31-한글-유니코드-조합-규칙을-활용한-초성-검색)
    - [3.2 levenshtein 알고리즘을 활용한 유사도 검사](#32-levenshtein-알고리즘을-활용한-유사도-검사)
- [🗓️ 기간](#️-기간)
- [📝 회고](#-회고)

<br>

# 🔍 프리뷰

## 💻 로그인 및 채팅방 목록 페이지 이동

<div align="center" style="height: 530px">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%A1%9C%EA%B7%B8%EC%9D%B8%26%EB%8B%89%EB%84%A4%EC%9E%84%EC%9E%85%EB%A0%A5.gif" width="520px" />
</div>
<br>

## 🧑‍💻 채팅방 생성 및 공유

<div align="center" style="height: 530px">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%B0%A9%EC%83%9D%EC%84%B1%EB%B0%8F%EA%B3%B5%EC%9C%A0.gif" width="520px" />
</div>
<br>
<br>

## 👨‍👩‍👧‍👧 채팅방 입장 및 실시간 채팅

<div align="center" style="height: 530px">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%B1%84%ED%8C%85%EB%B0%A9%EC%9E%85%EC%9E%A5%EB%B0%8F%EC%B1%84%ED%8C%85%EC%8B%9C%EC%9E%91.gif" width="520px" />
</div>
<br>
<br>

# ⚒️ 기술 스택

<div>
  <h3>Client</h3>
    <img src="https://img.shields.io/badge/javascript-ECDC5A?style=for-the-badge&logo=javascript&logoColor=black">
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/%20ZUSTAND-FF7B00?style=for-the-badge&logo=ZUSTAND%20EC2&logoColor=white">

  <br>

  <h3>Server</h3>
    <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/Express-676767?style=for-the-badge&logo=Express&logoColor=white"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/>
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white" />
    <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white" />
  <br>

  <h3>Deployment</h3>
    <img src="https://img.shields.io/badge/AMAZON%20EC2-FD911E?style=for-the-badge&logo=Amazon%20EC2&logoColor=white">
    <img src="https://img.shields.io/badge/AMAZON%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white">
    <img src="https://img.shields.io/badge/AMAZON%20ROUTE 53-456990?style=for-the-badge&logo=Amazon%20ROUTE53&logoColor=white">
    <img src="https://img.shields.io/badge/AMAZON%20CLOUDFRONT-8709AA?style=for-the-badge&logo=Amazon%20CLOUDFRONT&logoColor=white">
    <img src="https://img.shields.io/badge/terraform-844FBA?style=for-the-badge&logo=terraform&logoColor=white">
  <br>
</div>
  <br>

# 💥 동기

같은 공간에 있으면서도 서로 소통하기 어려운 상황은 자주 발생합니다.

예를 들어, 카페에서 에어컨이 너무 추워 불편함을 느끼지만 직원이나 다른 손님에게 말하기 어려웠던 경험, 강의실에서 발표자의 발표 자료를 자유롭게 공유 받고 질문하고 싶지만 중간에 말을 끊기 망설여졌던 순간, 혹은 도서관 같은 공공 장소에서 스터디를 결성하거나 시설의 결함을 발견하였지만 이를 곧바로 주변 사람들이나 시설 관계자에게 알리기 어려웠던 경험 등이 있습니다.

이 프로젝트는 같은 Wi-Fi 네트워크에 연결되어 있다는 공간적 특성을 바탕으로, 복잡한 절차 없이 같은 공간에 있는 사람들끼리 자유롭게 소통할 수 있는 채널을 제공합니다.
사람들 사이의 물리적 거리는 가깝지만 소통은 단절된 상황에서, 부담 없는 연결을 통해 공간 속의 단절을 해소하고자 하는 고민에서 출발한 이 프로젝트는 "같은 공간에 있는 사람들 간의 소통의 어려움"이라는 문제를 해결하고자 기획되었습니다.

<br>

# 🎯 기능

## 1. 채팅방 생성 및 공유

<div align="center" style="height: 530px">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%82%B4+%EC%B1%84%ED%8C%85%EB%B0%A9+2.png" style="object-fit: cover"/>
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%B1%84%ED%8C%85%EB%B0%A9%EB%AA%A9%EB%A1%9D.jpg"  width="300px"
 style="object-fit: cover"/>
</div>

- 사용자는 "내 채팅방" 페이지에서 + 버튼을 클릭 후 자유롭게 채팅방 생성이 가능합니다.
  - 채팅방 생성시 방에 대한 설명과 공개방, 비공개방 여부를 선택하여 비공개 방일 경우 비밀번호 설정이 가능합니다.

- 채팅방 생성 완료 후, 공유 버튼을 누르면 해당 채팅방이 "채팅방 목록"에 표시되어 같은 Wi-Fi를 사용하는 사용자들이 채팅방에 참여할 수 있게 됩니다.
  - 공유 버튼을 누른 시점에 사용자가 사용 중인 Wi-Fi의 공인 IP를 기준으로 채팅방들이 같은 네트워크 단위로 분류되며, 동일한 Wi-Fi를 사용하는 사용자들에게만 해당 방이 보이게 됩니다.

## 2. 채팅 편집 및 삭제 기능

<div align="center" style="height: 530px">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%A9%94%EC%8B%9C%EC%A7%80%ED%8E%B8%EC%A7%91%EC%82%AD%EC%A0%9C.jpg" width="300px" height="530px" style="object-fit: cover"/>
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%A9%94%EC%8B%9C%EC%A7%80%ED%8E%B8%EC%A7%91.jpg" width="300px" height="530px" style="object-fit: cover" />
</div>

- 사용자는 채팅란에 마우스를 hover한 이후 오른쪽 상단의 옵션 메뉴를 선택하면 자신이 작성한 채팅을 편집하고 삭제할 수 있습니다.
  - 편집을 누르면 입력 입력창으로 해당 채팅 내용이 복사되며, 사용자는 내용을 수정한 뒤 다시 전송할 수 있습니다.
  - 사용자는 회원가입시 부여받은 자신만의 회원 ID를 갖게되며, 이 ID 검증을 통해 자신이 작성한 채팅의 편집과 삭제 권한을 갖게됩니다.

## 3. 파일 업로드 기능

<div align="center" style="height: 530px">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%82%AC%EC%A7%84+%EC%97%85%EB%A1%9C%EB%93%9C.jpg"
  width="304px"
  style="object-fit: cover"/>
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%82%AC%EC%A7%84+%EC%97%85%EB%A1%9C%EB%93%9C+%EA%B2%B0%EA%B3%BC+1.jpg" width="305px" style="object-fit: cover"/>
</div>

- 사용자는 채팅 입력창 아래의 파일 업로드 버튼을 통해 파일을 첨부할 수 있습니다.
- 업로드 가능한 파일 형식은 다음과 같습니다
  - image/\*, .pdf, .doc, .docx, .txt, .zip, .rar
  - 이미지 파일은 채팅방 내에서 미리보기가 제공되며, 그 외 파일은 다운로드 버튼을 통해 로컬 환경에 저장하고 열람이 가능합니다.
- 업로드된 파일은 Amazon S3에 저장되며, 채팅 메시지와 함께 실시간으로 공유됩니다.
- 사용자가 해당 메시지를 삭제하면, S3에 저장된 파일도 함께 자동 삭제되어 저장 공간을 효율적으로 관리할 수 있으며, 이에 따라 불필요한 저장 비용 발생도 방지할 수 있습니다.

## 4. 채팅방 검색 기능

<div align="center" style="height: 530px">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%B4%88%EC%84%B1%EA%B2%80%EC%83%89.jpg" width="300px" height="530px" style="object-fit: cover" />
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%98%A4%ED%83%80%EA%B2%80%EC%83%89.jpg" width="300px" height="530px" style="object-fit: cover" />
</div>
<br>

- 사용자는 채팅방 목록에서 검색어를 입력하면 원하는 채팅방을 찾을 수 있습니다.
- 검색어를 기준으로 채팅방 제목과 설명의 유사도를 측정하여 검색되도록 하였습니다
  - Levenshtein 알고리즘을 활용해 철자 오타나 입력 실수가 있어도 유사도가 높은 채팅방이 검색 결과에 포함되도록 구현하였습니다.
  - 한글 초성 검색 기능을 도입하여 초성만 입력해도 해당 초성을 포함하는 채팅방을 쉽게 찾아볼 수 있도록 하였습니다.

# 💻 챌린지

## 1. Wi-Fi를 기준으로 본 “같은 공간”의 정의

물리적인 공간에서 "같은 장소에 있다"는 것은 보통 같은 건물, 같은 층, 혹은 같은 실내 공간 등을 의미합니다.
하지만 온라인 환경에서 사람들이 “같은 공간에 있다”는 것을 어떻게 정의할 수 있을까요?

저는 이 개념을 네트워크의 특성에 착안하여 바라보게되었습니다. 사람들은 동일한 Wi-Fi 네트워크에 접속하면 하나의 공인 IP를 공유하게됩니다. 그리고 동일한 Wi-Fi를 사용한다는 점은 높은 확률로 같은 물리적 공간에 함께 있다는 것을 의미하며, 같은 출입구(공인 IP)를 통해 인터넷에 연결되었다는 의미가 됩니다.

저는 이 지점에서 "같은 공간에 있는 사용자들"을 "같은 공인 IP를 가진 사용자들"로 정의하여 소통 환경을 만들어 볼 수 있지 않을까 생각하였습니다.

### 1.1 서비스에 접속한 사람들을 Wi-Fi 단위로 연결하기

처음에는 브라우저 단에서 사용자의 공인 IP를 직접 추출하여, 같은 Wi-Fi 네트워크에 연결된 사용자들을 그룹핑하는 방식으로 진행하고자 했습니다. 브라우저에서 추출한 공인 IP만으로도 네트워크 기반의 사용자 연결이 가능할 것이라 판단했습니다.

하지만, 브라우저 환경에서 공인 IP를 직접 확인하는 것은 기술적으로 불가능하다는 것을 알게 되었습니다. 브라우저에서는 보안상의 이유로 사용자의 네트워크 정보를 보호하고 있었고, 공인 IP나 NAT(공유기) 정보에 접근하는 방법이 제공되지 않았습니다.

결과적으로, 브라우저만으로는 더 이상 공인 IP를 얻는 것이 불가능하다는 결론에 도달 했고, 사용자의 네트워크 정보를 안정적으로 식별하려면, 클라이언트 측이 아닌 서버 측에서 요청 정보를 기반으로 공인 IP를 추출하는 방식이 더 적절하다고 판단하게 되었습니다.
HTTP 요청이 서버에 도달할 때 포함되는 네트워크 메타데이터를 활용하면, 비교적 신뢰할 수 있는 방식으로 사용자의 공인 IP를 파악할 수 있기 때문입니다.

이러한 판단에 따라, 서버 측에서 안정적으로 클라이언트의 공인 IP를 식별할 수 있는 환경을 구축하고자 추후 배포를 염두에 두고 AWS EC2 인스턴스를 생성하였습니다. 또한, HTTP 요청에 대한 트래픽은 모두 백엔드가 사용 중인 포트로 맵핑시키기 위해 Nginx 프록시를 도입하였습니다. 이를 통해 클라이언트 측 API 요청 URL을 단순화할 수 있었습니다.

```
// 기존 API 요청 URL
api.xxx.xxx:{백엔드 포트}

// Nginx 프록시 설정 후
api.xxx.xxx
```

다만, 이렇게 프록시를 구성하면 클라이언트의 원본 IP가 직접적으로 서버에 전달되지 않고, 프록시 서버의 IP가 대신 전달되는 문제가 발생합니다.
이로 인해 백엔드 서버에서는 실제 사용자의 공인 IP를 알기 어렵게 되고, 이는 사용자 식별이나 네트워크 그룹핑 등에서 정확한 정보를 얻는 얻는 데 문제가 될 수 있습니다.

그래서 Nginx는 클라이언트의 원본 IP 정보를 `X-Forwarded-For` 헤더에 담아 백엔드 서버로 전달하도록 설정하는데, 이 헤더를 활용하여 백엔드가 프록시를 거친 요청에서도 실제 클라이언트 IP를 파악할 수 있었습니다.

```
server {
    listen       80;
    listen       [::]:80;
    server_name  _;

    location / {
        # 기타 설정 생략
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for; // XFF 헤더 설정 부분
    }
}
```

### 1.2 사용자 입장부터 채팅방 입장까지

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/wipeer+%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%88%9C%EC%84%9C.png" />
</div>

사용자가 입장하는 시점부터 채팅방을 만들고 공유하기 까지의 과정은 위와 같습니다.

1. 사용자 입장(로그인)
   - 사용자가 Google OAuth를 통해 로그인을 시도하면 사용자의 정보(email, usnername, 고유 Id 등)를 MongoDB에 저장합니다.

2. 익명 닉네임 입력
   - 사용자가 서비스에서 사용할 익명 닉네임을 입력하는 단계로, 해당 닉네임은 localStorage에 저장하여 채팅에 참여할 때 WebRTC DataChannel을 통해 상대방에게 전달됩니다. 또한 백엔드에서는 해당 닉네임을 Redis에 저장하여 채팅 기록 상의 발신자 이름으로 기록합니다.

3. Wi-Fi에 따른 사용자 그룹핑
   - 사용자가 서비스에 입장하여 채팅방 목록 페이지로 이동하면 저의 백엔드 서버(Amazon EC2)로 IP 추출을 위한 API 요청을 수행하고, 사용자의 공인 IP 주소를 추출하여 클라이언트에 전달합니다. 이를 통해 같은 Wi-Fi 네트워크(즉, 같은 공인 IP)를 사용하는 사용자들끼리는 자동으로 채팅방을 공유하거나 참여할 수 있도록 그룹핑이 이루어집니다.

4. 채팅방 목록 보여주기
   - 클라이언트는 로그인 후, 공인 IP를 기준으로 그룹핑된 채팅방 목록을 백엔드 API를 통해 요청합니다.
   - 서버는 Redis에 저장된 채팅방 중, 해당 IP와 일치하는 방들을 조회해 클라이언트에 전달합니다.
   - 이를 통해 사용자는 동일한 네트워크 환경 내의 사용자들과 공유되는 채팅방 목록을 확인하고 참여할 수 있습니다.

5. 채팅방 입장 및 WebRTC 연결
   - 사용자가 특정 채팅방에 입장하면, 클라이언트는 WebRTC 시그널링을 통해 방 내 다른 사용자들과 직접 연결을 시도합니다.
   - 초기 연결 과정에서는 WebSocket을 활용하여 ICE candidate, offer/answer 등 시그널 데이터를 주고 받고, 연결이 성립되면 Peer-to-Peer(DataChannel)를 통해 메시지를 실시간을 주고 받습니다.
   - 이 과정에서 사용자의 익명 닉네임도 함께 전송되어, 상대방은 송신자의 닉네임을 확인할 수 있습니다.

## 2. Latency 최소화를 위한 WebRTC Datachannel 구축

채팅 서비스를 기획하면서 처음에는 "실시간 메시지"라고 하면 당연히 socket.io를 사용하는 것이 최선이라고 생각했습니다.

하지만 아이디어를 구체화하는 과정에서, WebSocket은 모든 메시지가 중간 서버를 반드시 경유하기 때문에, 사용자 간의 소통이 많아질수록 서버에 부하가 쌓이고 그로 인해 지연(latency)이 발생할 수 있다는 점이 고민되었습니다.
이러한 문제를 최소화할 수 있는 다른 방법이 없을까를 고민하던 중, 서버를 거치지 않고 클라이언트 간 직접 통신이 가능한 P2P(Peer-to-Peer) 방식인 WebRTC를 알게 되었습니다.

특히 저는 단순한 채팅뿐만 아니라 무거운 파일 전송이나 화면 공유 등으로 기능이 자연스럽게 확장되는 구조를 염두에 두고 있었기 때문에, 중간 서버를 경유하지 않는 WebRTC의 도입이 더욱 적합하다는 판단이 들었습니다.

### 2.1 WebRTC Mesh 환경 구축

WebRTC는 Peer-to-Peer(P2P) 연결 방식을 기반으로 하며, 사용자 간의 1:1 연결이 필요합니다. 따라서 3명 이상의 사용자들이 같은 채팅방에 입장하면 Mesh 형태의 Network 구조가 필요하였습니다.

<div align="center"><img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/WebRTCMesh.png" width="600px"> </div>

만일 사용자 A, B가 채팅방에 입장하면 A <-> B의 P2P가 생성됩니다. 그리고 중간에 C가 채팅방에 입장하면 C는 A와 B 모두에게 연결을 시도해야하고 A, B 역시도 C와 연결을 추가로 시도해야합니다. 이러한 방식으로 참여자가 한명 더 채팅방에 입장하면 이 사용자 역시도 다른 사용자들과 연결을 진행하며 결과적으로 위와 같은 Mesh 구조가 완성됩니다.

그리고 이러한 Mesh 연결 구조를 구현하기 위해서는 초기 연결에서 WebSocket을 통해 사용자 간의 인증 및 signaling 과정이 선행되어야 합니다. WebRTC 자체는 인증이나 사용자 식별 기능을 제공하지 않기 때문에, 각 사용자를 구분하고 안전하게 연결을 설정하려면 별도의 signaling 서버를 구축하고 WebSocket을 통해 인증 및 연결 정보를 교환하는 signaling이라는 절차가 필요했습니다.

저는 이런 signaling 연결을 위해 클라이언트 단에서 socket.io를 활용한 커스텀 훅을 생성하고 RTCPeerConnection 객체를 사용하여 다음과 같은 과정을 구현하였습니다.

1. 사용자 입장 시 signanl 서버에 socket ID 정보 전달 <br>

   Mesh 연결을 구성하려면, 사용자가 채팅방에 입장했을 때 WebSocket을 통해 socket ID 정보를 signaling 서버로 전달하여 서로를 식별할 수 있도록 해야합니다.

   ```javascript
   // 클라이언트
   socket.on("connect", () => {
     console.log("Socket connected", socket.id);
     socket.emit("join-room", roomId);
   });
   ```

   signaling 서버는 이 socket ID를 기준으로, 누가 어떤 방에 들어왔고 누구와 연결해야 하는지 관리합니다.

2. 기존 참여자 목록 수신 및 연결 요청 시작
   Signaling 서버는 새로운 사용자가 채팅방에 입장하면, 해당 사용자에게 현재 방에 참여 중인 다른 사용자들의 정보를 전달합니다. 이를 바탕으로 새로 입장한 사용자는 각 기존 참여자들과 RTCPeerConnection을 생성하고 offer를 전달합니다.

```javascript
// signaling 서버
socket.on("join-room", async (roomId) => {
  socket.join(roomId);

  const clientsInRoom = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
  const otherUsers = clientsInRoom.filter((id) => id !== socket.id);

  socket.emit("all-users", otherUsers); // 기존 사용자 목록 전달

  const history = await getMessages(roomId); // 채팅 기록 전달
  socket.emit("chat-history", history);

  socket.to(roomId).emit("user-joined", socket.id); // 다른 사용자에게 새 사용자 알림
});
```

3. Offer/Answer 및 ICE Candidate 교환
   각 사용자는 WebSocket을 통해 offer, answer, ICE candidate와 같은 signaling 메시지를 교환합니다.
   이 과정을 통해 각 사용자 간에 NAT 환경을 통과할 수 있도록 최적의 경로를 찾아 P2P 연결을 성립시킵니다.

4. 연결 성립 후 DataChannel 생성
   RTCPeerConnection이 완료되면, DataChannel을 통해 실시간 메시지를 주고받을 수 있는 통로가 열립니다. 이후의 메시지는 WebSocket을 거치지 않고 P2P 방식으로 바로 전달됩니다.

### 2.2 Redis Pub/Sub 기반 채팅 메시지 중계 시스템

기존에는 하나의 EC2 인스턴스를 WAS 서버로 사용하여 WebRTC signaling 처리와 Redis 오픈 소스를 함께 운영하며 채팅 메시지의 저장과 중계를 처리했습니다. 하지만, 서버를 수평 확장하거나 로드밸런서를 도입할 경우 다음과 같은 문제가 발생했습니다.

- 같은 방에 참여한 사용자들이 서로 다른 서버에 접속 시 메시지 동기화 불가
- 채팅 메시지 중계 및 상태가 서버 인스턴스마다 달라짐
- WebRTC 시그널링 정보가 서버 간 공유되지 않아 연결 오류 발생

이 문제를 해결하기 위해 Redis의 Pub/Sub 구조를 도입하였습니다. Pub/Sub(Publish/Subscribe) 구조는 발행자(Publisher)가 특정 채널에 메시지를 발행하면, 해당 채널을 구독한(Subscriber) 모든 수신자에게 메시지를 비동기적으로 전달하는 방식입니다. 이를 기반으로 "발행-저장-중계" 패턴을 설계하여, 메시지가 수신되면 먼저 Redis에 영속적으로 저장하고 동시에 Pub 채널을 통해 구독 중인 다른 서버 인스턴스들에 실시간으로 전파하도록 구현했습니다.

과정은 다음과 같습니다.

- 사용자가 채팅 데이터를 전송하면 Redis에 저장(RPUSH)
- 동시에 같은 데이터를 publish(chat:{roomId})
- 구독 중인 서버 인스턴스들에서 emit("new-message")로 동일하게 브로드캐스트

이를 통해 단순 중계 방식에서 발생할 수 있는 메시지 유실을 방지하고, 확장성 있고 안정적인 메시징 구조를 확보할 수 있었습니다.

하지만 여기에는 한 가지 구조적 한계가 존재했습니다.
Pub/Sub 구조 자체는 유효했지만, Redis 인스턴스를 EC2 내부에 설치해 운용하는 방식이었기 때문에 EC2 마다 저장하는 채팅 데이터가 달라진다는 문제점이 있었습니다.

### 2.3 AWS ElastiCache for Redis를 이용한 브로드캐스트 중앙화

이런 구조적 한계를 극복하고자, Redis를 EC2 내에서 자체 운용하는 대신 AWS ElastiCache for Redis를 도입하여 브로드캐스트의 중앙 집중화를 구현했습니다.
모든 WAS 인스턴스가 하나의 Redis 클러스터에 연결되어 메시지를 발행(Publish)하고 구독(Subscribe)하게 함으로써, 서버 간의 채팅 데이터 불일치 문제를 근본적으로 해결할 수 있었습니다.

<div align="center"><img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/backend-architecture.png" width="500px"> </div>

위 사진과 같이 인프라를 구성함으로써, 한 인스턴스에서 채팅 메시지를 발행하면 Redis Pub/Sub 채널을 통해 해당 메시지가 모든 인스턴스에 실시간으로 전파되어 사용자 간의 실시간 메시지 브로드캐스트가 안정적으로 이루어집니다.
또한, 모든 WAS 인스턴스가 동일한 Redis 클러스터에 채팅 데이터를 저장하게 됨으로써, 나중에 사용자가 다시 채팅방에 입장하더라도 어느 서버에 연결되었는지와 관계없이 동일한 채팅 기록을 불러올 수 있게 되었고, 서버 간 데이터 불일치 문제 역시 해소되었습니다.

<구성 요소 설명>

| 구성 요소                           | 설정                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **ALB (Application Load Balancer)** | HTTPS/HTTP 리스너 그룹 설정(443, 80 포트), Target Group의 포트 4000로 트래픽을 라우팅                    |
| **WAS1 / WAS2 (EC2)**               | Express 기반 Node.js 백엔드 서버로 각각 WebSocket 및 REST API를 처리하였으며, 기존 Redis 서버로도 운용됨 |
| **Target Group**                    | ALB가 연결할 수 있는 대상 EC2 인스턴스 그룹으로 WAS 서버가 포함                                          |
| **ElastiCache for Redis**           | Redis의 중앙 브로커 역할을 하며, Pub/Sub 메시지 발행 및 구독을 모든 WAS 인스턴스에서 처리                |

## 3. 채팅방 검색시 초성 검색 및 오타 허용

사용자가 채팅방 목록에서 특정 방을 검색할 때, 단순 문자열의 일치 여부만으로는 원하는 방을 찾기 어려울 수 있다고 생각하였습니다.
예를 들어, 사용자는 "와이피어"라는 방을 찾고 싶은데, 방을 생성한 사용자는 실수로 "와이포어"라고 방을 생성했을 수도 있습니다.
또한, "와이피어"라는 단어 자체를 전부 검색하기 보다는 "ㅇㅇㅍㅇ" 초성 만으로 간단하게 검색하고 싶을 수도 있습니다.
이러한 사용자의 다양한 검색 시도들을 "한글 초성 분리 기반의 검색"과 "오타를 허용하는 유사도 검사"를 적용하여 포용하면, 더욱더 사용자 경험을 향상시킬 수 있겠다고 생각하였습니다.

### 3.1 한글 유니코드 조합 규칙을 활용한 초성 검색

<한글 초성 index 추출> <br>

초성 검색을 위해서는 채팅방의 제목을 한글자씩 각 초성을 추출할 필요가 있었습니다.

유니코드는 컴퓨터가 문자를 이해하고 처리할 수 있도록 각 문자에 고유한 숫자를 부여하는 산업 표준입니다.
한글은 초성(19자) x 중성(21자) x 종성(28자)의 조합으로 구성되며, 유니코드 상에서 완성형 한글 "가"(U+AC00)를 시작으로, 총 11,172의 조합이 존재합니다.

즉, 하나의 글자는 총 19 × 21 × 28 = 11,172개의 조합 중 하나입니다.

```
 한글 유니코드 = 0xAC00 + (초성_index × 21 × 28) + (중성_index × 28) + 종성_index
```

위 한글 유니코드 계산 방식을 활용하면 "초성\_index"를 구할 수 있었습니다.

```
초성_index = (한글 유니코드 - 0xAC00)/(21 x 28) - (중성_index x 28) - 종성_index
```

위 공식에서 (중성\_index x 28), 종성\_index는 결국 초성 index를 구하는 상황에서는 불필요한 offset이므로 결과적으로 아래와 같은 공식이 만들어졌습니다.

```
초성_index = Math.floor((한글 유니코드 - 0xAC00)/588)
```

예를 들어 "나"의 유니코드는 U+B098이며 10진수로 변환시 45208이라는 숫자가 나옵니다.
위 공식에 대입하면 "나"의 초성 index는 Math.floor((45208 - 44032)/588)이 되고, 결과적으로 2라는 값이 나옵니다.

초성 추출 공식을 자바스크립트로 구현하면 아래와 같습니다.

```javascript
function getInitials(roomTitle) {
  return Array.from(roomTitle)
    .map((char) => {
      const code = char.charCodeAt(0) - 0xac00;
      if (code >= 0 && code <= 11171) {
        const initialIndex = Math.floor(code / (21 * 28)); // 초성 추출
        return INITIALS[initialIndex];
      }
      return char;
    })
    .join("");
}
```

<방의 제목과 설명이 초성을 포함하고 있는지 검사하기> <br>

앞에서의 방식대로 한글의 초성을 추출했다면 이제 해당 초성들을 포함하고 있는 방을 필터링해야합니다.
저는 자바스크립트의 filter함수와 includes 함수를 사용해서 사용자가 입력한 초성을 포함하고 있는 채팅방을 필터링 하였습니다.

```javascript
function searchRooms(rooms, searchValue) {
  if (!searchValue) return rooms;

  const searchValueInitials = getInitials(searchValue);

  return rooms.filter((room) => {
    const title = room.title || "";
    const titleInitials = getInitials(title);

    if (/^[ㄱ-ㅎ]+$/.test(searchValue)) {
      return titleInitials.includes(searchValueInitials);
    }
  });
}
```

### 3.2 Levenshtein 알고리즘을 활용한 유사도 검사

<초성만으로는 부족했던 검색 정확도 문제><br>

앞서 구현한 초성 추출 기능은 한글 검색을 보다 빠르고 직관적으로 만들 수 있도록 도와주었습니다. 하지만 단순히 초성을 포함하고 있는지만 비교하는 방식으로는 검색 정확도에 한계가 있었습니다.

예를들어, 사용자가 "ㅇㅇㅍㅅㅇ"로 검색했지만 실제 채팅방 이름은 "와이피어"라 초성은 "ㅇㅇㅍㅇ"인 경우, 이 둘은 초성이 일치하지 않아 검색 결과에서 누락되는 문제가 발생합니다. 단 하나의 초성이 잘못 입력되었더라도 결과가 완전히 배제되기 때문에, 사용자 입장에서는 오타 하나로 원하는 채팅방을 찾기 어려울 수 있다는 문제가 발생합니다.

<문자열의 유사도를 고려한 보완 방식 도입><br>

이러한 문제를 해결하기 위해 저는 문자열 간의 유사도를 정량적으로 계산할 수 있는 Levenshtein 거리 알고리즘을 도입하였습니다. 이 알고리즘은 두 문자열이 얼마나 유사한지를 편집 거리(삽입, 삭제, 교체의 최소 횟수)로 계산하며, 이를 바탕으로 유사도를 수치로 나타낼 수 있습니다.

예를 들어, "ㅇㅁㅇㅍㅅㅇ"가 "ㅇㅇㅍㅇㅊ"에 유사해지기 위해서는 "ㅁ"과 "ㅅ"이 제거되어야하고, "ㅊ"은 삽입되어야 합니다. 이때 총 두번의 삭제와 한번의 삽입이 필요하므로 Levenshtein 편집 거리는 3이됩니다.

<Levenshtein 알고리즘을 통한 유사도 검사>

```javascript
function levenshtein(roomTitleInitials, searchValue) {
  const matrix = Array.from({ length: roomTitleInitials.length + 1 }, () => Array(searchValue.length + 1).fill(0));

  for (let i = 0; i <= roomTitleInitials.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= searchValue.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= roomTitleInitials.length; i++) {
    for (let j = 1; j <= searchValue.length; j++) {
      const cost = roomTitleInitials[i - 1] === searchValue[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }

  return matrix[roomTitleInitials.length][searchValue.length];
}
```

위 코드는 levenshtein 알고리즘 코드입니다. 편집 거리 계산 과정은 아래와 같습니다.

1. 초기 상태

- roomTitleInitials 길이: 6 (ㅇ, ㅁ, ㅇ, ㅍ, ㅅ, ㅇ)
- searchValue 길이: 5 (ㅇ, ㅇ, ㅍ, ㅇ, ㅊ)

matrix는 (6+1)x(5+1) 크기(7x6) 2차원 배열로 초기화됩니다.

첫 번째 행(0번째 행)은 B의 부분 문자열을 빈 문자열로 바꾸기 위해 필요한 삽입 횟수로 채워집니다: 0,1,2,3,4,5 <br>
첫 번째 열(0번째 열)은 A의 부분 문자열을 빈 문자열로 바꾸기 위해 필요한 삭제 횟수로 채워집니다: 0,1,2,3,4,5,6

2. 편집 작업 탐색

문자 하나씩 비교하면서 삽입, 삭제, 교체 중 최소 비용을 선택합니다.

| i (A) | j (B) | A[i-1] | B[j-1] | 비용(cost) | 가능한 편집                                                   | 최소 편집값 계산     |
| ----- | ----- | ------ | ------ | ---------- | ------------------------------------------------------------- | -------------------- |
| 1     | 1     | ㅇ     | ㅇ     | 0          | 대각선 유지                                                   | matrix[0][0] + 0 = 0 |
| 2     | 1     | ㅁ     | ㅇ     | 1          | 삭제(이전행)+1, 삽입(이전열)+1, 교체(대각선)+1 중 최소값 선택 | 등등 계산 진행       |

3. 실제 필요한 편집 작업

- ㅁ 삭제 (A에서 제거)
- ㅅ 삭제 (A에서 제거)
- ㅊ 삽입 (B에 추가)
  총 3번의 편집 작업 (삭제 2회, 삽입 1회)

4. 최종 결과

- matrix[6][5] 위치에 이 최소 편집 횟수 3이 저장되고 함수가 이 값을 반환합니다.

5. 편집 거리의 정규화와 유사도 값 추츨

- 편집 거리는 절대적인 수치이기 때문에, 두 문자열이 유사하다는 것을 보다 객관적이고 일관된 기준으로 비교하려면 이를 상대적인 수치로 변환할 필요가 있었습니다.
  따라서, 저는 이 상대적인 수치를 0에서 1 사이의 값으로 정규화하여 유사도를 계산했습니다.

```javascript
function similarity(str) {
  if (!a.length && !b.length) return 1;

  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);

  return 1 - distance / maxLen;
}
```

위 함수는 두 문자열 사이의 Levenshtein 편집 거리를 계산한 뒤, 이를 두 문자열 중 더 긴 쪽의 길이로 나누어 정규화함으로써,
1에 가까울수록 유사하고 0에 가까울수록 다름을 나타내는 유사도 값을 추출합니다.
이렇게 정규화된 유사도는 서로 다른 길이의 문자열 간에도 공정하게 비교할 수 있었습니다.
<br>

# 🗓️ 기간

- 프로젝트 기간: 2025 6월 26일 ~ 7월 17일
- 1주차
  - 아이디어 수집, 선정
  - 기술 스택 결정 및 검증
  - 칸반 작성
  - React 및 Node.js/Express 환경 세팅
  - 채팅방 목록, 채팅방 UI 구현

- 2주차
  - RESTful API 설계
  - Redis를 통한 채팅방, 채팅 데이터 저장 로직 구현
  - Socket.io 연동
  - WebRTC 시그널링 처리 및 DataChannel 구현
  - STUN/TURN 백업 서버 구축

- 3주차
  - Wi-Fi 변경에 대한 알람 기능 구현
  - 채팅 메시지 편집, 삭제 기능 구현
  - 채팅방 검색 기능 구현
  - 파일 전송 기능 구현
  - 모바일 대응

- 4주차
  - AWS, Terraform을 활용한 서비스 배포
  - README 작성
    <br>

# 📝 회고

## 사용자 경험 중심의 지속적인 제품 개선의 중요성

서비스를 구현하고 나면 끝일 줄 알았지만, 실제 사용자의 입장에서 다시 바라보니 시작에 가까웠습니다. 처음에는 작동만 잘 되면 된다고 생각했지만, 정작 중요한 건 사용자가 어떻게 느끼고 사용하는지였습니다.
채팅방을 공유했는데 안 보인다거나, 검색이 잘 안 된다거나, 모바일 환경에서 버튼이 눌리지 않는 사소한 문제들이 사용자에게는 가장 큰 불편으로 다가왔습니다.
그래서 저는 사용자 경험을 방해하는 요소부터 우선순위를 두고 수정해나갔습니다. 주변 동료들로부터 피드백을 받으면 최대한 빠르게 반영하고, 반복 테스트를 통해 경험의 흐름을 부드럽게 다듬었습니다.
서비스의 완성도는 결국 사용자의 만족도로 결정된다는 점을 이번 프로젝트를 통해 다시금 느꼈습니다.

## 능동적이고 창의적인 문제 해결의 즐거움

처음부터 정답이 있는 문제는 없었습니다. WebSocket과 WebRTC 중 어떤 구조가 더 효율적일지, 초성 검색과 오타 허용을 어떤 방식으로 결합할지, Redis와 S3를 어떤 기준으로 연동할지 등 많은 결정들이 필요했습니다.
저는 매번 가능한 선택지를 비교하고, 그 차이를 직접 실험하며 근거 있는 선택을 내리는 과정 자체에서 큰 재미와 보람을 느꼈습니다.
예를 들어, 초성 검색을 위해 한글 유니코드 구조를 분석하고, Levenshtein 거리 알고리즘과 결합해 오타까지 포용하는 방식으로 발전시켰습니다. 단순히 동작하게 만드는 것이 아닌, 사용자와 데이터 흐름을 고려한 합리적인 구현을 고민했던 시간이었습니다.
이러한 경험은 제가 만드는 서비스에 대한 더 깊은 이해로 이어졌고, 앞으로도 저는 문제를 단순히 해결하는 것을 넘어서, 문제를 정의하고 구조적으로 접근해가는 개발자로 계속 성장해 나가고자 합니다.
