import type { AxiosError } from "axios";
import dataStore from "../../stores/dataStore";
import { loading } from "../../types/loading";
import { query } from "../instanseAxios";
import { convertObjInArray } from "../../lib/convertObjInArray";

const getFamilies = async (id: string | undefined) => {
  if (dataStore.familiesData.loading === loading.LOADING) return;
  dataStore.setFamiliesLoading(loading.LOADING);
  dataStore.setFamiliesError("");
  try {
    const res = await query.get(`/api/families?id=${id}`);

    dataStore.setFamiliesData(convertObjInArray(res.data));
  } catch (e: unknown) {
    const error = e as AxiosError;
    dataStore.setFamiliesError(error.message);
    dataStore.setFamiliesLoading(loading.ERROR);
  }
  dataStore.setFamiliesLoading(loading.LOADED);
};

export default getFamilies;
