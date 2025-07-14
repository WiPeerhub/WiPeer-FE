import { X, FileText, ImageIcon } from "lucide-react";

export default function UploadedFileList({
  updateFileUploadingState,
  isFileUploading,
  selectedFiles,
  updateSelectedFiles,
}) {
  const handleRemoveFile = (fileId) => {
    updateSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4 text-blue-500" />;
    }
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-4">
      <div className="flex flex-wrap gap-2">
        {selectedFiles.map((file) => (
          <div
            key={file.id}
            className="group relative flex max-w-xs items-center gap-2 rounded-lg border border-gray-200 bg-white p-2"
          >
            {file.preview ? (
              <img src={file.preview || "/placeholder.svg"} alt={file.name} className="h-8 w-8 rounded object-cover" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                {getFileIcon(file.type)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
            </div>

            {isFileUploading && file.isUploading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="h-5 w-5 animate-spin text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M10 2.8 A9.5 9.5 0 0 1 20 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <button
                  onClick={() => {
                    file.abortController.abort();
                    updateFileUploadingState(false);
                    handleRemoveFile(file.id);
                  }}
                  className="group absolute rounded-full p-1 opacity-0 transition-colors group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-gray-100"
                >
                  <X className="h-3 w-3 text-gray-400 opacity-0 transition-opacity hover:opacity-100" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleRemoveFile(file.id)}
                className="rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <X className="h-3 w-3 text-gray-400" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
