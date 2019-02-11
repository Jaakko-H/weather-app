import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;
const MILLISECOND_MULTIPLIER = 1000;
const WEATHER_TYPE_CURRENT = 'current';
const WEATHER_TYPE_FORECAST = 'forecast';
const WEATHER_UNAVAILABLE = 'Weather data unavailable';

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.type = props.type;

    this.state = {
      icon: "",
      timestamp: ''
    };
  }

  async componentWillMount() {
    let weatherData = undefined;
    if (this.type === WEATHER_TYPE_FORECAST) {
      weatherData = await getForecastFromApi();
    } else {
      weatherData = await getWeatherFromApi();
    }
    this.setState({
      icon: weatherData.weather ? weatherData.weather[0].icon.slice(0, -1) : '',
      datetime: weatherData.dt ? new Date(weatherData.dt*MILLISECOND_MULTIPLIER).toLocaleString() : ''
    });
  }

  render() {
    const { icon, datetime } = this.state;
    const weatherLabel = datetime ? 'Weather on ' + datetime : WEATHER_UNAVAILABLE;

    return (
      <table>
        <tr>
          <td>
            <div className="icon">
              { icon && <img src={`/img/${icon}.svg`} /> }
            </div>
          </td>
        </tr>
        <tr>
          <td className="weatherLabel">
            { weatherLabel }
          </td>
        </tr>
      </table>
    );
  }
}

class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table>
        <tr>
          <td><Weather type={WEATHER_TYPE_CURRENT} /></td>
          <td><Weather type={WEATHER_TYPE_FORECAST} /></td>
        </tr>
      </table>
    );
  }
}

ReactDOM.render(
  <WeatherTable />,
  document.getElementById('app')
);
