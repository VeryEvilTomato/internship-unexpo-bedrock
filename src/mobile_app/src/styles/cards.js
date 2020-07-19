import {StyleSheet} from 'react-native';
import {spacing, colors} from './constants';

export const card = StyleSheet.create({
  normal: {
    // Positioning and size
    ...spacing.normal,
    width: '70%',
    height: 60,
    // Styling
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: colors.light,
  },
  large: {
    // Postioning and size
    ...spacing.normal,
    width: '60%',
    height: 100,
    // Styling
    borderColor: colors.dark,
    borderWidth: 3,
    backgroundColor: colors.light,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  wide: {
    // Postioning and size
    ...spacing.normal,
    width: '90%',
    height: 100,
    // Styling
    backgroundColor: colors.secondary,
    borderRadius: 20,
  },
  scroll: {
    // Postioning and size
    ...spacing.small,
    width: '95%',
    height: '80%',
    // Styling
    borderColor: colors.main,
    borderWidth: 3,
    backgroundColor: colors.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollFixed: {
    // Postioning and size
    ...spacing.small,
    padding: 10,
    width: '90%',
    height: 170,
    // Styling
    borderColor: colors.main,
    borderWidth: 3,
    backgroundColor: colors.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
