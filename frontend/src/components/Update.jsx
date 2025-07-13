import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/blogs/${id}`)
      .then((res) => {
        setInputs({
          title: res.data.title || "",
          content: res.data.content || "",
          img_url: res.data.img_url || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        alert("Blog not found!");
        navigate("/");
      });
  }, [id, navigate]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const updateData = () => {
    if (!inputs.title || !inputs.content) {
      alert("Title and content are required.");
      return;
    }

    axios
      .put(`http://localhost:3001/update/${id}`, inputs)
      .then((res) => {
        alert(res.data.message || "Updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating blog:", err);
        alert("Update failed");
      });
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "600px",
          px: 2,
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={inputs.title}
          onChange={inputHandler}
          fullWidth
        />
        <TextField
          label="Content"
          name="content"
          value={inputs.content}
          onChange={inputHandler}
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          label="Image URL"
          name="img_url"
          value={inputs.img_url}
          onChange={inputHandler}
          fullWidth
        />
        <Button variant="contained" color="secondary" onClick={updateData}>
          Update Blog
        </Button>
      </Box>
    </Box>
  );
};

export default Update;
