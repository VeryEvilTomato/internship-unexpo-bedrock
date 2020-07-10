import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Button, Text, Divider} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import styles from '@styles';
import {funnel} from '@api';
import {Log} from './Log';

/*
 * Shows list of logs.
 */

const LogListComponent = ({request: {mode, baseURL, token}, dispatch}) => {
  const [logsState, setLogsState] = useState([]);
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
    <View style={styles.card.scroll}>
      {logsState.length > 0 ? <View /> : <Text>Cargando...</Text>}
      <FlatList
        data={logsState}
        renderItem={({item}) => <Log log={item} />}
        keyExtractor={item => item.opened}
        extraData={logsState}
      />
    </View>
  );
};

export const LogList = connect(state => state)(LogListComponent);
