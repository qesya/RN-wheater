import React, { memo } from 'react';
import {Text, StyleSheet, StyleProp, TextStyle, TextProps} from 'react-native';
import {COLOURS} from '@theme';
import {isAndroid, LAYOUT} from '../../utils';

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: COLOURS.black,
  },
  bold: {
    fontWeight: 'bold',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  small: {
    fontSize: 12,
  },
  large: {
    fontSize: 16,
  },
  header: {
    fontSize: 18,
    color: COLOURS.black,
  },
  label: {
    color: COLOURS.black,
  },
  highlight: {
    color: COLOURS.black,
  },
});

interface Props extends TextProps {
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  strikethrough?: boolean;
  underline?: boolean;
  uppercase?: boolean;
  small?: boolean;
  large?: boolean;
  highlight?: boolean;
  customHighlightColor?: string;
  type?: 'header' | 'label';
  colour?: keyof typeof COLOURS;
  children?: React.ReactNode;
  isRTL?: boolean;
}

const AppText: React.FC<Props> = memo((props) => {
// const AppText = (props: Props): JSX.Element => {
  const {
    children,
    bold,
    strikethrough,
    underline,
    uppercase,
    style,
    small,
    large,
    type,
    highlight,
    colour,
    isRTL = LAYOUT.isRTL,
    customHighlightColor,
    ...others
  } = props;

  const selector = `${colour}` as keyof typeof COLOURS;
  return (
    <Text
      style={StyleSheet.flatten([
        {...styles.text, color: colour ? COLOURS[selector] : styles.text.color},
        strikethrough ? styles.strikethrough : null,
        underline ? styles.underline : null,
        uppercase ? styles.uppercase : null,
        bold ? styles.bold : null,
        small ? styles.small : null,
        large ? styles.large : null,
        type === 'header' ? styles.header : null,
        type === 'label' ? styles.label : null,
        highlight
          ? customHighlightColor
            ? {color: customHighlightColor}
            : styles.highlight
          : null,
        {writingDirection: isRTL ? 'rtl' : 'ltr'},
        // On android isRTL align is reversed, ie. textAling left will
        // actually align text from right
        isAndroid && isRTL ? {textAlign: 'left'} : null,
        style,
      ])}
      {...others}>
      {children}
    </Text>
  );
});

export default AppText;