import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Box, Button } from "@mui/material";
import { Comment, ThumbUp } from "@mui/icons-material";
import { fetchAuthorDetails, fetchAuthorPosts } from "../api";
import { Link } from "react-router-dom";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(false);
  const [sortByComments, setSortByComments] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const authorData = await fetchAuthorDetails(authorId);
      setAuthor(authorData);

      const postsData = await fetchAuthorPosts(authorId);
      setPosts(postsData);
      setSortedPosts(postsData);
    };

    fetchDetails();
  }, [authorId]);

  const sortByLikesHandler = () => {
    const sorted = [...posts].sort((a, b) => b.numLikes - a.numLikes);
    setSortedPosts(sorted);
    setSortByLikes(true);
    setSortByComments(false);
  };

  const sortByCommentsHandler = () => {
    const sorted = [...posts].sort((a, b) => b.numComments - a.numComments);
    setSortedPosts(sorted);
    setSortByLikes(false);
    setSortByComments(true);
  };

  if (!author) return <div>Loading...</div>;

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: 4 }}>
      <Card
        sx={{
          marginBottom: 3,
          padding: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: 2,
            color: "#6c5ce7",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {author.firstName} {author.lastName}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            color: "#4a4a4a",
            textAlign: "center",
          }}
        >
          <strong>Posts:</strong> {author.numPosts} | <strong>Comments:</strong>{" "}
          {author.numComments} | <strong>Likes:</strong> {author.numLikes}
        </Typography>
      </Card>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={sortByLikesHandler}
          sx={{
            backgroundColor: sortByLikes ? "#66bb6a" : "#6c5ce7",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: sortByLikes ? "#43a047" : "#5b4dcf",
            },
          }}
        >
          Top Likes
        </Button>
        <Button
          variant="contained"
          onClick={sortByCommentsHandler}
          sx={{
            backgroundColor: sortByComments ? "#ff7043" : "#6c5ce7",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: sortByComments ? "#d84315" : "#5b4dcf",
            },
          }}
        >
          Top Comments
        </Button>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        {sortedPosts.slice(0, 5).map((post) => (
          <Box
            key={post.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              marginBottom: 2,
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
              transition: "box-shadow 0.3s, transform 0.3s",
              "&:hover": {
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#6c5ce7",
                fontWeight: 600,
                marginBottom: 1,
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "justify",
                marginBottom: 2,
                fontSize: "0.95rem",
                color: "#4a4a4a",
              }}
            >
              {post.description.substring(0, 150)}...
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#43a047",
                    fontWeight: 500,
                  }}
                >
                  <ThumbUp sx={{ marginRight: 0.5 }} />
                  {post.numLikes}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ef5350",
                    fontWeight: 500,
                  }}
                >
                  <Comment sx={{ marginRight: 0.5 }} />
                  {post.numComments}
                </Typography>
              </Box>
              <Button
                component={Link}
                to={`/post-details/${post.id}`}
                variant="outlined"
                sx={{
                  color: "#6c5ce7",
                  borderColor: "#6c5ce7",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                View Post
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AuthorDetails;
