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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
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

  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chat");
      if (response.ok) {
        const data = await response.json();
        setChatRooms(data);
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
    return matchesStatus && matchesPriority;
  });

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

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)", bgcolor: "#0a0e27" }}>
      {/* Chat List */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          borderRight: "1px solid rgba(255,255,255,0.1)",
          overflowY: "auto",
          bgcolor: "#121212",
          display: selectedChat && window.innerWidth < 960 ? "none" : "block",
        }}
      >
        <Box sx={{ p: 2, position: "sticky", top: 0, bgcolor: "#121212", zIndex: 10 }}>
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            Support Tickets
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel sx={{ color: "white" }}>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.23)",
                  },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel sx={{ color: "white" }}>Priority</InputLabel>
              <Select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                label="Priority"
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.23)",
                  },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {loading ? (
          <CircularProgress sx={{ m: 2, color: "white" }} />
        ) : filteredChats.length === 0 ? (
          <Typography sx={{ p: 2, color: "rgba(255,255,255,0.5)" }}>
            No chats found
          </Typography>
        ) : (
          filteredChats.map((chat) => (
            <Card
              key={chat._id}
              onClick={() => handleSelectChat(chat)}
              sx={{
                m: 1,
                cursor: "pointer",
                bgcolor: selectedChat?._id === chat._id ? "#1E1E1E" : "#1A1A1A",
                border: selectedChat?._id === chat._id ? "1px solid #2196F3" : "none",
                "&:hover": { bgcolor: "#1E1E1E" },
              }}
            >
              <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar src={chat.userImage} sx={{ width: 40, height: 40 }}>
                    {chat.userName?.[0]}
                  </Avatar>
                  <Box sx={{ flex: 1, overflow: "hidden" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {chat.userName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {chat.subject}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Chip
                    label={chat.status}
                    size="small"
                    color={getStatusColor(chat.status)}
                    sx={{ height: 20 }}
                  />
                  <Chip
                    label={chat.priority}
                    size="small"
                    color={getPriorityColor(chat.priority)}
                    sx={{ height: 20 }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Chat Window */}
      {selectedChat && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "#0a0e27" }}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: "white" }}>
                {selectedChat.userName}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                {selectedChat.subject} • {selectedChat.category}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Assign Chat">
                <IconButton
                  size="small"
                  onClick={() => setOpenAssign(true)}
                  sx={{ color: "#FFD700" }}
                >
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={selectedChat.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                  }}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
              <Button
                size="small"
                onClick={() => setSelectedChat(null)}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </Button>
            </Stack>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: msg.senderRole === "admin" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor: msg.senderRole === "admin" ? "#2196F3" : "#1E1E1E",
                    color: "white",
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
                    {msg.senderName}
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    {msg.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.7)", display: "block", mt: 0.5 }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type your response..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSendMessage();
                  }
                }}
                multiline
                maxRows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                sx={{ background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)" }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Assign Dialog */}
      <Dialog open={openAssign} onClose={() => setOpenAssign(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1E1E1E", color: "white" }}>
          Assign to Team Member
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#1E1E1E", color: "white" }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}>
            Assign this chat to yourself or another admin
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#1E1E1E", p: 2 }}>
          <Button onClick={() => setOpenAssign(false)} sx={{ color: "white" }}>
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
    </Box>
  );
};

export default AdminChat;
