export interface IPartsData {
  id: number;
  code: string;
  partNumber: string;
  title: string;
  description: string;
  dataRefs: {
    dataTop: string;
    dataLeft: string;
  }[];
}
