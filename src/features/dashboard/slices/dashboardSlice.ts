import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dashboardAPI } from '@/services/api/dashboardAPI';
import type { ChartData } from '@/types/api.types';
import type { DashboardState } from '../types/dashboard.types';

const initialState: DashboardState = {
  stats: null,
  chartData: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (params: { startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getDashboardData(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

export const updateChartData = createAsyncThunk(
  'dashboard/updateChart',
  async (newData: ChartData, { dispatch }) => {
    // Implement optimistic update
    dispatch(dashboardSlice.actions.optimisticUpdate(newData));

    try {
      const response = await dashboardAPI.updateChartData(newData);
      return response;
    } catch (error) {
      // Revert optimistic update on error
      dispatch(dashboardSlice.actions.revertUpdate(newData.id));
      throw error;
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    optimisticUpdate: (state, action: PayloadAction<ChartData>) => {
      const index = state.chartData.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.chartData[index] = action.payload;
      } else {
        state.chartData.push(action.payload);
      }
    },
    revertUpdate: (state, action: PayloadAction<string>) => {
      // In a real app, you'd restore the previous value
      // For now, we'll just remove it if it was newly added
      const index = state.chartData.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.chartData.splice(index, 1);
      }
    },
    setRealTimeData: (state, action: PayloadAction<ChartData>) => {
      const existingIndex = state.chartData.findIndex((item) => item.id === action.payload.id);
      if (existingIndex !== -1) {
        state.chartData[existingIndex] = action.payload;
      } else {
        state.chartData.push(action.payload);
      }
      state.lastUpdated = new Date().toISOString();
    },
    clearDashboard: (state) => {
      state.stats = null;
      state.chartData = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.chartData = action.payload.chartData;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateChartData.fulfilled, (state) => {
        // Success - optimistic update already applied
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateChartData.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update chart data';
      });
  },
});

export const { optimisticUpdate, revertUpdate, setRealTimeData, clearDashboard } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;

