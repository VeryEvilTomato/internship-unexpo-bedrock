import React, {useState} from 'react';
import {Button, Overlay} from 'react-native-elements';
import {View, Dimensions, StyleSheet} from 'react-native';

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

export const OverlayModal = ({buttonText, Component, props}) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button
        title={buttonText}
        onPress={toggleOverlay}
        buttonStyle={styles.button.normal}
        titleStyle={styles.font.dark}
      />
      <Overlay
        isVisible={visible}
        overlayStyle={ModalStyles.Overlay}
        onBackdropPress={toggleOverlay}>
        <Component toggleOverlay={toggleOverlay} {...props} />
      </Overlay>
    </View>
  );
};

/*
scrollModal: {
    // Postioning and size
    padding: 10,
    position: 'absolute',
    // Styling
    borderColor: colors.main,
    borderWidth: 3,
    backgroundColor: colors.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

*/
