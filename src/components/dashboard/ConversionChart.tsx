
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const conversionData = [
  { stage: "Visit", value: 5400 },
  { stage: "Sign up", value: 3800 },
  { stage: "Product view", value: 3200 },
  { stage: "Add to cart", value: 2100 },
  { stage: "Checkout", value: 1200 },
  { stage: "Purchase", value: 980 },
];

const ConversionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>User journey from visit to purchase</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={conversionData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 80,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" />
            <Tooltip formatter={(value) => [`${value} users`, 'Volume']} />
            <Legend />
            <Bar dataKey="value" name="Users" fill="#1e5aaa" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConversionChart;
