import React, {Alert} from 'react';
import {Button} from 'react-native-elements';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {funnel} from '@api';

/*
 * Component to open up gate
 */
const GateButtonComponent = ({request, dispatch, userData}) => {
  return (
    <View>
      <Button
        title="Encender"
        onPress={() => {
          gateHandler({...request, ...userData}, dispatch);
        }}
      />
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
