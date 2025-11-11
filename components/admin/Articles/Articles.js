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
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: { xs: 1.5, sm: 2, md: 3 },
                    padding: { xs: 2, sm: 2.5, md: 3 },
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "16px",
                    mx: { xs: 1, sm: 2, md: 3 },
                    my: 2,
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 12px 40px rgba(102, 126, 234, 0.15)",
                    }
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search your content..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                🔍
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        style: { color: "#667eea" },
                    }}
                    sx={{
                        flex: 1,
                        minWidth: { xs: "100%", sm: "300px" },
                        input: { 
                            color: "#1f2937", 
                            fontSize: "1rem",
                            height: "2.5rem",
                            padding: "12px 16px",
                        },
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            transition: "all 0.3s ease",
                            "& fieldset": { 
                                borderColor: "rgba(102, 126, 234, 0.3)" 
                            },
                            "&:hover fieldset": { 
                                borderColor: "#667eea",
                                boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
                            },
                            "&.Mui-focused fieldset": { 
                                borderColor: "#667eea",
                                borderWidth: "2px",
                                boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
                            },
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "#9ca3af",
                            opacity: 0.7,
                        }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#ffffff",
                        whiteSpace: "nowrap",
                        padding: { xs: "10px 20px", sm: "12px 28px" },
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        fontWeight: 600,
                        borderRadius: "12px",
                        border: "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
                            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                        },
                        "&:active": {
                            transform: "translateY(0px)",
                        }
                    }}
                >
                    + New Content
                </Button>
            </Box>

            <Dialog
                PaperProps={{
                    sx: {
                        background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.95) 100%)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                        color: "#1f2937",
                        boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
                    },
                }}
                open={dialogOpen}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle
                    sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        padding: "24px",
                        borderRadius: "20px 20px 0 0",
                    }}
                >
                    ✨ Add New Content
                </DialogTitle>

                <DialogContent
                    sx={{
                        padding: { xs: 2, sm: 3 },
                        gap: 3,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        autoFocus
                        fullWidth
                        label="Content Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputLabelProps={{
                            style: { color: "#667eea", fontWeight: 600 },
                        }}
                        sx={{
                            marginTop: 2,
                            "& .MuiOutlinedInput-input": {
                                color: "#1f2937",
                                fontSize: "1rem",
                                padding: "14px 16px",
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "rgba(255,255,255,0.6)",
                                transition: "all 0.3s ease",
                                "& fieldset": {
                                    borderColor: "rgba(102, 126, 234, 0.3)",
                                    borderWidth: "1.5px",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#667eea",
                                    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#667eea",
                                    borderWidth: "2px",
                                    boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)",
                                },
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            padding: "20px",
                            backgroundColor: "rgba(102, 126, 234, 0.05)",
                            borderRadius: "16px",
                            border: "2px dashed rgba(102, 126, 234, 0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                borderColor: "#667eea",
                                backgroundColor: "rgba(102, 126, 234, 0.08)",
                            }
                        }}
                    >
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<ImageIcon sx={{ fontSize: "24px" }} />}
                            sx={{
                                color: "#667eea",
                                borderColor: "#667eea",
                                fontWeight: 600,
                                padding: "10px 20px",
                                borderRadius: "10px",
                                border: "2px solid #667eea",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#764ba2",
                                    color: "#764ba2",
                                    backgroundColor: "rgba(102, 126, 234, 0.1)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
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
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CircularProgress
                                    size={20}
                                    sx={{ color: "#667eea" }}
                                />
                                <Typography sx={{ color: "#667eea", fontWeight: 600 }}>
                                    Uploading...
                                </Typography>
                            </Box>
                        )}

                        {preview && (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#667eea",
                                        fontWeight: 600,
                                    }}
                                >
                                    ✓ Preview
                                </Typography>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "250px",
                                        borderRadius: "12px",
                                        objectFit: "cover",
                                        boxShadow: "0 8px 16px rgba(102, 126, 234, 0.2)",
                                        border: "2px solid rgba(102, 126, 234, 0.3)",
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    <FormControl
                        fullWidth
                        sx={{
                            "& .MuiInputLabel-root": {
                                color: "#667eea",
                                fontWeight: 600,
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#667eea",
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "rgba(255,255,255,0.6)",
                                "& fieldset": {
                                    borderColor: "rgba(102, 126, 234, 0.3)",
                                    borderWidth: "1.5px",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#667eea",
                                    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#667eea",
                                    borderWidth: "2px",
                                    boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)",
                                },
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#667eea",
                            },
                        }}
                    >
                        <InputLabel id="category-label">Select Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={category || ""}
                            onChange={handleChange}
                            sx={{
                                color: "#1f2937",
                                fontWeight: 600,
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.95) 100%)",
                                        maxHeight: 350,
                                        border: "1px solid rgba(102, 126, 234, 0.2)",
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 24px rgba(102, 126, 234, 0.2)",
                                        "& .MuiMenuItem-root": {
                                            color: "#1f2937",
                                            fontWeight: 500,
                                            padding: "12px 16px",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                color: "#ffffff",
                                                fontWeight: 600,
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {loading ? (
                                <MenuItem disabled>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <CircularProgress size={18} sx={{ color: "#667eea" }} />
                                        <span>Loading categories...</span>
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
                                <MenuItem disabled>
                                    <Typography sx={{ color: "#ef4444" }}>
                                        No categories available
                                    </Typography>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions
                    sx={{
                        padding: "20px 24px",
                        gap: 1.5,
                        borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "#ef4444",
                            borderColor: "#ef4444",
                            border: "2px solid #ef4444",
                            fontWeight: 600,
                            padding: "10px 24px",
                            borderRadius: "10px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                            },
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#ffffff",
                            fontWeight: 600,
                            padding: "10px 32px",
                            borderRadius: "10px",
                            border: "none",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
                            },
                        }}
                        variant="contained"
                    >
                        Save Content
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
