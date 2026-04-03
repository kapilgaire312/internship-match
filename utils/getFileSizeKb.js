export function getFileSizeKB(bytes) {
  return (bytes / 1024).toFixed(2) + " KB";
}
export function getFileSizeMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}
