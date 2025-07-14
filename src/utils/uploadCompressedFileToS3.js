import imageCompression from "browser-image-compression";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";

export async function uploadCompressedFileToS3(fileItem, signal) {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    const targetFile = fileItem.file;

    if (fileItem.type.startsWith("image/")) {
      fileItem.file = await imageCompression(targetFile, options);
      const newFileSize = fileItem.file.size;
      fileItem.size = newFileSize;
    }

    const { fileUrl, downloadUrl } = await uploadFileToS3(fileItem, signal);

    return { fileUrl, downloadUrl };
  } catch (err) {
    console.error("이미지 압축 또는 업로드 실패:", err);
    throw err;
  }
}
