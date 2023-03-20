import html from "../../dist/web/spaceid/index.html?raw";
import type { MouseEvent } from "../apiType";

(globalThis as any).reearth.ui.show(html, {
  width: 350,
  height: 100,
  extended: true,
});

(globalThis as any).reearth.on("click", (msg: MouseEvent) => {
  // console.log(msg);
  console.log(msg);
  console.log("hello global reearth");
});
