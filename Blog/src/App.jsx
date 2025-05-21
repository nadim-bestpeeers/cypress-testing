
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Authors from "./components/Authors";
import AuthorDetails from "./components/AuthorDetails";
import PostDetails from "./components/PostDetails";
import Post from "./components/Post";

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/post" element={<Post/>} />
        <Route path="/author-details/:authorId" element={<AuthorDetails />} /> 
        <Route path="/post-details/:postId" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default App;
