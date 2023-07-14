export const COLOURS = {
  //BASE
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  purpleLight: '#C427FB',
  purpleDark: '#48319D',
  blueDark: '#1F1D47',
  gray: '#E0D9FF',
  //LINEAR
  linearGrayStart: '#2E335A',
  linearGrayEnd: '#1C1B33',
  purpleDarkStart: '#5936B4',
  purpleDarktEnd: '#362A84',
  purpleLightStart: '#3658B1',
  purpleLightEnd: '#C159EC',
};

export const colourSelector = (colour: string) => `${colour}` as keyof typeof COLOURS;
