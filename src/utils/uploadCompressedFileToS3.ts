import imageCompression from "browser-image-compression";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import type { SelectedFileItem } from "@/types/chat";

type UploadResult = { fileUrl: string; downloadUrl: string };

type ImageCompressionOptions = {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
};

export async function uploadCompressedFileToS3(
  fileItem: SelectedFileItem,
  signal: AbortSignal | null,
): Promise<UploadResult> {
  try {
    const options: ImageCompressionOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    const targetFile = fileItem.file;

    if (fileItem.type.startsWith("image/")) {
      fileItem.file = (await imageCompression(targetFile, options)) as File;
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
