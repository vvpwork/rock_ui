import React, { useEffect, useMemo } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import Replay from "@mui/icons-material/Replay";

import { ChartContainer, TypeChartContainer } from "../containers";
import { useRedux } from "../hooks";
import { getKpiAsync, selectKpi } from "../redux/kpi";
import s from "./App.module.scss";
import { CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";

function App() {
  const [select, dispatch] = useRedux();
  let kpiArr = select(selectKpi);
  const handleRefresh = () => {
    dispatch(getKpiAsync());
  };

  const dataPriceLuna = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Price Luna",
        price: kpi.price_luna,
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  const dataPriceUst = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Price Ust",
        price: kpi.price_ust,
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  const dataTBC = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Total borrow/total collateral",
        total_borrow_collateral: Number(kpi.tbc).toFixed(2),
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  const dataTDB = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Total borrow total deposit",
        tdb: Number(kpi.tdb).toFixed(2),
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  const dataRatio = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Ratio ",
        ratio: Number(kpi.ratio_luna_ust).toFixed(2),
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );

  useEffect(() => {
    dispatch(getKpiAsync());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getKpiAsync());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.App}>
      <div className={s.AppAction}>
        <div className={s.AppRefresh}>
          <Button
            variant="contained"
            endIcon={<Replay />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className={s.Main}>
        <div className={s.AppChart}>
          <h3 className={s.AppChartTitle}>Price Luna</h3>
          <ChartContainer data={dataPriceLuna}>
            <CartesianGrid strokeDasharray="3 6" />
            <XAxis dataKey="createdAt" tickSize={2} />
            <YAxis tickSize={3} tickFormatter={(item) => `${item}$`} />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="price"
              name="Price Luna"
              stroke="#8884d8"
              dot={false}
            />
          </ChartContainer>
        </div>
        <div className={s.AppChart}>
          <h3 className={s.AppChartTitle}>Price UST</h3>
          <ChartContainer data={dataPriceUst}>
            <CartesianGrid strokeDasharray="3 6" />
            <XAxis dataKey="createdAt" tickSize={2} />
            <YAxis tickSize={3} tickFormatter={(item) => `${item}$`} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              name="Price UST"
              stroke="#8884d8"
              dot={false}
            />{" "}
          </ChartContainer>
        </div>
        <div className={s.AppChart}>
          <h3 className={s.AppChartTitle}>Total Borrow / Total Collateral</h3>
          <ChartContainer data={dataTBC}>
            <CartesianGrid strokeDasharray="3 6" />
            <XAxis dataKey="createdAt" tickSize={2} />
            <YAxis tickSize={3} tickFormatter={(item) => `${item}%`} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_borrow_collateral"
              name="Total Borrow / Total Collateral"
              stroke="#8884d8"
              dot={false}
            />{" "}
          </ChartContainer>
        </div>
        <div className={s.AppChart}>
          <h3 className={s.AppChartTitle}>Total Deposit / Total Borrow</h3>
          <ChartContainer data={dataTDB}>
            <CartesianGrid strokeDasharray="3 6" />
            <XAxis dataKey="createdAt" tickSize={2} />
            <YAxis tickSize={3} tickFormatter={(item) => `${item}%`} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="tdb"
              name="Total Deposit / Total Borrow"
              stroke="#8884d8"
              dot={false}
            />{" "}
          </ChartContainer>
        </div>
        <div className={s.AppChart}>
          <h3 className={s.AppChartTitle}>Terra market cap/UST market cap</h3>
          <ChartContainer data={dataRatio}>
            <CartesianGrid strokeDasharray="3 6" />
            <XAxis dataKey="createdAt" tickSize={2} />
            <YAxis tickSize={3} tickFormatter={(item) => `${item}%`} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ratio"
              name="Terra market cap/UST market cap"
              stroke="#8884d8"
              dot={false}
            />{" "}
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
