import type { AxiosError } from "axios";
import dataStore from "../../stores/dataStore";
import { loading } from "../../types/loading";
import { query } from "../instanseAxios";
import type { IGroupData } from "../../types/IGroupData";

const getGroup = async (modelId: string | undefined) => {
  if (dataStore.groupData.loading === loading.LOADING) return;
  dataStore.setGroupLoading(loading.LOADING);
  dataStore.setGroupError("");
  try {
    const res = await query.get(`api/groups?id=${modelId}`);
    dataStore.setGroupData(res.data as IGroupData[] | null);
  } catch (e: unknown) {
    const error = e as AxiosError;
    dataStore.setGroupError(error.message);
    dataStore.setGroupLoading(loading.ERROR);
  }
  dataStore.setGroupLoading(loading.LOADED);
};

export default getGroup;
