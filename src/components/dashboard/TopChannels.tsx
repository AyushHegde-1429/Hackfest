
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const channelData = [
  { name: "Direct", value: 30 },
  { name: "Social", value: 25 },
  { name: "Organic", value: 20 },
  { name: "Referral", value: 15 },
  { name: "Email", value: 10 },
];

const TopChannels = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Channels</CardTitle>
        <CardDescription>Traffic sources by percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={channelData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 70,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 'dataMax']} tickFormatter={(value) => `${value}%`} />
            <YAxis dataKey="name" type="category" />
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            <Bar dataKey="value" name="Traffic Percentage" fill="#34a9db" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopChannels;
