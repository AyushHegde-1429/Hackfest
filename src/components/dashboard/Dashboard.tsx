
import { useState, useEffect, Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CalendarIcon, Download, FilterIcon, ChevronDown } from "lucide-react";
import MetricCard from "./MetricCard";
import PerformanceChart from "./PerformanceChart";
import ConversionChart from "./ConversionChart";
import UserDemographics from "./UserDemographics";
import RevenueBreakdown from "./RevenueBreakdown";
import TopChannels from "./TopChannels";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "1y" | "custom">("30d");
  const [activeTab, setActiveTab] = useState<"overview" | "revenue" | "customers">("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // This would normally come from an API or state management
  const metricsData = {
    totalRevenue: {
      value: "$25,432",
      change: "+12.5%",
      increasing: true,
    },
    totalUsers: {
      value: "12,835",
      change: "+8.3%",
      increasing: true,
    },
    conversion: {
      value: "3.2%",
      change: "-0.5%",
      increasing: false,
    },
    averageOrder: {
      value: "$89.43",
      change: "+5.1%",
      increasing: true,
    },
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-slate-50 justify-center items-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-primary">InsightDataLens</h1>
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 animate-fadeIn">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-2xl font-bold">InsightDataLens</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Select
              value={dateRange}
              onValueChange={(value) => setDateRange(value as typeof dateRange)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            
            {dateRange === "custom" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    {date ? format(date, "PPP") : "Pick a date"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Total Revenue" 
            value={metricsData.totalRevenue.value} 
            change={metricsData.totalRevenue.change} 
            increasing={metricsData.totalRevenue.increasing} 
            icon="dollar"
          />
          <MetricCard 
            title="Total Users" 
            value={metricsData.totalUsers.value} 
            change={metricsData.totalUsers.change} 
            increasing={metricsData.totalUsers.increasing} 
            icon="users"
          />
          <MetricCard 
            title="Conversion Rate" 
            value={metricsData.conversion.value} 
            change={metricsData.conversion.change} 
            increasing={metricsData.conversion.increasing} 
            icon="percentage"
          />
          <MetricCard 
            title="Average Order" 
            value={metricsData.averageOrder.value} 
            change={metricsData.averageOrder.change} 
            increasing={metricsData.averageOrder.increasing} 
            icon="shopping-cart"
          />
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <PerformanceChart />
              <ConversionChart />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <UserDemographics />
              <TopChannels />
              <RevenueBreakdown />
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={revenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                    <Bar dataKey="profit" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={customerData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="newCustomers" stroke="#8884d8" />
                    <Line type="monotone" dataKey="activeCustomers" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Sample data for charts
const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 9800, profit: 2000 },
  { name: "Apr", revenue: 3908, profit: 2780 },
  { name: "May", revenue: 4800, profit: 1890 },
  { name: "Jun", revenue: 3800, profit: 2390 },
  { name: "Jul", revenue: 4300, profit: 3490 },
];

const customerData = [
  { month: "Jan", newCustomers: 400, activeCustomers: 2400 },
  { month: "Feb", newCustomers: 300, activeCustomers: 2100 },
  { month: "Mar", newCustomers: 500, activeCustomers: 2400 },
  { month: "Apr", newCustomers: 780, activeCustomers: 2600 },
  { month: "May", newCustomers: 890, activeCustomers: 2900 },
  { month: "Jun", newCustomers: 1390, activeCustomers: 3100 },
  { month: "Jul", newCustomers: 1490, activeCustomers: 3300 },
];

export default Dashboard;
