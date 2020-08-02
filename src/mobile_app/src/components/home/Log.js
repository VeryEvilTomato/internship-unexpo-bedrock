import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Text, Divider} from 'react-native-elements';

import styles from '@styles';
import {dateToStringES} from '@utils';
import {funnel} from '@api';

const methodToText = methodNum => {
  switch (methodNum) {
    case 0:
      return 'Aplicación móvil';
    case 1:
      return 'Llamada/SMS';
    default:
      return 'Error';
  }
};

export const LogComponent = ({log, dispatch, request}) => {
  const {
    first_name,
    last_name,
    username,
    phone,
    method,
    opening_date,
    opening_time,
  } = log;
  const dateOpened = new Date(`${opening_date}T${opening_time}-04:00`);
  const dateStringES = dateToStringES(dateOpened);

  return (
    <View style={styles.card.wide}>
      <View>
        <View>
          <Text style={styles.font.dark}>
            {username} - {first_name} {last_name}
          </Text>
        </View>
        <Divider style={styles.divider.small} />

        <View>
          {method === '1' ? (
            <View>
              <Text style={styles.font.dark}>
                Número:{' '}
                <Text style={styles.font.darkNormal}>
                  {phone === null ? 'Error' : phone}
                </Text>
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>

        <Text style={styles.font.dark}>
          Método:{' '}
          <Text style={styles.font.darkNormal}>
            {methodToText(parseInt(method))}
          </Text>
        </Text>

        <Text style={styles.font.dark}>
          Fecha: <Text style={styles.font.darkNormal}>{dateStringES}</Text>
        </Text>
      </View>
    </View>
  );
};

export const Log = connect(state => state)(LogComponent);
