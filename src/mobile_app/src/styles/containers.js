import {StyleSheet} from 'react-native';
import {colors} from './constants';

export const spacing = {
  flex100: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 10,
  },
  flexItemEnd: {
    flex: 1,
    alignSelf: 'flex-end',
    height: '100%',
    width: '100%',
  },
};

export const container = StyleSheet.create({
  spacingCenter: {
    padding: 10,
    alignSelf: 'center',
  },
  columnBetween: {
    ...spacing.flex100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.light,
  },
  columnEvenly: {
    ...spacing.flex100,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: colors.light,
  },
  columnScroll: {
    height: '90%',
    padding: 10,
    flexDirection: 'column',
    backgroundColor: colors.light,
  },
  column: {
    ...spacing.flex100,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.light,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  rowEvenly: {
    ...spacing.flex100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  columnStart: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  flexItem1: {
    flex: 1,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  flexItem2: {
    flex: 2,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
});
