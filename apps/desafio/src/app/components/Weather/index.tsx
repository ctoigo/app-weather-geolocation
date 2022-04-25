import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';

import { IconButton, Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { weatherConditions } from '../../utils/WeatherConditions';
import { styles } from './styles';
import GeolocationContext from '../../context/geolocation/context';
import { API_KEY } from '../../utils/WeatherAPIKey';

interface IWeatherClouds {
  all: number;
}

interface IWeatherCoord {
  lat: number;
  lon: number;
}

interface IWeatherMain {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface IWeatherSys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface IWeatherWind {
  deg: number;
  gust: number;
  speed: number;
}

interface IWeatherWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IWeather {
  base: string;
  clouds: IWeatherClouds;
  cod: number;
  coord: IWeatherCoord;
  dt: number;
  id: number;
  main: IWeatherMain;
  name: string;
  sys: IWeatherSys;
  timezone: number;
  visibility: number;
  weather: IWeatherWeather[];
  wind: IWeatherWind;
}

export function Weather() {
  const { setState, state } = useContext(GeolocationContext);

  const [data, setData] = useState<IWeather>();

  const fetchData = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${state.latitude}&lon=${state.longitude}&units=metric&lang=pt_br&APPID=${API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  };

  useEffect(() => {
    fetchData();
  }, [state]);

  if (data != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[data?.weather[0].main].color },
        ]}
      >
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[data?.weather[0].main].icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{data?.main.temp}˚</Text>
          <IconButton
            icon="reload"
            color={Colors.white}
            size={20}
            onPress={fetchData}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{data?.weather[0].description}</Text>
          <Text style={styles.subtitle}>
            {data?.name} {data?.sys.country}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Sem dados para apresentação</Text>
      </View>
    );
  }
}
