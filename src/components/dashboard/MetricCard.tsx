
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DollarSign, Users, Percent, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  increasing: boolean;
  icon: "dollar" | "users" | "percentage" | "shopping-cart";
}

const MetricCard = ({ title, value, change, increasing, icon }: MetricCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "dollar":
        return <DollarSign className="h-4 w-4 text-gray-500" />;
      case "users":
        return <Users className="h-4 w-4 text-gray-500" />;
      case "percentage":
        return <Percent className="h-4 w-4 text-gray-500" />;
      case "shopping-cart":
        return <ShoppingCart className="h-4 w-4 text-gray-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-100 p-1 flex items-center justify-center">
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs flex items-center gap-1 mt-1">
          {increasing ? (
            <TrendingUp className={cn("h-3 w-3 text-green-500")} />
          ) : (
            <TrendingDown className={cn("h-3 w-3 text-red-500")} />
          )}
          <span className={cn(increasing ? "text-green-500" : "text-red-500")}>
            {change}
          </span>
          <span className="text-gray-500">from last period</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
