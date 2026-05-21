import type { AxiosError } from "axios";
import dataStore from "../../stores/dataStore";
import { loading } from "../../types/loading";
import { query } from "../instanseAxios";
import { convertObjInArray } from "../../lib/convertObjInArray";

const getModels = async (familiesId: string | undefined) => {
  if (dataStore.modelData.loading === loading.LOADING) return;
  dataStore.setModelsLoading(loading.LOADING);
  dataStore.setModelsError("");
  try {
    const res = await query.get(`api/models?id=${familiesId}`);
    dataStore.setModelsData(convertObjInArray(res.data));
  } catch (e: unknown) {
    const error = e as AxiosError;
    dataStore.setModelsError(error.message);
    dataStore.setModelsLoading(loading.ERROR);
  }
  dataStore.setModelsLoading(loading.LOADED);
};

export default getModels;
