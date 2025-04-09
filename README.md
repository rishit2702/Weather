# Weather Dashboard

A modern, responsive weather dashboard built with React.js that provides real-time weather information using the OpenWeatherMap API.

## Features

- Search for weather by city name
- Display current weather conditions including:
  - Temperature in Celsius
  - Weather description
  - Humidity
  - Wind speed
  - Weather icon
- Recent search history (last 5 cities)
- Responsive design for mobile and desktop
- Error handling with user-friendly messages
- Refresh button to update weather data
- Clean, modern UI using Chakra UI

## Tech Stack

- React.js with TypeScript
- Chakra UI for styling
- Axios for API requests
- React Icons
- OpenWeatherMap API
- Local Storage for recent searches

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Information

This project uses the OpenWeatherMap Current Weather API:
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Documentation: [OpenWeatherMap API Docs](https://openweathermap.org/current)
- Sign up for an API key at [OpenWeatherMap](https://openweathermap.org/api)

## Deployment

The app can be deployed to platforms like Vercel, Netlify, or GitHub Pages. To create a production build:

```bash
npm run build
```

## Screenshots

Add screenshots of your application here after deployment.
