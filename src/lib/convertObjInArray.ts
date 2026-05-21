import { BRAND_CARD } from "../constants/dataContants";

interface IObjInArray<T = string> {
  key: string;
  label: T;
  img?: string;
}

export const convertObjInArray = <T = string>(data: { [key: string]: T } | null): IObjInArray<T>[] => {
  const newArr: IObjInArray<T>[] = [];
  if (!data) return newArr;

  for (const key of Object.keys(data)) {
    const newObj = { key: key, label: data[key], img: BRAND_CARD[key] };
    newArr.push(newObj);
  }
  return newArr;
};
