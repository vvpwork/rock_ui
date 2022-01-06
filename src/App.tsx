import React, { useEffect, useMemo } from "react";
import moment from "moment";
import { ChartContainer, TypeChartContainer } from "./containers";
import { useRedux } from "./hooks";
import { getKpiAsync, selectKpi } from "./redux/kpi";
import s from "./app/App.module.scss";

function App() {
  const [select, dispatch] = useRedux();
  const kpiArr = select(selectKpi).slice(0, 50);

  useEffect(() => {
    dispatch(getKpiAsync());
  }, []);
  const dataPriceLuna = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Price Luna",
        uv: kpi.price_luna,
        pv: kpi.price_ust,
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  const dataPriceUst = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Price Ust",
        uv: kpi.price_ust,
        pv: kpi.price_ust,
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  const dataTBC = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Total borrow total deposit",
        uv: kpi.tbc,
        pv: kpi.tbc,
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  const dataTDB = useMemo(
    () =>
      kpiArr.map((kpi) => ({
        name: "Total borrow total deposit",
        uv: kpi.tdb,
        pv: kpi.tdb,
        createdAt: moment(kpi.createdAt).format("DD/MM HH:MM"),
      })),
    [kpiArr]
  );
  console.log(dataPriceLuna);

  return (
    <div className={s.APP}>
      <div>Test Charts</div>
      <div className={s.Main}>
        <div style={{ width: "600px", height: "400px" }}>
          <ChartContainer data={dataPriceLuna} />
        </div>
        <div style={{ width: "600px", height: "400px" }}>
          <ChartContainer data={dataPriceUst} />
        </div>
        <div style={{ width: "600px", height: "400px" }}>
          <ChartContainer data={dataTBC} />
        </div>
        <div style={{ width: "600px", height: "400px" }}>
          <ChartContainer data={dataTDB} />
        </div>
      </div>
    </div>
  );
}

export default App;
