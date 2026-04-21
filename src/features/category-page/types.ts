export interface DashboardStats {
  totalRevenue: string;
  paidOrdersCount: number;
  totalUsersCount: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}

export interface CategoryContent {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  type?: string;
  isSplit?: boolean;
}

export interface ContentResponse {
  success: boolean;
  data: CategoryContent[];
}

export interface CategoryHeader {
  title: string;
  subtitle: string;
}

