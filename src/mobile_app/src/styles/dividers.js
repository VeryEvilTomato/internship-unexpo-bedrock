import {StyleSheet} from 'react-native';
import {colors} from './constants';

export const divider = StyleSheet.create({
  small: {
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: colors.dark,
    height: 2,
  },
  normal: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.dark,
    borderRadius: 20,
    height: 5,
    elevation: 20,
  },
});
