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
          const lat = cities[0].lat;
          const lon = cities[0].lon;
          setLatitude(lat);
          setLongitude(lon);
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
        console.log(weatherData);
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
    fetchWeather();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchGeoLocation();
    fetchWeather();
  };

  /* useEffect(() => {
    fetchWeather();
  }, []); */

  return (
    <Container className="bg-secondary rounded sun" style={{ height: "100vh" }} fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleSubmit} className="text-center mt-5">
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control type="text" placeholder="Enter your city" value={city} onChange={handleCityChange} />
            </Form.Group>
            <Button variant="dark" type="submit">
              Cerca
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} lg={4} className="text-center">
          <h4>{city.toUpperCase()}</h4>
          <h6>
            <Badge bg="dark">{today()}</Badge>
          </h6>
          <p className="temperatura mt-4" style={{ fontSize: "100px" }}>
            {weather.temperature}˚
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} lg={6} className="text-center mx-auto">
          <div className="d-flex justify-content-center align-items-center">
            {weather.icon && (
              <img
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                alt="weather icon"
                style={{ width: "50px", height: "50px" }}
              />
            )}
            <h3 className="ms-2">{weather.description}</h3>
          </div>
          <div className="fs-5 d-flex flex-column align-items-center mt-3">
            <Badge bg="dark" text="light" className="mb-2">
              <h3>Wind: {weather.wind} km/h</h3>

              <h3>Humidity: {weather.humidity}%</h3>
            </Badge>
          </div>
          <Button
            variant="warning"
            size="sm"
            onClick={() => navigate("/DetailsPage", { state: { city, weather, longitude, latitude } })}
            className="mt-4"
          >
            Dettagli
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-short ms-1"
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
