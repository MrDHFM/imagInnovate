import React, { useEffect, useState } from "react";

import "./Form.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faSpinner } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "1635890035cbba097fd5c26c8ea672a1";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        console.log(res.data.list);
        const result = res.data.list;
        const dayWiseResult = dayWiseData(result);
        const fiveDaysResult = fiveDaysData(dayWiseResult);
        fiveDaysResult.pop()
        setWeatherData(fiveDaysResult);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(weatherData);

  const dayWiseData = (result) => {
    let listOfDays = [];
    result.forEach((item) => {
      let dt = item.dt_txt.split(" ")[0];
      if (!listOfDays[dt]) {
        listOfDays[dt] = [];
      }
      listOfDays[dt].push(item);
    });
    return listOfDays;
  };

  const fiveDaysData = (result) => {
    let fiveDays = [];
    Object.keys(result).forEach((item) => {
      fiveDays.push(result[item][0]);
    });
    return fiveDays;
  };

  return (
    <div>
      <div className="formLayout">
        <p>Weather in your city</p>
        <div className="formSection">
          <form>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
            <button type="submit" onClick={handleSearch}>
              Search
            </button>
          </form>
          <div>
          {isLoading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{
                color: "gray",
                alignSelf: "center",
                fontSize: "20px",
                marginLeft: "10px",
              }}
            />
          ) : null}
          </div>
         
        </div>
      </div>

      {weatherData.length > 0 && (
        <div className="cardLayout">
          {weatherData.map((weatherItem, index) => {
            var originalDate = weatherItem.dt_txt.split(" ")[0];
            var parts = originalDate.split("-");
            var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
            console.log(formattedDate);
            return (
              <div key={index}>
                <div>
                  <table cellPadding="0" cellSpacing="0" key={weatherItem.dt}>
                    <thead>
                      <tr>
                        <th colSpan={2} className="date">
                          Date: {formattedDate}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} className="temp">
                          Temperature
                        </td>
                      </tr>

                      <tr >
                        <td className="minMax">Min</td>
                        <td className="minMax" >Max</td>
                      </tr>
                      <tr  >
                        <td  >{weatherItem.main.temp_min}</td>
                        <td  >{weatherItem.main.temp_max}</td>
                      </tr>
                      <tr className="bottom" >
                        <td className="preHum">Pressure</td>
                        <td>{weatherItem.main.pressure}</td>
                      </tr>
                      <tr className="bottom">
                        <td className="preHum">Humidity</td>
                        <td>{weatherItem.main.humidity}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <p>Date : {weatherItem.dt_txt.split(" ")[0]} </p>
               
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Temperature: {weatherItem.main.temp}</th>
                    </tr>
                    <tr>
                      <th>Min</th>
                      <th>Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{weatherItem.main.temp_min}</td>
                      <td>{weatherItem.main.temp_max}</td>
                    </tr>
                    <tr>
                      <th>Pressure</th>
                      <th>Humidity</th>
                    </tr>
                    <tr>
                      <td>{weatherItem.main.pressure}%</td>
                      <td>{weatherItem.main.humidity}%</td>
                    </tr>
                  </tbody>
                </table> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
