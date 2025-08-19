import { API } from "@/constants/api";
import type { SelectedFileItem } from "@/types/chat";

type SignedUrlResponse = {
  uploadUrl: string;
  downloadUrl: string;
  fileUrl: string;
};

type UploadResult = {
  fileUrl: string;
  downloadUrl: string;
};

export async function uploadFileToS3(file: SelectedFileItem, signal: AbortSignal | null): Promise<UploadResult> {
  const res = await fetch(API.uploadFile(file.type, file.name));
  const { uploadUrl, downloadUrl, fileUrl } = (await res.json()) as SignedUrlResponse;

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file.file,
    signal,
  });

  if (!uploadRes.ok) throw new Error("S3 업로드 실패");

  return { fileUrl, downloadUrl };
}
