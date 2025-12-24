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
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    
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
    const [subtitle, setSubtitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState("draft");
    const [isFeatured, setIsFeatured] = useState(false);
    const [difficulty, setDifficulty] = useState("beginner");
    const [language, setLanguage] = useState("ne");
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
            toast.error("Please enter a post title");
            return;
        }

        if (!category) {
            toast.error("Please select a category");
            return;
        }

        try {
            const articleData = {
                // Basic Information
                title: title.trim(),
                subtitle: subtitle.trim(),
                excerpt: excerpt.trim(),
                
                // Media
                featureImage: imageUrl,
                imageAlt: imageAlt.trim() || `${title.trim()} feature image`,
                
                // Categorization
                category: category,
                tags: tags ? tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
                
                // Publication Status
                status: status,
                
                // Features
                isFeatured: isFeatured,
                
                // Reading Information
                difficulty: difficulty,
                language: language,
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
            toast.success("Post created successfully!");
            
            // Reset all fields
            setTitle("");
            setSubtitle("");
            setExcerpt("");
            setImageUrl("");
            setImageAlt("");
            setCategory("");
            setTags("");
            setStatus("draft");
            setIsFeatured(false);
            setDifficulty("beginner");
            setLanguage("ne");
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
                    gap: { xs: 2, sm: 3 },
                    padding: { xs: 2.5, sm: 3, md: 4 },
                    background: "linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                    borderRadius: "24px",
                    mx: { xs: 1, sm: 2, md: 3 },
                    my: 3,
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)",
                    }
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search articles, posts & content..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box sx={{ 
                                    fontSize: "1.3rem",
                                    filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))"
                                }}>
                                    🔍
                                </Box>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        flex: 1,
                        minWidth: { xs: "100%", sm: "350px" },
                        "& .MuiInputBase-input": { 
                            color: "#e2e8f0", 
                            fontSize: "1.05rem",
                            padding: "14px 16px",
                            fontWeight: 500,
                        },
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "rgba(15, 23, 42, 0.6)",
                            borderRadius: "16px",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            backdropFilter: "blur(10px)",
                            "& fieldset": { 
                                borderColor: "rgba(148, 163, 184, 0.2)",
                                borderWidth: "1.5px"
                            },
                            "&:hover": {
                                backgroundColor: "rgba(15, 23, 42, 0.8)",
                                "& fieldset": { 
                                    borderColor: "rgba(59, 130, 246, 0.5)",
                                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)"
                                }
                            },
                            "&.Mui-focused": {
                                backgroundColor: "rgba(15, 23, 42, 0.9)",
                                "& fieldset": { 
                                    borderColor: "#3b82f6",
                                    borderWidth: "2px",
                                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(59, 130, 246, 0.2)"
                                }
                            },
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "#94a3b8",
                            opacity: 1,
                        }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() => router.push("/dashboard/admin/create/post/new")}
                    sx={{
                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        color: "#ffffff",
                        whiteSpace: "nowrap",
                        padding: { xs: "12px 24px", sm: "14px 32px" },
                        fontSize: { xs: "1rem", sm: "1.05rem" },
                        fontWeight: 700,
                        borderRadius: "16px",
                        border: "none",
                        textTransform: "none",
                        letterSpacing: "0.5px",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                            transition: "left 0.6s",
                        },
                        "&:hover": {
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 12px 36px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                            "&::before": {
                                left: "100%",
                            }
                        },
                        "&:active": {
                            transform: "translateY(-1px) scale(0.98)",
                        }
                    }}
                >
                    <Box component="span" sx={{ mr: 1, fontSize: "1.2rem" }}>✨</Box>
                    Create New Post
                </Button>
            </Box>

            <Dialog
                PaperProps={{
                    sx: {
                        background: "linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)",
                        backdropFilter: "blur(40px) saturate(180%)",
                        borderRadius: "32px",
                        border: "2px solid rgba(59, 130, 246, 0.3)",
                        color: "#e2e8f0",
                        boxShadow: "0 32px 96px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.2) inset, 0 2px 0 rgba(255, 255, 255, 0.1) inset",
                        overflow: "visible",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-2px",
                            left: "-2px",
                            right: "-2px",
                            bottom: "-2px",
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #3b82f6)",
                            borderRadius: "32px",
                            zIndex: -1,
                            opacity: 0.6,
                            filter: "blur(20px)",
                        }
                    },
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        backdropFilter: "blur(12px)",
                    }
                }}
                open={dialogOpen}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                            animation: "shimmer 3s infinite",
                        },
                        "@keyframes shimmer": {
                            "0%": { left: "-100%" },
                            "100%": { left: "200%" }
                        }
                    }}
                >
                    <DialogTitle
                        sx={{
                            color: "#ffffff",
                            fontWeight: 800,
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                            padding: { xs: "24px 24px", sm: "32px 40px" },
                            position: "relative",
                            textShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            gap: 2.5,
                            letterSpacing: "0.5px",
                        }}
                    >
                        <Box 
                            component="span" 
                            sx={{ 
                                fontSize: { xs: "2rem", sm: "2.5rem" },
                                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                                animation: "float 3s ease-in-out infinite",
                                "@keyframes float": {
                                    "0%, 100%": { transform: "translateY(0px)" },
                                    "50%": { transform: "translateY(-8px)" }
                                }
                            }}
                        >
                            ✨
                        </Box>
                        Create New Post
                    </DialogTitle>
                </Box>

                <DialogContent
                    sx={{
                        padding: { xs: "32px 24px", sm: "40px 40px" },
                        gap: 4,
                        display: "flex",
                        flexDirection: "column",
                        background: "transparent",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)",
                            borderRadius: "20px",
                            padding: { xs: "24px", sm: "28px" },
                            border: "1px solid rgba(148, 163, 184, 0.15)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#60a5fa",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                mb: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Box component="span" sx={{ fontSize: "1.3rem" }}>📝</Box>
                            Post Details
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            label="Post Title"
                            placeholder="Enter an engaging title for your post..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            InputLabelProps={{
                                style: { 
                                    color: "#94a3b8", 
                                    fontWeight: 700,
                                    fontSize: "1rem"
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-input": {
                                    color: "#e2e8f0",
                                    fontSize: "1.15rem",
                                    padding: "18px 20px",
                                    fontWeight: 600,
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "16px",
                                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                                    backdropFilter: "blur(10px)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "& fieldset": {
                                        borderColor: "rgba(148, 163, 184, 0.3)",
                                        borderWidth: "2px",
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                                        transform: "translateY(-2px)",
                                        "& fieldset": {
                                            borderColor: "rgba(59, 130, 246, 0.6)",
                                            boxShadow: "0 0 24px rgba(59, 130, 246, 0.25)",
                                        }
                                    },
                                    "&.Mui-focused": {
                                        backgroundColor: "rgba(15, 23, 42, 1)",
                                        transform: "translateY(-2px)",
                                        "& fieldset": {
                                            borderColor: "#3b82f6",
                                            borderWidth: "2.5px",
                                            boxShadow: "0 0 32px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1)",
                                        }
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)",
                            borderRadius: "20px",
                            padding: { xs: "24px", sm: "28px" },
                            border: "1px solid rgba(148, 163, 184, 0.15)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#60a5fa",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                mb: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Box component="span" sx={{ fontSize: "1.3rem" }}>🖼️</Box>
                            Featured Image
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 3,
                                padding: { xs: "28px", sm: "32px" },
                                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                                borderRadius: "20px",
                                border: "3px dashed rgba(59, 130, 246, 0.4)",
                                position: "relative",
                                overflow: "hidden",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.2), transparent 70%)",
                                    opacity: 0,
                                    transition: "opacity 0.4s",
                                },
                                "&:hover": {
                                    borderColor: "#3b82f6",
                                    borderStyle: "solid",
                                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(139, 92, 246, 0.12) 100%)",
                                    boxShadow: "0 12px 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(59, 130, 246, 0.15)",
                                    transform: "translateY(-4px)",
                                    "&::before": {
                                        opacity: 1,
                                    }
                                }
                            }}
                        >
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<ImageIcon sx={{ fontSize: "28px" }} />}
                                disabled={isUploading}
                                sx={{
                                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                    color: "#ffffff",
                                    fontWeight: 800,
                                    padding: "16px 36px",
                                    borderRadius: "16px",
                                    fontSize: "1.1rem",
                                    textTransform: "none",
                                    letterSpacing: "0.8px",
                                    position: "relative",
                                    overflow: "hidden",
                                    boxShadow: "0 8px 28px rgba(59, 130, 246, 0.5), 0 4px 0 rgba(59, 130, 246, 0.3)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-100%",
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                                        transition: "left 0.6s",
                                    },
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 12px 36px rgba(59, 130, 246, 0.6), 0 6px 0 rgba(59, 130, 246, 0.4)",
                                        "&::before": {
                                            left: "100%",
                                        }
                                    },
                                    "&:active": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4), 0 2px 0 rgba(59, 130, 246, 0.3)",
                                    },
                                    "&.Mui-disabled": {
                                        background: "rgba(148, 163, 184, 0.2)",
                                        color: "rgba(148, 163, 184, 0.5)",
                                        boxShadow: "none",
                                    }
                                }}
                            >
                                📸 Upload Featured Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                            </Button>

                        {isUploading && (
                            <Box sx={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: 2,
                                padding: "12px 24px",
                                background: "rgba(59, 130, 246, 0.1)",
                                borderRadius: "12px",
                                backdropFilter: "blur(10px)"
                            }}>
                                <CircularProgress
                                    size={24}
                                    thickness={5}
                                    sx={{ 
                                        color: "#3b82f6",
                                        filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))"
                                    }}
                                />
                                <Typography sx={{ 
                                    color: "#60a5fa", 
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    letterSpacing: "0.5px"
                                }}>
                                    Uploading your image...
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
                                    gap: 2,
                                    animation: "fadeIn 0.5s ease-in-out",
                                    "@keyframes fadeIn": {
                                        from: { opacity: 0, transform: "scale(0.95)" },
                                        to: { opacity: 1, transform: "scale(1)" }
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1rem",
                                        color: "#60a5fa",
                                        fontWeight: 700,
                                        letterSpacing: "1px",
                                        textTransform: "uppercase",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1
                                    }}
                                >
                                    <Box component="span" sx={{ fontSize: "1.2rem" }}>✓</Box>
                                    Image Preview
                                </Typography>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                                        border: "2px solid rgba(59, 130, 246, 0.4)",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "3px",
                                            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)",
                                            backgroundSize: "200% 100%",
                                            animation: "shimmer 2s linear infinite",
                                        },
                                        "@keyframes shimmer": {
                                            "0%": { backgroundPosition: "200% 0" },
                                            "100%": { backgroundPosition: "-200% 0" }
                                        }
                                    }}
                                >
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            width: "100%",
                                            maxHeight: "300px",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)",
                            borderRadius: "20px",
                            padding: { xs: "24px", sm: "28px" },
                            border: "1px solid rgba(148, 163, 184, 0.15)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#60a5fa",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                mb: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Box component="span" sx={{ fontSize: "1.3rem" }}>📋</Box>
                            Category Selection
                        </Typography>
                        <FormControl
                            fullWidth
                            sx={{
                                "& .MuiInputLabel-root": {
                                    color: "#94a3b8",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#60a5fa",
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "16px",
                                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                                    backdropFilter: "blur(10px)",
                                    "& fieldset": {
                                        borderColor: "rgba(148, 163, 184, 0.3)",
                                        borderWidth: "2px",
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                                        transform: "translateY(-2px)",
                                        "& fieldset": {
                                            borderColor: "rgba(59, 130, 246, 0.6)",
                                            boxShadow: "0 0 24px rgba(59, 130, 246, 0.25)",
                                        }
                                    },
                                    "&.Mui-focused": {
                                        backgroundColor: "rgba(15, 23, 42, 1)",
                                        transform: "translateY(-2px)",
                                        "& fieldset": {
                                            borderColor: "#3b82f6",
                                            borderWidth: "2.5px",
                                            boxShadow: "0 0 32px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1)",
                                        }
                                    },
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#60a5fa",
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
                                color: "#e2e8f0",
                                fontWeight: 600,
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
                                        maxHeight: 350,
                                        border: "2px solid rgba(59, 130, 246, 0.3)",
                                        borderRadius: "16px",
                                        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                                        backdropFilter: "blur(20px)",
                                        "& .MuiMenuItem-root": {
                                            color: "#cbd5e1",
                                            fontWeight: 600,
                                            padding: "14px 20px",
                                            margin: "4px 8px",
                                            borderRadius: "10px",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                color: "#ffffff",
                                                fontWeight: 700,
                                                transform: "translateX(4px)",
                                                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                                            },
                                            "&.Mui-selected": {
                                                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)",
                                                color: "#60a5fa",
                                                fontWeight: 700,
                                                "&:hover": {
                                                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                    color: "#ffffff",
                                                }
                                            }
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
                    </Box>

                    {/* Additional Information Section */}
                    <Box
                        sx={{
                            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)",
                            borderRadius: "20px",
                            padding: { xs: "24px", sm: "28px" },
                            border: "1px solid rgba(148, 163, 184, 0.15)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#60a5fa",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                mb: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Box component="span" sx={{ fontSize: "1.3rem" }}>📄</Box>
                            Additional Information
                        </Typography>
                        
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <TextField
                                fullWidth
                                label="Subtitle (Optional)"
                                placeholder="Add a compelling subtitle..."
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                inputProps={{ maxLength: 300 }}
                                helperText={`${subtitle.length}/300 characters`}
                                InputLabelProps={{
                                    style: { 
                                        color: "#94a3b8", 
                                        fontWeight: 700,
                                        fontSize: "0.95rem"
                                    },
                                }}
                                FormHelperTextProps={{
                                    sx: {
                                        color: "#64748b",
                                        fontSize: "0.85rem",
                                        mt: 1
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-input": {
                                        color: "#e2e8f0",
                                        fontSize: "1.05rem",
                                        padding: "16px 18px",
                                        fontWeight: 500,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "& fieldset": {
                                            borderColor: "rgba(148, 163, 184, 0.3)",
                                            borderWidth: "2px",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                                            "& fieldset": {
                                                borderColor: "rgba(59, 130, 246, 0.6)",
                                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                            }
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(15, 23, 42, 1)",
                                            "& fieldset": {
                                                borderColor: "#3b82f6",
                                                borderWidth: "2.5px",
                                                boxShadow: "0 0 28px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.1)",
                                            }
                                        },
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Excerpt (Optional)"
                                placeholder="Write a brief summary or excerpt..."
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                inputProps={{ maxLength: 500 }}
                                helperText={`${excerpt.length}/500 characters`}
                                InputLabelProps={{
                                    style: { 
                                        color: "#94a3b8", 
                                        fontWeight: 700,
                                        fontSize: "0.95rem"
                                    },
                                }}
                                FormHelperTextProps={{
                                    sx: {
                                        color: "#64748b",
                                        fontSize: "0.85rem",
                                        mt: 1
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-input": {
                                        color: "#e2e8f0",
                                        fontSize: "1.05rem",
                                        padding: "16px 18px",
                                        fontWeight: 500,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "& fieldset": {
                                            borderColor: "rgba(148, 163, 184, 0.3)",
                                            borderWidth: "2px",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                                            "& fieldset": {
                                                borderColor: "rgba(59, 130, 246, 0.6)",
                                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                            }
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(15, 23, 42, 1)",
                                            "& fieldset": {
                                                borderColor: "#3b82f6",
                                                borderWidth: "2.5px",
                                                boxShadow: "0 0 28px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.1)",
                                            }
                                        },
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Image Alt Text (Optional)"
                                placeholder="Describe the image for accessibility..."
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                helperText="Alt text for accessibility and SEO"
                                InputLabelProps={{
                                    style: { 
                                        color: "#94a3b8", 
                                        fontWeight: 700,
                                        fontSize: "0.95rem"
                                    },
                                }}
                                FormHelperTextProps={{
                                    sx: {
                                        color: "#64748b",
                                        fontSize: "0.85rem",
                                        mt: 1
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-input": {
                                        color: "#e2e8f0",
                                        fontSize: "1.05rem",
                                        padding: "16px 18px",
                                        fontWeight: 500,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "& fieldset": {
                                            borderColor: "rgba(148, 163, 184, 0.3)",
                                            borderWidth: "2px",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                                            "& fieldset": {
                                                borderColor: "rgba(59, 130, 246, 0.6)",
                                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                            }
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(15, 23, 42, 1)",
                                            "& fieldset": {
                                                borderColor: "#3b82f6",
                                                borderWidth: "2.5px",
                                                boxShadow: "0 0 28px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.1)",
                                            }
                                        },
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Tags (Optional)"
                                placeholder="react, next.js, javascript, web development"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                helperText="Comma-separated tags for better discoverability"
                                InputLabelProps={{
                                    style: { 
                                        color: "#94a3b8", 
                                        fontWeight: 700,
                                        fontSize: "0.95rem"
                                    },
                                }}
                                FormHelperTextProps={{
                                    sx: {
                                        color: "#64748b",
                                        fontSize: "0.85rem",
                                        mt: 1
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-input": {
                                        color: "#e2e8f0",
                                        fontSize: "1.05rem",
                                        padding: "16px 18px",
                                        fontWeight: 500,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "& fieldset": {
                                            borderColor: "rgba(148, 163, 184, 0.3)",
                                            borderWidth: "2px",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                                            "& fieldset": {
                                                borderColor: "rgba(59, 130, 246, 0.6)",
                                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                            }
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(15, 23, 42, 1)",
                                            "& fieldset": {
                                                borderColor: "#3b82f6",
                                                borderWidth: "2.5px",
                                                boxShadow: "0 0 28px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.1)",
                                            }
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Publication Settings Section */}
                    <Box
                        sx={{
                            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)",
                            borderRadius: "20px",
                            padding: { xs: "24px", sm: "28px" },
                            border: "1px solid rgba(148, 163, 184, 0.15)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#60a5fa",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                mb: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Box component="span" sx={{ fontSize: "1.3rem" }}>⚙️</Box>
                            Publication Settings
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel
                                    sx={{
                                        color: "#94a3b8",
                                        fontWeight: 700,
                                        fontSize: "0.95rem",
                                        "&.Mui-focused": {
                                            color: "#60a5fa",
                                        }
                                    }}
                                >
                                    Status
                                </InputLabel>
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    label="Status"
                                    sx={{
                                        color: "#e2e8f0",
                                        fontWeight: 600,
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        "& fieldset": {
                                            borderColor: "rgba(148, 163, 184, 0.3)",
                                            borderWidth: "2px",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                                            "& fieldset": {
                                                borderColor: "rgba(59, 130, 246, 0.6)",
                                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                            }
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(15, 23, 42, 1)",
                                            "& fieldset": {
                                                borderColor: "#3b82f6",
                                                borderWidth: "2.5px",
                                                boxShadow: "0 0 28px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.1)",
                                            }
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
                                                border: "2px solid rgba(59, 130, 246, 0.3)",
                                                borderRadius: "14px",
                                                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.5)",
                                                backdropFilter: "blur(20px)",
                                                "& .MuiMenuItem-root": {
                                                    color: "#cbd5e1",
                                                    fontWeight: 600,
                                                    padding: "12px 18px",
                                                    margin: "4px 8px",
                                                    borderRadius: "10px",
                                                    transition: "all 0.3s",
                                                    "&:hover": {
                                                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                        color: "#ffffff",
                                                        transform: "translateX(4px)",
                                                    },
                                                    "&.Mui-selected": {
                                                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)",
                                                        color: "#60a5fa",
                                                        "&:hover": {
                                                            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                            color: "#ffffff",
                                                        }
                                                    }
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="draft">📝 Draft</MenuItem>
                                    <MenuItem value="published">✅ Published</MenuItem>
                                    <MenuItem value="archived">📦 Archived</MenuItem>
                                    <MenuItem value="scheduled">⏰ Scheduled</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel
                                    sx={{
                                        color: "#94a3b8",
                                        fontWeight: 700,
                                        fontSize: "0.95rem",
                                        "&.Mui-focused": {
                                            color: "#60a5fa",
                                        }
                                    }}
                                >
                                    Difficulty Level
                                </InputLabel>
                                <Select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    label="Difficulty Level"
                                    sx={{
                                        color: "#e2e8f0",
                                        fontWeight: 600,
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        "& fieldset": {
                                            borderColor: "rgba(148, 163, 184, 0.3)",
                                            borderWidth: "2px",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                                            "& fieldset": {
                                                borderColor: "rgba(59, 130, 246, 0.6)",
                                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                            }
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(15, 23, 42, 1)",
                                            "& fieldset": {
                                                borderColor: "#3b82f6",
                                                borderWidth: "2.5px",
                                                boxShadow: "0 0 28px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.1)",
                                            }
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
                                                border: "2px solid rgba(59, 130, 246, 0.3)",
                                                borderRadius: "14px",
                                                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.5)",
                                                backdropFilter: "blur(20px)",
                                                "& .MuiMenuItem-root": {
                                                    color: "#cbd5e1",
                                                    fontWeight: 600,
                                                    padding: "12px 18px",
                                                    margin: "4px 8px",
                                                    borderRadius: "10px",
                                                    transition: "all 0.3s",
                                                    "&:hover": {
                                                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                        color: "#ffffff",
                                                        transform: "translateX(4px)",
                                                    },
                                                    "&.Mui-selected": {
                                                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)",
                                                        color: "#60a5fa",
                                                        "&:hover": {
                                                            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                            color: "#ffffff",
                                                        }
                                                    }
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="beginner">🌱 Beginner</MenuItem>
                                    <MenuItem value="intermediate">🚀 Intermediate</MenuItem>
                                    <MenuItem value="advanced">💎 Advanced</MenuItem>
                                    <MenuItem value="expert">🏆 Expert</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel
                                    sx={{
                                        color: "#94a3b8",
                                        fontWeight: 700,
                                        fontSize: "0.95rem",
                                        "&.Mui-focused": {
                                            color: "#60a5fa",
                                        }
                                    }}
                                >
                                    Language
                                </InputLabel>
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    label="Language"
                                    sx={{
                                        color: "#e2e8f0",
                                        fontWeight: 600,
                                        borderRadius: "14px",
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        "& fieldset": {
                                            borderColor: "rgba(148, 163, 184, 0.3)",
                                            borderWidth: "2px",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                                            "& fieldset": {
                                                borderColor: "rgba(59, 130, 246, 0.6)",
                                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                            }
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(15, 23, 42, 1)",
                                            "& fieldset": {
                                                borderColor: "#3b82f6",
                                                borderWidth: "2.5px",
                                                boxShadow: "0 0 28px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.1)",
                                            }
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
                                                border: "2px solid rgba(59, 130, 246, 0.3)",
                                                borderRadius: "14px",
                                                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.5)",
                                                backdropFilter: "blur(20px)",
                                                "& .MuiMenuItem-root": {
                                                    color: "#cbd5e1",
                                                    fontWeight: 600,
                                                    padding: "12px 18px",
                                                    margin: "4px 8px",
                                                    borderRadius: "10px",
                                                    transition: "all 0.3s",
                                                    "&:hover": {
                                                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                        color: "#ffffff",
                                                        transform: "translateX(4px)",
                                                    },
                                                    "&.Mui-selected": {
                                                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)",
                                                        color: "#60a5fa",
                                                        "&:hover": {
                                                            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                                            color: "#ffffff",
                                                        }
                                                    }
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="ne">🇳🇵 Nepali</MenuItem>
                                    <MenuItem value="en">🇬🇧 English</MenuItem>
                                    <MenuItem value="hi">🇮🇳 Hindi</MenuItem>
                                </Select>
                            </FormControl>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "18px 20px",
                                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)",
                                    borderRadius: "14px",
                                    border: "2px solid rgba(59, 130, 246, 0.2)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)",
                                        borderColor: "rgba(59, 130, 246, 0.4)",
                                        boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
                                    }
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Box component="span" sx={{ fontSize: "1.5rem" }}>⭐</Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: "#e2e8f0",
                                                fontWeight: 700,
                                                fontSize: "1rem",
                                                mb: 0.5
                                            }}
                                        >
                                            Feature this Post
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#94a3b8",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            Display prominently on homepage
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    component="label"
                                    sx={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "60px",
                                        height: "32px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                        style={{
                                            opacity: 0,
                                            width: 0,
                                            height: 0,
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            cursor: "pointer",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: isFeatured ? "#3b82f6" : "rgba(148, 163, 184, 0.3)",
                                            borderRadius: "32px",
                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                            boxShadow: isFeatured ? "0 0 20px rgba(59, 130, 246, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.2)" : "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                height: "24px",
                                                width: "24px",
                                                left: isFeatured ? "32px" : "4px",
                                                bottom: "4px",
                                                backgroundColor: "#ffffff",
                                                borderRadius: "50%",
                                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        padding: { xs: "24px", sm: "32px 40px" },
                        gap: 2.5,
                        background: "linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.4) 100%)",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "32px",
                            right: "32px",
                            height: "2px",
                            background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                        }
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "#f87171",
                            borderColor: "#ef4444",
                            border: "2.5px solid #ef4444",
                            fontWeight: 800,
                            padding: "14px 32px",
                            borderRadius: "16px",
                            fontSize: "1.05rem",
                            textTransform: "none",
                            letterSpacing: "0.8px",
                            background: "rgba(15, 23, 42, 0.6)",
                            backdropFilter: "blur(10px)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 4px 16px rgba(239, 68, 68, 0.2)",
                            "&:hover": {
                                backgroundColor: "rgba(239, 68, 68, 0.15)",
                                borderColor: "#dc2626",
                                color: "#fca5a5",
                                transform: "translateY(-4px)",
                                boxShadow: "0 8px 28px rgba(239, 68, 68, 0.5)",
                            },
                            "&:active": {
                                transform: "translateY(-1px)",
                                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                            }
                        }}
                        variant="outlined"
                    >
                        <Box component="span" sx={{ fontSize: "1.1rem", mr: 1 }}>✕</Box>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        sx={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                            color: "#ffffff",
                            fontWeight: 800,
                            padding: "14px 44px",
                            borderRadius: "16px",
                            border: "none",
                            fontSize: "1.05rem",
                            textTransform: "none",
                            letterSpacing: "0.8px",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 8px 28px rgba(59, 130, 246, 0.5), 0 4px 0 rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                                transition: "left 0.6s",
                            },
                            "&:hover": {
                                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
                                transform: "translateY(-6px)",
                                boxShadow: "0 12px 36px rgba(59, 130, 246, 0.7), 0 6px 0 rgba(59, 130, 246, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4)",
                                "&::before": {
                                    left: "100%",
                                }
                            },
                            "&:active": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.5), 0 2px 0 rgba(59, 130, 246, 0.3)",
                            }
                        }}
                        variant="contained"
                    >
                        <Box component="span" sx={{ fontSize: "1.2rem", mr: 1 }}>✓</Box>
                        Create Post
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
