import { useState } from "react";

const clamp = (min = 0, value = 0, max = 0) => {
  return Math.min(Math.max(min, value), max);
};

const useDragImage = () => {
  const [point, setPoint] = useState<{ x: number; y: number }>({ x: -100, y: 0 });
  const [startPoint, setStartPoint] = useState<{ x: number; y: number }>({ x: -100, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [panning, setPanning] = useState<boolean>(false);

  const zoomIn = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    var normalScale = scale,
      xs = (event.clientX - point.x) / scale,
      ys = (event.clientY - point.y) / scale;
    setScale(clamp(0.2, (normalScale *= 1.2), 2));
    setPoint({ x: event.clientX - xs * scale, y: event.clientY - ys * scale });
    if (scale) {
      setPoint({ x: -100, y: 0 });
    }
  };

  const zoomOut = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    var normalScale = scale,
      xs = (event.clientX - point.x) / scale,
      ys = (event.clientY - point.y) / scale;
    setScale(clamp(1, (normalScale /= 1.2), 2));
    setPoint({ x: event.clientX - xs * scale, y: event.clientY - ys * scale });
    if (scale) {
      setPoint({ x: -100, y: 0 });
    }
  };

  // const reset = () => {
  //   setScale(1);
  //   setPoint({ x: -100, y: 0 });
  // };

  const moveImage = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.preventDefault();
    if (!panning) {
      return;
    }
    setPoint({ x: event.clientX - startPoint.x, y: event.clientY - startPoint.y });
    if (scale === 0.2) {
      setPoint({ x: -100, y: 0 });
    }
  };

  const mouseDownImage = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.preventDefault();
    setStartPoint({ x: event.clientX - point.x, y: event.clientY - point.y });
    setPanning(true);
  };

  return { zoomIn, zoomOut, moveImage, mouseDownImage, setPanning, setPoint, point, scale };
};

export default useDragImage;
