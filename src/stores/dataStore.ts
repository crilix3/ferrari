import { makeAutoObservable } from "mobx";
import type { IBrandData } from "../types/IBrandData";
import type { IGeneral } from "../types/IGeneral";
import { INITIAL_DATA } from "../constants/dataContants";
import { loading } from "../types/loading";
import type { IFamiliesData } from "../types/IFamiliesData";
import type { IModelsData } from "../types/IModelsData";
import type { IGroupData } from "../types/IGroupData";
import type { IPartsData } from "../types/IPartsData";

class DataStore {
  brandData: IGeneral<IBrandData[] | null> = INITIAL_DATA;
  familiesData: IGeneral<IFamiliesData[] | null> = INITIAL_DATA;
  modelData: IGeneral<IModelsData[] | null> = INITIAL_DATA;
  groupData: IGeneral<IGroupData[] | null> = INITIAL_DATA;
  partsData: IGeneral<IPartsData[] | null> = INITIAL_DATA;

  brandElem: IBrandData | null = null;
  familiesElem: IFamiliesData | null = null;
  modelElem: IModelsData | null = null;
  groupElem: IGroupData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setBrandData(data: IBrandData[] | null) {
    this.brandData.data = data;
  }
  public setBrandLoading(loading: loading) {
    this.brandData.loading = loading;
  }
  public setBrandError(error: string) {
    this.brandData.error = error;
  }
  public setFamiliesData(data: IFamiliesData[] | null) {
    this.familiesData.data = data;
  }
  public setFamiliesLoading(loading: loading) {
    this.familiesData.loading = loading;
  }
  public setFamiliesError(error: string) {
    this.familiesData.error = error;
  }
  public setModelsData(data: IModelsData[] | null) {
    this.modelData.data = data;
  }
  public setModelsError(error: string) {
    this.modelData.error = error;
  }
  public setModelsLoading(loading: loading) {
    this.modelData.loading = loading;
  }
  public setGroupData(data: IGroupData[] | null) {
    this.groupData.data = data;
  }
  public setGroupError(error: string) {
    this.groupData.error = error;
  }
  public setGroupLoading(loading: loading) {
    this.groupData.loading = loading;
  }
  public setPartsData(data: IPartsData[] | null) {
    if (!data) return;
    const formatData = data.sort((a, b) => Number(a.code) - Number(b.code));
    this.partsData.data = formatData;
  }
  public setPartsError(error: string) {
    this.partsData.error = error;
  }
  public setPartsLoading(loading: loading) {
    this.partsData.loading = loading;
  }

  // DATA ELEMENTS
  public setBrandElem(elem: IBrandData | null) {
    this.brandElem = elem;
  }
  public setFamiliesElem(elem: IFamiliesData | null) {
    this.familiesElem = elem;
  }
  public setModelElem(elem: IModelsData | null) {
    this.modelElem = elem;
  }
  public setGroupElem(elem: IGroupData | null) {
    this.groupElem = elem;
  }
}

const dataStore = new DataStore();
export default dataStore;
