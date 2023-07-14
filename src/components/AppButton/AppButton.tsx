import React, { memo } from 'react';
import {AppText} from '@components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLOURS } from '@theme';

interface IAppButton {
  title: string;
  onPress: () => void;
  underline?: boolean;
  withBorder?: boolean;
  bold?: boolean;
}

const AppButton: React.FC<IAppButton> = memo(({ onPress, title, underline = true, withBorder = false, bold = false }) => (
  <TouchableOpacity onPress={onPress} style={[styles.btn, withBorder && styles.border]}>
    <AppText colour="white" underline={underline} style={styles.txtBtn} bold={bold}>{title}</AppText>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  border:{
    borderWidth: 1,
    borderColor: COLOURS.purpleDarkStart,
    padding: 12,
    borderRadius: 12,
  },
  btn: {
    marginVertical: 12,
  },
  txtBtn: {
    fontSize: 18,
    textAlign: 'center',
  }
})

export default AppButton;