# WiPeer-FE

WiPeer는 동일한 Wi-Fi 네트워크에 연결된 사용자들끼리 채팅할 수 있는 웹/앱 기반 애플리케이션입니다.

<br>
<div align="center"> Deployed website | Frontend Repository | Backend Repository </div>

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
  - [3. 채팅방 검색시 초성 검색 및 오타 허용](#3-채팅방-검색시-초성-검색-및-오타-허용)
    - [3.1 한글 유니코드 조합 규칙을 활용한 초성 검색](#31-한글-유니코드-조합-규칙을-활용한-초성-검색)
    - [3.2 levenshtein 알고리즘을 활용한 유사도 검사](#32-levenshtein-알고리즘을-활용한-유사도-검사)
- [🗓️ 기간](#️-기간)
- [📚 회고](#️-회고)

<br>

# 🔍 프리뷰

<br>

# ⚒️ 기술 스택

<div>
  <h3>Client</h3>
    <img src="https://img.shields.io/badge/javascript-ECDC5A?style=for-the-badge&logo=javascript&logoColor=black">
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/>
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

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%82%B4+%EC%B1%84%ED%8C%85%EB%B0%A9.jpg" width="300px" height="530px"/>
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%B1%84%ED%8C%85%EB%B0%A9%EB%AA%A9%EB%A1%9D.jpg" width="300px" height="530px"/>
</div>

- 사용자는 "내 채팅방" 페이지에서 + 버튼을 클릭 후 자유롭게 채팅방 생성이 가능합니다.
  - 채팅방 생성시 방에 대한 설명과 공개방, 비공개방 여부를 선택하여 비공개 방일 경우 비밀번호 설정이 가능합니다.

- 채팅방 생성 완료 후, 공유 버튼을 누르면 해당 채팅방이 "채팅방 목록"에 표시되어 같은 Wi-Fi를 사용하는 사용자들이 채팅방에 참여할 수 있게 됩니다.
  - 공유 버튼을 누른 시점에 사용자가 사용 중인 Wi-Fi의 공인 IP를 기준으로 채팅방들이 같은 네트워크 단위로 분류되며, 동일한 Wi-Fi를 사용하는 사용자들에게만 해당 방이 보이게 됩니다.

## 2. 채팅 편집 및 삭제 기능

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%A9%94%EC%8B%9C%EC%A7%80%ED%8E%B8%EC%A7%91%EC%82%AD%EC%A0%9C.jpg" width="300px" height="530px"/>
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%A9%94%EC%8B%9C%EC%A7%80%ED%8E%B8%EC%A7%91.jpg" width="300px" height="530px" />
</div>

- 사용자는 채팅란에 마우스를 hover한 이후 오른쪽 상단의 옵션 메뉴를 선택하면 자신이 작성한 채팅을 편집하고 삭제할 수 있습니다.
  - 편집을 누르면 입력 입력창으로 해당 채팅 내용이 복사되며, 사용자는 내용을 수정한 뒤 다시 전송할 수 있습니다.
  - 사용자는 회원가입시 부여받은 자신만의 회원 ID를 갖게되며, 이 ID 검증을 통해 자신이 작성한 채팅의 편집과 삭제 권한을 갖게됩니다.

## 3. 파일 업로드 기능

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%82%AC%EC%A7%84+%EC%97%85%EB%A1%9C%EB%93%9C.jpg" width="300px" height="530px"/>
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%82%AC%EC%A7%84+%EC%97%85%EB%A1%9C%EB%93%9C+%EA%B2%B0%EA%B3%BC.jpg" width="300px" height="530px"/>
</div>

- 사용자는 채팅 입력창 아래의 파일 업로드 버튼을 통해 파일을 첨부할 수 있습니다.
- 업로드 가능한 파일 형식은 다음과 같습니다
  - image/\*, .pdf, .doc, .docx, .txt, .zip, .rar
  - 이미지 파일은 채팅방 내에서 미리보기가 제공되며, 그 외 파일은 다운로드 버튼을 통해 로컬 환경에 저장하고 열람이 가능합니다.
- 업로드된 파일은 Amazon S3에 저장되며, 채팅 메시지와 함께 실시간으로 공유됩니다.
- 사용자가 해당 메시지를 삭제하면, S3에 저장된 파일도 함께 자동 삭제되어 저장 공간을 효율적으로 관리할 수 있으며, 이에 따라 불필요한 저장 비용 발생도 방지할 수 있습니다.

## 4. 채팅방 검색 기능

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%B4%88%EC%84%B1%EA%B2%80%EC%83%89.jpg" width="300px" height="530px" />
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%98%A4%ED%83%80%EA%B2%80%EC%83%89.jpg" width="300px" height="530px" />
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

## 2. WebRTC를 활용한 Latency 최적화

## 3. 채팅방 검색시 초성 검색 및 오타 허용

### 3.1 한글 유니코드 조합 규칙을 활용한 초성 검색

// gif
자바스크립트에서 문자열을 초성 기준으로 검색하기 위해서는 한글의 유니코드 구조에 대한 이해가 필요했습니다.

한글은 유니코드 상에서 초성, 중성, 종성를 조합하여 하나의 글자를 표현합니다. 이를 활용하면 입력된 문자열에서 각 글자의 초성을 분리할 수 있었습니다. 이 과정을 자바스크립트로 직접 구현하기 위해 유니코드 계산을 직접 수행해야 했습니다.
// 이미지

먼저, 한글 ‘가’의 유니코드는 0xAC00(44032)이며, 이후의 모든 완성형 한글은 이 값을 기준으로 초성(19자) × 중성(21자) × 종성(28자)의 조합 순서대로 배치됩니다. 예를 들어, ‘나’는 초성이 ‘ㄴ’인 첫 글자로, ‘가’로부터 1 × (21 × 28) 만큼 떨어진 0xB098(45208)에 위치합니다.

이를 통해 각 글자의 유니코드에서 0xAC00을 뺀 뒤, 588(21 × 28)로 나누면 초성 인덱스를 구할 수 있으며, 이를 초성 배열에 매핑하면 해당 글자의 초성을 분리할 수 있습니다.

### 3.2 levenshtein 알고리즘을 활용한 유사도 검사

초성 분리만으로는 사용자가 입력한 검색어와 데이터 간의 철자 오타나 유사도 차이를 보완하기 어려웠습니다.

예를 들어, 사용자가 ㅎㄴㅅ(한성)을 ㅎㄴㅅㄱ로 잘못 입력했을 경우, 단순 초성 비교로는 일치하지 않아 검색 결과에서 제외됩니다.

이를 보완하기 위해 문자열 유사도를 측정하는 Levenshtein 거리 알고리즘을 활용했습니다. 이 알고리즘은 두 문자열 간에 몇 번의 삽입, 삭제, 교체 연산이 필요한지를 계산하여 유사도 점수를 제공합니다.

결합 방식은 다음과 같습니다:

1. 데이터 전처리: 모든 검색 대상 문자열을 초성으로 변환하여 별도 필드에 저장합니다. 예: 한성고등학교 → ㅎㅅㄱㄷㅎㄱ.
2. 사용자 입력 처리: 사용자가 입력한 검색어도 초성 기준으로 변환합니다.
3. 유사도 비교: 사용자 입력 초성과 데이터 초성 간의 Levenshtein 거리를 계산하여, 허용 오차 이하인 경우에만 결과로 출력합니다.

- 예를 들어:
  - 사용자 입력: ㅎㅅㄱ
  - 후보군1: ㅎㅅㄱ → 거리 0 → 완전 일치
  - 후보군2: ㅎㅅㄱㄷㅎ → 거리 2 → 유사한 후보
  - 이를 통해 단순한 초성 일치뿐 아니라, 부분 일치나 오타가 포함된 경우에도 유연한 검색이 가능해집니다.

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

# 📚 회고
