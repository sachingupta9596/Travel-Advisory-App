import React, { useEffect, useState } from "react";

import { CssBaseline, Grid } from "@material-ui/core"; // Cssbaseline automatically
// adjusts margin padding
// Grid for creating grid

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData, getWeatherData } from "./api";

function App() {
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [type, setType] = useState("restaurant");
  const [rating, setRating] = useState("");
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  // changing map coordinate using google map in Map.jsx by sending statefuction as props to
  // Map.jsx
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filterPlaces = places.filter((place) => place.rating > rating);
    setFilterPlaces(filterPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );
      getPlaceData(type, bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilterPlaces([]);
        setLoading(false);
      });
    }
  }, [type, bounds]); // dependency on corrdinates so that data get fecthed
  // each time coordinates change

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filterPlaces.length ? filterPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filterPlaces.length ? filterPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
