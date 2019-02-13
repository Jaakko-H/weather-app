import React from 'react';
import ReactDOM from 'react-dom';
import WeatherTable from './components/weather-table';

function renderWeatherTable(position) {
  const latitude = position ? position.coords.latitude : undefined;
  const longitude = position ? position.coords.longitude : undefined;
  ReactDOM.render(
    <WeatherTable latitude={latitude} longitude={longitude} />,
    document.getElementById('app')
  );
}

function renderWeatherTableWithoutPositionData() {
  renderWeatherTable(undefined);
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(renderWeatherTable,
    renderWeatherTableWithoutPositionData);
} else {
  renderWeatherTable(null);
}
