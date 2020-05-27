import React, {useState} from 'react';

import {Button, Overlay} from 'react-native-elements';
import {View} from 'react-native';

export const OverlayModal = ({buttonText, Component, styles, props}) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button title={buttonText} onPress={toggleOverlay} />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: '90%',
          height: '90%',
        }}>
        <Component toggleOverlay={toggleOverlay} />
      </Overlay>
    </View>
  );
};
