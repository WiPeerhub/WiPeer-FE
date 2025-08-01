const INITIALS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

export function getInitials(str) {
  return Array.from(str)
    .map((char) => {
      const code = char.charCodeAt(0) - 0xac00;
      if (code >= 0 && code <= 11171) {
        const initialIndex = Math.floor(code / (21 * 28));
        return INITIALS[initialIndex];
      }
      return char;
    })
    .join("");
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }

  return matrix[a.length][b.length];
}

// 두 문자열의 유사도를 0~1 사이로 계산 (1에 가까울수록 유사)
function similarity(a, b) {
  if (!a.length && !b.length) return 1;

  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);

  return 1 - distance / maxLen;
}

// 검색 함수: rooms 배열에서 검색어에 맞는 방 필터링
export function searchRooms(rooms, query, threshold = 0.6) {
  if (!query) return rooms;

  const lowerQuery = query.toLowerCase();
  const queryInitials = getInitials(lowerQuery);

  return rooms.filter((room) => {
    const title = (room.title || "").toLowerCase();
    const description = (room.description || "").toLowerCase();

    const titleInitials = getInitials(title);
    const descInitials = getInitials(description);

    // 1) 초성 검색: 검색어가 초성으로만 이루어졌다면 초성 포함 여부 확인
    if (/^[ㄱ-ㅎ]+$/.test(lowerQuery)) {
      return (
        similarity(queryInitials, titleInitials) >= threshold || similarity(queryInitials, descInitials) >= threshold
      );
    }

    // 2) 유사도 검색: 제목 또는 설명과 유사도 계산해 임계값 이상이면 포함
    return similarity(lowerQuery, title) >= threshold || similarity(lowerQuery, description) >= threshold;
  });
}
