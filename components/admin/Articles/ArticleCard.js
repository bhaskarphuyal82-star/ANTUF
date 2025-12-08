"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SourceIcon from "@mui/icons-material/Source";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";

import { useRouter } from "next/navigation";

const ArticleCard = () => {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/admin/Article`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      console.log("Fetched articles with categories:", data);
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Error fetching content!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOpen = (content) => {
    setCurrentContent(content);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      setActionLoading(true);
      const response = await fetch(
        `${process.env.API}/admin/Article/${currentContent?._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setContent((prev) =>
          prev.filter((content) => content?._id !== currentContent?._id)
        );
        toast.success("Article deleted successfully!");
        setDeleteOpen(false);
      } else {
        toast.error("Failed to delete content");
      }
    } catch (error) {
      toast.error("Error deleting content!");
      console.log("Error in Deleting DELETE PATH------", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditOpen = (content) => {
    setCurrentContent(content);
    setNewTitle(content?.title);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = async () => {
    try {
      setActionLoading(true);
      const response = await fetch(
        `${process.env.API}/admin/Article/${currentContent?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );

      if (response.ok) {
        const updatedContent = await response.json();
        setContent((prev) =>
          prev.map((content) =>
            content?._id === updatedContent?._id ? updatedContent : content
          )
        );
        toast.success("Article updated successfully");
        setEditOpen(false);
      } else {
        toast.error("Failed to update content!");
      }
    } catch (error) {
      toast.error("Error updating content");
      console.log("Error updating Handle Edit Save", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mx: { xs: 1, sm: 2, md: 3 },
          mt: 3,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchContent}
          disabled={loading}
          sx={{
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            color: "#ffffff",
            fontWeight: 700,
            padding: "12px 28px",
            borderRadius: "14px",
            textTransform: "none",
            letterSpacing: "0.5px",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
            },
            "&:disabled": {
              background: "rgba(59, 130, 246, 0.3)",
            }
          }}
        >
          {loading ? <CircularProgress color="inherit" size={20} /> : "🔄 Refresh Posts"}
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          mx: { xs: 1, sm: 2, md: 3 },
          mb: 4,
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)",
          }
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
                borderBottom: "2px solid rgba(59, 130, 246, 0.3)",
              }}
            >
              <TableCell
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                Image
              </TableCell>
              <TableCell
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                Post Title
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                Category
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                Tags
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                Info
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#60a5fa",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  py: 2.5,
                  borderBottom: "none",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content.map((item, index) => (
              <TableRow
                key={item?._id}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                sx={{
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
                  "&:hover": {
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
                    transform: "scale(1.01)",
                    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.2)",
                  },
                  "&:last-child td": {
                    borderBottom: "none",
                  }
                }}
              >
                <TableCell
                  sx={{
                    color: "#94a3b8",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    borderBottom: "none",
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell sx={{ borderBottom: "none", py: 2 }}>
                  <Avatar
                    src={item?.featureImage || "https://placehold.co/600x400"}
                    alt={item?.imageAlt || item?.title}
                    variant="rounded"
                    sx={{
                      width: 80,
                      height: 80,
                      border: "2px solid rgba(59, 130, 246, 0.4)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.15) rotate(3deg)",
                        boxShadow: "0 12px 32px rgba(59, 130, 246, 0.4)",
                        border: "2px solid rgba(59, 130, 246, 0.6)",
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: "none", maxWidth: "400px" }}>
                  <Typography
                    sx={{
                      color: "#e2e8f0",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item?.title}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "none" }}>
                  <Chip
                    label={item?.category?.name || "Uncategorized"}
                    icon={<Box component="span" sx={{ fontSize: "1.1rem", ml: 1 }}>📁</Box>}
                    sx={{
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                      color: "#60a5fa",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      border: "1px solid rgba(59, 130, 246, 0.4)",
                      backdropFilter: "blur(10px)",
                      px: 1,
                      "& .MuiChip-label": {
                        px: 1.5,
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "none" }}>
                  <Chip
                    label={item?.status || "draft"}
                    icon={
                      <Box component="span" sx={{ fontSize: "1.1rem", ml: 1 }}>
                        {item?.status === "published" ? "✅" : 
                         item?.status === "archived" ? "📦" :
                         item?.status === "scheduled" ? "⏰" : "📝"}
                      </Box>
                    }
                    sx={{
                      background: 
                        item?.status === "published" ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)" :
                        item?.status === "archived" ? "linear-gradient(135deg, rgba(107, 114, 128, 0.2) 0%, rgba(75, 85, 99, 0.2) 100%)" :
                        item?.status === "scheduled" ? "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)" :
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)",
                      color: 
                        item?.status === "published" ? "#10b981" :
                        item?.status === "archived" ? "#9ca3af" :
                        item?.status === "scheduled" ? "#f59e0b" :
                        "#60a5fa",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      textTransform: "capitalize",
                      border: 
                        item?.status === "published" ? "1px solid rgba(16, 185, 129, 0.4)" :
                        item?.status === "archived" ? "1px solid rgba(107, 114, 128, 0.4)" :
                        item?.status === "scheduled" ? "1px solid rgba(245, 158, 11, 0.4)" :
                        "1px solid rgba(59, 130, 246, 0.4)",
                      backdropFilter: "blur(10px)",
                      px: 0.5,
                      "& .MuiChip-label": {
                        px: 1.5,
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "none", maxWidth: "200px" }}>
                  {item?.tags && item?.tags.length > 0 ? (
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
                      {item?.tags.slice(0, 2).map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            background: "rgba(139, 92, 246, 0.15)",
                            color: "#c4b5fd",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            height: "24px",
                            "& .MuiChip-label": {
                              px: 1,
                            }
                          }}
                        />
                      ))}
                      {item?.tags.length > 2 && (
                        <Chip
                          label={`+${item?.tags.length - 2}`}
                          size="small"
                          sx={{
                            background: "rgba(59, 130, 246, 0.15)",
                            color: "#93c5fd",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            height: "24px",
                            minWidth: "32px",
                            "& .MuiChip-label": {
                              px: 0.5,
                            }
                          }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Typography sx={{ color: "#64748b", fontSize: "0.85rem", fontStyle: "italic" }}>
                      No tags
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "none" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
                    {item?.isFeatured && (
                      <Chip
                        label="Featured"
                        icon={<Box component="span" sx={{ fontSize: "0.9rem", ml: 0.5 }}>⭐</Box>}
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)",
                          color: "#fbbf24",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          border: "1px solid rgba(251, 191, 36, 0.4)",
                          height: "24px",
                          "& .MuiChip-label": {
                            px: 1,
                          }
                        }}
                      />
                    )}
                    <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                      <Chip
                        label={item?.difficulty || "beginner"}
                        size="small"
                        icon={
                          <Box component="span" sx={{ fontSize: "0.9rem", ml: 0.5 }}>
                            {item?.difficulty === "expert" ? "🏆" :
                             item?.difficulty === "advanced" ? "💎" :
                             item?.difficulty === "intermediate" ? "🚀" : "🌱"}
                          </Box>
                        }
                        sx={{
                          background: "rgba(96, 165, 250, 0.15)",
                          color: "#60a5fa",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          textTransform: "capitalize",
                          border: "1px solid rgba(96, 165, 250, 0.3)",
                          height: "24px",
                          "& .MuiChip-label": {
                            px: 1,
                          }
                        }}
                      />
                      <Chip
                        label={item?.language === "ne" ? "🇳🇵" : item?.language === "hi" ? "🇮🇳" : "🇬🇧"}
                        size="small"
                        sx={{
                          background: "rgba(203, 213, 225, 0.1)",
                          color: "#cbd5e1",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          border: "1px solid rgba(203, 213, 225, 0.2)",
                          height: "24px",
                          minWidth: "40px",
                          "& .MuiChip-label": {
                            px: 0.5,
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "none" }}>
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Tooltip title="Edit Content" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "#ffffff",
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                          "&:hover": {
                            transform: "translateY(-3px) rotate(5deg)",
                            boxShadow: "0 6px 16px rgba(16, 185, 129, 0.5)",
                          },
                        }}
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/create/post/articleeditorcontent?search=${item._id}`
                          )
                        }
                      >
                        <SourceIcon sx={{ fontSize: "1.2rem" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Title" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                          color: "#ffffff",
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                          "&:hover": {
                            transform: "translateY(-3px) rotate(-5deg)",
                            boxShadow: "0 6px 16px rgba(59, 130, 246, 0.5)",
                          },
                        }}
                        onClick={() => handleEditOpen(item)}
                      >
                        <EditIcon sx={{ fontSize: "1.2rem" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Post" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                          color: "#ffffff",
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                          "&:hover": {
                            transform: "translateY(-3px) scale(1.05)",
                            boxShadow: "0 6px 16px rgba(239, 68, 68, 0.5)",
                          },
                        }}
                        onClick={() => handleDeleteOpen(item)}
                      >
                        <DeleteForeverIcon sx={{ fontSize: "1.2rem" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        PaperProps={{
          sx: {
            background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          },
        }}
        open={editOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "1.5rem",
            padding: "24px 28px",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          ✏️ Edit Post Title
        </DialogTitle>

        <DialogContent
          sx={{
            padding: "32px 28px",
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.6) 100%)",
          }}
        >
          <TextField
            fullWidth
            label="Post Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
            InputLabelProps={{
              sx: {
                color: "#94a3b8",
                fontWeight: 700,
              },
            }}
            sx={{
              mt: 1,
              "& .MuiInputBase-input": {
                color: "#e2e8f0",
                fontSize: "1.1rem",
                padding: "16px 18px",
                fontWeight: 600,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                "& fieldset": {
                  borderColor: "rgba(148, 163, 184, 0.3)",
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(59, 130, 246, 0.5)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                  borderWidth: "2.5px",
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
                },
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            padding: "20px 28px",
            gap: 2,
            borderTop: "2px solid rgba(59, 130, 246, 0.2)",
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.8) 100%)",
          }}
        >
          <Button
            onClick={handleEditClose}
            sx={{
              color: "#f87171",
              borderColor: "#ef4444",
              border: "2.5px solid #ef4444",
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: "12px",
              textTransform: "none",
              background: "rgba(15, 23, 42, 0.4)",
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderColor: "#dc2626",
                transform: "translateY(-2px)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleEditSave}
            disabled={actionLoading}
            sx={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              color: "#ffffff",
              fontWeight: 700,
              padding: "10px 28px",
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
              },
              "&:disabled": {
                background: "rgba(59, 130, 246, 0.3)",
              },
            }}
          >
            {actionLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "💾 Save Changes"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          sx: {
            background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "2px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 25px 80px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          },
        }}
        open={deleteOpen}
        onClose={handleDeleteClose}
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "1.5rem",
            padding: "24px 28px",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box component="span" sx={{ fontSize: "2rem" }}>⚠️</Box>
          Delete Post
        </DialogTitle>
        
        <DialogContent
          sx={{
            padding: "32px 28px",
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.6) 100%)",
          }}
        >
          <Typography
            sx={{
              color: "#cbd5e1",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Are you sure you want to permanently delete{" "}
            <Box
              component="span"
              sx={{
                color: "#60a5fa",
                fontWeight: 700,
                display: "block",
                mt: 1.5,
                p: 2,
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(59, 130, 246, 0.3)",
              }}
            >
              "{currentContent?.title}"
            </Box>
            <Box component="span" sx={{ display: "block", mt: 2, color: "#f87171", fontWeight: 600 }}>
              This action cannot be undone.
            </Box>
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            padding: "20px 28px",
            gap: 2,
            borderTop: "2px solid rgba(239, 68, 68, 0.2)",
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.8) 100%)",
          }}
        >
          <Button
            onClick={handleDeleteClose}
            sx={{
              color: "#94a3b8",
              borderColor: "#475569",
              border: "2.5px solid #475569",
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: "12px",
              textTransform: "none",
              background: "rgba(15, 23, 42, 0.4)",
              "&:hover": {
                backgroundColor: "rgba(71, 85, 105, 0.2)",
                borderColor: "#64748b",
                color: "#cbd5e1",
                transform: "translateY(-2px)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            disabled={actionLoading}
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "#ffffff",
              fontWeight: 700,
              padding: "10px 28px",
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(239, 68, 68, 0.6)",
              },
              "&:disabled": {
                background: "rgba(239, 68, 68, 0.3)",
              },
            }}
          >
            {actionLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "🗑️ Delete Forever"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ArticleCard;
