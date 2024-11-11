import { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const API_KEY = "0a9b2013e0a7b23c5cc2d1a62d4fc96f";

function DetailsPage() {
  const location = useLocation();
  const { city, weather, longitude, latitude } = location.state;
  const [forecast, setForecast] = useState(null);

  const foreCastFetch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      if (response.ok) {
        const weatherForecast = await response.json();
        const mezzogiornoForecast = weatherForecast.list.filter((item) => item.dt_txt.includes("12:00:00")).slice(0, 3);
        setForecast(mezzogiornoForecast);
      } else {
        alert("Failed to fetch forecast");
      }
    } catch (error) {
      console.error("Error fetching forecast:", error);
      alert("Error fetching forecast");
    }
  };

  useEffect(() => {
    foreCastFetch();
  }, []);

  const forecastDay = (index) => {
    switch (index) {
      case 0:
        return "Oggi";
      case 1:
        return "Domani";
      case 2:
        return "Dopodomani";
      default:
        return "";
    }
  };
  const weatherClass = weather.icon.includes("d") ? "sun" : "rain";

  return (
    <Container className={`bg-secondary rounded ${weatherClass}`} fluid style={{ height: "100vh" }}>
      <Row>
        <Col>
          <Nav.Link href="/">
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-left mt-4"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </Nav.Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5 className="text-center mb-5">{city.toUpperCase()}</h5>
          <h3 className="text-center mt-5">
            •Oggi la temperatura è di {weather.temperature}˚• <br />• il cielo è{" "}
            {weather.icon && <img src={`https://openweathermap.org/img/w/${weather.icon}.png`} alt="weather icon" />} •{" "}
            <br />• il vento soffia a {weather.wind}Km/h • <br />• l'umidità è al {weather.humidity}% •
          </h3>
        </Col>
      </Row>

      <Row className="whiteBg text-white" style={{ height: "50vh" }}>
        <Col className="mx-5 mb-5">
          <h3 className="text-center my-5">Previsione per i prossimi giorni {city.toUpperCase()}</h3>
          {forecast ? (
            <Row>
              {forecast.map((item, index) => (
                <Col xs={4} key={item.dt} className="text-center">
                  <h5 className="m-0 p-0">{forecastDay(index)}</h5>
                  <img src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" />
                  <h4 className="m-0 p-0">{Math.round(item.main.temp)}˚</h4>
                  <p>{item.weather[0].description}</p>
                </Col>
              ))}
            </Row>
          ) : (
            <Spinner animation="border" variant="secondary" />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DetailsPage;
