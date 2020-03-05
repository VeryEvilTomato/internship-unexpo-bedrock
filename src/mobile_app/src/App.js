import React from 'react';

import DeviceInfo from 'react-native-device-info';
import Communications from 'react-native-communications';

import {
    Text,
    View,
    Button,
    StyleSheet,
} from 'react-native';

const sendText = () => {
    Communications.textWithoutEncoding("+584249384895", "Hola, esto fue enviado desde React Native mi amor.")
}

const App: () => React$Node = () => {
    return (
        <View>
            <Text>Titulo</Text>
            <Button
                title="Enviar"
                onPress={sendText}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default App;
