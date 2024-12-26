import React from "react";

function FormatLastSeen({ date }) {
  if (!date) return "Not Available"; // Handle invalid date

  const now = new Date();
  const diff = now - new Date(date); // in milliseconds

  const diffMinutes = Math.floor(diff / 60000);
  const diffHours = Math.floor(diff / 3600000);
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30); // Approximate a month as 30 days
  const diffYears = Math.floor(diffDays / 365); // Approximate a year as 365 days

  if (diffMinutes < 60) {
    return diffMinutes === 1 ? "a minute ago" : `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? "an hour ago" : `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return diffDays === 1 ? "a day ago" : `${diffDays} days ago`;
  } else if (diffWeeks < 4) {
    return diffWeeks === 1 ? "a week ago" : `${diffWeeks} weeks ago`;
  } else if (diffMonths < 12) {
    return diffMonths === 1 ? "a month ago" : `${diffMonths} months ago`;
  } else {
    return diffYears === 1 ? "a year ago" : `${diffYears} years ago`;
  }
}

export default FormatLastSeen;
