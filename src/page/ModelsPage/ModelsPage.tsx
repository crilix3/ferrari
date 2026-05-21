import { observer } from "mobx-react-lite";
import { Header, Loader } from "../../shared";
import dataStore from "../../stores/dataStore";
import style from "./ModelsPage.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getModels from "../../api/requests/getModels";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../constants/dataContants";
import type { IBrandData } from "../../types/IBrandData";
import type { IFamiliesData } from "../../types/IFamiliesData";
import { loading } from "../../types/loading";
import NotFound from "../NotFound";

const ModelsPage = observer(() => {
  const navigate = useNavigate();
  const { setValue } = useLocalStorage(LOCAL_STORAGE_KEYS.model, {});

  const brandEl = localStorage.getItem(LOCAL_STORAGE_KEYS.brand);
  const familiesEl = localStorage.getItem(LOCAL_STORAGE_KEYS.families);

  useEffect(() => {
    const currentEl = localStorage.getItem(LOCAL_STORAGE_KEYS.families);
    if (!currentEl) return;
    const data = JSON.parse(currentEl);

    if (!dataStore.familiesElem && data) getModels(data.key);
    else dataStore.familiesElem && getModels(dataStore.familiesElem.key);
  }, [dataStore.familiesElem]);
  if (dataStore.modelData.loading === loading.LOADING || dataStore.modelData.loading === loading.NONE) return <Loader />;
  if (dataStore.modelData.data && Boolean(dataStore.modelData.data.length !== 0)) {
    return (
      <div className={style.modelsPage}>
        <Header logo={dataStore.brandElem && dataStore.brandElem.img} />
        <div className={style.scroll}>
          <div className={style.container}>
            <div className={style.modelFlex}>
              {dataStore.modelData.data &&
                dataStore.modelData.data.map((el) => (
                  <div
                    key={el.key}
                    className={style.modelCard}
                    onClick={() => {
                      dataStore.setModelElem(el);
                      if (!brandEl || !familiesEl) return;
                      if (!dataStore.brandElem || !dataStore.familiesElem) {
                        const dataBrandEl = JSON.parse(brandEl) as IBrandData;
                        const dataFamiliesEl = JSON.parse(familiesEl) as IFamiliesData;
                        navigate(`/${encodeURIComponent(`${dataBrandEl.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${dataFamiliesEl.label.toLocaleLowerCase()}`)}/${`${el.label.toLocaleLowerCase()}`}`);
                      } else {
                        navigate(`/${encodeURIComponent(`${dataStore.brandElem.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${dataStore.familiesElem.label.toLocaleLowerCase()}`)}/${`${el.label.toLocaleLowerCase()}`}`);
                      }

                      setValue(el);
                    }}
                  >
                    <div className={style.modelCard_text}>{el.label}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
});

export default ModelsPage;
