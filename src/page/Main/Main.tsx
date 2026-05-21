import { observer } from "mobx-react-lite";
import style from "./Main.module.css";
import dataStore from "../../stores/dataStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import getBrands from "../../api/requests/getBrands";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../constants/dataContants";
import { loading } from "../../types/loading";
import { Loader } from "../../shared";
import { NotFound } from "../index";

const Main = observer(() => {
  const navigate = useNavigate();
  const { setValue } = useLocalStorage(LOCAL_STORAGE_KEYS.brand, {});

  useEffect(() => {
    getBrands();
  }, []);
  if (dataStore.brandData.loading === loading.LOADING || dataStore.brandData.loading === loading.NONE) return <Loader />;
  else {
    if (dataStore.brandData.data && Boolean(dataStore.brandData.data.length !== 0)) {
      return (
        <div className={style.main}>
          <div className={style.container}>
            <div className={style.main_flex}>
              {dataStore.brandData.data &&
                dataStore.brandData.data.map((el) => (
                  <div
                    key={el.key}
                    className={style.brand_card}
                    onClick={() => {
                      dataStore.setBrandElem(el);
                      setValue(el);
                      navigate(`/${encodeURIComponent(`${el.label.toLocaleLowerCase()}`)}`);
                    }}
                  >
                    <img
                      src={el.img}
                      title={el.label}
                      className={style.brandCard_image}
                    />
                    <span className={style.title_brand}>{el.label}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
});

export default Main;
