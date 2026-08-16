import { DashboardOverviewResponse } from "@/src/types/aliases";
import apiClient from "./axios";

export const dashboardApi = {
  async getOverview(): Promise<DashboardOverviewResponse> {
    const response = await apiClient.get<DashboardOverviewResponse>(
      "/dashboard/overview",
    );

    return response.data;
  },
};
