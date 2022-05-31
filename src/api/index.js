import axios from "axios";

export const getPlaceData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: ne.lat,
          tr_longitude: sw.lng,
          tr_latitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          "X-RapidAPI-Key":
            "1bbc161a97msh3cdecd6024f7567p17275ajsnafb5b2c7d917",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lon) => {
  try {
    const { data } = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        params: {
          lon: lon,

          lat: lat,
        },
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "1bbc161a97msh3cdecd6024f7567p17275ajsnafb5b2c7d917",
        },
      }
    );
    return data;
  } catch (error) {}
};
