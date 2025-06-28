import ChatRoomCard from "@/components/Chat/ChatRoomCard";

const conversations = [
  {
    id: "1",
    avatar: "https://img6.yna.co.kr/etc/inner/KR/2023/06/16/AKR20230616122500017_01_i_P4.jpg",
    name: "슈터 게임 | 다크 코드",
    lastMessage: "이드리스: 커뮤니케 보고서 날짜...",
    timestamp: "15:03",
  },
  {
    id: "2",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScx750avVe6uwvjk3ADT8pX45cdmyxwG5Y9w&s",
    name: "바닐라코딩",
    lastMessage: "자바스크립트입니다.",
    timestamp: "1월 24일",
  },
  {
    id: "3",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMMUKrCJ6RuDyJ4Yw52pXuuukFKKAsqFdUQ&s",
    name: "액티브스페이스",
    lastMessage: "레베카와 메릴이 글을 쓰는 중...",
    timestamp: "1월 24일",
  },
];

export default function ChatRoomListPage() {
  return (
    <ul>
      {conversations.map((item) => (
        <ChatRoomCard
          key={item.id}
          avatar={item.avatar}
          name={item.name}
          lastMessage={item.lastMessage}
          timestamp={item.timestamp}
        />
      ))}
    </ul>
  );
}
