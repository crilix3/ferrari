import { loading } from "../types/loading";
import ferrariIcon from "../assets/png/ferrari-card.png";
import lamborghiniIcon from "../assets/png/lamborghini-card.png";
import maseratiIcon from "../assets/png/maserati-card.png";
import astonIcon from "../assets/png/aston-card.png";

export const INITIAL_DATA = { loading: loading.NONE, error: "", data: null };

export const BRAND_CARD: { [key: string]: string } = {
  "101": ferrariIcon,
  "102": lamborghiniIcon,
  "103": maseratiIcon,
  "105": astonIcon,
};

export const LOCAL_STORAGE_KEYS = {
  brand: "brand",
  families: "familiesEl",
  model: "modelEl",
  groupEl: "groupEl",
};
