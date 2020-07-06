import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Button, Text, Divider} from 'react-native-elements';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {funnel} from '@api';

/*
 * Shows logs within the system. Alongside their users.
 */

const LogTrackerScreenComponent = ({request, dispatch, navigation}) => {
  const {baseURL, token, mode} = request;
  const [logsState, setLogsState] = useState(null);

  // Request log list
  useFocusEffect(
    useCallback(() => {
      funnel(mode)
        .requestAllLogs({baseURL, token}, dispatch)
        .then(response => {
          if (response !== undefined) {
            const {data} = response;
            setLogsState(data.results);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, [baseURL, dispatch, mode, token]),
  );

  return (
    <View>
      <Text>Lista de registros:</Text>
      <Divider />
    </View>
  );
};

export const LogTrackerScreen = connect(state => state)(
  LogTrackerScreenComponent,
);
