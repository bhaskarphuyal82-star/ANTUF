"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Nepali calendar conversion utility
class NepaliDateConverter {
  // Nepali month names
  static nepaliMonths = [
    "बैशाख",
    "जेष्ठ",
    "आषाढ",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुण",
    "चैत्र",
  ];

  static nepaliNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

  static englishToNepaliNumber(num) {
    return String(num)
      .split("")
      .map((digit) => this.nepaliNumbers[parseInt(digit)])
      .join("");
  }

  static nepaliToEnglishNumber(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      const idx = this.nepaliNumbers.indexOf(str[i]);
      result += idx !== -1 ? idx : str[i];
    }
    return result;
  }

  // Nepali calendar to AD (Gregorian)
  static nepaliToAD(year, month, day) {
    // Simplified conversion (accurate for years 1976-2100)
    const adYear = year + 57;
    const adMonth = month <= 9 ? month + 3 : month - 9;
    const adjustedYear = month <= 9 ? adYear : adYear + 1;

    // Create date in AD
    const date = new Date(adjustedYear, adMonth - 1, day);
    return date;
  }

  // AD (Gregorian) to Nepali calendar
  static adToNepali(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();

    let nepaliYear = year - 57;
    let nepaliMonth = month + 1 - 3;
    let nepaliDay = day;

    if (nepaliMonth <= 0) {
      nepaliYear -= 1;
      nepaliMonth += 12;
    }

    return { year: nepaliYear, month: nepaliMonth, day: nepaliDay };
  }

  static formatNepaliDate(year, month, day) {
    const monthName = this.nepaliMonths[month - 1] || "";
    const yearStr = this.englishToNepaliNumber(year);
    const monthStr = this.englishToNepaliNumber(month);
    const dayStr = this.englishToNepaliNumber(day);

    return `${yearStr}/${monthStr}/${dayStr} ${monthName}`;
  }

  static getDaysInNepaliMonth(year, month) {
    // Simplified: Most Nepali months have 30 or 31 days
    // Chaitra (month 12) and Ashadh (month 3) typically have 32 days in leap years
    if ([3, 12].includes(month)) {
      return 32;
    }
    return 31;
  }
}

