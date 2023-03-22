import { actHandles } from "src/type";

import html from "../../dist/web/spaceid/index.html?raw";
import type { MouseEvent } from "../apiType";

type Point = {
  lng: number | undefined;
  lat: number | undefined;
  height: number | undefined;
};

type Model = {
  id: string;
  layerId: string;
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

// ===============================
// 3D Model
// ===============================
// const isAddingModel = false;
const models: Model[] = [];
let modelUrl =
  (globalThis as any).reearth.widget.property?.customize?.modelUrl ??
  "https://static.reearth.io/assets/01gma61ja44t57d82gd2fscc67.glb";

const addModel = (
  lng: number | undefined,
  lat: number | undefined,
  height: number | undefined
) => {
  if (!modelUrl) return;
  const id = (models.length + 1).toString();

  const layerId = (globalThis as any).reearth.layers.add({
    extensionId: "model",
    isVisible: true,
    title: `Model-${id}`,
    property: {
      default: {
        height,
        location: {
          lat,
          lng,
        },
        model: modelUrl,
        scale: 10,
        heightReference: "none",
      },
    },
  });

  const model = {
    id,
    layerId,
  };

  models.push(model);

  (globalThis as any).reearth.ui.postMessage(
    JSON.stringify({ act: "addModel", payload: model })
  );
};

(globalThis as any).reearth.on("click", (msg: MouseEvent) => {
  // console.log(msg);
  const lng = msg.lng;
  const lat = msg.lat;
  const height = msg.height ?? 0;

  const point = {
    lng,
    lat,
    height,
  };

  addPoint(point);
  addModel(lng, lat, height);
});

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1544185310-0b3cf501672b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

const handles: actHandles = {
  addModel,
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
  modelUrl =
    (globalThis as any).reearth.widget.property?.customize?.modelUrl ??
    "https://static.reearth.io/assets/01gma61ja44t57d82gd2fscc67.glb";
  console.log("modelUrl in be 2: ", modelUrl);
});
