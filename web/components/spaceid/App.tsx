import type { actHandles } from "@web/types";
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

const App = () => {
  const URL = "https://api.wheretheiss.at/v1/satellites/25544";
  const [data, setData] = useState<ISS>();
  const DEFAULT_IMAGE_URL =
    "https://images.unsplash.com/photo-1544185310-0b3cf501672b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
  const [imageUrl] = useState<string>(
    (window as any).pluginInitProperties?.imageURL ?? DEFAULT_IMAGE_URL
  );

  const [imageTitle] = useState<string>(
    (window as any).pluginInitProperties?.imageTitle ?? "This is image title"
  );

  console.log("imageUrl in fe 1: ", imageUrl);
  const [point, setPoint] = useState<Point>();
  async function fetchData() {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    setData(data);
  }

  const addPointAction = useCallback((point: Point) => {
    setPoint(point);
  }, []);

  const actHandles: actHandles = useMemo(() => {
    return {
      addPointAction,
    };
  }, [addPointAction]);

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
    </>
  );
};

export default App;
