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
    name: string;
    uv: string | number;
    pv: string | number;
    createdAt: string | Date;
  }[];
};

export const ChartContainer: React.VFC<TypeChartContainer> = ({ data }) => {
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis tick={{fontSize: '8px'}} tickSize={3} />
          <Tooltip />
          <Legend />
          {/* <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 2 }}
          /> */}
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
