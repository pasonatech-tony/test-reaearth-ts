import { actHandles } from "src/type";

import html from "../../dist/web/spaceid/index.html?raw";
import type { MouseEvent } from "../apiType";

type Point = {
  lng: number | undefined;
  lat: number | undefined;
  height: number | undefined;
};

(globalThis as any).reearth.ui.show(html, {
  width: 350,
  height: 100,
  extended: true,
});

const addPoint = (point: Point) => {
  (globalThis as any).reearth.ui.postMessage(
    JSON.stringify({ act: "addPointAction", payload: point })
  );
};

(globalThis as any).reearth.on("click", (msg: MouseEvent) => {
  // console.log(msg);
  const lng = msg.lng;
  const lat = msg.lat;
  const height = msg.height;

  const point = {
    lng,
    lat,
    height,
  };

  addPoint(point);
});

//todo: get value from right side panel input
const imageUrl =
  (globalThis as any).reearth.widget.property?.customize?.imageUrl ?? undefined;
console.log("img url in be 1: ", imageUrl);

const addTest = () => {
  console.log("test handles");
};

const handles: actHandles = {
  addTest,
};

(globalThis as any).reearth.on("message", (msg: string) => {
  console.log("msg on: ", msg);

  const data = JSON.parse(msg);
  if (data?.act) {
    handles[data.act]?.(data.payload);
  }
});

(globalThis as any).reearth.ui.postMessage({
  act: "initProperties",
  payload: {
    imageTitle: (globalThis as any).reearth.widget.property?.customize
      ?.imageTitle,
    imageURL: imageUrl,
  },
});
