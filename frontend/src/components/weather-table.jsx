import React from 'react';
import Weather from './weather';

import * as statics from './../utils/statics';

export default function WeatherTable() {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Weather type={statics.WEATHER_TYPE_CURRENT} />
          </td>
          <td>
            <Weather type={statics.WEATHER_TYPE_FORECAST} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
