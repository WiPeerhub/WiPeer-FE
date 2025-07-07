import { API } from "@/constants/api";

export async function uploadFileToS3(file) {
  const res = await fetch(API.uploadFile(file.type, file.name));
  console.log("File:", file);
  console.log(file.name, file.type, file.size);
  console.log(file.file instanceof File);

  const { uploadUrl, downloadUrl, fileUrl } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file.file,
  });

  if (!uploadRes.ok) throw new Error("S3 업로드 실패");

  return { fileUrl, downloadUrl };
}
