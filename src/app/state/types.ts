export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

interface KpiData {}

export interface Data {
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createdAt: string;
  updatedAt: string;
}
export interface GetKpisResponse {
  data: {
    id: string;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    monthlyData: Month[];
    dailyData: Day[];
    expensesByCategory: ExpensesByCategory;
    createdAt: string;
    updatedAt: string;

    // Add other properties if needed
  }[];
}

export interface GetProductsResponse {
  id: string;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  id: string;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}
