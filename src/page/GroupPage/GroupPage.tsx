import style from "./GroupPage.module.css";
import { observer } from "mobx-react";
import { useEffect } from "react";
import getGroup from "../../api/requests/getGroup";
import { useNavigate } from "react-router-dom";
import dataStore from "../../stores/dataStore";
import { Header, Loader } from "../../shared";
import { API_URL } from "../../constants/apiConstants";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../constants/dataContants";
import type { IBrandData } from "../../types/IBrandData";
import type { IFamiliesData } from "../../types/IFamiliesData";
import type { IModelsData } from "../../types/IModelsData";
import { loading } from "../../types/loading";
import NotFound from "../NotFound";

const GroupPage = observer(() => {
  const navigate = useNavigate();
  const { setValue } = useLocalStorage(LOCAL_STORAGE_KEYS.groupEl, {});

  const brandEl = localStorage.getItem(LOCAL_STORAGE_KEYS.brand);
  const familiesEl = localStorage.getItem(LOCAL_STORAGE_KEYS.families);
  const modelEl = localStorage.getItem(LOCAL_STORAGE_KEYS.model);

  useEffect(() => {
    if (!modelEl) return;
    const data = JSON.parse(modelEl);

    if (!dataStore.modelElem && data) getGroup(data.key);
    else dataStore.modelElem && getGroup(dataStore.modelElem.key);
  }, [dataStore.modelElem]);
  if (dataStore.groupData.loading === loading.LOADING || dataStore.groupData.loading === loading.NONE) return <Loader />;
  if (dataStore.groupData.data && Boolean(dataStore.groupData.data.length !== 0)) {
    return (
      <div className={style.groupPage}>
        <Header logo={dataStore.brandElem && dataStore.brandElem.img} />
        <div className={style.scroll}>
          <div className={style.container}>
            <div className={style.groupGrid}>
              {dataStore.groupData.data &&
                dataStore.groupData.data.map((el) => (
                  <div
                    key={el.id}
                    className={style.groupCard}
                    onClick={() => {
                      dataStore.setGroupElem(el);
                      if (!brandEl || !familiesEl || !modelEl) return;
                      console.log(!dataStore.brandElem, !dataStore.familiesElem, !dataStore.modelElem);
                      if (!dataStore.brandElem || !dataStore.familiesElem || !dataStore.modelElem) {
                        const dataBrandEl = JSON.parse(brandEl) as IBrandData;
                        const dataFamiliesEl = JSON.parse(familiesEl) as IFamiliesData;
                        const dataModelEl = JSON.parse(modelEl) as IModelsData;
                        navigate(`/${encodeURIComponent(`${dataBrandEl.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${dataFamiliesEl.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${dataModelEl.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${el.title.toLocaleLowerCase()}`)}`);
                      } else {
                        navigate(`/${encodeURIComponent(`${dataStore.brandElem.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${dataStore.familiesElem.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${dataStore.modelElem.label.toLocaleLowerCase()}`)}/${encodeURIComponent(`${el.title.toLocaleLowerCase()}`)}`);
                      }
                      setValue(el);
                    }}
                  >
                    <div className={style.groupCode}>{el.code}</div>
                    <img
                      className={style.groupImg}
                      src={`${API_URL}/api/image?id=${el.id}`}
                      alt=""
                    />
                    <div className={style.groupTitle}>{el.title}</div>
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

export default GroupPage;
