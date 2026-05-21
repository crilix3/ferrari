import { useNavigate } from "react-router-dom";
import style from "./FamiliesPage.module.css";
import { useEffect } from "react";
import getFamilies from "../../api/requests/getFamilies";
import { Header, Loader } from "../../shared";
import { observer } from "mobx-react-lite";
import dataStore from "../../stores/dataStore";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../constants/dataContants";
import type { IBrandData } from "../../types/IBrandData";
import { loading } from "../../types/loading";
import NotFound from "../NotFound";

const FamiliesPage = observer(() => {
  const navigate = useNavigate();
  const { setValue } = useLocalStorage(LOCAL_STORAGE_KEYS.families, {});

  const brandEl = localStorage.getItem(LOCAL_STORAGE_KEYS.brand);

  useEffect(() => {
    const currentEl = localStorage.getItem(LOCAL_STORAGE_KEYS.brand);
    if (!currentEl) return;
    const data = JSON.parse(currentEl);

    if (!dataStore.brandElem && data) getFamilies(data.key);
    else dataStore.brandElem && getFamilies(dataStore.brandElem.key);
  }, [dataStore.brandElem]);

  if (dataStore.familiesData.loading === loading.LOADING || dataStore.familiesData.loading === loading.NONE) return <Loader />;
  if (dataStore.familiesData.data && Boolean(dataStore.familiesData.data.length !== 0)) {
    return (
      <div className={style.modelsPage}>
        <Header logo={dataStore.brandElem && dataStore.brandElem.img} />
        <div className={style.scroll}>
          <div className={style.container}>
            <div className={style.modelFlex}>
              {dataStore.familiesData.data &&
                dataStore.familiesData.data.map((el) => (
                  <div
                    key={el.key}
                    className={style.modelCard}
                    onClick={() => {
                      dataStore.setFamiliesElem(el);
                      if (!brandEl) return;
                      if (!dataStore.brandElem) {
                        const dataBrandEl = JSON.parse(brandEl) as IBrandData;
                        navigate(`/${encodeURIComponent(`${dataBrandEl.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${el.label.toLocaleLowerCase()}`)}`);
                        console.log(1);
                      } else {
                        console.log(0);
                        dataStore.brandElem && navigate(`/${encodeURIComponent(`${dataStore.brandElem.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${el.label.toLocaleLowerCase()}`)}`);
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

export default FamiliesPage;
