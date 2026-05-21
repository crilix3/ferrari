import type { AxiosError } from "axios";
import dataStore from "../../stores/dataStore";
import { loading } from "../../types/loading";
import { query } from "../instanseAxios";
import { convertObjInArray } from "../../lib/convertObjInArray";

const getBrands = async () => {
  if (dataStore.brandData.loading === loading.LOADED) return;
  dataStore.setBrandLoading(loading.LOADING);
  dataStore.setBrandError("");
  try {
    const res = await query.get("/api/brands");
    dataStore.setBrandData(convertObjInArray(res.data));
  } catch (e: unknown) {
    const error = e as AxiosError;
    dataStore.setBrandError(error.message);
    dataStore.setBrandLoading(loading.ERROR);
  }
  dataStore.setBrandLoading(loading.LOADED);
};

export default getBrands;
