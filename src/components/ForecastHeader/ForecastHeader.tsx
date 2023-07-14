import AppFlex from '@components/AppFlex/AppFlex';
import AppText from '@components/AppText/AppText';
import { COLOURS } from '@theme';
import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import BackIcon from '@assets/images/back.png';

interface IForecastHeader {
  title: string;
  location: string;
  onPressGoback: () => void;
}

const ForecastHeader: React.FC<IForecastHeader> = memo(({ location, onPressGoback, title }) => (
  <AppFlex>
    <AppFlex flex={1} flexDirection="row" justifyContent="space-between" style={styles.outer}>
      <TouchableOpacity onPress={onPressGoback} style={{ flex: 1 }}>
        <AppFlex flex={1}>
          <Image source={BackIcon} style={styles.goBack} />
        </AppFlex>
      </TouchableOpacity>
      <AppFlex flexDirection="column" alignItems="center" style={styles.headerWrapper}>
        <AppText style={styles.txtHeader} colour="white">
          {title}
        </AppText>
        <AppText style={styles.txtDesc} colour="white">
          in {location}
        </AppText>
      </AppFlex>
      <AppFlex flex={1} />
    </AppFlex>
  </AppFlex>
));

const styles = StyleSheet.create({
  outer: {},
  headerWrapper: {
    marginBottom: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLOURS.blueDark,
  },
  txtHeader: {
    fontSize: 26,
  },
  txtDesc: {
    fontSize: 16,
    opacity: 0.8,
    marginTop: 4,
  },
  goBack: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
})

export default ForecastHeader;