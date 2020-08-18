import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Button, Text, Overlay} from 'react-native-elements';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {LogList} from '../LogList';
import {FilterMenu} from '../FilterMenu';
import styles from '@styles';
import {colors} from '@styles/constants';

const {height} = Dimensions.get('screen');
const ModalStyles = StyleSheet.create({
  Overlay: {
    padding: 10,
    position: 'absolute',
    left: 20,
    right: 20,
    top: 20,
    height: height - 150,
    // Styling
    borderColor: colors.main,
    borderWidth: 3,
    backgroundColor: colors.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

/*
 * Shows logs within the system. Alongside their users.
 */

const LogTrackerScreenComponent = ({request, dispatch, navigation}) => {
  const [filters, setFilters] = useState({
    number: null,
    opening_date: new Date(),
  });

  const [isFocused, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useFocusEffect(
    useCallback(() => {
      setFocus(true);
      return () => {
        setFocus(false);
      };
    }, []),
  );

  return (
    <View style={styles.container.columnBetween}>
      <View style={styles.container.rowEvenly}>
        <Text style={styles.font.darkLargeCentered}>Lista de registros</Text>
        <Button
          title="Filtros"
          buttonStyle={styles.button.delete}
          titleStyle={styles.font.dark}
          containerStyle={styles.container.flexItem1}
          icon={styles.icon.filter()}
          onPress={toggleOverlay}
        />
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={ModalStyles.Overlay}>
        <FilterMenu
          setFilters={setFilters}
          filters={filters}
          toggleOverlay={toggleOverlay}
        />
      </Overlay>

      {isFocused ? <LogList filters={filters} /> : <View />}
    </View>
  );
};

export const LogTrackerScreen = connect(state => state)(
  LogTrackerScreenComponent,
);
