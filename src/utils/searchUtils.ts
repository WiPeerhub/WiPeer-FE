import type { Room } from "@/types/room";
const INITIALS: string[] = [
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

export function getInitials(str: string): string {
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

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;

  const matrix: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(0));

  for (let i = 0; i < rows; i++) matrix[i]![0] = i;
  for (let j = 0; j < cols; j++) matrix[0]![j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i]![j] = Math.min(matrix[i - 1]![j]! + 1, matrix[i]![j - 1]! + 1, matrix[i - 1]![j - 1]! + cost);
    }
  }

  return matrix[rows - 1]![cols - 1]!;
}

function similarity(a: string, b: string): number {
  if (!a.length && !b.length) return 1;

  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);

  return 1 - distance / maxLen;
}

export function searchRooms(rooms: Room[], query: string, threshold: number = 0.6) {
  if (!query) return rooms;

  const lowerQuery = query.toLowerCase();
  const queryInitials = getInitials(lowerQuery);

  return rooms.filter((room: Room) => {
    const title = (room.title || "").toLowerCase();
    const description = (room.description || "").toLowerCase();

    const titleInitials = getInitials(title);
    const descInitials = getInitials(description);

    if (/^[ㄱ-ㅎ]+$/.test(lowerQuery)) {
      return (
        similarity(queryInitials, titleInitials) >= threshold || similarity(queryInitials, descInitials) >= threshold
      );
    }

    return similarity(lowerQuery, title) >= threshold || similarity(lowerQuery, description) >= threshold;
  });
}
