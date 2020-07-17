import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Text, Divider} from 'react-native-elements';

import styles from '@styles';
import {funnel} from '@api';

export const LogComponent = ({log, dispatch, request}) => {
  const dateOpened = new Date(log.opened);
  const {baseURL, token, mode} = request;
  const [number, setNumber] = useState(null);
  const [user, setUser] = useState(null);

  // Request number
  useEffect(() => {
    funnel(mode)
      .requestNumber(log.number, baseURL, token, dispatch)
      .then(response => {
        setNumber(response.data);
      })
      .catch(() => {});
  }, [baseURL, dispatch, log.number, mode, token]);

  // Request user
  useEffect(() => {
    if (number !== null) {
      funnel(mode)
        .requestProfile(number.user, baseURL, token, dispatch)
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {});
    }
  }, [baseURL, dispatch, mode, number, token]);

  return (
    <View style={styles.card.wide}>
      <View>
        {user !== null ? (
          <Text style={styles.font.dark}>
            {user.first_name} {user.last_name}
          </Text>
        ) : (
          <View />
        )}
      </View>
      <Divider style={styles.divider.small} />

      {number !== null ? (
        <View>
          <Text style={styles.font.dark}>
            Número: <Text style={styles.font.darkNormal}>{number.number}</Text>
          </Text>
        </View>
      ) : (
        <View />
      )}

      <Text style={styles.font.darkNormal}>{log.opened}</Text>
    </View>
  );
};

export const Log = connect(state => state)(LogComponent);
