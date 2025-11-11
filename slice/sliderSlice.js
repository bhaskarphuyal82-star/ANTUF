import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  sliders: [],
  currentSlider: null,
  loading: false,
  error: null,
};

export const fetchSliderById = createAsyncThunk(
  "sliders/fetchSliderById",

  async (id) => {
    try {
      const response = await fetch(`/api/admin/sliders/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch slider ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`error loading slider ${error.message}`);

      throw error;
    }
  }
);

export const fetchSliders = createAsyncThunk(
  "sliders/fetchSliders",

  async () => {
    try {
      const response = await fetch(`/api/admin/sliders`);

      console.log("response", response);
      if (!response.ok) {
        throw new Error(`Failed to fetch slider ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log("error", error);
      toast.error("error loading sliders ");
      throw error;
    }
  }
);

export const fetchHomeSliders = createAsyncThunk(
  "sliders/fetchHomeSliders",

  async () => {
    try {
      const response = await fetch(`/api/sliders`);

      if (!response.ok) {
        throw new Error(`Failed to fetch sliders ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`error loading sliders ${error.message}`);

      throw error;
    }
  }
);

export const createSlider = createAsyncThunk(
  "sliders/createSlider",

  async (sliderData) => {
    try {
      const response = await fetch(`/api/admin/sliders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sliderData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create slider ${response.status}`);
      }

      const data = await response.json();

      toast.success("slider created successfully");

      return data;
    } catch (error) {
      toast.error(`error creating slider ${error.message}`);

      throw error;
    }
  }
);

export const updateSlider = createAsyncThunk(
  "sliders/updateSlider",

  async ({ id, sliderData }) => {
    try {
      const response = await fetch(`/api/admin/sliders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sliderData),
      });

      if (!response.ok) {
        throw new Error(`failed to update slider ${response.status}`);
      }

      const data = await response.json();

      toast.success("slider updated successfully");

      return data;
    } catch (error) {
      toast.error(`error updating sliders ${error.message}`);

      throw error;
    }
  }
);

export const deleteSlider = createAsyncThunk(
  "sliders/deleteSlider",

  async (id) => {
    try {
      const response = await fetch(`/api/admin/sliders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`failed to delete slider ${response.status}`);
      }

      toast.success("slider deleted successfully");

      return id;
    } catch (error) {
      toast.error(`error deleting slider ${error.message}`);
      throw error;
    }
  }
);

const sliderSlice = createSlice({
  name: "sliders",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all sliders
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Single slider fetch
      .addCase(fetchSliderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSlider = action.payload;
      })
      .addCase(fetchSliderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetError } = sliderSlice.actions;
export default sliderSlice.reducer;