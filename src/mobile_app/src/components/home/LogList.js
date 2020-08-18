import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
import {View, FlatList} from 'react-native';

import styles from '@styles';
import {funnel} from '@api';
import {Log} from './Log';
import {dateToStringES} from '@utils';

/*
 * Shows list of logs.
 */

const LogListComponent = ({
  request: {mode, baseURL, token},
  dispatch,
  filters,
}) => {
  const [logsState, setLogsState] = useState(null);
  const {opening_date, number} = filters;

  // Request log list
  useEffect(() => {
    funnel(mode)
      .requestLogsDate(
        {baseURL, token, dateObj: opening_date, number: number},
        dispatch,
      )
      .then(response => {
        if (response !== undefined) {
          setLogsState(response.data.reverse());
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [baseURL, dispatch, opening_date, mode, number, token]);

  return (
    <View style={styles.card.scroll}>
      {logsState !== null ? (
        <View>
          {logsState.length === 0 ? (
            <View>
              <Text style={styles.font.dark}>
                No existen registros para la fecha:
              </Text>
              <Text style={styles.font.darkNormal}>
                {dateToStringES(opening_date)}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
      <FlatList
        data={logsState}
        renderItem={({item}) => {
          if (item.error === 0) {
            return <Log log={item} />;
          }
        }}
        keyExtractor={item => item.id.toString()}
        extraData={logsState}
      />
    </View>
  );
};

export const LogList = connect(state => state)(LogListComponent);
