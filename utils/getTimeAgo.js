export function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - new Date(date); // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes >= 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
}
export function getRemainingTime(date) {
  const now = new Date();
  const diffMs = new Date(date) - now;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} left`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} left`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} left`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} left`;
  if (hours >= 0) return `${hours} hour${hours > 1 ? "s" : ""} left`;
  if (seconds < 0) return "Closed";
}
