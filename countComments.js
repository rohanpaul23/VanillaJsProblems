function countComments(comments) {
  // Base case: if input is null, undefined, or not an object, return 0
  if (!comments || typeof comments !== "object") return 0;

  // Start count at 1 to include the current comment itself
  let count = 1;

  // If the comment has a 'replies' array, process each reply recursively
  if (Array.isArray(comments.replies)) {
    for (let i = 0; i < comments.replies.length; i++) {
      // Recursively count all nested replies and add to total
      count = count + countComments(comments.replies[i]);
    }
  }

  // Return the total number of comments including nested ones
  return count;
}
