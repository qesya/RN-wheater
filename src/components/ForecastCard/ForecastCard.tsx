import AppFlex from '@components/AppFlex/AppFlex';
import AppText from '@components/AppText/AppText';
import { COLOURS } from '@theme';
import React, { memo } from 'react';
import { Image, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { houseImage, nightCloud, nightRain, sunCloud, sunRain } from '@theme/weatherImages';

interface IForecastCard {
  temperature: string;
  HText: string;
  LText: string;
  day: string;
  weatherStatus: string;
  weatherIcon: 'sun-cloud' | 'sun-rain' | 'night-rain' | 'night-cloud';
  style?: StyleProp<ViewStyle>;
}

const ForecastCard: React.FC<IForecastCard> = memo(({ LText, HText, day, temperature, weatherIcon, weatherStatus, style }) => {
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
    <AppFlex flexDirection="column" justifyContent="space-between" style={[styles.card, style]}>
      {renderWeatherIcon()}
      <AppText colour="white" style={styles.txtHeader}>{temperature}</AppText>
      <AppFlex flexDirection="row" alignItems="center" style={styles.HLWrapper}>
        <AppText colour="white" style={styles.txtNote}>H:{HText}</AppText>
        <AppText colour="white" style={[styles.txtNote, { marginLeft: 6 }]}>L:{LText}</AppText>
      </AppFlex>
      <AppFlex flexDirection="row" alignItems="center" justifyContent="space-between" style={styles.footer}>
        <AppText colour="white" style={styles.txtDay}>{day}</AppText>
        <AppText colour="white" style={styles.txtDay}>{weatherStatus}</AppText>
      </AppFlex>
    </AppFlex>
  )
});

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    marginTop: 30,
    marginBottom: 26,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: COLOURS.purpleDarkStart,
    borderColor: COLOURS.purpleDarkStart,
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
  txtHeader: {
    fontSize: 46,
    marginBottom: 6,
  },
  txtDesc: {
    fontSize: 26,
  },
  txtNote: {
    fontSize: 16,
    opacity: 0.8,
  },
  HLWrapper: {
    marginTop: 12,
    marginBottom: 4,
  },
  txtDay: {
    fontSize: 18,
  },
  weatherImg: {
    position: 'absolute',
    top: -50,
    right: 12,
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  footer: {}
})

export default ForecastCard;