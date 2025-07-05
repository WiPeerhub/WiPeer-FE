export default function HiddenFileInput({ fileInputRef, handleFileSelect }) {
  return (
    <input
      ref={fileInputRef}
      type="file"
      multiple
      accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
      onChange={handleFileSelect}
      className="hidden"
    />
  );
}
