import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader_wrapper}>
      <div className={style.loader_1}></div>
      <div className={style.loader_2}></div>
      <div className={style.loader_3}></div>
      <div className={style.loader_4}></div>
    </div>
  );
};

export default Loader;
