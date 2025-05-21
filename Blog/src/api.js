// api.js
export const fetchAuthorDetails = async (authorId) => {
  const response = await fetch(`http://localhost:3001/authors/${authorId}`);
  const data = await response.json();
  return data;
};
  export const fetchAuthorName = async (authorId) => {
      const response = await fetch(`http://localhost:3001/authors/${authorId}`); 
      const data = await response.json();
      return data.firstName; 
    
  };

export const fetchAuthorPosts = async (authorId) => {
  const response = await fetch(`http://localhost:3001/posts`);
  const data = await response.json();
  const authorPosts = data.filter(
    (post) => post.authorId === parseInt(authorId)
  );
  return authorPosts;
};

export const fetchPostDetails = async (postId) => {
  const response = await fetch(`http://localhost:3001/posts/${postId}`);
  const data = await response.json();
  return data;
};

export const fetchLikes = async (postId) => {
  const response = await fetch(`http://localhost:3001/likes`);
  const data = await response.json();

  const postLikes = data.filter((like) => like.postId === parseInt(postId))
  return postLikes;
};

export const fetchComments = async (postId) => {
  const response = await fetch( `http://localhost:3001/comments`);
  const data = await response.json();

  const postComments = data.filter((comments) => comments.postId === parseInt(postId))
  return postComments;
};

export const updatePost = async (postId, updatedPost) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating post:", error.message);
      throw error;
    }
  };
  
