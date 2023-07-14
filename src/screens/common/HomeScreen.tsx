import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AppButton, AppFlex, AppLoading, QualityCard, WeatherHeader } from '@components';
import { ScreenProps } from '@navigation/screen';
import { StyleSheet } from 'react-native';
import { COLOURS } from '@theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather, setLocation, weatherSelector, setIsUsingCustomLocation } from '@store/slices/WeatherSlice';
import { LAYOUT, UVIndexConverter, epaUSIndexConverter, isAndroid, isRain } from '@utils';
import GetLocation from 'react-native-get-location'

export const HomeScreen: ScreenProps<'Home'> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, currentWeatherData, location, isUsingCustomLocation } = useSelector(weatherSelector);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['42%', isAndroid ? '72%' : '58%'], []);
  const handleSheetChanges = useCallback((index: number) => { }, []);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
    }).then((res) => {
      // GET CURRENT LOCATION
      if(!isUsingCustomLocation){
        dispatch(setLocation(`${res.latitude},${res.longitude}`))
      }
      dispatch(setIsUsingCustomLocation(false));
      dispatch(getCurrentWeather(`${location}`))
    })
  }, [dispatch, location]);

  const onPressForecast = useCallback(() => {
    navigation.navigate('Forecast');
  }, []);

  if (loading || !currentWeatherData) {
    return <AppLoading size="small" />
  }

  return (
    <AppFlex flexDirection="row" style={styles.container} justifyContent="center">
      <WeatherHeader
        cityName={currentWeatherData.location.name}
        temperature={`${currentWeatherData.current.temp_c.toString()}°`}
        weatherStaus={currentWeatherData.current.condition.text}
        weatherIcon={isRain(currentWeatherData.current.condition.text) ? 'sun-rain' : 'sun-cloud'}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: `${COLOURS.purpleDarktEnd}D9`,
        }}
        handleIndicatorStyle={{
          backgroundColor: COLOURS.white
        }}
      >
        <AppFlex style={styles.modalContainer}>
          <QualityCard
            flex={1}
            headerText="AIR QUALITY"
            descText={`${currentWeatherData.current.air_quality['us-epa-index']} - ${epaUSIndexConverter(currentWeatherData.current.air_quality['us-epa-index'])}`}
          />
          <AppFlex flexDirection="row" alignItems="center" justifyContent="space-between">
            <QualityCard
              flex={1}
              headerText="UV INDEX"
              descText={`${currentWeatherData.current.uv}`}
              noteText={UVIndexConverter(currentWeatherData.current.uv)}
            />
            <QualityCard
              headerText="HUMIDITY"
              descText={`${currentWeatherData.current.vis_km.toString()} km`}
              noteText={`Humidity: ${currentWeatherData.current.humidity}%`}
              flex={1.4}
              style={styles.rightCard}
            />
          </AppFlex>
          <AppFlex flexDirection="row" alignItems="center" justifyContent="space-between">
            <QualityCard
              flex={1}
              headerText="VISIBILITY"
              descText={`${currentWeatherData.current.wind_kph} km/h`}
              noteText={currentWeatherData.current.wind_dir}
            />
            <QualityCard
              flex={1}
              headerText="AIR QUALITY"
              descText={`${currentWeatherData.current.air_quality.co.toFixed()} μg/m3`}
              noteText="in last hour"
              style={styles.rightCard}
            />
          </AppFlex>
          <AppButton
            title="See 5-day Weather Forecast"
            onPress={onPressForecast}
          />
        </AppFlex>
      </BottomSheet>
    </AppFlex>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: COLOURS.purpleDark,
  },
  container: {
    paddingTop: LAYOUT.statusBarHeight,
    flex: 1,
    backgroundColor: COLOURS.purpleDark,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 24,
    backgroundColor: `${COLOURS.purpleDarktEnd}D9`,
  },
  //UV
  uvCard: {},
  //sunset
  rightCard: {
    marginLeft: 10,
  },
  //wind
  windCard: {}
})
