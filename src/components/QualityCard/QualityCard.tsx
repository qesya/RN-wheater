import AppFlex from '@components/AppFlex/AppFlex';
import AppText from '@components/AppText/AppText';
import { COLOURS } from '@theme';
import React, { memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IQualityCard {
  headerText: string;
  descText: string;
  noteText?: string;
  flex?: number
  style?: StyleProp<ViewStyle>;
}

const QualityCard: React.FC<IQualityCard> = memo(({ descText, headerText, noteText, flex, style }) => (
  <AppFlex flex={flex ?? 1} flexDirection="column" justifyContent="space-between" style={[styles.card, style]}>
    <AppText colour="white" style={styles.txtHeader}>{headerText}</AppText>
    <AppText colour="white" bold style={styles.txtDesc}>{descText}</AppText>
    {noteText ? <AppText colour="white" style={styles.txtNote}>{noteText}</AppText> : null} 
  </AppFlex>
));

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: COLOURS.purpleDarkStart,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flex: 1,
  },
  txtHeader: {
    marginBottom: 6,
  },
  txtDesc: {
    fontSize: 26,
  },
  txtNote: {
    fontSize: 20,
  },
})

export default QualityCard;