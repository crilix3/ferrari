interface IProps {
  width: number;
  height: number;
  color: string;
}

const ArrowRight = ({ width, height, color }: IProps) => {
  return (
    <>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill={color ? color : "#000000"}
          stroke="none"
        >
          <path
            d="M1292 5094 c-83 -41 -120 -123 -100 -219 10 -50 21 -61 1141 -1183
l1132 -1132 -1132 -1133 c-1221 -1222 -1162 -1158 -1149 -1255 12 -88 79 -156
168 -168 97 -13 25 -79 1337 1230 839 838 1219 1223 1232 1251 24 52 24 99 -2
155 -29 66 -2381 2419 -2453 2455 -63 32 -109 32 -174 -1z"
          />
        </g>
      </svg>
    </>
  );
};

export default ArrowRight;
