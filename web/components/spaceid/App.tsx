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
    fetchData();
    (globalThis as any).addEventListener("message", (msg: any) => {
      if (msg.source !== (globalThis as any).parent) return;
      try {
        const data =
          typeof msg.data === "string" ? JSON.parse(msg.data) : msg.data;
        actHandles[data.act as keyof actHandles]?.(data.payload);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    });
  }, [actHandles]);

  return (
    <>
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
