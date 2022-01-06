import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { RootState } from "..";
import { API } from "../../api";

export type TypeKpiSlice = {
  _id: string;
  price_luna: string;
  price_ust: string;
  ratio_luna_ust: string;
  tbc: string;
  tdb: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}[];
const initKpi: TypeKpiSlice = [];

const kpiSlice = createSlice({
  name: "kpi",
  initialState: initKpi,
  reducers: {
    addKpi: (state, action) => action.payload,
    resetKpi: () => initKpi,
  },
});

export const { resetKpi, addKpi } = kpiSlice.actions;
export default kpiSlice.reducer;

// selectors

export const selectKpi = (state: RootState) => state.kpi;

// async

export const getKpiAsync = () => async (dispatch: Dispatch<any>) => {
  try {
    const response = await API().get("/api/kpi");
    dispatch(addKpi(response.data));
  } catch (err) {
    console.error("Error get kpi", err);
  }
};
