import { useState, useEffect } from "react";
import { Comment, ThumbUp, Delete } from "@mui/icons-material";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { v4 as uuidv4 } from 'uuid';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authorId: "",
    numLikes: 0,
    numComments: 0,
  });

  const postPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/posts");
        const data = await response.json();
        setPosts(data.reverse());
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openCreateDialog = () => setIsCreateDialogOpen(true);
  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      authorId: "",
      numLikes: 0,
      numComments: 0,
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generateRandomId = () => uuidv4();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      id: generateRandomId(),
      ...formData,
      datePublished: Date.now(),
    };

    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        closeCreateDialog();
      } else {
        console.error("Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredPosts(filteredPosts);
    setSuggestions(value.trim() ? filteredPosts.slice(0, 5) : []);
    setCurrentPage(1);
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().startsWith(title.toLowerCase())
    );
    setFilteredPosts(filtered);
    setSuggestions([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        setIsDialogOpen(false);
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openDeleteDialog = (postId) => {
    setSelectedPost(postId);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedPost(null);
    setIsDialogOpen(false);
  };

  const totalPages = Math.ceil(filteredPosts.length / postPerPage);
  const indexOfLastCard = currentPage * postPerPage;
  const indexOfFirstCard = indexOfLastCard - postPerPage;
  const currentPost = filteredPosts.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <Box
        sx={{
          padding: { xs: 2, sm: 3 },
          color: "black",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        
        <Button
          variant="contained"
          color="primary"
          onClick={openCreateDialog}
          sx={{
            backgroundColor: "#6c5ce7",
            color: "#fff",
            textTransform: "none",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: "#5e548e",
            },
          }}
        >
          Create Post
        </Button>
        <Dialog open={isCreateDialogOpen} onClose={closeCreateDialog}>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                margin="normal"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
              <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
              <TextField
                name="authorId"
                label="Author ID"
                fullWidth
                margin="normal"
                value={formData.authorId}
                onChange={handleFormChange}
                required
              />
              <DialogActions>
                <Button onClick={closeCreateDialog}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            marginBottom: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              marginTop: "50px",
              width: { xs: "100%", sm: "70%", md: "50%" },
              "& .MuiOutlinedInput-root": {
                paddingRight: 0,
                "& fieldset": {
                  borderColor: "#6c5ce7",
                },
                "&:hover fieldset": {
                  borderColor: "#5e548e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5e548e",
                },
              },
              input: {
                color: "#2d3436",
              },
            }}
          />

          {suggestions.length > 0 ? (
            <Paper
              sx={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: { xs: "100%", sm: "70%", md: "50%" },
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                border: "1px solid #ddd",
              }}
            >
              <List disablePadding>
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion.title)}
                    sx={{
                      padding: "10px 16px",
                      backgroundColor: index % 2 === 0 ? "#9c94d5" : "#fff",
                      "&:hover": {
                        backgroundColor: "#f0f4ff",
                        transition: "background-color 0.3s",
                      },
                    }}
                  >
                    <ListItemText
                      primary={suggestion.title}
                      sx={{
                        color: "#2d3436",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            searchTerm &&
            filteredPosts.length === 0 && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "100%",
                  width: { xs: "100%", sm: "70%", md: "50%" },
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  padding: 2,
                  textAlign: "center",
                  zIndex: 10,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#636e72",
                  }}
                >
                  No results found for {searchTerm}
                </Typography>
              </Paper>
            )
          )}
        </Box>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              marginTop: "50px",
            }}
          >
            <CircularProgress sx={{ color: "#6c5ce7" }} />
          </Box>
        ) : (
          currentPost.map((post) => (
            <Box
              key={post.id}
              sx={{
                padding: 3,
                marginBottom: 3,
                border: "1px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s, transform 0.3s",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#6c5ce7",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#636e72",
                  marginBottom: 2,
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
                      color: "#6c5ce7",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ThumbUp sx={{ marginRight: 0.5 }} />
                    {post.numLikes}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#e17055",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Comment sx={{ marginRight: 0.5 }} />
                    {post.numComments}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/post-details/${post.id}`}
                    variant="outlined"
                    sx={{
                      color: "#6c5ce7",
                      borderColor: "#6c5ce7",
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        backgroundColor: "#f1f2f6",
                      },
                    }}
                  >
                    View Post
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => openDeleteDialog(post.id)}
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          ))
        )}
        <Pagination
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            "& button": {
              backgroundColor: "#6c5ce7",
              color: "white",
              "&:hover": {
                backgroundColor: "#5e548e",
              },
            },
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Dialog open={isDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#e84444" }}>
              Are you sure you want to delete this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>Cancel</Button>
            <Button
              onClick={() => handleDelete(selectedPost)}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Post;
