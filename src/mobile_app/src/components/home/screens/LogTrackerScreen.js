import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Button, Text, Divider} from 'react-native-elements';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {LogList} from '../LogList';
import styles from '@styles';

/*
 * Shows logs within the system. Alongside their users.
 */

const LogTrackerScreenComponent = ({request, dispatch, navigation}) => {
  const {baseURL, token, mode} = request;

  return (
    <View style={styles.container.column}>
      <Text style={styles.font.darkLargeCentered}>Lista de registros</Text>
      <Divider style={styles.divider.normal} />
      <LogList />
    </View>
  );
};

export const LogTrackerScreen = connect(state => state)(
  LogTrackerScreenComponent,
);