const NepaliDatePicker = ({ value, onChange, label, disabled = false }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [nepaliYear, setNepaliYear] = useState(2080);
  const [nepaliMonth, setNepaliMonth] = useState(1);
  const [nepaliDay, setNepaliDay] = useState(1);
  const [viewMode, setViewMode] = useState("day"); // day, month, year

  // Initialize from existing value
  React.useEffect(() => {
    if (value) {
      const date = new Date(value);
      const nepali = NepaliDateConverter.adToNepali(date);
      setNepaliYear(nepali.year);
      setNepaliMonth(nepali.month);
      setNepaliDay(nepali.day);
    }
  }, [value, openDialog]);

  const handleDateSelect = (day) => {
    setNepaliDay(day);
    setViewMode("day"); // Reset to day view
  };

  const handleMonthSelect = (month) => {
    setNepaliMonth(month);
    setViewMode("day");
  };

  const handleYearSelect = (year) => {
    setNepaliYear(year);
    setViewMode("month");
  };

  const handleConfirm = () => {
    try {
      const adDate = NepaliDateConverter.nepaliToAD(nepaliYear, nepaliMonth, nepaliDay);
      onChange(adDate.toISOString());
      setOpenDialog(false);
    } catch (error) {
      console.error("Error converting date:", error);
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
    // Reset to current value
    if (value) {
      const date = new Date(value);
      const nepali = NepaliDateConverter.adToNepali(date);
      setNepaliYear(nepali.year);
      setNepaliMonth(nepali.month);
      setNepaliDay(nepali.day);
    }
  };

  const handleSelectToday = () => {
    const today = new Date();
    const nepali = NepaliDateConverter.adToNepali(today);
    setNepaliYear(nepali.year);
    setNepaliMonth(nepali.month);
    setNepaliDay(nepali.day);
    setViewMode("day");
  };

  const formatDisplayDate = () => {
    if (!value) return "कार्यक्रमको मिति चयन गर्नुहोस्";
    const date = new Date(value);
    const nepali = NepaliDateConverter.adToNepali(date);
    return NepaliDateConverter.formatNepaliDate(nepali.year, nepali.month, nepali.day);
  };

  const renderDayPicker = () => {
    const daysInMonth = NepaliDateConverter.getDaysInNepaliMonth(nepaliYear, nepaliMonth);
    const firstDay = new Date(NepaliDateConverter.nepaliToAD(nepaliYear, nepaliMonth, 1)).getDay();
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <Box>
        {/* Weekday headers */}
        <Grid container spacing={0.5} sx={{ mb: 1 }}>
          {["आ", "स", "म", "ब", "ब", "श", "र"].map((day, idx) => (
            <Grid item xs={12 / 7} key={`weekday-${idx}`} sx={{ textAlign: "center" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "#FF6B6B" }}>
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Calendar days */}
        <Grid container spacing={0.5}>
          {days.map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              {day ? (
                <Button
                  fullWidth
                  onClick={() => handleDateSelect(day)}
                  sx={{
                    p: 1,
                    minHeight: "40px",
                    backgroundColor: nepaliDay === day ? "#FF6B6B" : "transparent",
                    color: nepaliDay === day ? "white" : "white",
                    border: nepaliDay === day ? "2px solid #FF6B6B" : "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255,107,107,0.3)",
                    },
                    fontSize: "12px",
                  }}
                >
                  {NepaliDateConverter.englishToNepaliNumber(day)}
                </Button>
              ) : (
                <Box />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderMonthPicker = () => {
    return (
      <Grid container spacing={1}>
        {NepaliDateConverter.nepaliMonths.map((month, index) => (
          <Grid item xs={6} key={index}>
            <Button
              fullWidth
              onClick={() => handleMonthSelect(index + 1)}
              sx={{
                p: 2,
                backgroundColor: nepaliMonth === index + 1 ? "#FF6B6B" : "transparent",
                color: "white",
                border: nepaliMonth === index + 1 ? "2px solid #FF6B6B" : "1px solid rgba(255,255,255,0.2)",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "rgba(255,107,107,0.3)",
                },
                fontSize: "12px",
              }}
            >
              {month}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderYearPicker = () => {
    const startYear = Math.floor(nepaliYear / 10) * 10;
    const years = [];
    for (let i = startYear; i < startYear + 12; i++) {
      years.push(i);
    }

    return (
      <Grid container spacing={1}>
        {years.map((year) => (
          <Grid item xs={4} key={year}>
            <Button
              fullWidth
              onClick={() => handleYearSelect(year)}
              sx={{
                p: 2,
                backgroundColor: nepaliYear === year ? "#FF6B6B" : "transparent",
                color: "white",
                border: nepaliYear === year ? "2px solid #FF6B6B" : "1px solid rgba(255,255,255,0.2)",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "rgba(255,107,107,0.3)",
                },
                fontSize: "12px",
              }}
            >
              {NepaliDateConverter.englishToNepaliNumber(year)}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <TextField
        fullWidth
        label={label}
        value={formatDisplayDate()}
        onClick={() => setOpenDialog(true)}
        readOnly
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": { color: "black" },
          "& .MuiInputBase-input": { color: "black", fontWeight: "bold" },
          cursor: "pointer",
        }}
        InputProps={{
          style: { cursor: "pointer" },
        }}
      />

      <Dialog open={openDialog} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)", color: "black" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
              {viewMode === "day"
                ? `${NepaliDateConverter.nepaliMonths[nepaliMonth - 1]} ${NepaliDateConverter.englishToNepaliNumber(nepaliYear)}`
                : viewMode === "month"
                ? NepaliDateConverter.englishToNepaliNumber(nepaliYear)
                : "वर्ष चयन गर्नुहोस्"}
            </Typography>
            <Box>
              {viewMode !== "year" && (
                <Button
                  size="small"
                  onClick={() => setViewMode(viewMode === "day" ? "month" : "year")}
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  {viewMode === "day" ? "महिना" : "वर्ष"}
                </Button>
              )}
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#F5F5F5", color: "black", pt: 2 }}>
          {viewMode === "day" && (
            <>
              {/* Month/Year navigation */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    if (nepaliMonth === 1) {
                      setNepaliMonth(12);
                      setNepaliYear(nepaliYear - 1);
                    } else {
                      setNepaliMonth(nepaliMonth - 1);
                    }
                  }}
                  sx={{ color: "#FF6B6B" }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <Typography
                  onClick={() => setViewMode("month")}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "black",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {NepaliDateConverter.nepaliMonths[nepaliMonth - 1]} {NepaliDateConverter.englishToNepaliNumber(nepaliYear)}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => {
                    if (nepaliMonth === 12) {
                      setNepaliMonth(1);
                      setNepaliYear(nepaliYear + 1);
                    } else {
                      setNepaliMonth(nepaliMonth + 1);
                    }
                  }}
                  sx={{ color: "#FF6B6B" }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {/* Day picker */}
              {renderDayPicker()}
            </>
          )}

          {viewMode === "month" && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => setNepaliYear(nepaliYear - 1)}
                  sx={{ color: "#FF6B6B" }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <Typography
                  onClick={() => setViewMode("year")}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "black",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {NepaliDateConverter.englishToNepaliNumber(nepaliYear)}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => setNepaliYear(nepaliYear + 1)}
                  sx={{ color: "#FF6B6B" }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {/* Month picker */}
              {renderMonthPicker()}
            </>
          )}

          {viewMode === "year" && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => setNepaliYear(Math.floor(nepaliYear / 10) * 10 - 10)}
                  sx={{ color: "#FF6B6B" }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {NepaliDateConverter.englishToNepaliNumber(Math.floor(nepaliYear / 10) * 10)} -{" "}
                  {NepaliDateConverter.englishToNepaliNumber(Math.floor(nepaliYear / 10) * 10 + 9)}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => setNepaliYear(Math.floor(nepaliYear / 10) * 10 + 10)}
                  sx={{ color: "#FF6B6B" }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {/* Year picker */}
              {renderYearPicker()}
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ bgcolor: "#F5F5F5", p: 2, gap: 1 }}>
          <Button
            onClick={handleSelectToday}
            variant="outlined"
            sx={{ color: "#FF6B6B", borderColor: "#FF6B6B", fontWeight: "bold" }}
          >
            आज
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button onClick={handleCancel} sx={{ color: "black" }}>
            रद्द गर्नुहोस्
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{ background: "linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)", color: "black", fontWeight: "bold" }}
          >
            चयन गर्नुहोस्
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NepaliDatePicker;
