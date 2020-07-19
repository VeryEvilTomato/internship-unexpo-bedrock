import {StyleSheet} from 'react-native';
import {spacing, colors} from './constants';

export const button = StyleSheet.create({
  small: {
    // Positioning and size
    ...spacing.small,
    width: '100%',
    height: '90%',
    // Styling
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
  smallIcon: {
    // Positioning and size
    ...spacing.small,
    width: 150,
    height: 60,
    // Styling
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
  normal: {
    // Positioning and size
    ...spacing.normal,
    width: '70%',
    height: 60,
    // Styling
    borderWidth: 0,
    backgroundColor: colors.main,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  delete: {
    // Positioning and size
    ...spacing.normal,
    width: '70%',
    height: 60,
    // Styling
    borderWidth: 0,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  large: {
    // Postioning and size
    ...spacing.normal,
    width: '60%',
    height: 100,
    // Styling
    backgroundColor: colors.light,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gate: {
    // Postioning and size
    ...spacing.normal,
    width: '65%',
    marginTop: 20,
    height: 90,
    // Styling
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    // Postioning and size
    ...spacing.normal,
    height: 80,
    width: 80,
    // Styling
    backgroundColor: colors.secondary,
    borderRadius: 50,
  },
});

