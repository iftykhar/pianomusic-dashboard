import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CardOverviewProps {
  title: string;
  numberInfo: string | number;
  trend?: string;
  isUp?: boolean;
  Icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

const CardOverview: React.FC<CardOverviewProps> = ({
  title,
  numberInfo,
  trend,
  isUp,
  Icon,
  color = "#8B7EF8",
  bgColor = "#F8F9FF",
}) => {
  return (
    <Card
      className="flex-1 min-w-[300px] border-none shadow-sm rounded-xl overflow-hidden relative group transition-all duration-300 hover:shadow-md"
      style={{ backgroundColor: bgColor }}
    >
      <CardContent className="p-6">
        {/* Header: Icon and Title */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full text-white shadow-sm"
            style={{ backgroundColor: color }}
          >
            <Icon size={24} />
          </div>
          <h3 className="text-[#8E949C] font-semibold text-lg capitalize tracking-tight">
            {title}
          </h3>
        </div>

        {/* Body: Value and Trend */}
        <div className="flex items-baseline gap-3">
          <div
            className="text-4xl font-black tabular-nums"
            style={{ color: color }}
          >
            {numberInfo}
          </div>
          {trend && (
            <div
              className={`text-sm font-bold flex items-center gap-1 ${isUp ? "text-[#10B981]" : "text-[#EF4444]"}`}
            >
              {trend} {isUp ? "↑" : "↓"}
            </div>
          )}
        </div>
      </CardContent>
      {/* Thick bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: color }}
      />
    </Card>
  );
};

export default CardOverview;
