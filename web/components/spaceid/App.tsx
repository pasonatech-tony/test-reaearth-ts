import type { actHandles } from "@web/types";
import { postMsg } from "@web/utils/common";
import { useCallback, useEffect, useMemo, useState } from "react";

export type ISS = {
  altitude: number;
  longitude: number;
  latitude: number;
};

export type Point = {
  lng: number | undefined;
  lat: number | undefined;
  height: number | undefined;
};

export type Image = {
  imageUrl: string;
  imageTitle: string;
};

const App = () => {
  const URL = "https://api.wheretheiss.at/v1/satellites/25544";
  const [data, setData] = useState<ISS>();
  const DEFAULT_IMAGE_URL =
    "https://images.unsplash.com/photo-1544185310-0b3cf501672b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
  // const [imageUrl] = useState<string>(
  //   (window as any).pluginInitProperties?.imageURL ?? DEFAULT_IMAGE_URL
  // );

  // const [imageTitle] = useState<string>(
  //   (window as any).pluginInitProperties?.imageTitle ?? "This is image title"
  // );

  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL);
  const [imageTitle, setImageTitle] = useState("This is image title");

  const [status, setStatus] = useState<string>("2d");

  const processImage = useCallback((image: Image) => {
    setImageUrl(image.imageUrl);
    setImageTitle(image.imageTitle);
  }, []);

  const [point, setPoint] = useState<Point>();
  async function fetchData() {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    setData(data);
  }

  const switchMap = () => {
    if (status === "2d") {
      setStatus("3d");
      console.log("switch map from 2d to 3d");
      postMsg("switchMap3d");
    } else if (status === "3d") {
      setStatus("2d");
      console.log("switch map from 3d to 2d");
      postMsg("switchMap2d");
    }
  };

  const addPointAction = useCallback((point: Point) => {
    setPoint(point);
  }, []);

  const actHandles: actHandles = useMemo(() => {
    return {
      addPointAction,
      setImage: processImage,
    };
  }, [processImage, addPointAction]);

  useEffect(() => {
    (globalThis as any).addEventListener("message", (msg: any) => {
      if (msg.source !== (globalThis as any).parent) return;
      try {
        const data =
          typeof msg.data === "string" ? JSON.parse(msg.data) : msg.data;
        actHandles[data.act as keyof actHandles]?.(data.payload);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    });
    postMsg("getImage");
    fetchData();
  }, []);

  return (
    <>
      <img src={imageUrl} width={30} height={30} alt="image from right panel" />
      <span>{imageTitle}</span>
      <h1>Current ISS location</h1>
      <p>Latitude: {data?.latitude}</p>
      <p>Longitude: {data?.longitude}</p>
      <p>Altitude: {data?.altitude}km</p>
      <p>
        <button onClick={fetchData}>Update</button>
      </p>
      <h1>Current location when click on re-earth</h1>
      <p>Latitude: {point?.lat}</p>
      <p>Longitude: {point?.lng}</p>
      <p>Height: {point?.height} </p>
      <p>
        <button onClick={switchMap}>Switch map {status}</button>
      </p>
    </>
  );
};

export default App;
