# WiPeer-FE

WiPeer는 동일한 Wi-Fi 네트워크에 연결된 사용자들끼리 채팅할 수 있는 웹/앱 기반 애플리케이션입니다.
<br>
Deployed website | Frontend Repository | Backend Repository

# 📖 목차

- [🔍 프리뷰](#-프리뷰)
- [⚒️ 기술 스택](#-기술-스택)
- [💥 동기](#-동기)
- [🎯 기능](#-기능)
- [💻 챌린지](#-챌린지)
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

  <h3>Deployment(AWS)</h3>
    <img src="https://img.shields.io/badge/%20EC2-FD911E?style=for-the-badge&logo=Amazon%20EC2&logoColor=white">
    <img src="https://img.shields.io/badge/%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white">
    <img src="https://img.shields.io/badge/%20ROUTE 53-456990?style=for-the-badge&logo=Amazon%20ROUTE53&logoColor=white">
    <img src="https://img.shields.io/badge/%20CLOUDFRONT-8709AA?style=for-the-badge&logo=Amazon%20CLOUDFRONT&logoColor=white">
    <img src="https://img.shields.io/badge/terraform-844FBA?style=for-the-badge&logo=terraform&logoColor=white">
  <br>
</div>
  <br>

# 💥 동기

같은 공간에 있으면서도 서로 소통하기 어려운 상황은 자주 발생합니다. 예를 들어, 카페에서 에어컨이 너무 추워 불편함을 느끼지만 직원이나 다른 손님에게 말하기 어려웠던 경험, 강의실에서 발표자의 발표 자료를 자유롭게 공유 받고 질문하고 싶지만 중간에 말을 끊기 망설여졌던 순간, 혹은 도서관 같은 공공 장소에서 스터디를 결성하거나 시설의 결함을 발견하였지만 이를 곧바로 주변 사람들이나 시설 관계자에게 알리기 어려웠던 경험 등이 있습니다. 이 프로젝트는 같은 Wi-Fi 네트워크에 연결되어 있다는 공간적 특성을 바탕으로, 복잡한 절차 없이 같은 공간에 있는 사람들끼리 자유롭게 소통할 수 있는 채널을 제공합니다.
사람들 사이의 물리적 거리는 가깝지만 소통은 단절된 상황에서, 부담 없는 연결을 통해 공간 속의 단절을 해소하고자 하는 고민에서 출발한 이 프로젝트는 "같은 공간에 있는 사람들 간의 소통의 어려움"이라는 문제를 해결하고자 기획되었습니다.

<br>

# 🎯 기능

## 채팅방 생성 및 공유

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%82%B4+%EC%B1%84%ED%8C%85%EB%B0%A9.jpg" width="300px" height="520px"/>
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%B1%84%ED%8C%85%EB%B0%A9%EB%AA%A9%EB%A1%9D.jpg"width="300px" height="520px" />
</div>

- 사용자는 "내 채팅방" 페이지에서 + 버튼을 클릭 후 자유롭게 채팅방 생성이 가능합니다.
  - 채팅방 생성시 방에 대한 설명과 공개방, 비공개방 여부를 선택하여 비공개 방일 경우 비밀번호 설정이 가능합니다.

- 채팅방 생성 완료 후, 공유 버튼을 누르면 해당 채팅방이 "채팅방 목록"에 표시되어 같은 Wi-Fi를 사용하는 사용자들이 채팅방에 참여할 수 있게 됩니다.
  - 공유 버튼을 누른 시점에 사용자가 사용 중인 Wi-Fi의 공인 IP를 기준으로 채팅방들이 같은 네트워크 단위로 분류되며, 동일한 Wi-Fi를 사용하는 사용자들에게만 해당 방이 보이게 됩니다.

## 채팅 편집 및 삭제 기능

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%A9%94%EC%8B%9C%EC%A7%80%ED%8E%B8%EC%A7%91%EC%82%AD%EC%A0%9C.jpg" width="300px" height="520px" />
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EB%A9%94%EC%8B%9C%EC%A7%80%ED%8E%B8%EC%A7%91.jpg" width="300px" height="520px"/>
</div>

- 사용자는 채팅란에 마우스를 hover한 이후 오른쪽 상단의 옵션 메뉴를 선택하면 자신이 작성한 채팅을 편집하고 삭제할 수 있습니다.
  - 편집을 누르면 입력 입력창으로 해당 채팅 내용이 복사되며, 사용자는 내용을 수정한 뒤 다시 전송할 수 있습니다.
  - 사용자는 회원가입시 부여받은 자신만의 회원 ID를 갖게되며, 이 ID 검증을 통해 자신이 작성한 채팅의 편집과 삭제 권한을 갖게됩니다.

## 파일 업로드 기능

<div align="center">
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%82%AC%EC%A7%84+%EC%97%85%EB%A1%9C%EB%93%9C.jpg" width="300px" height="520px" />
  <img src="https://noddy-app.s3.ap-northeast-2.amazonaws.com/%EC%82%AC%EC%A7%84+%EC%97%85%EB%A1%9C%EB%93%9C+%EA%B2%B0%EA%B3%BC.jpg" width="300px" height="520px"/>
</div>

- 사용자는 채팅 입력창 아래의 파일 업로드 버튼을 통해 파일을 첨부할 수 있습니다.
- 업로드 가능한 파일 형식은 다음과 같습니다
  - image/\*, .pdf, .doc, .docx, .txt, .zip, .rar
  - 이미지 파일은 채팅방 내에서 미리보기가 제공되며, 그 외 파일은 다운로드 버튼을 통해 로컬 환경에 저장하고 열람이 가능합니다.
- 업로드된 파일은 Amazon S3에 저장되며, 채팅 메시지와 함께 실시간으로 공유됩니다.
- 사용자가 해당 메시지를 삭제하면, S3에 저장된 파일도 함께 자동 삭제되어 저장 공간을 효율적으로 관리할 수 있으며, 이에 따라 불필요한 저장 비용 발생도 방지할 수 있습니다.

## 채팅방 검색 기능 구현

<br>

# 💻 챌린지

### 동일한 Wi-Fi 환경이란 정의를 어떻게 해야할까?

### WebRTC를 활용한 Latency 최적화

### WebSocket과 Rest API 처리 구분

### 렌더링 오류 발생

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
