import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import s from "./Chart.module.scss";

export type TypeChartContainer = {
  data: {
    [key: string]: string;
  }[];
};

export const ChartContainer: React.FC<TypeChartContainer> = ({
  data,
  children,
}) => {
  return (
    <div className={s.Chart}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {children}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
