import type { loading } from "./loading";

export interface IGeneral<T> {
  data: T | null;
  loading: loading;
  error: string;
}
