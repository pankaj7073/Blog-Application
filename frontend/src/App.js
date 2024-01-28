import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import ReadBlog from "./pages/ReadBlog";
import CreateBlog from "./pages/CreateBlog";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import MyBlogs from "./pages/MyBlogs";
import Footer from "./components/Footer";
import UpdateBlog from "./pages/updateBlog";

const App = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/read" element={<ReadBlog />} />
            <Route exact path="/create" element={<CreateBlog />} />
            <Route exact path="/blog" element={<MyBlogs />} />
            <Route exact path="/update" element={<UpdateBlog />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>

        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default App;
