// slices/courseContentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnector } from "../services/apiConnector";
import { courseEndpoints } from "../services/apis";

const { GET_COURSE_CONTENT_API } = courseEndpoints;

export const fetchCourseContent = createAsyncThunk(
  "courseContent/fetchCourseContent",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await apiConnector("GET", GET_COURSE_CONTENT_API, null, null, {
        courseId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  courseContent: [],
  currentSection: null,
  currentSubSection: null,
  loading: false,
  error: null,
};

const courseContentSlice = createSlice({
  name: "courseContent",
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    setCurrentSubSection: (state, action) => {
      state.currentSubSection = action.payload;
    },
    resetCourseContent: (state) => {
      state.courseContent = [];
      state.currentSection = null;
      state.currentSubSection = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseContent.fulfilled, (state, action) => {
        state.loading = false;
        state.courseContent = action.payload.courseDetails.courseContent;
        // Set first section and subsection by default
        if (action.payload.courseDetails.courseContent.length > 0) {
          state.currentSection = action.payload.courseDetails.courseContent[0];
          if (state.currentSection.subSection.length > 0) {
            state.currentSubSection = state.currentSection.subSection[0];
          }
        }
      })
      .addCase(fetchCourseContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch course content";
      });
  },
});

export const { setCurrentSection, setCurrentSubSection, resetCourseContent } =
  courseContentSlice.actions;

export default courseContentSlice.reducer;