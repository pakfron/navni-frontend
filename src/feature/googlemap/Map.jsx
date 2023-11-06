import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { GOOGLE_KEY } from "../../config/env";
import { useEffect } from "react";
import axios from "../../config/axios";
import useMap from "../hook/use-map";
const center = { lat: 13.758565011499037, lng: 100.53493916642331 };
const navNiPin = "../../src/assets/purplePin.png";
export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_KEY,
  });
  const { subArea, setSubArea } = useMap();
  useEffect(() => {
    const getSubArea = axios
      .get("/map/get-subarea")
      .then((res) => {
        console.log(res.data.subAreaStation);
        setSubArea(res.data.subAreaStation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!isLoaded) {
    return <div>Loading....</div>;
  }
  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName={"google-map"}
      options={{
        disableDoubleClickZoom: true,
        zoomControl: false,
        scrollwheel: true,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* <MarkerF
        position={center}
        icon={{
          url: navNiPin,
          scaledSize: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
      /> */}
      {subArea &&
        subArea.map((area) => {
          return (
            <MarkerF
              key={area.id}
              position={{ lat: +area.latitude, lng: +area.longitude }}
              icon={{
                url: navNiPin,
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
          );
        })}
    </GoogleMap>
  );
}
