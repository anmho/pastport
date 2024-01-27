import Map from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

type Props = {};

const token =
  "pk.eyJ1IjoiYW1obzIiLCJhIjoiY2xyM3d0ejE5MWYyYzJqbXNlZ2N6eDIwbiJ9.vEudM1h-PFSqa-XUeTlHBQ";

const MapPage = ({}: Props) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <Map
        mapboxAccessToken={token}
        // @ts-expect-error typedefs dont exist
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 1.5,
        }}
        // projection={"globe"} // idk what this does
        style={{
          width: "100%",
          height: 320,
          border: "solid 1px grey",
          borderRadius: 16,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      />
    </div>
  );
};

export default MapPage;