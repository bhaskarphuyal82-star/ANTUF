"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    InputAdornment,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CircularProgress from "@mui/material/CircularProgress";
import Sidebar from "@/components/sidebar/SideBar";
import ArticleCard from "./ArticleCard";
import { toast } from "react-toastify";
// import { fetchSubCategories } from "@/slice/subcategorySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "@/slice/subcategorySlice";


const Articles = () => {
    const dispatch = useDispatch();
    
    // Update the selector to properly get subcategories
    const { list: subcategories, loading, error } = useSelector(
        (state) => state.subcategories || { list: [], loading: false, error: null }
    );

    // Add debug logging
    useEffect(() => {
        console.log('Current subcategories:', subcategories);
    }, [subcategories]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState(""); // Initialize with empty string
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState("");
     const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const handleChange = (e) => {
        const value = e.target.value || ""; // Ensure we always have a string
        console.log('Selected category:', value);
        setCategory(value);
    };

     useEffect(() => {
        if (Array.isArray(subcategories)) {
            setFilteredSubCategories(subcategories);
        }
    }, [subcategories]);

    // Fetch subcategories on mount
    useEffect(() => {
        dispatch(fetchSubCategories());
    }, [dispatch]);
    const handleClose = () => setDialogOpen(false);

    const handleOpen = () => setDialogOpen(true);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setIsUploading(true);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "ml_default");

                const uploadResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const uploadData = await uploadResponse.json();

                if (!uploadResponse.ok) {
                    throw new Error(uploadData.error?.message || "Failed to upload image");
                }

                console.log("Cloudinary response:", uploadData);
                setImageUrl(uploadData.secure_url);
                setPreview(uploadData.secure_url);
                toast.success("Image uploaded successfully!");
            } catch (error) {
                console.error("Upload error:", error);
                toast.error("Failed to upload image");
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error("Please enter a content title");
            return;
        }

        try {
            const articleData = {
                category: category, // This will always be a string now
                title: title.trim(),
                featureImage: imageUrl
            };

            console.log("Sending article data:", articleData);

            const response = await fetch("/api/admin/Article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(articleData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add content");
            }

            console.log("Server response:", data);
            toast.success("Content added successfully");
            setTitle("");
            setImageUrl("");
            setCategory(""); // Reset to empty string, not undefined
            setPreview("");
            handleClose();

            // Optionally refresh the page to show new content
            window.location.reload();
        } catch (error) {
            console.error("Save error:", error);
            toast.error(error.message || "Failed to add content");
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    padding: 2,
                    bgcolor: "#212121",
                    ml: 12,
                    my: 1,
                    width: "90%",
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search your content"
                    InputLabelProps={{
                        style: { color: "#8A12FC" },
                    }}
                    sx={{
                        input: { color: "white", fontSize: "1.2rem", height: "2rem" },

                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#8A12FC" },
                            "&:hover fieldset": { borderColor: "#8A12FC" },
                            "&.Mui-focused fieldset": { borderColor: "#8A12FC" },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "purple",
                        ":hover": { bgcolor: "darkviolet" },
                        whiteSpace: "nowrap",
                        padding: "12px 25px",
                        fontSize: "1.1rem",
                    }}
                    onClick={handleOpen}
                >
                    New Content
                </Button>
            </Box>

            <Dialog
                PaperProps={{
                    sx: {
                        bgcolor: "#212121",
                        color: "#fff",
                    },
                }}
                open={dialogOpen}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>Add New Content</DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Content Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputLabelProps={{
                            style: { color: "#8A12FC" },
                        }}
                        sx={{
                            marginBottom: 3,
                            input: { color: "white", fontSize: "1.2rem", height: "2rem" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#8A12FC" },
                                "&:hover fieldset": { borderColor: "#8A12FC" },
                                "&.Mui-focused fieldset": { borderColor: "#8A12FC" },
                            },
                        }}
                    />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<ImageIcon />}
                            sx={{
                                color: "#8A12FC",
                                borderColor: "#8A12FC",
                                "&:hover": {
                                    borderColor: "#6A0DAD",
                                    backgroundColor: "rgba(138, 18, 252, 0.1)",
                                },
                            }}
                        >
                            Upload Feature Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                            />
                        </Button>

                        {isUploading && (
                            <CircularProgress
                                size={24}
                                sx={{ color: "#8A12FC" }}
                            />
                        )}

                        {preview && (
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        borderRadius: '8px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                    <FormControl
                        fullWidth
                        margin="normal"
                        sx={{
                            "& .MuiInputLabel-root": {
                                color: "#8A12FC", // Label color, dimmed if disabled
                            },
                            "&:hover .MuiInputLabel-root": {
                                color: "#8A12FC", // Hover label color
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#8A12FC", // Focused label color
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#8A12FC", // Default border color
                                },
                                "&:hover fieldset": {
                                    borderColor: "#8A12FC", // Hover border color
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#8A12FC", // Focused border color
                                },
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#8A12FC", // Icon color
                            },
                            "&:hover .MuiSvgIcon-root": {
                                color: "#8A12FC", // Icon hover color
                            },
                            "&.Mui-focused .MuiSvgIcon-root": {
                                color: "#8A12FC", // Icon focus color
                            },
                        }}
                    >
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={category || ""} // Ensure value is never undefined
                            onChange={handleChange}
                            sx={{
                                color: "#fff",
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: "#2A2A2A",
                                        maxHeight: 300,
                                        "& .MuiMenuItem-root": {
                                            color: "#fff",
                                            "&:hover": {
                                                bgcolor: "#8A12FC",
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {loading ? (
                                <MenuItem disabled>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} />
                                        Loading...
                                    </Box>
                                </MenuItem>
                            ) : filteredSubCategories?.length > 0 ? (
                                filteredSubCategories.map((subcategory) => (
                                    <MenuItem 
                                        key={subcategory._id} 
                                        value={subcategory._id}
                                    >
                                        {subcategory.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No categories available</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "#fff",
                            bgcolor: "red",
                            ":hover": { bgcolor: "darkred" },
                            whiteSpace: "nowrap",
                            padding: "12px 24px",
                            fontSize: "1.1rem",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        sx={{
                            color: "#fff",
                            bgcolor: "purple",
                            ":hover": { bgcolor: "darkviolet" },
                            whiteSpace: "nowrap",
                            padding: "12px 24px",
                            fontSize: "1.1rem",
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <ArticleCard />

            {/* <Box
                sx={{
                    display: "flex",
                    flexDirection: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    padding: 2,
                    bgcolor: "#212121",
                    ml: 12,
                    my:1
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search your content"
                    InputLabelProps={{
                        style: { color: "#8A12FC" },
                    }}
                    sx={{
                        input: { color: "white", fontSize: "1.2rem", height: "2rem" },

                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#8A12FC" },
                            "&:hover fieldset": { borderColor: "#8A12FC" },
                            "&.Mui-focused fieldset": { borderColor: "#8A12FC" },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "purple",
                        ":hover": { bgcolor: "darkviolet" },
                        whiteSpace: "nowrap",
                        padding: "12px 25px",
                        fontSize: "1.1rem",
                    }}
                    onClick={handleOpen}
                >
                    New Content
                </Button>
                   </Box> */}
                   

            <Sidebar />
        </>
    );
};

export default Articles;
