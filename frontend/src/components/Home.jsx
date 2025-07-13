import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const staticPosts = [
  {
    _id: "1",
    title: "Travel the world!!!!!",
    content: "Explore amazing places across the globe.",
    img_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    createdAt: new Date().toISOString(),
    isStatic: true,
  },
  {
    _id: "2",
    title: "Art!!!!!!!!!",
    content: "Express yourself with color and creativity.",
    img_url: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
    isStatic: true,
  },
  {
    _id: "3",
    title: "Food is Art!!!!",
    content: "Discover delicious dishes from around the world.",
    img_url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    createdAt: new Date().toISOString(),
    isStatic: true,
  },
];

function Home() {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/blogs")
      .then((res) => setFetchedPosts(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id, isStatic) => {
    if (isStatic) {
      alert("Cannot delete hardcoded blog.");
      return;
    }

    axios
      .delete(`http://localhost:3001/blogs/${id}`)
      .then(() => {
        alert("Deleted successfully");
        fetchBlogs(); 
      })
      .catch((err) => {
        console.error("Error deleting:", err);
      });
  };

  const handleUpdate = (id, isStatic) => {
    if (isStatic) {
      alert("Cannot update hardcoded blog.");
      return;
    }

    navigate(`/update/${id}`);
  };

  const allPosts = [...staticPosts, ...fetchedPosts];

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>
        {allPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card>
              {post.img_url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.img_url}
                  alt={post.title}
                />
              )}
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(post._id, post.isStatic)}
                >
                  DELETE
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: "#8e24aa" }}
                  onClick={() => handleUpdate(post._id, post.isStatic)}
                >
                  UPDATE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
