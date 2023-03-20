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

// how to connect click on re-earth and show it on ui: not yet
// todo1:
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

  console.log("point be: ", point);
  addPoint(point);
});
