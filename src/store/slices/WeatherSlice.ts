import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../index';
import { IForecastError, IForecastResponse, IWeatherError, IWeatherRespone } from '@services/types';
import { getCurrentWeatherAPI, getForecastAPI } from '@services';
import { Alert } from 'react-native';

export interface IWeatherState {
  loading: boolean;
  version: string;
  location: string;
  currentWeatherData: IWeatherRespone | null;
  currentWeatherError: IWeatherError | null;
  forecastData: IForecastResponse | null;
  forecaseError: IForecastError | null;
  isUsingCustomLocation: boolean;
}

const initialState: IWeatherState = {
  loading: false,
  version: '0',
  location: 'London',
  currentWeatherData: null,
  currentWeatherError: null,
  forecastData: null,
  forecaseError: null,
  isUsingCustomLocation: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setVersion: (state, { payload }: PayloadAction<string>) => {
      state.version = payload;
    },
    setLocation: (state, { payload }: PayloadAction<string>) => {
      state.location = payload;
    },
    setWeather: (state, { payload }: PayloadAction<IWeatherRespone>) => {
      state.currentWeatherData = payload;
    },
    setForecast: (state, { payload }: PayloadAction<IForecastResponse>) => {
      state.forecastData = payload;
    },
    setIsUsingCustomLocation: (state, { payload }: PayloadAction<boolean>) => {
      state.isUsingCustomLocation = payload;
    },
  },
});

export const { setLoading, setVersion, setLocation, setWeather, setForecast, setIsUsingCustomLocation } = weatherSlice.actions;

export default weatherSlice.reducer;

// SELECTOR
export const weatherSelector = (state: { weatherStore: IWeatherState }) => state.weatherStore;

// ACTION
export const setAppVersion = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      dispatch(setLoading(false));
      dispatch(setVersion('1.0'));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

export const getCurrentWeather = (location: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data, error, loading } = await getCurrentWeatherAPI(location);
      if (!loading) {
        if (error && error.error.message) {
          Alert.alert(error.error.message);
        } else {
          dispatch(setWeather(data as IWeatherRespone))
        }
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

export const getForecast = (location: string, days: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data, error, loading } = await getForecastAPI(location, days);
      if (!loading) {
        if (error && error.error.message) {
          Alert.alert(error.error.message);
        } else {
          dispatch(setForecast(data as IForecastResponse))
        }
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

