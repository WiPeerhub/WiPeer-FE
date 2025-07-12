import { FileText, Download } from "lucide-react";

export default function ShowFileList({ files, onImageLoad }) {
  return (
    <div className="mt-2 flex flex-wrap gap-3">
      {files.map((file) => {
        const isImage = file.fileType?.startsWith("image/");
        return isImage ? (
          <a key={file.id} href={file.downloadUrl} download={file.fileName} rel="noopener noreferrer">
            <img
              src={file.fileUrl}
              alt={file.fileName}
              onLoad={onImageLoad}
              className="max-w-[200px] cursor-pointer rounded shadow"
            />
          </a>
        ) : (
          <div
            key={file.id}
            className="flex items-center gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
          >
            <FileText className="h-4 w-4 text-gray-500" />
            <span>{file.fileName}</span>
            <a
              href={file.downloadUrl}
              rel="noopener noreferrer"
              download={file.fileName}
              className="ml-auto text-blue-500 hover:underline"
            >
              <Download className="h-4 w-4" />
            </a>
          </div>
        );
      })}
    </div>
  );
}
