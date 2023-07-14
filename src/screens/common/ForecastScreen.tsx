import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppButton, AppFlex, AppLoading, AppText, ForecastCard, ForecastHeader } from '@components';
import { ScreenProps } from '@navigation/screen';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { COLOURS } from '@theme';
import { useDispatch, useSelector } from 'react-redux';
import { getForecast, setLocation, setIsUsingCustomLocation, weatherSelector } from '@store/slices/WeatherSlice';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import moment from 'moment';
import { isRain } from '@utils';

export const ForecastScreen: ScreenProps<'Forecast'> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [location, setTextLocation] = useState<string>('');
  const { loading, forecastData, currentWeatherData, location: userLocation } = useSelector(weatherSelector);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '26%'], []);

  useEffect(() => {
    dispatch(getForecast(userLocation, 5));
  }, [dispatch])

  const handleSheetChanges = useCallback((index: number) => { }, []);

  const onPressChangeLocation = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, []);

  const onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressSetLocation = useCallback(() => {
    dispatch(setIsUsingCustomLocation(true));
    dispatch(setLocation(location));
    bottomSheetRef.current?.close();
    navigation.navigate('Home');
  }, [location])

  if (loading || !forecastData || !currentWeatherData) {
    return <AppLoading size="small" />
  }

  return (
    <SafeAreaView style={styles.outer}>
      <AppFlex flexDirection="column" style={styles.container}>
        <FlatList
          data={forecastData.forecast.forecastday}
          style={styles.flatlistStyle}
          contentContainerStyle={{ paddingBottom: 50 }}
          stickyHeaderHiddenOnScroll={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <ForecastHeader
                title="5-day Forecast"
                location={`${currentWeatherData.location.name}`}
                onPressGoback={onPressGoBack}
              />
            )
          }}
          keyExtractor={item => item.date_epoch.toString()}
          renderItem={({ item, index }) => {
            return (
              <Animated.View entering={SlideInLeft.duration(500).delay(index * 100)}>
                <ForecastCard
                  temperature={`${item.day.avgtemp_c}°`}
                  LText={`${item.day.mintemp_c.toString()}°`}
                  HText={`${item.day.maxtemp_c.toString()}°`}
                  day={moment(item.date).format('dddd')}
                  weatherIcon={isRain(item.day.condition.text) ? 'sun-rain' : 'sun-cloud'}
                  weatherStatus={item.day.condition.text}
                />
              </Animated.View>
            )
          }}
          ListFooterComponent={() => {
            return (
              <AppButton
                title="Change Location"
                onPress={onPressChangeLocation}
              />
            )
          }}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{
            backgroundColor: `${COLOURS.purpleDarktEnd}D9`,
          }}
          handleIndicatorStyle={{
            backgroundColor: COLOURS.white
          }}
          enablePanDownToClose
          android_keyboardInputMode="adjustResize"
          backdropComponent={(props) => {
            return <BottomSheetBackdrop {...props} />
          }}
        >
          <AppFlex style={styles.modalContainer}>
            <AppText colour="white" large>
              Location:
            </AppText>
            <BottomSheetTextInput
              value={location}
              onChangeText={(e) => setTextLocation(e)}
              style={styles.input}
            />
            <AppButton
              title="Set Location"
              withBorder
              bold
              underline={false}
              onPress={onPressSetLocation}
            />
          </AppFlex>
        </BottomSheet>
      </AppFlex>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: COLOURS.blueDark,
  },
  flatlistStyle: {
    flex: 1, 
    marginHorizontal: -18, 
    paddingHorizontal: 18,
  },
  headerWrapper: {
    marginBottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLOURS.blueDark,
  },
  modalContainer: {
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  input: {
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLOURS.blueDark,
    color: COLOURS.white,
  },
})
