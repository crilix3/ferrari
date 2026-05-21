import { observer } from "mobx-react-lite";
import { ArrowLeft, ArrowRight, Header, Loader } from "../../shared";
import style from "./PartPage.module.css";
import dataStore from "../../stores/dataStore";
import { useEffect, useRef, useState } from "react";
import getParts from "../../api/requests/getParts";
import { LOCAL_STORAGE_KEYS } from "../../constants/dataContants";
import formatNumber from "../../lib/formatNumber";
import { API_URL } from "../../constants/apiConstants";
import type { IGroupData } from "../../types/IGroupData";
import useDragImage from "../../hooks/useDragImage";
import type { IPartsData } from "../../types/IPartsData";
import getGroup from "../../api/requests/getGroup";
import { loading } from "../../types/loading";
import NotFound from "../NotFound";
import useLocalStorage from "../../hooks/useLocalStorage";
import Copy from "../../classes/Copy";

const WIDTH_SLIDE_ELEM = 150;

const PartPage = observer(() => {
  const ref_wrap = useRef<HTMLDivElement | null>(null);
  const ref_img = useRef<HTMLImageElement | null>(null);
  const refContainerSlider = useRef<HTMLImageElement | null>(null);
  const { setValue } = useLocalStorage(LOCAL_STORAGE_KEYS.groupEl, {});

  const { zoomIn, zoomOut, moveImage, mouseDownImage, setPanning, setPoint, point, scale } = useDragImage();

  const [defScale, setDefScale] = useState(1);
  const [, setRatioHeight] = useState<number | undefined>();
  const [, setRatioWidth] = useState<number | undefined>();
  const [active, setActive] = useState<string | null>(null);
  const [shiftIndex, setShiftIndex] = useState(0);
  const [viewElem, setVievElem] = useState(0);
  const [leftArrowColor, setLeftArrowColor] = useState("#000000");
  const [rightArrowColor, setRightArrowColor] = useState("#000000");

  const [imgH, setImgH] = useState(0);
  const [imgW, setImgW] = useState(0);

  const lenghtArray = () => {
    if (dataStore.groupData.data) return dataStore.groupData.data.length;
    else return 0;
  };
  const calculateDLast = () => {
    if (viewElem + shiftIndex >= lenghtArray() && refContainerSlider.current instanceof HTMLElement) return refContainerSlider.current.clientWidth - viewElem * WIDTH_SLIDE_ELEM;
    else return 0;
  };
  useEffect(() => {
    const currentEl = localStorage.getItem(LOCAL_STORAGE_KEYS.groupEl);
    if (!currentEl) return;
    const data = JSON.parse(currentEl) as IGroupData;

    if (!dataStore.groupElem && data) getParts(data.id);
    else dataStore.groupElem && getParts(dataStore.groupElem.id);
  }, [dataStore.groupElem]);

  useEffect(() => {
    const modelEl = localStorage.getItem(LOCAL_STORAGE_KEYS.model);
    if (!modelEl) return;
    const data = JSON.parse(modelEl);

    if (!dataStore.modelElem && data) getGroup(data.key);
    else dataStore.modelElem && getGroup(dataStore.modelElem.key);
  }, [dataStore.modelElem]);

  useEffect(() => {
    const mouseup = () => setPanning(false);
    window.addEventListener("mouseup", mouseup);
    return () => {
      if (ref_img.current) {
        ref_img.current.removeEventListener("mouseenter", mouseup);
      }
    };
  }, [ref_img.current]);

  useEffect(() => {
    setPoint({ x: -100, y: 0 });
  }, []);

  useEffect(() => {
    if (refContainerSlider.current instanceof HTMLElement) {
      setVievElem(refContainerSlider.current.clientWidth / WIDTH_SLIDE_ELEM);
    }
  }, [refContainerSlider.current]);

  useEffect(() => {
    if (viewElem + shiftIndex >= lenghtArray()) {
      setRightArrowColor("#b3b3b3");
    } else {
      setRightArrowColor("#000000");
    }
  }, [viewElem, shiftIndex, lenghtArray]);

  useEffect(() => {
    if (shiftIndex <= 0) {
      setLeftArrowColor("#b3b3b3");
    } else {
      setLeftArrowColor("#000000");
    }
  }, [shiftIndex]);

  const next = () => {
    if (viewElem + shiftIndex >= lenghtArray()) return;
    setShiftIndex(shiftIndex + 1);
  };
  const prev = () => {
    if (shiftIndex <= 0) return;
    setShiftIndex(shiftIndex - 1);
  };

  const scriollToPart = (hotspot: IPartsData) => {
    const partElem = document.querySelectorAll(`div[data-code]`);
    partElem.forEach((elem) => {
      if (elem.getAttribute("data-code") === hotspot.code) elem.scrollIntoView({ block: "center", inline: "start", behavior: "smooth" });
    });
  };

  const imageLink = (): string => {
    const currentEl = localStorage.getItem(LOCAL_STORAGE_KEYS.groupEl);
    if (!currentEl) return `${API_URL}/api/image?id=${dataStore.groupElem && dataStore.groupElem.id}`;
    const data = JSON.parse(currentEl) as IGroupData;
    if (!dataStore.modelElem && data) return `${API_URL}/api/image?id=${data.id}`;
    return `${API_URL}/api/image?id=${dataStore.groupElem && dataStore.groupElem.id}`;
  };

  if (dataStore.partsData.loading === loading.LOADING || dataStore.partsData.loading === loading.NONE) return <Loader />;
  if (dataStore.partsData.data && Boolean(dataStore.partsData.data.length !== 0)) {
    return (
      <div className={style.partsPage}>
        <Header logo={dataStore.brandElem && dataStore.brandElem.img} />
        <div className={style.content}>
          <div className={style.container}>
            <div className={style.content_flex}>
              <div className={style.currentPart_content}>
                <div className={style.detailImage}>
                  <div
                    className={style.detailImage_container}
                    ref={ref_wrap}
                  >
                    <div
                      className={style.detailImage_image}
                      style={{
                        transform: `translate(${point.x}px, ${point.y}px) scale(${scale * defScale})`,
                        width: `${imgW}px`,
                        height: `${imgH}px`,
                      }}
                    >
                      <img
                        className={style.partImg}
                        src={imageLink()}
                        ref={ref_img}
                        onWheel={(e) => {
                          if (e.deltaY > 0) zoomOut(e);
                          else zoomIn(e);
                        }}
                        onMouseDown={(e) => {
                          mouseDownImage(e);
                        }}
                        onMouseUp={() => {
                          setPanning(false);
                        }}
                        onMouseMove={(e) => {
                          moveImage(e);
                        }}
                        onLoad={() => {
                          if (!ref_img.current) return;
                          setImgH(ref_img.current.naturalHeight);
                          setImgW(ref_img.current.naturalWidth);

                          if (!(ref_wrap.current instanceof HTMLElement)) return;

                          const h = ref_img.current.naturalHeight / ref_wrap.current.clientHeight;
                          const w = ref_img.current.naturalWidth / ref_wrap.current.clientWidth;
                          setRatioHeight(h);
                          setRatioWidth(w);

                          const ratio = Math.max(h, w);
                          if (ratio) setDefScale(1 / ratio);
                        }}
                      ></img>
                      {dataStore.partsData.data &&
                        dataStore.partsData.data.map((elem) =>
                          elem.dataRefs.map((ref) => (
                            <div
                              className={style.hotspot}
                              style={{ top: ref.dataTop + "px", left: ref.dataLeft + "px", border: active === elem.code ? "2px solid #ffcc00" : "1px solid #ffcc0066" }}
                              key={ref.dataLeft + ref.dataTop}
                              onClick={() => {
                                setActive(elem.code);
                                scriollToPart(elem);
                              }}
                            ></div>
                          ))
                        )}
                    </div>
                  </div>
                </div>
                <div className={style.detailsList}>
                  <div className={style.detailsList_header}>
                    <div className={style.header_container}>
                      <div className={style.headerElem}>#</div>
                      <div className={style.headerElem}>PART NUMBER</div>
                      <div className={style.headerElem}>TITLE</div>
                      <div className={style.headerElem}>DESCRIPTION</div>
                      <div className={style.headerElem}></div>
                    </div>
                  </div>
                  <div className={style.detailsList_content}>
                    {dataStore.partsData.data &&
                      dataStore.partsData.data.map((el) => (
                        <div
                          key={el.id}
                          className={`${style.partElem} ${active === el.code ? style.active : ""}`}
                          onClick={() => setActive(el.code)}
                          data-code={el.code}
                        >
                          <div className={style.partElem_container}>
                            <div className={style.partElem_text}>{formatNumber(el.code)}</div>
                            <div className={style.partElem_text}>
                              <div>{el.partNumber}</div>
                              <svg
                                stroke="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 448 512"
                                height="200px"
                                width="200px"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.copySvg}
                                onClick={(e) => {
                                  new Copy().copy(el.partNumber);
                                  e.stopPropagation();
                                }}
                              >
                                <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
                              </svg>
                            </div>
                            <div className={style.partElem_text}>{el.title}</div>
                            <div className={style.partElem_text}>{el.description}</div>

                            <div className={style.partElem_text}></div>
                          </div>
                        </div>
                      ))}

                    <div></div>
                  </div>
                </div>
              </div>
              <div className={style.container__fluid}>
                <div className={style.no__gutters}>
                  <div className={style.arrow__container}>
                    <button
                      className={style.arrow__btn}
                      onClick={() => {
                        prev();
                      }}
                    >
                      <ArrowLeft
                        width={36}
                        height={60}
                        color={leftArrowColor}
                      />
                    </button>
                  </div>
                  <div className={style.slider__container}>
                    <div className={style.slider}>
                      <div
                        className={style.slider__stage__outer}
                        ref={refContainerSlider}
                      >
                        {dataStore.groupData.data &&
                          dataStore.groupData.data.map((elem, index) => (
                            <div
                              key={index}
                              className={style.slider__item}
                              style={{ transition: `${0.3}s`, transform: `translateX(${(index - shiftIndex) * WIDTH_SLIDE_ELEM + calculateDLast()}px)` }}
                              onClick={() => {
                                dataStore.setGroupElem(elem);
                                setValue(elem);
                              }}
                            >
                              <div className={style.item}>
                                <div className={style.item__content}>
                                  <img
                                    src={`${API_URL}/api/image?id=${elem.id}`}
                                    alt=""
                                    className={dataStore.groupElem && dataStore.groupElem.code === elem.code ? `${style.slider__img__part} ${style.active}` : `${style.slider__img__part}`}
                                  />
                                  <span className={style.part__text}>
                                    {elem.code} - {elem.title}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className={style.arrow__container}>
                    <button
                      className={style.arrow__btn}
                      onClick={() => {
                        next();
                      }}
                    >
                      <ArrowRight
                        width={36}
                        height={60}
                        color={rightArrowColor}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
});

export default PartPage;
