import { useEffect, useState } from "react";
import { Col, Container, Row, Badge, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

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
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState(13.3524434);
  const [latitude, setLatitude] = useState(38.1112268);
  const [weather, setWeather] = useState({
    temperature: null,
    description: "",
    wind: null,
    humidity: null,
    icon: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchGeoLocation = async () => {
    setError(null);
    try {
      const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
      if (resp.ok) {
        const cities = await resp.json();
        if (cities.length > 0) {
          const lat = cities[0].lat;
          const lon = cities[0].lon;
          setLatitude(lat);
          setLongitude(lon);
          fetchWeather(lat, lon);
        } else {
          setError("City not found");
        }
      } else {
        setError("Failed to fetch geolocation");
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      setError("Error fetching geolocation");
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
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
      } else if (resp.status === 401) {
        setError("API Key non valida o non autorizzata");
      } else {
        setError("Errore nel recupero dei dati meteo");
      }
    } catch (error) {
      console.error("Errore durante la richiesta dei dati meteo:", error);
      setError("Errore di rete o problema con l'API");
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchGeoLocation();
  };

  useEffect(() => {
    fetchWeather(latitude, longitude);
  }, []);

  let weatherClass;
  switch (weather.icon) {
    case "01d":
      weatherClass = "sun";
      break;
    case "01n":
    case "02n":
      weatherClass = "night text-white";
      break;
    case "02d":
      weatherClass = "fewclouds";
      break;
    case "03d":
    case "04d":
      weatherClass = "clouds";
      break;
    case "03n":
    case "04n":
      weatherClass = "cloudsNight text-white";
      break;
    case "09d":
    case "10d":
      weatherClass = "rain";
      break;
    case "09n":
    case "10n":
      weatherClass = "rainNight";
      break;
    case "11d":
      weatherClass = "thunder";
      break;

    case "11n":
      weatherClass = "thunderNight";
      break;
    case "13d":
      weatherClass = "snow";
      break;

    case "13n":
      weatherClass = "snowNight";
      break;
    case "50d":
    case "50n":
      weatherClass = "mist";
      break;
    default:
      weatherClass = "default";
      break;
  }

  return (
    <Container className={`bg-secondary rounded ${weatherClass}`} style={{ height: "100vh" }} fluid>
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
      {error && (
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={6} lg={4} className="text-center">
            <Badge bg="danger">{error}</Badge>
          </Col>
        </Row>
      )}
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
                src={`https://openweathermap.org/img/w/${weather.icon}.png`}
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
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MainPage;
