"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Chip,
    Snackbar,
    Alert,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Paper,
    Avatar,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Business as BusinessIcon,
} from "@mui/icons-material";

const categories = {
    Transport: "यातायात",
    Textile: "कपडा उद्योग",
    Hospitality: "आतिथ्य सेवा",
    Construction: "निर्माण",
    Healthcare: "स्वास्थ्य सेवा",
    Education: "शिक्षा",
    Agriculture: "कृषि",
    Technology: "प्रविधि",
    Banking: "बैंकिङ",
    Manufacturing: "उत्पादन",
    Other: "अन्य",
};

export default function AffiliatesAdmin() {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingAffiliate, setEditingAffiliate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        nameEn: "",
        category: "",
        categoryNp: "",
        logo: "",
        description: "",
        members: "",
        location: "",
        phone: "",
        email: "",
        website: "",
        established: "",
        displayOrder: 0,
        isActive: true,
    });

    useEffect(() => {
        fetchAffiliates();
    }, [page, searchTerm, filterCategory]);

    const fetchAffiliates = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                ...(searchTerm && { search: searchTerm }),
                ...(filterCategory && { category: filterCategory }),
            });

            const response = await fetch(`/api/admin/affiliates?${params}`);
            const data = await response.json();

            if (data.success) {
                setAffiliates(data.data);
                setTotalPages(data.pagination.pages);
            } else {
                showSnackbar("Failed to load affiliates", "error");
            }
        } catch (error) {
            console.error("Error fetching affiliates:", error);
            showSnackbar("Error loading affiliates", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (affiliate = null) => {
        if (affiliate) {
            setEditingAffiliate(affiliate);
            setFormData(affiliate);
        } else {
            setEditingAffiliate(null);
            setFormData({
                name: "",
                nameEn: "",
                category: "",
                categoryNp: "",
                logo: "",
                description: "",
                members: "",
                location: "",
                phone: "",
                email: "",
                website: "",
                established: "",
                displayOrder: 0,
                isActive: true,
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingAffiliate(null);
    };

    const handleSave = async () => {
        try {
            const url = editingAffiliate
                ? `/api/admin/affiliates/${editingAffiliate._id}`
                : "/api/admin/affiliates";

            const method = editingAffiliate ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                showSnackbar(
                    editingAffiliate
                        ? "Affiliate updated successfully"
                        : "Affiliate created successfully",
                    "success"
                );
                handleCloseDialog();
                fetchAffiliates();
            } else {
                showSnackbar(data.error || "Failed to save affiliate", "error");
            }
        } catch (error) {
            console.error("Error saving affiliate:", error);
            showSnackbar("Error saving affiliate", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this affiliate?")) return;

        try {
            const response = await fetch(`/api/admin/affiliates/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                showSnackbar("Affiliate deleted successfully", "success");
                fetchAffiliates();
            } else {
                showSnackbar(data.error || "Failed to delete affiliate", "error");
            }
        } catch (error) {
            console.error("Error deleting affiliate:", error);
            showSnackbar("Error deleting affiliate", "error");
        }
    };

    const handleCategoryChange = (value) => {
        setFormData({
            ...formData,
            category: value,
            categoryNp: categories[value] || "",
        });
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const getCategoryColor = (category) => {
        const colors = {
            Transport: "#2196f3",
            Textile: "#e91e63",
            Hospitality: "#ff9800",
            Construction: "#795548",
            Healthcare: "#4caf50",
            Education: "#9c27b0",
            Agriculture: "#8bc34a",
            Technology: "#00bcd4",
            Banking: "#607d8b",
        };
        return colors[category] || "#667eea";
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" fontWeight={600}>
                    सम्बद्ध संगठन व्यवस्थापन / Affiliates Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #5568d3 0%, #6a3f92 100%)",
                        },
                    }}
                >
                    Add Affiliate
                </Button>
            </Box>

            {/* Search and Filter */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder="Search affiliates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Filter by Category</InputLabel>
                            <Select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                label="Filter by Category"
                            >
                                <MenuItem value="">All Categories</MenuItem>
                                {Object.keys(categories).map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {categories[cat]} ({cat})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Affiliates List */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : affiliates.length === 0 ? (
                <Paper sx={{ p: 8, textAlign: "center" }}>
                    <BusinessIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No affiliates found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Click "Add Affiliate" to create your first affiliate organization
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {affiliates.map((affiliate) => (
                        <Grid item xs={12} md={6} lg={4} key={affiliate._id}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <Box
                                    sx={{
                                        height: 80,
                                        background: `linear-gradient(135deg, ${getCategoryColor(affiliate.category)} 0%, ${getCategoryColor(affiliate.category)}dd 100%)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative",
                                    }}
                                >
                                    <BusinessIcon sx={{ fontSize: 40, color: "white", opacity: 0.9 }} />
                                    <Chip
                                        label={affiliate.categoryNp}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            bgcolor: "rgba(255,255,255,0.3)",
                                            color: "white",
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        {affiliate.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: "italic" }}>
                                        {affiliate.nameEn}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2, minHeight: 40 }}>
                                        {affiliate.description.substring(0, 100)}...
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                        <Chip label={`${affiliate.members} members`} size="small" />
                                        <Chip
                                            label={affiliate.isActive ? "Active" : "Inactive"}
                                            size="small"
                                            color={affiliate.isActive ? "success" : "default"}
                                        />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        📍 {affiliate.location} | 📅 {affiliate.established}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0, display: "flex", gap: 1 }}>
                                    <Button
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleOpenDialog(affiliate)}
                                    >
                                        Edit
                                    </Button>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(affiliate._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingAffiliate ? "Edit Affiliate" : "Add New Affiliate"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Organization Name (Nepali)"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Organization Name (English)"
                                value={formData.nameEn}
                                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={formData.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    label="Category"
                                >
                                    {Object.keys(categories).map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {categories[cat]} ({cat})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Category (Nepali)"
                                value={formData.categoryNp}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Description (Nepali)"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Members Count"
                                placeholder="e.g., 50,000+"
                                value={formData.members}
                                onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Established Year (Nepali)"
                                placeholder="e.g., २०७०"
                                value={formData.established}
                                onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Location (Nepali)"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Website"
                                placeholder="www.example.org.np"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Logo URL"
                                value={formData.logo}
                                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Display Order"
                                value={formData.displayOrder}
                                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                    >
                        {editingAffiliate ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
