const NICKNAME_STATS_KEY = "nicknameStats";

export const setNickNameStat = (nickname) => {
  const stats = JSON.parse(localStorage.getItem(NICKNAME_STATS_KEY)) || {};
  stats[nickname] = { messageCount: 0, roomCount: 0 };
  localStorage.setItem(NICKNAME_STATS_KEY, JSON.stringify(stats));
};

export const incrementMessageCount = (nickname) => {
  const stats = JSON.parse(localStorage.getItem(NICKNAME_STATS_KEY)) || {};
  const current = stats[nickname];
  current.messageCount += 1;
  stats[nickname] = current;
  localStorage.setItem(NICKNAME_STATS_KEY, JSON.stringify(stats));
};

export const incrementRoomCount = (nickname) => {
  const stats = JSON.parse(localStorage.getItem(NICKNAME_STATS_KEY)) || {};
  const current = stats[nickname];
  current.roomCount += 1;
  stats[nickname] = current;
  localStorage.setItem(NICKNAME_STATS_KEY, JSON.stringify(stats));
};

export const decrementRoomCount = (nickname) => {
  const stats = JSON.parse(localStorage.getItem(NICKNAME_STATS_KEY)) || {};
  const current = stats[nickname];
  current.roomCount = current.roomCount > 0 ? (current.roomCount -= 1) : current.roomCount;
  stats[nickname] = current;
  localStorage.setItem(NICKNAME_STATS_KEY, JSON.stringify(stats));
};

export const getMessageCountByNickName = (nickname) => {
  const stats = JSON.parse(localStorage.getItem(NICKNAME_STATS_KEY)) || {};
  const current = stats[nickname];
  return current.messageCount;
};

export const getRoomCountByNickName = (nickname) => {
  const stats = JSON.parse(localStorage.getItem(NICKNAME_STATS_KEY)) || {};
  const current = stats[nickname];
  return current.roomCount;
};

export const getAllNickNameStats = () => {
  const stats = JSON.parse(localStorage.getItem(NICKNAME_STATS_KEY)) || {};
  return stats;
};
