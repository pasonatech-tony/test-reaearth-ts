import { useEffect, useState } from "react";

interface ISS {
  altitude: number;
  longitude: number;
  latitude: number;
}

const App = () => {
  const URL = "https://api.wheretheiss.at/v1/satellites/25544";
  const [data, setData] = useState<ISS>();
  async function fetchData() {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Current ISS location</h1>
      <p>Latitude: {data?.latitude}</p>
      <p>Longitude: {data?.longitude}</p>
      <p>Altitude: {data?.altitude}km</p>
      <p>
        <button onClick={fetchData}>Update</button>
      </p>
    </>
  );
};

export default App;
