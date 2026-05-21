import { useEffect, useRef } from "react";

import icon0 from "../../assets/svg/aston-martin-logo.svg";
import icon1 from "../../assets/svg/ferrari-logo.svg";
import icon2 from "../../assets/svg/lamborghini-logo.svg";
import icon3 from "../../assets/svg/maserati-logo.svg";

const ARRAY_ICON: string[] = [icon0, icon1, icon2, icon3];
const COUNT_ICON: number = 200;

const CanvasBG = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const canvasRender = async () => {
      try {
        const createIcon = (): string[] => {
          return Array.from({ length: COUNT_ICON }, () => ARRAY_ICON[getRandomInt(0, ARRAY_ICON.length - 1)]);
        };

        const loadImage = (src: string): Promise<HTMLImageElement | null> => {
          return new Promise<HTMLImageElement | null>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
          });
        };

        const applyOpacity = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, width: number, height: number, opacity: number = 0.5): void => {
          ctx.save();

          ctx.globalAlpha = opacity;

          ctx.drawImage(img, x, y, width, height);

          ctx.restore();
        };

        const getRandomPosition = (canvasWidth: number, canvasHeight: number, imgWidth: number, imgHeight: number, attempt: number): { x: number; y: number } => {
          const centerBias = Math.max(0, 1 - attempt / 10);

          if (Math.random() < centerBias) {
            const centerX = canvasWidth / 2 - imgWidth / 2;
            const centerY = canvasHeight / 2 - imgHeight / 2;
            const spread = Math.min(canvasWidth, canvasHeight) * 0.3;

            return {
              x: getRandomInt(Math.max(0, centerX - spread), Math.min(canvasWidth - imgWidth, centerX + spread)),
              y: getRandomInt(Math.max(0, centerY - spread), Math.min(canvasHeight - imgHeight, centerY + spread)),
            };
          } else {
            return {
              x: getRandomInt(0, canvasWidth - imgWidth),
              y: getRandomInt(0, canvasHeight - imgHeight),
            };
          }
        };

        const images = (await Promise.all(createIcon().map(loadImage))).filter((img) => Boolean(img)) as HTMLImageElement[];
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const placedImages: Array<{ x: number; y: number; width: number; height: number }> = [];
        const maxAttempts = 100;

        images.sort((a, b) => b.width * b.height - a.width * a.height);

        let successfullyPlaced = 0;

        for (const img of images) {
          let placed = false;
          let attempts = 0;

          while (!placed && attempts < maxAttempts) {
            attempts++;

            const position = getRandomPosition(canvas.width, canvas.height, img.width, img.height, attempts);

            const collision = placedImages.some((placedImg) => position.x < placedImg.x + placedImg.width && position.x + img.width > placedImg.x && position.y < placedImg.y + placedImg.height && position.y + img.height > placedImg.y);

            if (!collision) {
              applyOpacity(ctx, img, position.x, position.y, img.width, img.height, 0.08);

              placedImages.push({
                x: position.x,
                y: position.y,
                width: img.width,
                height: img.height,
              });
              placed = true;
              successfullyPlaced++;
            }
          }
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    canvasRender();
  }, [canvasRef.current]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasBG;
