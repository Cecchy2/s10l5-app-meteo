import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//0a9b2013e0a7b23c5cc2d1a62d4fc96f

//geocoding :http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid=0a9b2013e0a7b23c5cc2d1a62d4fc96f

//weather :https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=0a9b2013e0a7b23c5cc2d1a62d4fc96f

//http://openweathermap.org/img/w/10d.png

const today = () => {
  const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  const months = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const day = now.getDate();
  const month = months[now.getMonth()];

  return `${dayName}, ${day} ${month}`;
};

function MainPage() {
  const [city, setCity] = useState("Palermo");
  const [longitude, setLongitude] = useState(13.3524434);
  const [latitude, setLatitude] = useState(38.1112268);
  const [weather, setWeather] = useState({
    temperature: null,
    description: "",
    wind: null,
    humidity: null,
    icon: "",
  });

  const navigate = useNavigate();

  const fetchGeoLocation = async () => {
    try {
      const resp = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=0a9b2013e0a7b23c5cc2d1a62d4fc96f`
      );

      if (resp.ok) {
        const cities = await resp.json();

        if (cities.length > 0) {
          setLatitude(cities[0].lat);
          setLongitude(cities[0].lon);
          fetchWeather(cities[0].lat, cities[0].lon);
        } else {
          alert("City not found");
        }
      } else {
        alert("Failed to fetch geolocation");
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      alert("Error fetching geolocation");
    }
  };

  const fetchWeather = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0a9b2013e0a7b23c5cc2d1a62d4fc96f&units=metric`
      );
      if (resp.ok) {
        const weatherData = await resp.json();
        setWeather({
          temperature: Math.round(weatherData.main.temp),
          description: weatherData.weather[0].description,
          wind: Math.round(weatherData.wind.speed),
          humidity: weatherData.main.humidity,
          icon: weatherData.weather[0].icon,
        });
      } else {
        alert("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data");
    }
  };

  const handleCityChange = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchGeoLocation();
  };
  useEffect(() => {
    fetchWeather(/* "13.3524434", "38.1112268" */);
  }, []);

  return (
    <Container className="mt-4 bg-secondary rounded sun" fluid>
      <Row>
        <Col xs={4} lg={12}>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter your city" value={city} onChange={handleCityChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
                Cerca
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={4} className="mt-5 ">
          <div className="mt-5 text-center">
            <h4>{city.toUpperCase()}</h4>

            <h6>
              <Badge bg="dark">{today()}</Badge>
            </h6>
          </div>

          <p className="temperatura text-center mt-4" style={{ fontsize: "100px" }}>
            {weather.temperature}˚
          </p>
        </Col>
      </Row>
      <Row className="bgBlack my-5">
        <Col className="text-center my-5" xs={7}>
          <div className="text-white ">
            <h6 className="m-0">description:</h6>
            <p className="mt-0 mb-4">{weather.description}</p>
          </div>
          <div className="text-white">
            <div className="mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-wind"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
              </svg>{" "}
              wind: {weather.wind} km/h
            </div>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-droplet"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                />
              </svg>{" "}
              umidity: {weather.humidity}%
            </div>
          </div>
        </Col>
        <Col className="my-5">
          <div className="text-center mb-4">
            {weather.icon && <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="weather icon" />}
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="ms-5"
            onClick={() => navigate("/DetailsPage", { state: { city, weather, longitude, latitude } })}
          >
            Dettagli
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MainPage;
