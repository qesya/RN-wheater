import AppFlex from '@components/AppFlex/AppFlex';
import AppText from '@components/AppText/AppText';
import { houseImage, nightCloud, nightRain, sunCloud, sunRain } from '@theme/weatherImages';
import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

interface IWeatherHeader {
  cityName: string;
  temperature: string;
  weatherStaus: string;
  weatherIcon: 'sun-cloud' | 'sun-rain' | 'night-rain' | 'night-cloud';
}

const WeatherHeader: React.FC<IWeatherHeader> = memo(({ cityName, temperature, weatherStaus, weatherIcon }) => {
  const renderWeatherIcon = () => {
    switch (weatherIcon) {
      case 'sun-cloud':
        return <Image source={sunCloud} style={styles.weatherImg} />;
      case 'sun-rain':
        return <Image source={sunRain} style={styles.weatherImg} />;
      case 'night-cloud':
        return <Image source={nightCloud} style={styles.weatherImg} />;
      case 'night-rain':
        return <Image source={nightRain} style={styles.weatherImg} />;
      default:
        return <Image source={sunCloud} style={styles.weatherImg} />;
    }
  }
  return (
    <AppFlex flex={1} justifyContent="center" alignItems="center">
      <AppFlex flexDirection="row" alignItems="center" style={styles.wrapperHeader}>
        <AppText style={styles.txtHeader} colour="white">
          {cityName}
        </AppText>
        {renderWeatherIcon()}
      </AppFlex>
      <AppText style={styles.txtTemp} colour="white">
        {temperature}
      </AppText>
      <AppText style={styles.txtWeather} colour="white">
        {weatherStaus}
      </AppText>
      <Image source={houseImage} style={styles.img} />
    </AppFlex>
  )
});

const styles = StyleSheet.create({
  wrapperHeader: {
    marginTop: -280,
  },
  txtHeader: {
    fontSize: 34,
  },
  txtTemp: {
    fontSize: 54,
    fontWeight: '100',
    marginVertical: 4,
  },
  txtWeather: {
    fontSize: 16,
    opacity: 0.8,
  },
  img: {
    height: 320,
    resizeMode: 'contain',
  },
  weatherImg: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginLeft: 6,
  }
})

export default WeatherHeader;