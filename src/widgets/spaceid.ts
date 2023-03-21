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

const addTest = () => {
  console.log("test handles");
};

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1544185310-0b3cf501672b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

const handles: actHandles = {
  addTest,
  switchMap3d: () => {
    console.log("switch map 3d");
    (globalThis as any).reearth.scene.overrideProperty({
      default: {
        sceneMode: "3d",
      },
    });
  },
  switchMap2d: () => {
    console.log("switch map 2d");
    (globalThis as any).reearth.scene.overrideProperty({
      default: {
        sceneMode: "2d",
      },
    });
  },
  getImage: () => {
    const imageUrl =
      (globalThis as any).reearth.widget.property?.customize?.imageUrl ??
      DEFAULT_IMAGE_URL;
    const imageTitle =
      (globalThis as any).reearth.widget.property?.customize?.imageTitle ??
      "This is image title";

    (globalThis as any).reearth.ui.postMessage({
      act: "setImage",
      payload: { imageUrl, imageTitle },
    });
  },
};

(globalThis as any).reearth.on("message", (msg: string) => {
  const data = JSON.parse(msg);
  if (data?.act) {
    handles[data.act]?.(data.payload);
  }
});

(globalThis as any).reearth.on("update", () => {
  handles.getImage?.();
});
