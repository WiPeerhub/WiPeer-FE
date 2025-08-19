import { v4 as uuidv4 } from "uuid";

export const getOrCreateOwnerId = (): string => {
  let id = localStorage.getItem("ownerId");

  if (!id) {
    id = uuidv4();
    localStorage.setItem("ownerId", id);
  }

  return id;
};
