import React, {Alert} from 'react';
import {Button} from 'react-native-elements';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {funnel} from '@api';
import styles from '@styles';

/*
 * Component to open up gate
 */
const GateButtonComponent = ({request, dispatch, userData}) => {
  return (
    <View>
      <Text style={styles.font.darkLarge}>Control del portón</Text>
      <View style={styles.container.row}>
        <Button
          title="SMS"
          onPress={() => {
            gateHandler({...request, ...userData, mode: 'SMS'}, dispatch);
          }}
          type="solid"
          icon={styles.icon.gateLargeSms()}
          buttonStyle={styles.button.gate}
          titleStyle={styles.font.darkLargeNoMargin}
        />
        <Button
          title="WiFi"
          onPress={() => {
            gateHandler({...request, ...userData, mode: 'HTTP'}, dispatch);
          }}
          type="solid"
          icon={styles.icon.gateLargeWifi()}
          buttonStyle={styles.button.gate}
          titleStyle={styles.font.darkLargeNoMargin}
        />
      </View>
    </View>
  );
};

// Gate opening handler
const gateHandler = (params, dispatch) => {
  funnel(params.mode)
    .createLog(params, dispatch)
    .then(ResponseSMS => {
      switch (params.mode) {
        case 'SMS':
          // SMS response status handling
          const {completed, cancelled, error} = ResponseSMS;
          console.log(completed, cancelled, error);
          break;
        default:
          break;
      }
    });
};

export const GateButton = connect(state => state)(GateButtonComponent);
