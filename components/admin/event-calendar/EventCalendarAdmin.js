"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Sidebar from "@/components/sidebar/SideBar";
import NepaliDatePicker from "@/components/admin/event-calendar/NepaliDatePicker";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";

const EventCalendarAdmin = () => {
  const { data: session, status } = useSession({ required: true });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updating, setUpdating] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    ongoing: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchEvents();
  }, [filterCategory, filterStatus]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterCategory !== "all") params.append("category", filterCategory);
      if (filterStatus !== "all") params.append("status", filterStatus);

      const response = await fetch(`/api/admin/events?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data.data || []);

      // Calculate stats
      const allEvents = data.data || [];
      setStats({
        total: allEvents.length,
        upcoming: allEvents.filter((e) => e.status === "upcoming").length,
        ongoing: allEvents.filter((e) => e.status === "ongoing").length,
        completed: allEvents.filter((e) => e.status === "completed").length,
      });
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (event = null) => {
    const today = new Date().toISOString();
    setSelectedEvent(
      event || {
        title: "",
        titleNepali: "",
        description: "",
        descriptionNepali: "",
        startDate: today,
        endDate: today,
        time: "",
        location: "",
        locationNepali: "",
        category: "other",
        image: "",
        capacity: "",
        status: "upcoming",
        isPublished: true,
        isFeatured: false,
        organizer: { name: "", email: "", phone: "" },
        tags: [],
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async () => {
    try {
      setUpdating(true);

      if (!selectedEvent.title || !selectedEvent.titleNepali || !selectedEvent.startDate || !selectedEvent.endDate) {
        toast.error("Please fill in all required fields");
        return;
      }

      const url = selectedEvent._id
        ? `/api/admin/events/${selectedEvent._id}`
        : `/api/admin/events`;

      const method = selectedEvent._id ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(selectedEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to save event");
      }

      const data = await response.json();
      toast.success(selectedEvent._id ? "Event updated successfully" : "Event created successfully");
      handleCloseDialog();
      fetchEvents();
    } catch (err) {
      console.error("Error saving event:", err);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      setUpdating(true);
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "info",
      ongoing: "warning",
      completed: "success",
      cancelled: "error",
    };
    return colors[status] || "default";
  };

  const getCategoryColor = (category) => {
    const colors = {
      workshop: "primary",
      seminar: "secondary",
      training: "info",
      conference: "success",
      social: "warning",
      sports: "error",
      cultural: "default",
      other: "default",
    };
    return colors[category] || "default";
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "green", minHeight: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(45deg, #FF6B6B 30%,rgb(203, 170, 9) 90%)",
            p: 3,
            borderRadius: 2,
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ color: "black", fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
              <EventNoteIcon /> कार्यक्रम क्यालेन्डर
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
              Event Calendar Management
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: "red",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            नयाँ कार्यक्रम
          </Button>
        </Box>

        {/* Statistics */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "#1E1E1E", color: "white", textAlign: "center" }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                  कुल कार्यक्रम
                </Typography>
                <Typography variant="h5">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "rgba(33,150,243,0.1)", color: "white", textAlign: "center" }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                  आसन्न
                </Typography>
                <Typography variant="h5">{stats.upcoming}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "rgba(255,193,7,0.1)", color: "white", textAlign: "center" }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                  चलमान
                </Typography>
                <Typography variant="h5">{stats.ongoing}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "rgba(76,175,80,0.1)", color: "white", textAlign: "center" }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                  पूरा भएको
                </Typography>
                <Typography variant="h5">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: "white" }}>श्रेणी</InputLabel>
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              label="श्रेणी"
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.23)",
                },
              }}
            >
              <MenuItem value="all">सबै श्रेणी</MenuItem>
              <MenuItem value="workshop">कार्यशाला</MenuItem>
              <MenuItem value="seminar">सेमिनार</MenuItem>
              <MenuItem value="training">प्रशिक्षण</MenuItem>
              <MenuItem value="conference">सम्मेलन</MenuItem>
              <MenuItem value="social">सामाजिक</MenuItem>
              <MenuItem value="sports">खेलकुद</MenuItem>
              <MenuItem value="cultural">सांस्कृतिक</MenuItem>
              <MenuItem value="other">अन्य</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: "white" }}>स्थिति</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="स्थिति"
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.23)",
                },
              }}
            >
              <MenuItem value="all">सबै स्थिति</MenuItem>
              <MenuItem value="upcoming">आसन्न</MenuItem>
              <MenuItem value="ongoing">चलमान</MenuItem>
              <MenuItem value="completed">पूरा भएको</MenuItem>
              <MenuItem value="cancelled">रद्द</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Events Table */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ bgcolor: "red" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#252525" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>कार्यक्रम</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>मिति</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>श्रेणी</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>स्थिति</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>कार्य</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: "center", color: "white", py: 4 }}>
                      कुनै कार्यक्रम नभेटियो
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event._id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}>
                      <TableCell sx={{ color: "white" }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {event.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                            {event.titleNepali}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <Typography variant="body2">{formatDate(event.startDate)}</Typography>
                        {event.time && (
                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                            {event.time}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={event.category}
                          size="small"
                          color={getCategoryColor(event.category)}
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={event.status}
                          size="small"
                          color={getStatusColor(event.status)}
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleOpenDialog(event)}
                            sx={{ color: "#00ff88" }}
                          >
                            सम्पादन
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteEvent(event._id)}
                            sx={{ color: "#ff4444" }}
                          >
                            हटाउनु
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Event Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ bgcolor: "red", color: "white" }}>
            {selectedEvent?._id ? "कार्यक्रम सम्पादन गर्नुहोस्" : "नयाँ कार्यक्रम सिर्जना गर्नुहोस्"}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "white", color: "white", mt: 2 }}>
            <Stack spacing={2}>
              {/* English Title */}
              <TextField
                fullWidth
                label="Event Title (English)"
                value={selectedEvent?.title || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Nepali Title */}
              <TextField
                fullWidth
                label="कार्यक्रमको नाम (नेपाली)"
                value={selectedEvent?.titleNepali || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, titleNepali: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* English Description */}
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description (English)"
                value={selectedEvent?.description || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Nepali Description */}
              <TextField
                fullWidth
                multiline
                rows={3}
                label="विवरण (नेपाली)"
                value={selectedEvent?.descriptionNepali || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, descriptionNepali: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "white" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Start Date - Nepali Calendar */}
              <NepaliDatePicker
                label="शुरुआत मिति (नेपाली मिति)"
                value={selectedEvent?.startDate || ""}
                onChange={(newDate) => setSelectedEvent({ ...selectedEvent, startDate: newDate })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* End Date - Nepali Calendar */}
              <NepaliDatePicker
                label="अन्त्य मिति (नेपाली मिति)"
                value={selectedEvent?.endDate || ""}
                onChange={(newDate) => setSelectedEvent({ ...selectedEvent, endDate: newDate })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Location */}
              <TextField
                fullWidth
                label="Location (English)"
                value={selectedEvent?.location || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Nepali Location */}
              <TextField
                fullWidth
                label="स्थान (नेपाली)"
                value={selectedEvent?.locationNepali || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, locationNepali: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Category */}
              <FormControl fullWidth>
                <InputLabel sx={{ color: "black" }}>श्रेणी</InputLabel>
                <Select
                  value={selectedEvent?.category || "other"}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, category: e.target.value })}
                  label="श्रेणी"
                  sx={{
                    color: "black",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                  }}
                >
                  <MenuItem value="workshop">कार्यशाला</MenuItem>
                  <MenuItem value="seminar">सेमिनार</MenuItem>
                  <MenuItem value="training">प्रशिक्षण</MenuItem>
                  <MenuItem value="conference">सम्मेलन</MenuItem>
                  <MenuItem value="social">सामाजिक</MenuItem>
                  <MenuItem value="sports">खेलकुद</MenuItem>
                  <MenuItem value="cultural">सांस्कृतिक</MenuItem>
                  <MenuItem value="other">अन्य</MenuItem>
                </Select>
              </FormControl>

              {/* Status */}
              <FormControl fullWidth>
                <InputLabel sx={{ color: "black" }}>स्थिति</InputLabel>
                <Select
                  value={selectedEvent?.status || "upcoming"}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })}
                  label="स्थिति"
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                  }}
                >
                  <MenuItem value="upcoming">आसन्न</MenuItem>
                  <MenuItem value="ongoing">चलमान</MenuItem>
                  <MenuItem value="completed">पूरा भएको</MenuItem>
                  <MenuItem value="cancelled">रद्द</MenuItem>
                </Select>
              </FormControl>

              {/* Capacity */}
              <TextField
                fullWidth
                type="number"
                label="क्षमता"
                value={selectedEvent?.capacity || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, capacity: parseInt(e.target.value) || "" })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "black" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Image URL */}
              <TextField
                fullWidth
                label="Image URL"
                value={selectedEvent?.image || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, image: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { color: "white" },
                  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)", opacity: 1 },
                }}
              />

              {/* Checkboxes */}
              <Box sx={{ display: "flex", gap: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedEvent?.isPublished || false}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, isPublished: e.target.checked })}
                      sx={{ color: "#FF6B6B" }}
                    />
                  }
                  label="प्रकाशित"
                  sx={{ color: "white" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedEvent?.isFeatured || false}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, isFeatured: e.target.checked })}
                      sx={{ color: "#FFE66D" }}
                    />
                  }
                  label="विशेष"
                  sx={{ color: "white" }}
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#1E1E1E", p: 2 }}>
            <Button onClick={handleCloseDialog} sx={{ color: "white" }}>
              रद्द गर्नुहोस्
            </Button>
            <Button
              onClick={handleSaveEvent}
              disabled={updating}
              variant="contained"
              sx={{ background: "linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)", color: "black" }}
            >
              {updating ? <CircularProgress size={20} /> : "बचत गर्नुहोस्"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default EventCalendarAdmin;
