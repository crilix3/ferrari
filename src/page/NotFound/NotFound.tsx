import { observer } from "mobx-react-lite";
import style from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = observer(() => {
  const navigate = useNavigate();
  return (
    <div className={style.notFound}>
      <div className={style.notFound_container}>
        <span className={style.notFound_textCode}>404</span>
        <div>
          <p className={style.notFound_text}>Данных нет !</p>
        </div>
        <button
          className={style.notFound_backToMain}
          onClick={() => navigate(`/`)}
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
});

export default NotFound;
