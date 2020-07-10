import {StyleSheet} from 'react-native';
import {colors} from './constants';

const fontSize = {normal: 18, large: 25, small: 11};

export const font = StyleSheet.create({
  dark: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: fontSize.normal,
  },
  darkNoLeftMargin: {
    marginTop: 10,
    color: colors.dark,
    fontWeight: '200',
    fontSize: fontSize.normal,
  },
  darkMargin: {
    alignSelf: 'center',
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: fontSize.normal,
  },
  lightNormal: {
    color: colors.light,
    fontWeight: '200',
    fontSize: fontSize.normal,
  },
  darkNormal: {
    color: colors.dark,
    fontWeight: '200',
    fontSize: fontSize.normal,
  },
  lightLarge: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
  darkLarge: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
  darkLargeCentered: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: fontSize.large,
    alignSelf: 'center',
  },
  darkLargeNoMargin: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
});
