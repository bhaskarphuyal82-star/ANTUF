"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  Grid,
  Menu,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AdminChat = () => {
  const { data: session } = useSession();
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openVideoCall, setOpenVideoCall] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [quickResponses] = useState([
    "Thank you for contacting us. How can I help you today?",
    "I understand your concern. Let me look into this for you.",
    "This has been resolved. Is there anything else I can help with?",
    "Your request has been forwarded to the appropriate team.",
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchChats();
      const interval = setInterval(fetchChats, 3000); // Poll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let interval;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chat");
      if (response.ok) {
        const data = await response.json();
        setChatRooms(data);
        
        // Calculate unread messages
        const unread = data.reduce((acc, chat) => {
          const unreadMessages = chat.messages.filter(
            (msg) => !msg.isRead && msg.senderRole !== "admin"
          );
          return acc + unreadMessages.length;
        }, 0);
        setUnreadCount(unread);
        
        // Update selected chat if it exists
        if (selectedChat) {
          const updated = data.find((c) => c._id === selectedChat._id);
          if (updated) {
            setSelectedChat(updated);
            setMessages(updated.messages);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleSelectChat = (chatRoom) => {
    setSelectedChat(chatRoom);
    setMessages(chatRoom.messages);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;

    try {
      const response = await fetch(`/api/chat/${selectedChat._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageInput,
        }),
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setSelectedChat(updatedChat);
        setMessages(updatedChat.messages);
        setMessageInput("");
        toast.success("Message sent");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedChat) return;

    try {
      const response = await fetch(`/api/chat/${selectedChat._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setSelectedChat(updatedChat);
        setChatRooms(
          chatRooms.map((c) => (c._id === updatedChat._id ? updatedChat : c))
        );
        toast.success(`Chat ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleAssignChat = async (adminId) => {
    if (!selectedChat) return;

    try {
      const response = await fetch(`/api/chat/${selectedChat._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId }),
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setSelectedChat(updatedChat);
        setChatRooms(
          chatRooms.map((c) => (c._id === updatedChat._id ? updatedChat : c))
        );
        setOpenAssign(false);
        toast.success("Chat assigned");
      }
    } catch (error) {
      console.error("Error assigning chat:", error);
      toast.error("Failed to assign chat");
    }
  };

  const filteredChats = chatRooms.filter((chat) => {
    let matchesStatus = filterStatus === "all" || chat.status === filterStatus;
    let matchesPriority = filterPriority === "all" || chat.priority === filterPriority;
    let matchesSearch = searchQuery === "" || 
      chat.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const stats = {
    total: chatRooms.length,
    active: chatRooms.filter((c) => c.status === "active").length,
    closed: chatRooms.filter((c) => c.status === "closed").length,
    urgent: chatRooms.filter((c) => c.priority === "urgent").length,
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "success",
      closed: "error",
      archived: "warning",
    };
    return colors[status] || "default";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "info",
      medium: "warning",
      high: "error",
      urgent: "error",
    };
    return colors[priority] || "default";
  };

  const handleStartVideoCall = () => {
    setOpenVideoCall(true);
    setIsCallActive(true);
    setCallDuration(0);
    toast.success("Video call started");
  };

  const handleEndVideoCall = () => {
    setOpenVideoCall(false);
    setIsCallActive(false);
    setCallDuration(0);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
    setIsFullscreen(false);
    toast.info("Video call ended");
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast.info(isVideoEnabled ? "Camera turned off" : "Camera turned on");
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast.info(isAudioEnabled ? "Microphone muted" : "Microphone unmuted");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "calc(100vh - 64px)" }}>
      {/* Stats Dashboard */}
      <Box sx={{ p: 3, bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1a1a2e" }}>
          Support Chat Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                      {stats.total}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                      Total Chats
                    </Typography>
                  </Box>
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsActiveIcon sx={{ fontSize: 40, color: "white" }} />
                  </Badge>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "#4caf50" }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                  {stats.active}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                  Active Chats
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "#ff9800" }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                  {stats.urgent}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                  Urgent
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "#9e9e9e" }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                  {stats.closed}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                  Closed Chats
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", height: "calc(100vh - 250px)" }}>
      {/* Chat List */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          borderRight: "1px solid #e0e0e0",
          overflowY: "auto",
          bgcolor: "white",
          display: selectedChat && window.innerWidth < 960 ? "none" : "block",
        }}
      >
        <Box sx={{ p: 2, position: "sticky", top: 0, bgcolor: "white", zIndex: 10, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ color: "#1a1a2e", mb: 2, fontWeight: 700 }}>
            Support Tickets
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} new`}
                size="small"
                color="error"
                sx={{ ml: 2 }}
              />
            )}
          </Typography>
          
          {/* Search Bar */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#666", mr: 1 }} />,
            }}
            sx={{ mb: 2 }}
          />
          
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel sx={{ color: "white" }}>Status</InputLabel>                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  label="Priority"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="all">All Priority</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredChats.length === 0 ? (
          <Typography sx={{ p: 4, color: "#999", textAlign: "center" }}>
            No chats found
          </Typography>
        ) : (
          filteredChats.map((chat) => {
            const unreadMessages = chat.messages.filter(
              (msg) => !msg.isRead && msg.senderRole !== "admin"
            ).length;
            
            return (
              <Card
                key={chat._id}
                onClick={() => handleSelectChat(chat)}
                sx={{
                  m: 1.5,
                  cursor: "pointer",
                  bgcolor: selectedChat?._id === chat._id ? "#e3f2fd" : "white",
                  border: selectedChat?._id === chat._id ? "2px solid #2196F3" : "1px solid #e0e0e0",
                  "&:hover": { bgcolor: "#f5f5f5", boxShadow: 2 },
                  transition: "all 0.2s",
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                    <Badge badgeContent={unreadMessages} color="error">
                      <Avatar src={chat.userImage} sx={{ width: 45, height: 45 }}>
                        {chat.userName?.[0]}
                      </Avatar>
                    </Badge>
                    <Box sx={{ flex: 1, overflow: "hidden" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#1a1a2e",
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chat.userName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ 
                          color: "#666",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chat.subject}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={chat.status}
                      size="small"
                      color={getStatusColor(chat.status)}
                      sx={{ height: 22, fontSize: "0.75rem" }}
                    />
                    <Chip
                      label={chat.priority}
                      size="small"
                      color={getPriorityColor(chat.priority)}
                      sx={{ height: 22, fontSize: "0.75rem" }}
                    />
                    {chat.category && (
                      <Chip
                        label={chat.category}
                        size="small"
                        variant="outlined"
                        sx={{ height: 22, fontSize: "0.75rem" }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>

      {/* Chat Window */}
      {selectedChat && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "#fafafa" }}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={selectedChat.userImage} sx={{ width: 48, height: 48 }}>
                {selectedChat.userName?.[0]}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: "#1a1a2e", fontWeight: 700 }}>
                  {selectedChat.userName}
                </Typography>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  {selectedChat.subject} • {selectedChat.category}
                </Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Start Video Call">
                <IconButton
                  size="small"
                  onClick={handleStartVideoCall}
                  sx={{ 
                    color: "#4caf50",
                    bgcolor: "#e8f5e9",
                    "&:hover": { bgcolor: "#c8e6c9" }
                  }}
                >
                  <VideocamIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Assign Chat">
                <IconButton
                  size="small"
                  onClick={() => setOpenAssign(true)}
                  sx={{ color: "#2196F3" }}
                >
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={selectedChat.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                size="small"
                onClick={() => setSelectedChat(null)}
                sx={{ color: "#666" }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "#fafafa",
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: msg.senderRole === "admin" ? "flex-end" : "flex-start",
                  animation: "fadeIn 0.3s ease-in",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor: msg.senderRole === "admin" ? "#2196F3" : "white",
                    color: msg.senderRole === "admin" ? "white" : "#1a1a2e",
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: msg.senderRole === "admin" ? "rgba(255,255,255,0.9)" : "#666",
                      display: "block",
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {msg.senderName}
                  </Typography>
                  <Typography variant="body1" sx={{ wordBreak: "break-word", lineHeight: 1.5 }}>
                    {msg.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ 
                      color: msg.senderRole === "admin" ? "rgba(255,255,255,0.8)" : "#999", 
                      display: "block", 
                      mt: 0.5,
                      textAlign: "right",
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, bgcolor: "white", borderTop: "1px solid #e0e0e0" }}>
            {/* Quick Responses */}
            <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
              {quickResponses.map((response, idx) => (
                <Chip
                  key={idx}
                  label={response.substring(0, 30) + "..."}
                  size="small"
                  onClick={() => setMessageInput(response)}
                  sx={{ 
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#e3f2fd" },
                  }}
                />
              ))}
            </Box>
            
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
              <TextField
                fullWidth
                placeholder="Type your response..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                multiline
                maxRows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f5f5f5",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                  },
                }}
              />
              <Tooltip title="Attach File">
                <IconButton sx={{ color: "#666" }}>
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                sx={{ 
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  minWidth: 100,
                  height: 48,
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Assign Dialog */}
      <Dialog open={openAssign} onClose={() => setOpenAssign(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "white", color: "#1a1a2e", fontWeight: 700 }}>
          Assign to Team Member
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "white", pt: 2 }}>
          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
            Assign this chat to yourself or another admin team member
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "white", p: 2 }}>
          <Button onClick={() => setOpenAssign(false)} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button
            onClick={() => handleAssignChat(session?.user?.id)}
            variant="contained"
            sx={{ background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)" }}
          >
            Assign to Me
          </Button>
        </DialogActions>
      </Dialog>

      {/* Video Call Dialog */}
      <Dialog
        open={openVideoCall}
        onClose={handleEndVideoCall}
        maxWidth={isFullscreen ? false : "md"}
        fullScreen={isFullscreen}
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1a1a2e",
            minHeight: isFullscreen ? "100vh" : "600px",
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: "#1a1a2e", 
          color: "white", 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <VideocamIcon sx={{ color: "#4caf50" }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Video Call - {selectedChat?.userName}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                {isCallActive && `Duration: ${formatCallDuration(callDuration)}`}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={toggleFullscreen} sx={{ color: "white" }}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ 
          bgcolor: "#0f0f1e", 
          p: 0,
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}>
          {/* Main Video Area */}
          <Box sx={{ 
            flex: 1, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            bgcolor: "#000",
            position: "relative",
            minHeight: isFullscreen ? "calc(100vh - 200px)" : "450px"
          }}>
            {/* Remote Video (User) */}
            <Box sx={{ 
              width: "100%", 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#1a1a2e"
            }}>
              <Avatar 
                src={selectedChat?.userImage}
                sx={{ 
                  width: 150, 
                  height: 150,
                  mb: 2,
                  border: "4px solid #4caf50"
                }}
              >
                {selectedChat?.userName?.[0]}
              </Avatar>
              <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
                {selectedChat?.userName}
              </Typography>
              <Chip 
                label="Connected" 
                color="success" 
                size="small" 
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Local Video (Self) - Picture in Picture */}
            <Paper sx={{ 
              position: "absolute",
              bottom: 20,
              right: 20,
              width: { xs: 120, md: 200 },
              height: { xs: 90, md: 150 },
              bgcolor: "#2a2a3e",
              border: "2px solid #4caf50",
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {isVideoEnabled ? (
                <Box sx={{ 
                  width: "100%", 
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#1a1a2e"
                }}>
                  <Avatar sx={{ width: 60, height: 60 }}>
                    {session?.user?.name?.[0] || "A"}
                  </Avatar>
                </Box>
              ) : (
                <Box sx={{ 
                  width: "100%", 
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#1a1a2e"
                }}>
                  <VideocamOffIcon sx={{ fontSize: 40, color: "#999" }} />
                </Box>
              )}
            </Paper>

            {/* Call Status Indicator */}
            <Box sx={{ 
              position: "absolute",
              top: 20,
              left: 20,
              bgcolor: "rgba(0,0,0,0.7)",
              px: 2,
              py: 1,
              borderRadius: 2
            }}>
              <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                🔴 Live • {formatCallDuration(callDuration)}
              </Typography>
            </Box>
          </Box>

          {/* Video Call Controls */}
          <Box sx={{ 
            p: 3,
            bgcolor: "#1a1a2e",
            display: "flex",
            justifyContent: "center",
            gap: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)"
          }}>
            <Tooltip title={isAudioEnabled ? "Mute Microphone" : "Unmute Microphone"}>
              <IconButton
                onClick={toggleAudio}
                sx={{
                  bgcolor: isAudioEnabled ? "#2196F3" : "#f44336",
                  color: "white",
                  width: 56,
                  height: 56,
                  "&:hover": {
                    bgcolor: isAudioEnabled ? "#1976D2" : "#d32f2f",
                  }
                }}
              >
                {isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title={isVideoEnabled ? "Turn Off Camera" : "Turn On Camera"}>
              <IconButton
                onClick={toggleVideo}
                sx={{
                  bgcolor: isVideoEnabled ? "#2196F3" : "#f44336",
                  color: "white",
                  width: 56,
                  height: 56,
                  "&:hover": {
                    bgcolor: isVideoEnabled ? "#1976D2" : "#d32f2f",
                  }
                }}
              >
                {isVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="End Call">
              <IconButton
                onClick={handleEndVideoCall}
                sx={{
                  bgcolor: "#f44336",
                  color: "white",
                  width: 64,
                  height: 64,
                  "&:hover": {
                    bgcolor: "#d32f2f",
                  }
                }}
              >
                <CallEndIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
      </Dialog>
      </Box>
    </Box>
  );
};

export default AdminChat;
