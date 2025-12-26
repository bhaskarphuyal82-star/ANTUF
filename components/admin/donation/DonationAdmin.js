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
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
    IconButton,
    Divider,
} from "@mui/material";
import {
    Save as SaveIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

export default function DonationAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const [formData, setFormData] = useState({
        headerTitle: "",
        headerTitleEn: "",
        headerSubtitle: "",
        impactItems: [],
        bankDetails: {
            bankName: "",
            accountName: "",
            accountNumber: "",
            branch: "",
        },
        contactEmail: "",
        contactPhone: "",
        helpText: "",
    });

    useEffect(() => {
        fetchDonationPage();
    }, []);

    const fetchDonationPage = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/admin/donation");
            const data = await response.json();

            if (data.success) {
                setFormData(data.data);
            } else {
                showSnackbar("Failed to load donation page", "error");
            }
        } catch (error) {
            console.error("Error fetching donation page:", error);
            showSnackbar("Error loading donation page", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await fetch("/api/admin/donation", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                showSnackbar("Donation page updated successfully", "success");
                setFormData(data.data);
            } else {
                showSnackbar(data.error || "Failed to save donation page", "error");
            }
        } catch (error) {
            console.error("Error saving donation page:", error);
            showSnackbar("Error saving donation page", "error");
        } finally {
            setSaving(false);
        }
    };

    const addImpactItem = () => {
        setFormData({
            ...formData,
            impactItems: [...formData.impactItems, { amount: 0, description: "" }],
        });
    };

    const removeImpactItem = (index) => {
        setFormData({
            ...formData,
            impactItems: formData.impactItems.filter((_, i) => i !== index),
        });
    };

    const updateImpactItem = (index, field, value) => {
        const updated = [...formData.impactItems];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, impactItems: updated });
    };

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" fontWeight={600}>
                    दान पृष्ठ व्यवस्थापन / Donation Page Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #5568d3 0%, #6a3f92 100%)",
                        },
                    }}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Header Content */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Header Content
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Title (Nepali)"
                                    value={formData.headerTitle}
                                    onChange={(e) => setFormData({ ...formData, headerTitle: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Title (English)"
                                    value={formData.headerTitleEn}
                                    onChange={(e) => setFormData({ ...formData, headerTitleEn: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Subtitle/Description"
                                    value={formData.headerSubtitle}
                                    onChange={(e) => setFormData({ ...formData, headerSubtitle: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Impact Items */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="h6" fontWeight={600}>
                                Impact Items
                            </Typography>
                            <Button startIcon={<AddIcon />} onClick={addImpactItem} variant="outlined">
                                Add Impact
                            </Button>
                        </Box>
                        {formData.impactItems?.map((item, index) => (
                            <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: "#f9fafb" }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Amount (NPR)"
                                            value={item.amount}
                                            onChange={(e) => updateImpactItem(index, "amount", Number(e.target.value))}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            value={item.description}
                                            onChange={(e) => updateImpactItem(index, "description", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <IconButton color="error" onClick={() => removeImpactItem(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Card>
                </Grid>

                {/* Bank Details */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Bank Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Bank Name"
                                    value={formData.bankDetails?.bankName || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bankDetails: { ...formData.bankDetails, bankName: e.target.value },
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Account Name"
                                    value={formData.bankDetails?.accountName || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bankDetails: { ...formData.bankDetails, accountName: e.target.value },
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Account Number"
                                    value={formData.bankDetails?.accountNumber || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bankDetails: { ...formData.bankDetails, accountNumber: e.target.value },
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Branch"
                                    value={formData.bankDetails?.branch || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bankDetails: { ...formData.bankDetails, branch: e.target.value },
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Contact Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Email"
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Phone"
                                    value={formData.contactPhone}
                                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Help Text"
                                    value={formData.helpText}
                                    onChange={(e) => setFormData({ ...formData, helpText: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

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
