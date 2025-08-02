export const mockUsageData = {
  kitchen: 46.8,
  heating: 31.2,
  lighting: 20.5,
  other: 10.8,
};

export const mockConsumptionData = {
  daily: [15, 22, 18, 24, 20, 12, 16],
  weekly: [52.9, 48, 45, 58, 51, 42, 47],
  monthly: [180, 165, 195, 210, 189, 156, 173, 201, 187, 176, 192, 168],
  yearly: [2100, 1980, 2250, 2180, 2050, 2340, 2280],
};

export const mockBillingHistory = [65, 75, 45, 35, 80, 70];
export const mockBillingLabels = ["Jun/Jul", "Aug/Sep", "Oct/Nov", "Dec/Jan", "Feb/Mar", "Apr/May"];

export const getDailyLabels = () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const getWeeklyLabels = () => ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];
export const getMonthlyLabels = () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const getYearlyLabels = () => ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];

export const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-US", { 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
};

export const formatTimeAgo = (hoursAgo: number) => {
  if (hoursAgo < 1) return "Just now";
  if (hoursAgo < 24) return `${Math.floor(hoursAgo)} hours ago`;
  return `${Math.floor(hoursAgo / 24)} days ago`;
};
