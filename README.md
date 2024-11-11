# s10l5-app-meteo

# Progetto Meteo

Un'applicazione di previsioni meteo sviluppata con React e Vite.js. L'app consente agli utenti di cercare il meteo corrente e le previsioni a breve termine per una città specifica. Il progetto è stato deployato su Netlify e può essere visualizzato all'URL: [meteocecchy.netlify.app](https://meteocecchy.netlify.app/).

## Tecnologie utilizzate

- **React**: framework JavaScript per costruire interfacce utente.
- **Vite.js**: strumento di build per applicazioni moderne in JavaScript.
- **React-Bootstrap**: libreria di componenti UI per React.
- **React-Router-DOM**: gestione delle rotte e navigazione.
- **OpenWeatherMap API**: API per ottenere dati meteo in tempo reale.

## Funzionalità principali

- **Cerca città**: L'utente può inserire il nome di una città per ottenere le condizioni meteo attuali.
- **Condizioni attuali**: Visualizza temperatura, descrizione del meteo, velocità del vento, umidità e icona meteo.
- **Previsioni a 3 giorni**: Fornisce le previsioni meteo per i prossimi 3 giorni a mezzogiorno.
- **Navigazione tra pagine**: Tramite React-Router, l'utente può passare dalla pagina principale alla pagina dei dettagli.

## Componenti principali

### MainPage

La **MainPage** è la pagina principale dell'app e include:

- **Funzione di ricerca** per ottenere i dati meteo della città desiderata.
- **Visualizzazione meteo attuale** con temperatura, descrizione, velocità del vento, umidità e un'icona che cambia in base alle condizioni.
- **Navigazione ai dettagli**: Bottone per accedere alla pagina dei dettagli che mostra previsioni a breve termine.

### DetailsPage

La **DetailsPage** mostra:

- **Dettagli meteo attuali**: Come temperatura, descrizione, vento e umidità.
- **Previsioni a 3 giorni**: Icone e descrizioni per le condizioni meteo dei prossimi giorni.

## API utilizzata

L'app utilizza l'[API di OpenWeatherMap](https://openweathermap.org/api) per ottenere i dati meteo attuali e le previsioni.

### Endpoint principali

1. **Geolocalizzazione**:

   - `https://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}`
   - Permette di ottenere la latitudine e longitudine di una città specifica.

2. **Condizioni Meteo Correnti**:

   - `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric`
   - Fornisce i dettagli meteo attuali in base alla latitudine e longitudine.

3. **Previsioni Meteo**:
   - `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric`
   - Restituisce le previsioni meteo ogni 3 ore per i prossimi 5 giorni. Nel progetto, vengono filtrate le previsioni delle ore 12:00 per i prossimi 3 giorni.

## Deploy

L'app è stata deployata su **Netlify**. È accessibile all'URL: [https://meteocecchy.netlify.app](https://meteocecchy.netlify.app/).

## Struttura dei file

- **MainPage**: componente principale con la logica per la ricerca della città e visualizzazione dei dati meteo attuali.
- **DetailsPage**: componente per visualizzare i dettagli meteo e le previsioni a breve termine.

## Come eseguire il progetto in locale

1. **Clona il repository**:

   ```bash
   git clone <repository_url>

   npm install

   npm run dev
   ```
