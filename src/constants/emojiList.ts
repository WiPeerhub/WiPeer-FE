export const EMOJI_LIST = ["👍", "❤️", "😂", "😮", "😢", "😡"] as const;

export type Emoji = (typeof EMOJI_LIST)[number];
