import AppFlex from '@components/AppFlex/AppFlex';
import { COLOURS } from '@theme';
import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface ILoading {
  size?: number | 'small' | 'large' | undefined;
}

const AppLoading: React.FC<ILoading> = memo(({ size = 'large' }) => (
  <AppFlex flex={1} justifyContent="center" alignItems="center" style={styles.background}>
    <ActivityIndicator size={size} color={COLOURS.white} />
  </AppFlex>
));

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLOURS.purpleDark,
  }
})

export default AppLoading;