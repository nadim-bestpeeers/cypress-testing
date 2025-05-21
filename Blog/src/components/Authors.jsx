import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import avatarProfile from "../assets/profilePicture.jpg";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { PostAdd, Comment, ThumbUp } from "@mui/icons-material";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredAuthor, setFilteredAuthor] = useState([]);

  const cardsPerPage = 12;

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch("http://localhost:3001/authors");
        const data = await response.json();
        setAuthors(data);
        setFilteredAuthor(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAuthor();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const liveFilteredAuthors = authors.filter(
      (author) =>
        author.firstName.toLowerCase().startsWith(value.toLowerCase()) ||
        author.lastName.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredAuthor(liveFilteredAuthors);
    setSuggestions(value.trim() ? liveFilteredAuthors.slice(0, 5) : []);
    setCurrentPage(1);
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    const filtered = authors.filter(
      (author) =>
        `${author.firstName}${author.lastName}`.toLowerCase() ===
        name.toLowerCase()
    );
    setFilteredAuthor(filtered);
    setSuggestions([]);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(filteredAuthor.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAuthors = filteredAuthor.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: 4,
        color: "#ffffff",
      }}
    >
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
                  onClick={() =>
                    handleSuggestionClick(
                      `${suggestion.firstName}${suggestion.lastName}`
                    )
                  }
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
                    primary={`${suggestion.firstName}${suggestion.lastName}`}
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
          filteredAuthor.length === 0 && (
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
      <Container
        sx={{
          my: 4,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 4,
          padding: 4,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Grid container spacing={3}>
          {currentAuthors.map((author) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={author.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "220px",
                    objectFit: "cover",
                    width: "100%",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                  image={author.profileImage || avatarProfile}
                  alt={`${author.firstName} ${author.lastName}`}
                />
                <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                  <Typography
                    data-testid="author-name"
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "center",
                      color: "#2c3e50",
                      fontWeight: "bold",
                      mb: 2,
                      textTransform: "capitalize",
                    }}
                  >
                    {author.firstName} {author.lastName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                      color: "#555",
                    }}
                  >
                    <Typography variant="body2">
                      <ThumbUp sx={{ marginRight: 1, color: "#3498db" }} />{" "}
                      {author.numLikes}
                    </Typography>
                    <Typography variant="body2">
                      <PostAdd sx={{ marginRight: 1, color: "#e67e22" }} />{" "}
                      {author.numPosts}
                    </Typography>
                    <Typography variant="body2">
                      <Comment sx={{ marginRight: 1, color: "#e74c3c" }} />{" "}
                      {author.numComments}
                    </Typography>
                  </Box>
                  <Button
                    data-testid="authors-button"
                    component={Link}
                    to={`/author-details/${author.id}`}
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#6c5ce7",
                      color: "#ffffff",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#5b4dcf",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </Box>
  );
};

export default Authors;
