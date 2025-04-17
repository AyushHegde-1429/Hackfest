
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const performanceData = [
  { date: "Jan", pageViews: 4000, uniqueVisitors: 2400, conversion: 2.4 },
  { date: "Feb", pageViews: 3000, uniqueVisitors: 1398, conversion: 2.2 },
  { date: "Mar", pageViews: 5000, uniqueVisitors: 3200, conversion: 2.7 },
  { date: "Apr", pageViews: 5800, uniqueVisitors: 3890, conversion: 3.0 },
  { date: "May", pageViews: 7800, uniqueVisitors: 4200, conversion: 3.3 },
  { date: "Jun", pageViews: 9000, uniqueVisitors: 5300, conversion: 3.2 },
  { date: "Jul", pageViews: 10200, uniqueVisitors: 6100, conversion: 3.4 },
];

const PerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Performance</CardTitle>
        <CardDescription>Page views and unique visitors over time</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={performanceData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="pageViews"
              stroke="#1e5aaa"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="uniqueVisitors" 
              stroke="#34a9db" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
