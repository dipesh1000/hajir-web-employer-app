import { formatDistanceToNow, format } from "date-fns";

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const distance = formatDistanceToNow(date);

  if (distance === "less than a minute") {
    return "just now";
  } else if (distance === "1 minute") {
    return "1 minute ago";
  } else if (distance.startsWith("in")) {
    return format(date, "dd MMM yyyy");
  } else {
    return `${distance} ago`;
  }
};
