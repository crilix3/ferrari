import type { AxiosError } from "axios";
import dataStore from "../../stores/dataStore";
import { loading } from "../../types/loading";
import { query } from "../instanseAxios";
import type { IPartsData } from "../../types/IPartsData";

const getParts = async (partId: number | undefined) => {
  if (dataStore.partsData.loading === loading.LOADING) return;
  dataStore.setPartsLoading(loading.LOADING);
  dataStore.setPartsError("");
  try {
    const res = await query.get(`api/parts?id=${partId}`);
    dataStore.setPartsData(res.data as IPartsData[] | null);
  } catch (e: unknown) {
    const error = e as AxiosError;
    dataStore.setPartsError(error.message);
    dataStore.setPartsLoading(loading.ERROR);
  }
  dataStore.setPartsLoading(loading.LOADED);
};

export default getParts;
