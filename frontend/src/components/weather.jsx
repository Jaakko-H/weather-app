import PropTypes from 'prop-types';
import React from 'react';

import * as statics from './../utils/statics';
import * as weatherApi from './../api/weather-api';

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.type = props.type;

    this.state = {
      icon: '',
      timestamp: '',
    };
  }

  async componentWillMount() {
    let weatherData;
    if (this.type === statics.WEATHER_TYPE_FORECAST) {
      weatherData = await weatherApi.getForecastFromApi();
    } else {
      weatherData = await weatherApi.getWeatherFromApi();
    }
    this.setState({
      icon: weatherData.weather ? weatherData.weather[0].icon.slice(0, -1) : '',
      datetime: weatherData.dt
        ? new Date(weatherData.dt * statics.MILLISECOND_MULTIPLIER).toLocaleString()
        : '',
    });
  }

  render() {
    const { icon, datetime } = this.state;
    const weatherLabel = datetime
      ? `Weather on ${datetime}`
      : statics.WEATHER_UNAVAILABLE;

    return (
      <table>
        <tbody>
          <tr>
            <td>
              <div className="icon">
                {icon && <img src={`/img/${icon}.svg`} alt="Weather icon" />}
              </div>
            </td>
          </tr>
          <tr>
            <td className="weatherLabel">{weatherLabel}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

Weather.propTypes = {
  type: PropTypes.string.isRequired,
};
