import { useState } from "react";
import { Badge, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

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
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [weather, setWeather] = useState({
    temperature: null,
    description: "",
    wind: null,
    humidity: null,
    icon: "",
  });

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
          wind: weatherData.wind.speed,
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

  return (
    <Container className="w-25 mt-4 bg-secondary rounded sun">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter your city" value={city} onChange={handleCityChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Cerca
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={4} className="mt-5 ">
          <div className="mt-5 text-center">
            <h4>{city}</h4>

            <h6 style={{ width: "125px" }}>
              <Badge bg="dark">{today()}</Badge>
            </h6>
          </div>

          <p className="display-1 text-center mt-4" style={{ fontsize: "100px" }}>
            {" "}
            {weather.temperature}˚
          </p>

          <div className="text-white">
            <h6 className="m-0">description:</h6>
            <p className="mt-0 mb-4">{weather.description}</p>
          </div>

          <div className="d-flex justify-content-between text-white">
            <div className="me-3">wind {weather.wind} km/h</div>
            <div className="me-3">umidity {weather.humidity}%</div>
            <div className="text-white">
              <img src="http://openweathermap.org/img/w/{weather.icon}.png" alt="" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MainPage;
