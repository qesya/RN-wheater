import { IWeatherRespone, IWeatherError, IForecastResponse, IForecastError } from "./types";
import { ApiResponse, appFetch } from "./appFetch"
import RNConfig from 'react-native-config';

const baseURL = RNConfig.WEATHER_ENDPOINT;
const key = RNConfig.WEATHER_APIKEY;

const getCurrentWeatherAPI = async (location: string):Promise<ApiResponse<IWeatherRespone, IWeatherError>> => {
  const fetchURL = `${baseURL}/current.json?key=${key}&q=${location}&aqi=yes`;
  const { data, error, loading } = await appFetch<IWeatherRespone, IWeatherError>(fetchURL, 'GET');
  return {
    data,
    error,
    loading
  }
}

const getForecastAPI = async (location: string, days: number): Promise<ApiResponse<IForecastResponse, IForecastError>> => {
  const fetchURL = `${baseURL}/forecast.json?key=${key}&q=${location}&days=${days}&aqi=yes&alerts=no`;
  const { data, error, loading } = await appFetch<IForecastResponse, IForecastError>(fetchURL, 'GET');

  return {
    data,
    error,
    loading
  }
}

export {
  getCurrentWeatherAPI,
  getForecastAPI,
}