export const formatTimestamp = (isoString: Date | null) => {
  if (!isoString) return "활동 없음";

  const chatDate = new Date(isoString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const chatDateOnly = new Date(chatDate.getFullYear(), chatDate.getMonth(), chatDate.getDate());

  if (chatDateOnly.getTime() === today.getTime()) {
    const h = chatDate.getHours();
    const m = chatDate.getMinutes().toString().padStart(2, "0");
    const displayAMPM = h < 12 ? "오전" : "오후";
    const displayHour = h % 12 === 0 ? 12 : h % 12;

    return `${displayAMPM} ${displayHour}:${m}`;
  } else if (chatDateOnly.getTime() === yesterday.getTime()) {
    return "어제";
  } else {
    return `${chatDate.getFullYear()}.${(chatDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${chatDate.getDate().toString().padStart(2, "0")}`;
  }
};
