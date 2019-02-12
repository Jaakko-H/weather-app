import React from 'react';
import Weather from './weather';

import * as statics from './../utils/statics';

export default function WeatherTable(props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Weather type={statics.WEATHER_TYPE_CURRENT}
            latitude={props.latitude}
            longitude={props.longitude}/>
          </td>
          <td>
            <Weather type={statics.WEATHER_TYPE_FORECAST}
            latitude={props.latitude}
            longitude={props.longitude}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
